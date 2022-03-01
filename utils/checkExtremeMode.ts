export const checkExtremeMode = (keyboard: Letter[][], guess: string[]) => {
    let valid = true;

    guess.forEach((letter) => {
        keyboard.forEach((row) => {
            row.forEach((col) => {
                if (letter === col.char.toLowerCase()) {
                    if (col.status === 1) {
                        valid = false;
                    }
                }
            });
        });
    });

    return valid;
};
