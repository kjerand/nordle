import solutions from '../assets/words/solutions.json';
import { getDayOfYear } from './getDayOfYear';
export const getDailyWord = () => {
    let words = solutions.words;
    const dayOfYear = getDayOfYear();

    return words[dayOfYear % words.length];
};
