export const createSavedKeyboard = (keyboard: Letter[][]): Letter[][] => {
    let newKeyboard: Letter[][] = [];

    keyboard.forEach((row, rowIndex) => {
        let keyboardRow: Letter[] = [];
        row.forEach((col, colIndex) => {
            keyboardRow.push({ char: col.char, status: col.status });
        });
        newKeyboard.push(keyboardRow);
    });

    return newKeyboard;
};
