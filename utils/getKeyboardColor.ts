export const getKeyboardColor = (
    keyboard: Letter[][],
    keyboardStatus: KeyboardStatus,
    setKeyboard: CallableFunction
) => {
    keyboardStatus.green.forEach((letter) => {
        keyboard.forEach((row, rowIndex) => {
            row.forEach((key, keyIndex) => {
                if (letter === key.char) {
                    let tmp = keyboard;
                    tmp[rowIndex][keyIndex].status = 3;
                    setKeyboard(tmp);
                }
            });
        });
    });

    keyboardStatus.yellow.forEach((letter) => {
        keyboard.forEach((row, rowIndex) => {
            row.forEach((key, keyIndex) => {
                if (letter === key.char) {
                    if (keyboard[rowIndex][keyIndex].status < 2) {
                        let tmp = keyboard;
                        tmp[rowIndex][keyIndex].status = 2;
                        setKeyboard(tmp);
                    }
                }
            });
        });
    });

    keyboardStatus.gray.forEach((letter) => {
        keyboard.forEach((row, rowIndex) => {
            row.forEach((key, keyIndex) => {
                if (letter === key.char) {
                    let tmp = keyboard;
                    tmp[rowIndex][keyIndex].status = 1;
                    setKeyboard(tmp);
                }
            });
        });
    });
};
