/**
 * Leaderboard API compatibility tests.
 *
 * The leaderboard is now backed by leaderboardService (AsyncStorage).
 * These tests verify that the service functions continue to satisfy the
 * same contracts that the old HTTP-based leaderboardApi tests expected,
 * providing a regression safety-net when refactoring.
 *
 * Full service tests live in leaderboardService.test.ts.
 */

import {
    register,
    optOut,
    optIn,
    updateScores,
    getStreakLeaderboard,
    getTotalWordsLeaderboard,
    getUserProfile
} from '../api/leaderboardService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const seedDatabase = async () => {
    const players = [
        { id: 'gc-uuid-1',  name: 'OlaNordansen', streak: 45, total: 120 },
        { id: 'gc-uuid-3',  name: 'KariSpansen',  streak: 38, total: 95  },
        { id: 'gc-uuid-5',  name: 'Peransen',      streak: 32, total: 150 },
        { id: 'gc-uuid-7',  name: 'LiseHansen',   streak: 28, total: 80  },
        { id: 'gc-uuid-9',  name: 'ErikOlsen',    streak: 15, total: 200 }
    ];
    for (const p of players) {
        await register(p.id, p.name);
        await updateScores(p.id, p.streak, p.total, 'no');
    }
};

beforeEach(async () => {
    await AsyncStorage.clear();
});

describe('Leaderboard API (service) – compatibility suite', () => {
    describe('register', () => {
        it('registers a new user', async () => {
            const profile = await register('gc-player-new', 'TestSpiller');
            expect(profile.displayName).toBe('TestSpiller');
            expect(profile.playerId).toBe('gc-player-new');
            expect(profile.optedIn).toBe(true);
            expect(profile.dailyStreak).toBe(0);
            expect(profile.totalWordsSolved).toBe(0);
        });

        it('rejects duplicate registration', async () => {
            await register('gc-dup', 'Player1');
            await expect(register('gc-dup', 'Player2')).rejects.toThrow();
        });
    });

    describe('opt-out and opt-in', () => {
        it('opts out a user', async () => {
            await register('gc-opt', 'OptTestUser');
            await optOut('gc-opt');
            const board = await getStreakLeaderboard('gc-other', 'no');
            expect(board.find((e) => e.displayName === 'OptTestUser')).toBeUndefined();
        });

        it('opts back in after opting out', async () => {
            await register('gc-opt2', 'OptTest2');
            await optOut('gc-opt2');
            await optIn('gc-opt2');
            const board = await getStreakLeaderboard('gc-other', 'no');
            expect(board.find((e) => e.displayName === 'OptTest2')).toBeDefined();
        });

        it('errors on non-existent user opt-out', async () => {
            await expect(optOut('gc-nonexistent')).rejects.toThrow();
        });
    });

    describe('updateScores', () => {
        it('updates daily streak and total words', async () => {
            await register('gc-score', 'ScoreUser');
            await updateScores('gc-score', 10, 50, 'no');
            const profile = await getUserProfile('gc-score');
            expect(profile!.dailyStreak).toBe(10);
            expect(profile!.totalWordsSolved).toBe(50);
        });

        it('overwrites previous scores', async () => {
            await register('gc-score2', 'ScoreUser2');
            await updateScores('gc-score2', 5, 20, 'no');
            await updateScores('gc-score2', 12, 35, 'no');
            const profile = await getUserProfile('gc-score2');
            expect(profile!.dailyStreak).toBe(12);
            expect(profile!.totalWordsSolved).toBe(35);
        });
    });

    describe('getStreakLeaderboard', () => {
        it('returns entries sorted by streak descending', async () => {
            await seedDatabase();
            const board = await getStreakLeaderboard('gc-uuid-1', 'no');

            expect(board).toHaveLength(5);
            expect(board[0].displayName).toBe('OlaNordansen');
            expect(board[0].score).toBe(45);

            for (let i = 1; i < board.length; i++) {
                expect(board[i].score).toBeLessThanOrEqual(board[i - 1].score);
            }
        });

        it('marks the current user correctly', async () => {
            await seedDatabase();
            const board = await getStreakLeaderboard('gc-uuid-1', 'no');
            const me = board.find((e) => e.isCurrentUser);
            expect(me).toBeDefined();
            expect(me!.displayName).toBe('OlaNordansen');
        });

        it('excludes opted-out users', async () => {
            await seedDatabase();
            await optOut('gc-uuid-1');
            const board = await getStreakLeaderboard('gc-uuid-3', 'no');
            expect(board).toHaveLength(4);
            expect(board.find((e) => e.displayName === 'OlaNordansen')).toBeUndefined();
        });
    });

    describe('getTotalWordsLeaderboard', () => {
        it('returns entries sorted by total words descending', async () => {
            await seedDatabase();
            const board = await getTotalWordsLeaderboard('gc-uuid-9', 'no');
            expect(board[0].displayName).toBe('ErikOlsen');
            expect(board[0].score).toBe(200);
        });

        it('marks the current user as #1', async () => {
            await seedDatabase();
            const board = await getTotalWordsLeaderboard('gc-uuid-9', 'no');
            const me = board.find((e) => e.isCurrentUser);
            expect(me).toBeDefined();
            expect(me!.rank).toBe(1);
        });
    });

    describe('getUserProfile', () => {
        it('returns profile for existing user', async () => {
            await register('gc-prof', 'ProfileUser');
            await updateScores('gc-prof', 7, 30, 'no');
            const profile = await getUserProfile('gc-prof');
            expect(profile!.displayName).toBe('ProfileUser');
            expect(profile!.dailyStreak).toBe(7);
            expect(profile!.totalWordsSolved).toBe(30);
        });

        it('returns null for non-existent user', async () => {
            expect(await getUserProfile('gc-fake')).toBeNull();
        });
    });

    describe('full flow integration', () => {
        it('register → update → leaderboard → opt-out → opt-in', async () => {
            await seedDatabase();

            const profile = await register('gc-new-player', 'NySpiller');
            expect(profile.optedIn).toBe(true);

            await updateScores('gc-new-player', 50, 300, 'no');

            const streakBoard = await getStreakLeaderboard('gc-new-player', 'no');
            expect(streakBoard[0].displayName).toBe('NySpiller');
            expect(streakBoard).toHaveLength(6);

            await optOut('gc-new-player');
            const afterOut = await getStreakLeaderboard('gc-new-player', 'no');
            expect(afterOut).toHaveLength(5);

            await optIn('gc-new-player');
            const afterIn = await getStreakLeaderboard('gc-new-player', 'no');
            expect(afterIn).toHaveLength(6);
        });
    });
});
