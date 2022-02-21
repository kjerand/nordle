import dict from '../assets/words/dict.json';
export const checkWordValidity = (word: string) => {
    const dictionary: { [name: string]: number } = dict;

    if (dictionary[word.toLowerCase()]) {
        return true;
    }

    return false;
};
