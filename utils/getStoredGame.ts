import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setSavedGame } from '../store/save';
import { getCurrentDate } from './getCurrentDate';
export const getStoredGame = (dispatch: CallableFunction) => {
    AsyncStorage.getItem('@keyboardStorage').then((keyboard) => {
        AsyncStorage.getItem('@gridStorage').then((grid) => {
            if (keyboard && grid) {
                if (keyboard !== '' && grid !== '') {
                    let savedGrid: Letter[][] = JSON.parse(grid);
                    let savedKeyboard: Letter[][] = JSON.parse(keyboard);

                    dispatch(
                        setSavedGame({
                            savedGrid: savedGrid,
                            savedKeyboard: savedKeyboard,
                            date: getCurrentDate()
                        })
                    );
                }
            }
        });
    });
};
