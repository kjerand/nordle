import { Dimensions } from 'react-native';

export const GREEN = '#3d6637';
export const YELLOW = '#9b870C';
export const DARKGRAY = '#383836';
export const LIGHTGRAY = '#5F645D';
export const BACKGROUND: Theme = {
    default: '#262625',
    white: '#a8a8a8',
    blue: '#687bfc',
    green: '#2fc470'
};
export const BUTTONS: Theme = {
    default: '#8e9094',
    white: '#2b2b2b',
    blue: '#14296b',
    green: '#0f8013'
};
export const KEYBOARD = '#8e9094';
export const SEND = '#5ec4d6';
export const BACKSPACE = '#5c5c5c';
export const TEXT = '#ededed';
export const FONT = 'Oswald';

export const SMALLSCREEN = Dimensions.get('window').height < 770;
export const MEDIUMCREEN =
    Dimensions.get('window').height > 770 &&
    Dimensions.get('window').height < 830;
export const LARGESCREEN =
    Dimensions.get('window').height > 850 &&
    Dimensions.get('window').height < 1000;
export const VERYLARGESCREEN = Dimensions.get('window').height > 1000;
