import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        mode: 0
    },
    reducers: {
        setMode(state, action: PayloadAction<number>) {
            state.mode = action.payload;
        }
    }
});

export const { setMode } = settingsSlice.actions;
export default settingsSlice.reducer;
