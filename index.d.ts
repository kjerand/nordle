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
    gameIndex: number;
};

type Position = {
    row: number;
    col: number;
};

type Theme = { [name: string]: string };

type SavedGame = {
    savedGrid: Letter[][];
    savedKeyboard: Letter[][];
    date: number;
};
