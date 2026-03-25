/**
 * Leaderboard Service tests.
 *
 * Tests all service functions directly — no HTTP layer involved.
 * AsyncStorage is mocked via jest-expo's built-in mock so the service
 * operates entirely in memory during the test run.
 */

import {
    register,
    optOut,
    optIn,
    updateScores,
    getStreakLeaderboard,
    getTotalWordsLeaderboard,
    getUserProfile,
    clearAllData,
    leaderboardService,
    LeaderboardEntry,
    UserProfile
} from '../api/leaderboardService';

// AsyncStorage is auto-mocked by jest-expo
import AsyncStorage from '@react-native-async-storage/async-storage';

beforeEach(async () => {
    // Clear the mock storage between tests
    await AsyncStorage.clear();
    jest.clearAllMocks();
});

// ---- Seed helpers ----
const seedPlayers = async () => {
    const players = [
        { id: 'gc-1', name: 'OlaNord', noStreak: 45, noTotal: 120 },
        { id: 'gc-2', name: 'KariSp',  noStreak: 38, noTotal: 95  },
        { id: 'gc-3', name: 'PerAn',   noStreak: 32, noTotal: 150 },
        { id: 'gc-4', name: 'LiseH',   noStreak: 28, noTotal: 80  },
        { id: 'gc-5', name: 'ErikO',   noStreak: 15, noTotal: 200 }
    ];

    for (const p of players) {
        await register(p.id, p.name);
        await updateScores(p.id, p.noStreak, p.noTotal, 'no');
    }
    return players;
};

// ---- register ----

describe('register', () => {
    it('creates a new user and returns a profile', async () => {
        const profile = await register('gc-new', 'TestUser');

        expect(profile.playerId).toBe('gc-new');
        expect(profile.displayName).toBe('TestUser');
        expect(profile.optedIn).toBe(true);
        expect(profile.dailyStreak).toBe(0);
        expect(profile.totalWordsSolved).toBe(0);
    });

    it('trims whitespace from displayName', async () => {
        const profile = await register('gc-trim', '  SpaceName  ');
        expect(profile.displayName).toBe('SpaceName');
    });

    it('throws when the same playerId is registered twice', async () => {
        await register('gc-dup', 'Player1');
        await expect(register('gc-dup', 'Player2')).rejects.toThrow(
            'User already exists'
        );
    });

    it('profile returned from getUserProfile matches registered data', async () => {
        await register('gc-verify', 'VerifyUser');
        const profile = await getUserProfile('gc-verify');

        expect(profile).not.toBeNull();
        expect(profile!.playerId).toBe('gc-verify');
        expect(profile!.displayName).toBe('VerifyUser');
    });
});

// ---- opt-out / opt-in ----

describe('optOut / optIn', () => {
    it('optOut hides the user from the leaderboard', async () => {
        await register('gc-out', 'OutUser');
        await optOut('gc-out');

        const board = await getStreakLeaderboard('gc-other', 'no');
        expect(board.find((e) => e.displayName === 'OutUser')).toBeUndefined();
    });

    it('optIn makes the user visible again', async () => {
        await register('gc-in', 'InUser');
        await optOut('gc-in');
        await optIn('gc-in');

        const board = await getStreakLeaderboard('gc-other', 'no');
        expect(board.find((e) => e.displayName === 'InUser')).toBeDefined();
    });

    it('optOut throws for unknown playerId', async () => {
        await expect(optOut('gc-ghost')).rejects.toThrow('User not found');
    });

    it('optIn throws for unknown playerId', async () => {
        await expect(optIn('gc-ghost')).rejects.toThrow('User not found');
    });
});

// ---- updateScores ----

