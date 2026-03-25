import { getDict } from './words';

export const checkWordValidity = (word: string, language: Language = 'no') => {
    const dictionary = getDict(language);

    if (dictionary[word.toLowerCase()]) {
        return true;
    }

    return false;
};
