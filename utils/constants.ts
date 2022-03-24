import { Dimensions } from 'react-native';

export const GREEN = '#327830';
export const YELLOW = '#b08e07';
export const DARKGRAY = '#383836';
export const LIGHTGRAY = '#5F645D';
export const BACKGROUND: Theme = {
    default: '#262625',
    black: '#171717',
    blue: '#263252',
    green: '#003b28',
    white: '#dbdbdb'
};
export const BUTTONS: Theme = {
    default: '#8e9094',
    black: '#2b2b2b',
    blue: '#3f5770',
    green: '#00704c',
    white: '#c2c2c2'
};

export const KEYBOARD = '#8e9094';
export const SEND = '#5ec4d6';
export const BACKSPACE = '#5c5c5c';
export const TEXT: Theme = {
    default: '#ededed',
    black: '#ededed',
    blue: '#ededed',
    green: '#ededed',
    white: '#171717'
};
export const FONT = 'Oswald';

export const SMALLSCREEN = Dimensions.get('window').height < 770;
export const MEDIUMCREEN =
    Dimensions.get('window').height > 770 &&
    Dimensions.get('window').height < 850;
export const LARGESCREEN =
    Dimensions.get('window').height > 850 &&
    Dimensions.get('window').height < 1000;
export const VERYLARGESCREEN = Dimensions.get('window').height > 1000;
