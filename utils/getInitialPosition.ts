export const getInitialPosition = (grid: Letter[][]): Position => {
    let position: Position = { row: 0, col: 0 };

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
