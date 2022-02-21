import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SavedGame = {
    currGrid: [],
    currKeyboard: [],
    col: -1,
    row: -1
};

const saveSlice = createSlice({
    name: 'save',
    initialState,
    reducers: {
        setSavedGame(state, action: PayloadAction<SavedGame>) {
            state = action.payload;
        }
    }
});

export const { setSavedGame } = saveSlice.actions;
export default saveSlice.reducer;
