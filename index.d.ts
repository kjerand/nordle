type KeyboardStatus = {
    green: string[];
    yellow: string[];
    gray: string[];
};

type Letter = {
    char: string;
    status: number;
};

type Route = {
    gridLength: number;
    gridWidth: number;
    currentWord: string;
};

type Theme = { [name: string]: string };
