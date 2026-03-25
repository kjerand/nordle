import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: LeaderboardState = {
    optedIn: false,
    displayName: '',
    gameCenterPlayerId: '',
    dailyStreak: 0,
    totalWordsSolved: 0
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setOptedIn(state, action: PayloadAction<boolean>) {
            state.optedIn = action.payload;
        },
        setDisplayName(state, action: PayloadAction<string>) {
            state.displayName = action.payload;
        },
        setGameCenterPlayerId(state, action: PayloadAction<string>) {
            state.gameCenterPlayerId = action.payload;
        },
        setDailyStreak(state, action: PayloadAction<number>) {
            state.dailyStreak = action.payload;
        },
        setTotalWordsSolved(state, action: PayloadAction<number>) {
            state.totalWordsSolved = action.payload;
        },
        setLeaderboardProfile(
            state,
            action: PayloadAction<LeaderboardState>
        ) {
            return action.payload;
        }
    }
});

export const {
    setOptedIn,
    setDisplayName,
    setGameCenterPlayerId,
    setDailyStreak,
    setTotalWordsSolved,
    setLeaderboardProfile
} = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
