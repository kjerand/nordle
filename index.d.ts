declare module '*.png';

type KeyboardStatus = {
    green: string[];
    yellow: string[];
    gray: string[];
};

type Letter = {
    char: string;
    status: number;
};
