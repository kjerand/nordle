import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const languageSlice = createSlice({
    name: 'language',
    initialState: {
        language: 'no' as Language
    },
    reducers: {
        setLanguage(state, action: PayloadAction<Language>) {
            state.language = action.payload;
        }
    }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