describe('updateScores', () => {
    it('sets streak and total for a user', async () => {
        await register('gc-s', 'ScoreUser');
        await updateScores('gc-s', 10, 50, 'no');

        const profile = await getUserProfile('gc-s');
        expect(profile!.dailyStreak).toBe(10);
        expect(profile!.totalWordsSolved).toBe(50);
    });

    it('overwrites previous scores', async () => {
        await register('gc-ow', 'OverUser');
        await updateScores('gc-ow', 5, 20, 'no');
        await updateScores('gc-ow', 12, 35, 'no');

        const profile = await getUserProfile('gc-ow');
        expect(profile!.dailyStreak).toBe(12);
        expect(profile!.totalWordsSolved).toBe(35);
    });

    it('stores scores independently per language', async () => {
        await register('gc-ml', 'MultiLang');
        await updateScores('gc-ml', 50, 200, 'no');
        await updateScores('gc-ml', 10, 30, 'en');
        await updateScores('gc-ml', 25, 100, 'sv');
        await updateScores('gc-ml', 15, 60, 'da');

        const noBoard = await getStreakLeaderboard('gc-ml', 'no');
        const enBoard = await getStreakLeaderboard('gc-ml', 'en');
        const svBoard = await getStreakLeaderboard('gc-ml', 'sv');
        const daBoard = await getStreakLeaderboard('gc-ml', 'da');

        expect(noBoard[0].score).toBe(50);
        expect(enBoard[0].score).toBe(10);
        expect(svBoard[0].score).toBe(25);
        expect(daBoard[0].score).toBe(15);
    });

    it('defaults to "no" language if none provided', async () => {
        await register('gc-def', 'DefaultLang');
        await updateScores('gc-def', 7, 14);

        const board = await getStreakLeaderboard('gc-def', 'no');
        expect(board[0].score).toBe(7);
    });

    it('throws for unknown playerId', async () => {
        await expect(updateScores('gc-none', 5, 10)).rejects.toThrow(
            'User not found'
        );
    });
});

// ---- getStreakLeaderboard ----

describe('getStreakLeaderboard', () => {
    it('returns entries sorted by streak descending', async () => {
        await seedPlayers();
        const board = await getStreakLeaderboard('gc-1', 'no');

        expect(board.length).toBe(5);
        expect(board[0].score).toBe(45);
        expect(board[0].displayName).toBe('OlaNord');

        for (let i = 1; i < board.length; i++) {
            expect(board[i].score).toBeLessThanOrEqual(board[i - 1].score);
        }
    });

    it('assigns sequential ranks starting at 1', async () => {
        await seedPlayers();
        const board = await getStreakLeaderboard('gc-1', 'no');
        board.forEach((e, i) => expect(e.rank).toBe(i + 1));
    });

    it('marks isCurrentUser correctly', async () => {
        await seedPlayers();
        const board = await getStreakLeaderboard('gc-3', 'no');
        const me = board.find((e) => e.isCurrentUser);

        expect(me).toBeDefined();
        expect(me!.displayName).toBe('PerAn');
    });

    it('excludes opted-out users', async () => {
        await seedPlayers();
        await optOut('gc-1');

        const board = await getStreakLeaderboard('gc-2', 'no');
        expect(board.length).toBe(4);
        expect(board.find((e) => e.displayName === 'OlaNord')).toBeUndefined();
    });

    it('returns separate rankings per language', async () => {
        await seedPlayers();
        await updateScores('gc-1', 100, 500, 'en');

        const noBoard = await getStreakLeaderboard('gc-1', 'no');
        const enBoard = await getStreakLeaderboard('gc-1', 'en');

        expect(noBoard[0].score).toBe(45);   // no language unchanged
        expect(enBoard[0].score).toBe(100);  // en has updated score
        expect(enBoard[1].score).toBe(0);    // other players have 0 in 'en'
    });

    it('treats invalid language as "no"', async () => {
        await seedPlayers();
        const board1 = await getStreakLeaderboard('gc-1', 'no');
        const board2 = await getStreakLeaderboard('gc-1', 'xx' as any);
        expect(board1[0].score).toBe(board2[0].score);
    });
});

// ---- getTotalWordsLeaderboard ----

describe('getTotalWordsLeaderboard', () => {
    it('returns entries sorted by total words descending', async () => {
        await seedPlayers();
        const board = await getTotalWordsLeaderboard('gc-5', 'no');

        expect(board.length).toBe(5);
        expect(board[0].score).toBe(200);
        expect(board[0].displayName).toBe('ErikO');

        for (let i = 1; i < board.length; i++) {
            expect(board[i].score).toBeLessThanOrEqual(board[i - 1].score);
        }
    });

    it('marks isCurrentUser on the total words board', async () => {
        await seedPlayers();
        const board = await getTotalWordsLeaderboard('gc-5', 'no');
        const me = board.find((e) => e.isCurrentUser);

        expect(me).toBeDefined();
        expect(me!.displayName).toBe('ErikO');
        expect(me!.rank).toBe(1);
    });
});

// ---- getUserProfile ----

