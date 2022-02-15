import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { generateGrid } from '../utils/generateGrid';
import { getRandomWord } from '../utils/getRandomWord';
import { getCharacterColor } from '../utils/getCharacterColor';
import LetterContainer from '../components/LetterContainer';
import KeyboardContainer from '../components/KeyboardContainer';
import { checkWordValidity } from '../utils/checkWordValidity';
import InformationPopup from '../components/InformationPopup';
import { BACKGROUND } from '../utils/constants';

const GamePage = ({ route, navigation }: { route: any; navigation: any }) => {
    const { gridLength } = route.params;
    const { gridWidth } = route.params;
    const { currentWord } = route.params;

    const [currentLevel, setCurrentLevel] = useState<number>(0);
    const [currentColumn, setCurrentColumn] = useState<number>(0);

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>('');

    const [disabled, setDisabled] = useState<boolean>(false);
    const [keyboardStatus, setKeyboardStatus] = useState<KeyboardStatus>({
        green: [],
        yellow: [],
        gray: []
    });

    const [grid, setGrid] = useState<string[][]>(
        generateGrid(gridLength, gridWidth)
    );

    const updateGrid = async () => {
        let empty = false;
        grid[currentLevel].forEach((char, index) => {
            if (char === '') empty = true;
        });
        if (empty) {
            setPopupTimeout(
                'Du må fylle ut alle bokstavene før du gjetter!',
                true
            );
            return;
        }

        let guess = '';
        grid[currentLevel].forEach((char, index) => {
            guess += char;
        });
        const valid = await checkWordValidity(guess);

        if (valid) {
            setCurrentLevel(currentLevel + 1);
            setCurrentColumn(0);
            if (currentWord === guess) {
                setPopupTimeout(
                    'Du tippet riktig! Gå til hovedmenyen for å spille igjen',
                    true
                );
                setDisabled(true);
            } else {
            }
        } else {
            setPopupTimeout('Dette ordet finnes ikke i listene våre', false);
        }
    };
    const onKeyboardPress = (char: string) => {
        let tmpGrid = grid;
        if (!disabled) {
            if (char === '!') {
                updateGrid();
            } else if (char === '<') {
                if (currentColumn > 0) {
                    tmpGrid[currentLevel][currentColumn - 1] = '';
                    setCurrentColumn(currentColumn - 1);
                }
            } else {
                if (currentColumn < gridWidth) {
                    tmpGrid[currentLevel][currentColumn] = char;
                    setCurrentColumn(currentColumn + 1);
                }
            }
        }

        setGrid(tmpGrid);
    };

    const setPopupTimeout = (message: string, win: boolean) => {
        setShowPopup(true);
        setPopupMessage(message);

        if (!win) {
            setTimeout(() => {
                setShowPopup(false);
                setPopupMessage('');
            }, 3000);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                {grid.map((row, rowIndex) => {
                    return (
                        <View
                            style={{
                                flexDirection: 'row',
                                marginVertical: gridLength === 7 ? 1 : 8
                            }}
                            key={rowIndex}
                        >
                            {row.map((col, colIndex) => {
                                return (
                                    <LetterContainer
                                        color={getCharacterColor(
                                            rowIndex,
                                            colIndex,
                                            currentWord,
                                            grid,
                                            currentLevel
                                        )}
                                        key={rowIndex + '' + colIndex}
                                    >
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                flex: 1
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    textAlign: 'center',

                                                    fontSize: 32
                                                }}
                                            >
                                                {col}
                                            </Text>
                                        </View>
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
                    keyboardStatus={keyboardStatus}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND,
        alignItems: 'center',
        paddingTop: 10
    }
});

export default GamePage;
