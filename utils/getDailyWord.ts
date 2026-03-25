import { getSolutions } from './words';
import { getDayOfYear } from './getDayOfYear';

export const getDailyWord = (language: Language = 'no') => {
    const words = getSolutions(language);
    const dayOfYear = getDayOfYear();

    return words[dayOfYear % words.length];
};
