import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentDate } from '../utils/getCurrentDate';

let initialState: SavedGame = {
    savedGrid: [],
    savedKeyboard: [],
    date: getCurrentDate()
};

const saveSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setSavedGame(state, action: PayloadAction<SavedGame>) {
            state.savedGrid = action.payload.savedGrid;
            state.savedKeyboard = action.payload.savedKeyboard;
        }
    }
});

export const { setSavedGame } = saveSlice.actions;
export default saveSlice.reducer;