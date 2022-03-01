import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import settingsReducer from './settings';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        settings: settingsReducer
    }
});
