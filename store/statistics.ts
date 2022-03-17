import { createSlice, PayloadAction } from '@reduxjs/toolkit';

let initialState: Statistics = {
    visible: false,
    distribution: [0, 0, 0, 0, 0, 0],
    totalGames: 0,
    totalWins: 0,
    longestStreak: 0
};

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        setVisible(state, action: PayloadAction<boolean>) {
            state.visible = action.payload;
        },
        setDistribution(state, action: PayloadAction<number[]>) {
            state.distribution = action.payload;
        },
        setTotalGames(state, action: PayloadAction<number>) {
            state.totalGames = action.payload;
        },
        setTotalWins(state, action: PayloadAction<number>) {
            state.totalWins = action.payload;
        },
        setLongestStreak(state, action: PayloadAction<number>) {
            state.totalWins = action.payload;
        }
    }
});

export const {
    setVisible,
    setDistribution,
    setTotalGames,
    setTotalWins,
    setLongestStreak
} = statisticsSlice.actions;
export default statisticsSlice.reducer;
