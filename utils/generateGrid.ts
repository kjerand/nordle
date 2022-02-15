export const generateGrid = (length: number, width: number) => {
    const grid: string[][] = [];
    [...Array(length)].forEach((_, i) => {
        const row: string[] = [];
        [...Array(width)].forEach((_, i) => row.push(''));
        grid.push(row);
    });
    return grid;
};
