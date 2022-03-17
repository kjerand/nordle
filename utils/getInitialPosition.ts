export const getInitialPosition = (
    grid: Letter[][],
    newDay: boolean,
    daily: boolean
): Position => {
    let position: Position = { col: 0, row: 0 };

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

    if (!found) position = { col: 0, row: grid.length };

    return position;
};
