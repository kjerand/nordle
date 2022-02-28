export const checkHardMode = (grid: Letter[][], currentLevel: number) => {
    let valid = true;
    grid[currentLevel].forEach((col, colIndex) => {
        for (let i = 0; i < currentLevel; i++) {
            if (grid[i][colIndex].status === 3) {
                if (grid[i][colIndex].char !== col.char) {
                    valid = false;
                }
            }
        }
    });

    return valid;
};
