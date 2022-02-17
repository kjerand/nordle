import solutions from '../assets/words/solutions.json';
import { getDayOfYear } from './getDayOfYear';
export const getDailyWord = () => {
    let words = solutions.words;
    const dayOfYear = getDayOfYear();
    if (dayOfYear < words.length) {
        return words[dayOfYear % words.length];
    } else {
        return words[0];
    }
};
