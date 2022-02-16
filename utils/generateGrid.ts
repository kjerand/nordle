export const generateGrid = (length: number, width: number) => {
    const grid: Letter[][] = [];
    [...Array(length)].forEach((_, i) => {
        const row: Letter[] = [];
        [...Array(width)].forEach((_, i) => row.push({ char: '', status: 0 }));
        grid.push(row);
    });
    return grid;
};
