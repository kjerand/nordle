import dict from '../assets/words/dict.json';
export const checkWordValidity = async (word: string) => {
    let dictionary: { [name: string]: number } = dict;

    if (dictionary[word.toLocaleLowerCase()]) {
        return true;
    }

    return false;
};
