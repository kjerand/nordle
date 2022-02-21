import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SavedGame = {
    currGrid: [],
    currKeyboard: []
}

const saveSlice = createSlice({
    name: 'save',
    initialState,
    reducers: {
        setSavedGame(state, action: PayloadAction<SavedGame>) {
            state.currGrid = action.payload.currGrid;
            state.currKeyboard = action.payload.currKeyboard;
        }
    }
});

export const { setSavedGame } = saveSlice.actions;
export default saveSlice.reducer;
