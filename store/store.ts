import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import settingsReducer from './settings';
import saveReducer from './save';
import statisticsReducer from './statistics';
import leaderboardReducer from './leaderboard';
import languageReducer from './language';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        save: saveReducer,
        settings: settingsReducer,
        statistics: statisticsReducer,
        leaderboard: leaderboardReducer,
        language: languageReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
