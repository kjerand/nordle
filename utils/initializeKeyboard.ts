export const initializeKeyboard = (savedKeyboard: Letter[][]): Letter[][] => {
    if (savedKeyboard) {
        let newKeyboard: Letter[][] = [];
        savedKeyboard.forEach((row, rowIndex) => {
            let tmp: Letter[] = [];
            row.forEach((col, colIndex) => {
                tmp.push(col);
            });
            newKeyboard.push(tmp);
        });
        return newKeyboard;
    }
    const keyboard: Letter[][] = [
        [
            { char: 'Q', status: 0 },
            { char: 'W', status: 0 },
            { char: 'E', status: 0 },
            { char: 'R', status: 0 },
            { char: 'T', status: 0 },
            { char: 'Y', status: 0 },
            { char: 'U', status: 0 },
            { char: 'I', status: 0 },
            { char: 'O', status: 0 },
            { char: 'P', status: 0 },
            { char: 'Å', status: 0 }
        ],
        [
            { char: 'A', status: 0 },
            { char: 'S', status: 0 },
            { char: 'D', status: 0 },
            { char: 'F', status: 0 },
            { char: 'G', status: 0 },
            { char: 'H', status: 0 },
            { char: 'J', status: 0 },
            { char: 'K', status: 0 },
            { char: 'L', status: 0 },
            { char: 'Ø', status: 0 },
            { char: 'Æ', status: 0 }
        ],
        [
            { char: '!', status: 4 },
            { char: 'Z', status: 0 },
            { char: 'X', status: 0 },
            { char: 'C', status: 0 },
            { char: 'V', status: 0 },
            { char: 'B', status: 0 },
            { char: 'N', status: 0 },
            { char: 'M', status: 0 },
            { char: '<', status: 5 }
        ]
    ];

    return keyboard;
};
