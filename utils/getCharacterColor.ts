import { DARKGRAY, GREEN, LIGHTGRAY, YELLOW } from './constants';

export const getCharacterColor = (
    row: number,
    col: number,
    currentWord: string,
    grid: Letter[][],
    currenLevel: number,
    keyboardStatus?: KeyboardStatus,
    setKeyboardStatus?: CallableFunction
): string => {
    if (row < currenLevel) {
        const letter = grid[row][col].char;
        if (letter === currentWord[col]) {
            if (keyboardStatus && setKeyboardStatus) {
                setKeyboardStatus({
                    ...keyboardStatus,
                    green: [...keyboardStatus.green, letter]
                });
            }

            return GREEN;
        }
        for (let i = 0; i < currentWord.length; i++) {
            if (letter === currentWord.charAt(i)) {
                if (keyboardStatus && setKeyboardStatus) {
                    setKeyboardStatus({
                        ...keyboardStatus,
                        yellow: [...keyboardStatus.yellow, letter]
                    });
                }
                return YELLOW;
            }
        }
        if (keyboardStatus && setKeyboardStatus) {
            setKeyboardStatus({
                ...keyboardStatus,
                gray: [...keyboardStatus.gray, letter]
            });
        }
        return DARKGRAY;
    }
    return LIGHTGRAY;
};
