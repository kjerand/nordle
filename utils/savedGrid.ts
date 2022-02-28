export const savedGrid = (grid: Letter[][], currentLevel: number) => {
    let newGrid: Letter[][] = [];

    grid.forEach((row, rowIndex) => {
        let gridRow: Letter[] = [];
        row.forEach((col, colIndex) => {
            if (rowIndex < currentLevel) {
                gridRow.push({ char: col.char, status: col.status });
            } else {
                gridRow.push({ char: '', status: 0 });
            }
        });
        newGrid.push(gridRow);
    });

    return newGrid;
};
