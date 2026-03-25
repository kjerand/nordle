import { getCurrentDate } from './getCurrentDate';
import { t } from './i18n';

export const shareGame = (
    grid: Letter[][],
    currentLevel: number,
    mode: number,
    language: Language = 'no'
) => {
    let gameMode = ['', t('shareHard', language), t('shareExtreme', language)];
    let shareString = 'Nordle! \n';
    shareString += getCurrentDate(language) + '\n';
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
