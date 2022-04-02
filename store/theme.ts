import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'blue'
    },
    reducers: {
        setTheme(state, action: PayloadAction<string>) {
            state.theme = action.payload;
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
