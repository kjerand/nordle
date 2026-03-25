import { Dimensions } from 'react-native';

// Set to true to bypass real Game Center auth during development/testing.
// The mock returns a fake player so the leaderboard UI can be tested without
// a physical device or an active Game Center account.
export const MOCK_GAME_CENTER = true;

export const GREEN = '#3aba3a';
export const YELLOW = '#d4a818';
export const DARKGRAY = '#383836';
export const LIGHTGRAY = '#5F645D';
export const BACKGROUND: Theme = {
    default: '#0d1f2d',   // deep ocean
    black: '#1a0f2e',     // midnight purple
    blue: '#0a0e2e',      // electric blue
    green: '#061a0f',     // neon jungle
    white: '#fff0f5'      // candy rose
};
export const BUTTONS: Theme = {
    default: '#1a3f58',
    black: '#3d1e66',
    blue: '#1e2b6b',
    green: '#0d4a24',
    white: '#f5c2d6'
};

export const KEYBOARD = '#8e9094';
export const SEND = '#5ec4d6';
export const BACKSPACE = '#5c5c5c';
export const TEXT: Theme = {
    default: '#e0f4ff',
    black: '#f0e8ff',
    blue: '#d0e4ff',
    green: '#d0ffe8',
    white: '#3a1020'
};
export const FONT = 'Oswald';

export const CARD: Theme = {
    default: '#0f2a3c',
    black: '#250d3e',
    blue: '#0f1440',
    green: '#082614',
    white: '#ffe4ef'
};

export const ACCENT = '#5ec4d6';
export const GOLD = '#FFD700';
export const SILVER = '#C0C0C0';
export const BRONZE = '#CD7F32';

export const SECONDARY_TEXT: Theme = {
    default: '#5fa8c8',
    black: '#9b6fd6',
    blue: '#6b8ed6',
    green: '#4daa6b',
    white: '#c06080'
};

export const SMALLSCREEN = Dimensions.get('window').height < 770;
export const MEDIUMCREEN =
    Dimensions.get('window').height > 770 &&
    Dimensions.get('window').height < 850;
export const LARGESCREEN =
    Dimensions.get('window').height > 850 &&
    Dimensions.get('window').height < 1000;
export const VERYLARGESCREEN = Dimensions.get('window').height > 1000;
