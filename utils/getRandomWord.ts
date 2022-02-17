import solutions from '../assets/words/solutions.json';
export const getRandomWord = () => {
    const words = solutions.words;
    const index = Math.floor(Math.random() * words.length);

    return words[index];
};
