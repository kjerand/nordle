import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        hardMode: false
    },
    reducers: {
        setHardMode(state, action: PayloadAction<boolean>) {
            state.hardMode = action.payload;
        }
    }
});

export const { setHardMode } = settingsSlice.actions;
export default settingsSlice.reducer;
