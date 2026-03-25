/**
 * Leaderboard Service
 *
 * All leaderboard operations as plain async functions backed by AsyncStorage.
 * This retains the same logic as the Express API routes (register, opt-out,
 * opt-in, update scores, query leaderboards) but requires no HTTP server.
 *
 * Data is stored locally per device. For cross-user leaderboards you can
 * layer a sync mechanism on top of these functions.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LeaderboardEntry {
    rank: number;
    displayName: string;
    score: number;
    isCurrentUser: boolean;
}

export interface UserProfile {
    id: string;
    playerId: string;
    displayName: string;
    optedIn: boolean;
    dailyStreak: number;
    totalWordsSolved: number;
}

// Internal DB shapes (same as routes.ts had in Postgres)
interface DbUser {
    id: string;
    game_center_id: string;
    display_name: string;
    opted_in: boolean;
}

interface DbEntry {
    id: string;
    user_id: string;
    language: string;
    daily_streak: number;
    total_words_solved: number;
}

const USERS_KEY = '@lb_users';
const ENTRIES_KEY = '@lb_entries';
const VALID_LANGUAGES: Language[] = ['no', 'en', 'sv', 'da'];

// ---- helpers ----

const generateId = (): string =>
    Math.random().toString(36).slice(2) + Date.now().toString(36);

const getUsers = async (): Promise<DbUser[]> => {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
};

const saveUsers = async (users: DbUser[]): Promise<void> => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getEntries = async (): Promise<DbEntry[]> => {
    const raw = await AsyncStorage.getItem(ENTRIES_KEY);
    return raw ? JSON.parse(raw) : [];
};

const saveEntries = async (entries: DbEntry[]): Promise<void> => {
    await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
};

const validateLanguage = (lang: string | undefined): Language =>
    lang && (VALID_LANGUAGES as string[]).includes(lang)
        ? (lang as Language)
        : 'no';

// ---- service functions ----

/**
 * Register a new user via Game Center player ID.
 * Creates one leaderboard entry per language.
 * Throws if the player is already registered.
 */
export const register = async (
    playerId: string,
    displayName: string
): Promise<UserProfile> => {
    const users = await getUsers();
    const existing = users.find((u) => u.game_center_id === playerId);
    if (existing) throw new Error('User already exists');

    const userId = generateId();
    const user: DbUser = {
        id: userId,
        game_center_id: playerId,
        display_name: displayName.trim(),
        opted_in: true
    };
    users.push(user);
    await saveUsers(users);

    const entries = await getEntries();
    for (const lang of VALID_LANGUAGES) {
        entries.push({
            id: generateId(),
            user_id: userId,
            language: lang,
            daily_streak: 0,
            total_words_solved: 0
        });
    }
    await saveEntries(entries);

    return {
        id: userId,
        playerId,
        displayName: user.display_name,
        optedIn: true,
        dailyStreak: 0,
        totalWordsSolved: 0
    };
};

/**
 * Opt a user out of the leaderboard (hides them from ranking lists).
 * Throws if the user is not found.
 */
export const optOut = async (playerId: string): Promise<void> => {
    const users = await getUsers();
    const user = users.find((u) => u.game_center_id === playerId);
    if (!user) throw new Error('User not found');
    user.opted_in = false;
    await saveUsers(users);
};

/**
 * Opt a user back into the leaderboard.
 * Throws if the user is not found.
 */
export const optIn = async (playerId: string): Promise<void> => {
    const users = await getUsers();
    const user = users.find((u) => u.game_center_id === playerId);
    if (!user) throw new Error('User not found');
    user.opted_in = true;
    await saveUsers(users);
};

/**
 * Update (upsert) a user's streak and total words for a specific language.
 * Creates the entry if it doesn't exist yet.
 * Throws if the user is not found.
 */
export const updateScores = async (
    playerId: string,
    dailyStreak: number,
    totalWordsSolved: number,
    language: Language = 'no'
): Promise<void> => {
    const lang = validateLanguage(language);
    const users = await getUsers();
    const user = users.find((u) => u.game_center_id === playerId);
    if (!user) throw new Error('User not found');

    const entries = await getEntries();
    const entry = entries.find(
        (e) => e.user_id === user.id && e.language === lang
    );

    if (entry) {
        entry.daily_streak = dailyStreak ?? 0;
        entry.total_words_solved = totalWordsSolved ?? 0;
    } else {
        entries.push({
            id: generateId(),
            user_id: user.id,
            language: lang,
            daily_streak: dailyStreak ?? 0,
            total_words_solved: totalWordsSolved ?? 0
        });
    }
    await saveEntries(entries);
};

/**
 * Return the leaderboard sorted by daily_streak DESC for the given language.
 * Only includes opted-in users.
 */
export const getStreakLeaderboard = async (
    playerId: string,
    language: Language = 'no'
): Promise<LeaderboardEntry[]> => {
    const lang = validateLanguage(language);
    const users = await getUsers();
    const entries = await getEntries();

    const optedIn = users.filter((u) => u.opted_in);
    return optedIn
        .map((u) => {
            const entry = entries.find(
                (e) => e.user_id === u.id && e.language === lang
            );
            return {
                rank: 0,
                displayName: u.display_name,
                score: entry?.daily_streak ?? 0,
                isCurrentUser: u.game_center_id === playerId
            };
        })
        .sort((a, b) => b.score - a.score)
        .map((e, i) => ({ ...e, rank: i + 1 }));
};

/**
 * Return the leaderboard sorted by total_words_solved DESC for the given language.
 * Only includes opted-in users.
 */
export const getTotalWordsLeaderboard = async (
    playerId: string,
    language: Language = 'no'
): Promise<LeaderboardEntry[]> => {
    const lang = validateLanguage(language);
    const users = await getUsers();
    const entries = await getEntries();

    const optedIn = users.filter((u) => u.opted_in);
    return optedIn
        .map((u) => {
            const entry = entries.find(
                (e) => e.user_id === u.id && e.language === lang
            );
            return {
                rank: 0,
                displayName: u.display_name,
                score: entry?.total_words_solved ?? 0,
                isCurrentUser: u.game_center_id === playerId
            };
        })
        .sort((a, b) => b.score - a.score)
        .map((e, i) => ({ ...e, rank: i + 1 }));
};

/**
 * Fetch a single user's profile (uses the 'no' language entry for streak/total).
 * Returns null if not found.
 */
export const getUserProfile = async (
    playerId: string
): Promise<UserProfile | null> => {
    const users = await getUsers();
    const user = users.find((u) => u.game_center_id === playerId);
    if (!user) return null;

    const entries = await getEntries();
    const entry = entries.find(
        (e) => e.user_id === user.id && e.language === 'no'
    );
    return {
        id: user.id,
        playerId: user.game_center_id,
        displayName: user.display_name,
        optedIn: user.opted_in,
        dailyStreak: entry?.daily_streak ?? 0,
        totalWordsSolved: entry?.total_words_solved ?? 0
    };
};

/**
 * Clear all leaderboard data (useful for testing).
 */
export const clearAllData = async (): Promise<void> => {
    await AsyncStorage.removeItem(USERS_KEY);
    await AsyncStorage.removeItem(ENTRIES_KEY);
};

export const leaderboardService = {
    register,
    optOut,
    optIn,
    updateScores,
    getStreakLeaderboard,
    getTotalWordsLeaderboard,
    getUserProfile,
    clearAllData
};
