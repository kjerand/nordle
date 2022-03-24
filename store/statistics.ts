import { createSlice, PayloadAction } from '@reduxjs/toolkit';

let initialState: StatisticsState = {
    visible: false,
    statistics: {
        distribution: [0, 0, 0, 0, 0, 0],
        totalGames: 0,
        totalWins: 0
    }
};

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        setVisible(state, action: PayloadAction<boolean>) {
            state.visible = action.payload;
        },
        setDistribution(state, action: PayloadAction<number[]>) {
            state.statistics.distribution = action.payload;
        },
        setTotalGames(state, action: PayloadAction<number>) {
            state.statistics.totalGames = action.payload;
        },
        setTotalWins(state, action: PayloadAction<number>) {
            state.statistics.totalWins = action.payload;
        }
    }
});

export const { setVisible, setDistribution, setTotalGames, setTotalWins } =
    statisticsSlice.actions;
export default statisticsSlice.reducer;
