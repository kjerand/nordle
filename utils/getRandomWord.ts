import { getSolutions } from './words';

export const getRandomWord = (language: Language = 'no') => {
    const words = getSolutions(language);
    const index = Math.floor(Math.random() * words.length);

    return words[index];
};