describe('getUserProfile', () => {
    it('returns full profile for existing user', async () => {
        await register('gc-prof', 'ProUser');
        await updateScores('gc-prof', 7, 30, 'no');

        const profile = await getUserProfile('gc-prof');
        expect(profile).not.toBeNull();
        expect(profile!.displayName).toBe('ProUser');
        expect(profile!.dailyStreak).toBe(7);
        expect(profile!.totalWordsSolved).toBe(30);
    });

    it('returns null for unknown playerId', async () => {
        const profile = await getUserProfile('gc-nobody');
        expect(profile).toBeNull();
    });

    it('reflects optedIn status correctly', async () => {
        await register('gc-oi', 'OptUser');
        await optOut('gc-oi');

        const profile = await getUserProfile('gc-oi');
        expect(profile!.optedIn).toBe(false);

        await optIn('gc-oi');
        const profile2 = await getUserProfile('gc-oi');
        expect(profile2!.optedIn).toBe(true);
    });
});

// ---- per-language isolation ----

describe('per-language leaderboard isolation', () => {
    it('different language leaderboards do not interfere', async () => {
        await register('gc-iso1', 'IsoA');
        await register('gc-iso2', 'IsoB');

        await updateScores('gc-iso1', 99, 400, 'en');
        await updateScores('gc-iso2', 80, 300, 'sv');

        const enBoard = await getStreakLeaderboard('gc-iso1', 'en');
        const svBoard = await getStreakLeaderboard('gc-iso2', 'sv');

        expect(enBoard[0].displayName).toBe('IsoA');
        expect(svBoard[0].displayName).toBe('IsoB');
    });

    it('opting out removes user from ALL language leaderboards', async () => {
        await register('gc-opt-all', 'OptAll');
        await updateScores('gc-opt-all', 10, 20, 'no');
        await updateScores('gc-opt-all', 15, 25, 'en');
        await optOut('gc-opt-all');

        for (const lang of ['no', 'en', 'sv', 'da'] as const) {
            const board = await getStreakLeaderboard('gc-other', lang);
            expect(board.find((e) => e.displayName === 'OptAll')).toBeUndefined();
        }
    });
});

// ---- clearAllData ----

describe('clearAllData', () => {
    it('removes all users and entries', async () => {
        await register('gc-clr', 'ClearUser');
        await clearAllData();

        const profile = await getUserProfile('gc-clr');
        expect(profile).toBeNull();
    });
});

// ---- full integration flow ----

describe('full integration flow', () => {
    it('register → update scores → leaderboard → opt-out → opt-in', async () => {
        await seedPlayers();

        // Register a new user
        const profile = await register('gc-new', 'NewUser');
        expect(profile.optedIn).toBe(true);

        // Update scores
        await updateScores('gc-new', 50, 300, 'no');

        // Check leaderboard: new user should be #1
        const streakBoard = await getStreakLeaderboard('gc-new', 'no');
        expect(streakBoard[0].displayName).toBe('NewUser');
        expect(streakBoard[0].score).toBe(50);
        expect(streakBoard[0].isCurrentUser).toBe(true);
        expect(streakBoard).toHaveLength(6);

        const totalBoard = await getTotalWordsLeaderboard('gc-new', 'no');
        expect(totalBoard[0].displayName).toBe('NewUser');
        expect(totalBoard[0].score).toBe(300);

        // Opt out
        await optOut('gc-new');
        const afterOptOut = await getStreakLeaderboard('gc-new', 'no');
        expect(afterOptOut).toHaveLength(5);
        expect(afterOptOut.find((e) => e.displayName === 'NewUser')).toBeUndefined();

        // Opt back in
        await optIn('gc-new');
        const afterOptIn = await getStreakLeaderboard('gc-new', 'no');
        expect(afterOptIn).toHaveLength(6);
        expect(afterOptIn.find((e) => e.displayName === 'NewUser')).toBeDefined();
    });
});

// ---- leaderboardService object ----

describe('leaderboardService object', () => {
    it('exposes all expected functions', () => {
        expect(typeof leaderboardService.register).toBe('function');
        expect(typeof leaderboardService.optOut).toBe('function');
        expect(typeof leaderboardService.optIn).toBe('function');
        expect(typeof leaderboardService.updateScores).toBe('function');
        expect(typeof leaderboardService.getStreakLeaderboard).toBe('function');
        expect(typeof leaderboardService.getTotalWordsLeaderboard).toBe('function');
        expect(typeof leaderboardService.getUserProfile).toBe('function');
        expect(typeof leaderboardService.clearAllData).toBe('function');
    });
});
