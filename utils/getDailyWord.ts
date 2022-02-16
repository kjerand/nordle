import solutions from '../assets/solutions.json';
import { getDayOfYear } from './getDayOfYear';
export const getDailyWord = () => {
    let words = solutions.words;
    const dayOfYear = getDayOfYear();

    if (dayOfYear < words.length) {
        return words[dayOfYear];
    } else {
        return words[0];
    }
};
