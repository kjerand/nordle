import noSolutions from '../assets/words/no/solutions.json';
import enSolutions from '../assets/words/en/solutions.json';
import svSolutions from '../assets/words/sv/solutions.json';
import daSolutions from '../assets/words/da/solutions.json';

import noDict from '../assets/words/no/dict.json';
import enDict from '../assets/words/en/dict.json';
import svDict from '../assets/words/sv/dict.json';
import daDict from '../assets/words/da/dict.json';

const solutionsByLanguage: { [key in Language]: { words: string[] } } = {
    no: noSolutions,
    en: enSolutions,
    sv: svSolutions,
    da: daSolutions
};

const dictByLanguage: { [key in Language]: { [word: string]: number } } = {
    no: noDict,
    en: enDict,
    sv: svDict,
    da: daDict
};

export const getSolutions = (language: Language): string[] => {
    return solutionsByLanguage[language].words;
};

export const getDict = (language: Language): { [word: string]: number } => {
    return dictByLanguage[language];
};
