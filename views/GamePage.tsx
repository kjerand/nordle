import { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Share,
    AppState,
    AppStateStatus
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';

import LetterContainer from '../components/LetterContainer';
import KeyboardContainer from '../components/KeyboardContainer';
import GridContainer from '../components/GridContainer';
import InformationPopup from '../components/InformationPopup';

import { generateGrid } from '../utils/generateGrid';
import { checkWordValidity } from '../utils/checkWordValidity';
import { initializeKeyboard } from '../utils/initializeKeyboard';
import { updateColors } from '../utils/updateColors';
import { updateWinStreak } from '../utils/updateWinStreak';
import { updateLoss } from '../utils/updateLoss';

import {
    BACKGROUND,
    DARKGRAY,
    LIGHTGRAY,
    YELLOW,
    GREEN,
    SMALLSCREEN,
    MEDIUMCREEN,
    VERYLARGESCREEN
} from '../utils/constants';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { checkHardMode } from '../utils/checkHardMode';
import { checkExtremeMode } from '../utils/checkExtremeMode';
import { shareGame } from '../utils/shareGame';
import { setSavedGame } from '../store/save';
import { getCurrentDate } from '../utils/getCurrentDate';
import { createSavedGrid } from '../utils/createSavedGrid';
import { createSavedKeyboard } from '../utils/createSavedKeyboard';
import StatisticsModal from '../components/StatisticsModal';
import {
    setDistribution,
    setTotalGames,
    setTotalWins,
    setVisible
} from '../store/statistics';
import { createDistribution } from '../utils/createDistribution';

const COLORS = [LIGHTGRAY, DARKGRAY, YELLOW, GREEN];

const GamePage = ({
    route,
    navigation
}: {
    route: RouteProp<
        {
            params: Route;
        },
        'params'
    >;
    navigation: any;
}) => {
    const { gridLength } = route.params;
    const { gridWidth } = route.params;
    const { currentWord } = route.params;
    const { daily } = route.params;
    const { initialPosition } = route.params;
    const { initialDate } = route.params;
    const { savedGame } = route.params;

    const { theme } = useSelector((state: RootStateOrAny) => state.theme);
    const { mode } = useSelector((state: RootStateOrAny) => state.settings);
    const { visible, statistics } = useSelector(
        (state: RootStateOrAny) => state.statistics
    );

    const dispatch = useDispatch();

    const [currentLevel, setCurrentLevel] = useState<number>(
        initialPosition.row
    );
    const [currentColumn, setCurrentColumn] = useState<number>(
        initialPosition.col
    );

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupUpdate, setPopupUpdate] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>('');

    const [gameStatus, setGameStatus] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [share, setShare] = useState<boolean>(false);

    const [keyboard, setKeyboard] = useState<Letter[][]>(
        initializeKeyboard(savedGame.savedKeyboard)
    );
    const [grid, setGrid] = useState<Letter[][]>(
        generateGrid(gridLength, gridWidth, savedGame.savedGrid)
    );

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        AppState.addEventListener('change', checkIfNewDay);

        return () => {
            AppState.removeEventListener('change', checkIfNewDay);
        };
    }, []);

    const checkIfNewDay = (nextAppState: AppStateStatus) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            if (initialDate !== getCurrentDate() && daily) {
                setDisabled(true);
                navigation.navigate('Menu');
            }
        }
        appState.current = nextAppState;
    };

    useEffect(() => {
        if (savedGame.finished === 1) {
            setGameStatus(1);
            setDisabled(true);
            setShare(true);
            updateWinStreak(setPopupTimeout);
        } else if (savedGame.finished === 2) {
            setGameStatus(2);
            setDisabled(true);
            setPopupTimeout(
                'Du klarte det ikke. Riktig svar var ' +
                    currentWord.toUpperCase() +
                    '.'
            );
        }
    }, []);

    useEffect(() => {
        if (!daily || savedGame.finished > 0) return;

        dispatch(
            setSavedGame({
                savedGrid: createSavedGrid(grid, currentLevel),
                savedKeyboard: createSavedKeyboard(keyboard),
                date: initialDate,
                finished: gameStatus
            })
        );

        AsyncStorage.setItem(
            '@grid',
            JSON.stringify(createSavedGrid(grid, currentLevel))
        );
        AsyncStorage.setItem(
            '@keyboard',
            JSON.stringify(createSavedKeyboard(keyboard))
        );
        AsyncStorage.setItem('@date', initialDate);
        AsyncStorage.setItem('@finished', gameStatus.toString());
    }, [currentLevel]);

    useEffect(() => {
        setShowPopup(true);
        if (!disabled) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [popupUpdate]);

    const setPopupTimeout = (message: string) => {
        setPopupUpdate(!popupUpdate);
        setPopupMessage(message);
    };

    const onShare = async () => {
        try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            await Share.share({
                message: shareGame(grid, currentLevel, mode)
            });
        } catch (error) {
            console.warn(error);
        }
    };

    const updateGrid = () => {
        let empty = false;
        grid[currentLevel].forEach((letter) => {
            if (letter.char === '') empty = true;
        });
        if (empty) {
            setPopupTimeout('Du må fylle ut alle bokstavene før du gjetter!');
            return;
        }

        let guess = '';
        grid[currentLevel].forEach((letter) => (guess += letter.char));

        const valid = checkWordValidity(guess);

        if (valid) {
            if (mode > 0) {
                if (!checkHardMode(grid, currentLevel)) {
                    setPopupTimeout('Du må bruke de grønne bokstavene!');
                    return;
                }

                if (mode === 2) {
                    if (!checkExtremeMode(keyboard, guess.split(''))) {
                        setPopupTimeout(
                            'Du kan ikke bruke mørk grå bokstaver!'
                        );
                        return;
                    }
                }
            }

            updateColors(
                keyboard,
                setKeyboard,
                grid,
                setGrid,
                currentLevel,
                currentWord
            );
            setCurrentLevel(currentLevel + 1);
            setCurrentColumn(0);

            if (currentWord === guess) {
                setDisabled(true);
                setGameStatus(1);

                if (daily) {
                    setShare(true);
                    updateWinStreak(setPopupTimeout);

                    let savedStatistics: Statistics = {
                        totalGames: statistics.totalGames + 1,
                        totalWins: statistics.totalWins + 1,
                        distribution: createDistribution(
                            statistics.distribution,
                            currentLevel
                        )
                    };

                    AsyncStorage.setItem(
                        '@statistics',
                        JSON.stringify(savedStatistics)
                    );

                    dispatch(setTotalGames(statistics.totalGames + 1));
                    dispatch(setTotalWins(statistics.totalWins + 1));
                    dispatch(
                        setDistribution(
                            createDistribution(
                                statistics.distribution,
                                currentLevel
                            )
                        )
                    );

                    AsyncStorage.getItem('@requestReview_v2').then(
                        async (data) => {
                            if (!data) {
                                AsyncStorage.setItem('@requestReview_v2', '0');

                                if (await StoreReview.hasAction()) {
                                    StoreReview.requestReview();
                                }
                            }
                        }
                    );
                } else {
                    setPopupTimeout('Du tippet riktig!');
                }
            } else if (currentLevel + 1 === gridLength) {
                setDisabled(true);
                setGameStatus(2);

                setPopupTimeout(
                    'Du klarte det ikke. Riktig svar var ' +
                        currentWord.toUpperCase() +
                        '.'
                );

                if (daily) {
                    let savedStatistics: Statistics = {
                        totalGames: statistics.totalGames + 1,
                        totalWins: statistics.totalWins,
                        distribution: statistics.distribution
                    };

                    AsyncStorage.setItem(
                        '@statistics',
                        JSON.stringify(savedStatistics)
                    );
                    dispatch(setTotalGames(statistics.totalGames + 1));
                    updateLoss();
                }
            }
        } else {
            setPopupTimeout('Dette ordet finnes ikke i listene våre.');
        }
    };

    const onKeyboardPress = (letter: string) => {
        if (initialDate !== getCurrentDate() && daily) {
            setDisabled(true);
            navigation.navigate('Menu');
        }

        if (disabled) return;

        let tmp = grid;
        if (letter === '!') {
            updateGrid();
        } else if (letter === '<') {
            if (currentColumn > 0) {
                tmp[currentLevel][currentColumn - 1].char = '';
                setCurrentColumn(currentColumn - 1);
            }
        } else {
            if (currentColumn < gridWidth) {
                tmp[currentLevel][currentColumn].char = letter;
                setCurrentColumn(currentColumn + 1);
            }
        }
        setGrid(tmp);
    };

    const setModalVisible = () => {
        dispatch(setVisible(!visible));
    };

    return (
        <View
            style={[styles.container, { backgroundColor: BACKGROUND[theme] }]}
        >
            <View>
                {grid.map((row, rowIndex) => {
                    return (
                        <View style={styles.gridContainer} key={rowIndex}>
                            {row.map((col, colIndex) => {
                                return (
                                    <LetterContainer
                                        color={COLORS[col.status]}
                                        key={colIndex}
                                        current={
                                            currentColumn === colIndex &&
                                            currentLevel === rowIndex &&
                                            !disabled
                                        }
                                    >
                                        <GridContainer letter={col.char} />
                                    </LetterContainer>
                                );
                            })}
                        </View>
                    );
                })}
                <InformationPopup
                    message={popupMessage}
                    showPopup={showPopup}
                    onShare={onShare}
                    share={share}
                />
                <KeyboardContainer
                    onKeyboardPress={onKeyboardPress}
                    keyboard={keyboard}
                />
                <StatisticsModal
                    visible={visible}
                    statistics={statistics}
                    setModalVisible={setModalVisible}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10
    },
    gridContainer: {
        flexDirection: 'row',
        marginVertical: SMALLSCREEN
            ? 0
            : MEDIUMCREEN || VERYLARGESCREEN
            ? 1
            : 5,
        width: '100%'
    }
});

export default GamePage;
