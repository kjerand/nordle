import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import settingsReducer from './settings';
import saveReducer from './save';
import statisticsReducer from './statistics';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        save: saveReducer,
        settings: settingsReducer,
        statistics: statisticsReducer
    }
});
