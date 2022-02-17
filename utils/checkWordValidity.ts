import dict from '../assets/words/dict.json';
export const checkWordValidity = (word: string) => {
    const dictionary: { [name: string]: number } = dict;

    if (dictionary[word.toLocaleLowerCase()]) {
        return true;
    }

    return false;
};
