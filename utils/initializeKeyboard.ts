const keyboardLayouts: { [key in Language]: string[][] } = {
    no: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ø', 'Æ'],
        ['!', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<']
    ],
    en: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['!', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<']
    ],
    sv: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
        ['!', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<']
    ],
    da: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ø', 'Æ'],
        ['!', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<']
    ]
};

const getSpecialStatus = (char: string): number => {
    if (char === '!') return 4;
    if (char === '<') return 5;
    return 0;
};

export const initializeKeyboard = (
    savedKeyboard: Letter[][],
    language: Language = 'no'
): Letter[][] => {
    if (savedKeyboard) {
        let newKeyboard: Letter[][] = [];
        savedKeyboard.forEach((row) => {
            let tmp: Letter[] = [];
            row.forEach((col) => {
                tmp.push({ char: col.char, status: col.status });
            });
            newKeyboard.push(tmp);
        });
        return newKeyboard;
    }

    const layout = keyboardLayouts[language];
    return layout.map((row) =>
        row.map((char) => ({
            char,
            status: getSpecialStatus(char)
        }))
    );
};
