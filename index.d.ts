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
    initialDate: string;
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
    finished: number;
};

type Statistics = {
    distribution: number[];
    totalGames: number;
    totalWins: number;
};

type StatisticsState = {
    visible: boolean;
    statistics: Statistics;
};
