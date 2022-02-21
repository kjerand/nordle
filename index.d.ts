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
    daily?: boolean;
};

type Theme = { [name: string]: string };

type SavedGame = {
    currGrid: Letter[][];
    currKeyboard: Letter[][];
    col: number;
    row: number;
}
