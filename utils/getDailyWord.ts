import solutions from '../assets/solutions.json';
import { getDayOfYear } from './getDayOfYear';
export const getDailyWord = () => {
    let words: any = solutions.words;
    const dayOfYear = getDayOfYear();

    return words[0];
};
