export const checkHardMode = (grid: Letter[][], currentLevel: number) => {
    let valid = true;
    grid.forEach((row) => {
        row.forEach((col, colIndex) => {
            if (col.status === 3)
                if (col.char !== grid[currentLevel][colIndex].char)
                    valid = false;
        });
    });

    return valid;
};
