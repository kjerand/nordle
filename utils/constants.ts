import { Dimensions } from 'react-native';

export const GREEN = '#3d6637';
export const YELLOW = '#9b870C';
export const DARKGRAY = '#383836';
export const LIGHTGRAY = '#5F645D';
export const BACKGROUND: Theme = {
    default: '#262625',
    black: '#171717',
    blue: '#052273',
    green: '#034d1e',
    red: '#590206'
};
export const BUTTONS: Theme = {
    default: '#8e9094',
    black: '#2b2b2b',
    blue: '#263252',
    green: '#00420f',
    red: '#85040a'
};
export const KEYBOARD = '#8e9094';
export const SEND = '#5ec4d6';
export const BACKSPACE = '#5c5c5c';
export const TEXT = '#ededed';
export const FONT = 'Oswald';

export const SMALLSCREEN = Dimensions.get('window').height < 770;
export const MEDIUMCREEN =
    Dimensions.get('window').height > 770 &&
    Dimensions.get('window').height < 850;
export const LARGESCREEN =
    Dimensions.get('window').height > 850 &&
    Dimensions.get('window').height < 1000;
export const VERYLARGESCREEN = Dimensions.get('window').height > 1000;
