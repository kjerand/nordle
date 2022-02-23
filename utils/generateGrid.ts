export const generateGrid = (
    length: number,
    width: number,
    savedGame: Letter[][]
) => {
    const grid: Letter[][] = [];
    [...Array(length)].forEach((_, i) => {
        const row: Letter[] = [];
        if (savedGame) {
            [...Array(width)].forEach((_, j) =>
                row.push({
                    char: savedGame[i][j].char,
                    status: savedGame[i][j].status
                })
            );
        } else {
            [...Array(width)].forEach((_, i) =>
                row.push({ char: '', status: 0 })
            );
        }
        grid.push(row);
    });
    return grid;
};
