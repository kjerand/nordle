export const getInitialPosition = (
    grid: Letter[][],
    newDay: boolean,
    daily: boolean
): Position => {
    let position: Position = { row: 0, col: 0 };

    if (newDay || !daily) return position;

    let found = false;
    grid.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (col.char === '' && !found) {
                position.col = colIndex;
                position.row = rowIndex;
                found = true;
            }
        });
    });
    return position;
};
