import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import { setSavedGame } from '../store/save';
import { getDayOfYear } from '../utils/getDayOfYear';
import { savedGrid } from '../utils/savedGrid';
import { checkHardMode } from '../utils/checkHardMode';

const COLORS = [LIGHTGRAY, DARKGRAY, YELLOW, GREEN];

const GamePage = ({
    route
}: {
    route: RouteProp<
        {
            params: Route;
        },
        'params'
    >;
}) => {
    const { gridLength } = route.params;
    const { gridWidth } = route.params;
    const { currentWord } = route.params;
    const { daily } = route.params;
    const { initialPosition } = route.params;
    const { savedGame } = route.params;

    const [currentLevel, setCurrentLevel] = useState<number>(
        savedGame ? initialPosition.row.valueOf() : 0
    );
    const [currentColumn, setCurrentColumn] = useState<number>(
        savedGame ? initialPosition.col.valueOf() : 0
    );

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupUpdate, setPopupUpdate] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>('');

    const [disabled, setDisabled] = useState<boolean>(false);

    const [keyboard, setKeyboard] = useState<Letter[][]>(
        initializeKeyboard(savedGame.savedKeyboard)
    );
    const [grid, setGrid] = useState<Letter[][]>(
        generateGrid(gridLength, gridWidth, savedGame.savedGrid)
    );

    const { theme } = useSelector((state: RootStateOrAny) => state.theme);
    const { hardMode } = useSelector((state: RootStateOrAny) => state.settings);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (!daily) return;
            if (disabled) {
                dispatch(
                    setSavedGame({
                        savedGrid: [],
                        savedKeyboard: [],
                        date: getDayOfYear()
                    })
                );

                AsyncStorage.setItem('@keyboardStorage', '');
                AsyncStorage.setItem('@gridStorage', '');
            } else {
                const save: Letter[][] = savedGrid(grid, currentLevel);
                dispatch(
                    setSavedGame({
                        savedGrid: save,
                        savedKeyboard: keyboard,
                        date: getDayOfYear()
                    })
                );

                AsyncStorage.setItem(
                    '@keyboardStorage',
                    JSON.stringify(keyboard)
                );
                AsyncStorage.setItem('@gridStorage', JSON.stringify(save));
            }
        };
    }, [disabled, currentLevel]);

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
        grid[currentLevel].forEach((letter) => {
            guess += letter.char;
        });
        const valid = checkWordValidity(guess);

        if (valid) {
            if (hardMode) {
                if (!checkHardMode(grid, currentLevel)) {
                    setPopupTimeout('Du må bruke de grønne bokstavene!');
                    return;
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

                if (daily) {
                    updateWinStreak(setPopupTimeout);
                } else {
                    setPopupTimeout('Du tippet riktig!');
                }
            } else if (currentLevel + 1 === gridLength) {
                setDisabled(true);

                if (daily) {
                    updateLoss();

                    setPopupTimeout(
                        'Du klarte det ikke. Riktig svar var ' +
                            currentWord.toUpperCase() +
                            '.'
                    );
                }
            }
        } else {
            setPopupTimeout('Dette ordet finnes ikke i listene våre.');
        }
    };

    const onKeyboardPress = (letter: string) => {
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
                />

                <KeyboardContainer
                    onKeyboardPress={onKeyboardPress}
                    keyboard={keyboard}
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
