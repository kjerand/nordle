import { getCurrentDate } from './getCurrentDate';

export const shareGame = (
    grid: Letter[][],
    currentLevel: number,
    mode: number
) => {
    let gameMode = ['', '[Vanskelig]', '[Ekstrem]'];
    let shareString = 'Gjett ordet! \n';
    shareString += getCurrentDate() + '\n';
    shareString +=
        currentLevel + '/' + grid.length + ' ' + gameMode[mode] + '\n\n';

    grid.forEach((row, rowIndex) => {
        if (rowIndex <= currentLevel) {
            let rowString = '';
            row.forEach((col) => {
                if (col.status === 3) rowString += '🟩';
                else if (col.status === 2) rowString += '🟨';
                else if (col.status === 1) rowString += '⬛';
            });

            if (rowIndex !== currentLevel) rowString += '\n';

            shareString += rowString;
        }
    });
    return shareString;
};
