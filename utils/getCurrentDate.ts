import { getMonthNames } from './i18n';

export const getCurrentDate = (language: Language = 'no'): string => {
    const months = getMonthNames(language);
    const dateObj = new Date();
    const month = months[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();

    return day + '. ' + month + ' ' + year;
};
