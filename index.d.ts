type Language = 'no' | 'en' | 'sv' | 'da';

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

type LeaderboardEntry = {
    rank: number;
    displayName: string;
    score: number;
    isCurrentUser: boolean;
};

type LeaderboardState = {
    optedIn: boolean;
    displayName: string;
    gameCenterPlayerId: string;
    dailyStreak: number;
    totalWordsSolved: number;
};

type RootStackParamList = {
    Menu: undefined;
    Daily: Route;
    Standard: Route;
    Help: undefined;
    Settings: undefined;
    Leaderboard: undefined;
};
