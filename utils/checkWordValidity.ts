import dict from '../assets/dict.json';
export const checkWordValidity = async (word: string) => {
    let dictionary: any = dict;

    if (dictionary[word.toLocaleLowerCase()]) {
        return true;
    }

    return false;
};
