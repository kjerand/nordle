type Letter = {
    char: string;
    status: number;
};

type Route = {
    gridLength: number;
    gridWidth: number;
    currentWord: string;
    daily?: boolean;
    initialPosition: Position;
    savedGame: SavedGame;
};

type Theme = { [name: string]: string };

type Position = {
    row: number;
    col: number;
};

type SavedGame = {
    savedGrid: Letter[][];
    savedKeyboard: Letter[][];
    date: string;
};
