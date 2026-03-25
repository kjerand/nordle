import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from './db';

export const VALID_LANGUAGES = ['no', 'en', 'sv', 'da'];

export const validateLanguage = (lang: string | undefined): string => {
    if (lang && VALID_LANGUAGES.includes(lang)) return lang;
    return 'no';
};

export type UserProfile = {
    id: number;
    playerId: string;
    displayName: string;
    optedIn: boolean;
    dailyStreak: number;
    totalWordsSolved: number;
};

export type LeaderboardEntry = {
    rank: number;
    displayName: string;
    score: number;
    isCurrentUser: boolean;
};

export async function registerUser(playerId: string, displayName: string): Promise<UserProfile | { conflict: true }> {
    const [existing] = await pool.query<RowDataPacket[]>(
        'SELECT id FROM users WHERE game_center_id = ?',
        [playerId]
    );
    if (existing.length > 0) return { conflict: true };

    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO users (game_center_id, display_name) VALUES (?, ?)',
        [playerId, displayName.trim()]
    );
    const userId = result.insertId;

    for (const lang of VALID_LANGUAGES) {
        await pool.query(
            'INSERT INTO leaderboard_entries (user_id, language) VALUES (?, ?)',
            [userId, lang]
        );
    }

    return {
        id: userId,
        playerId,
        displayName: displayName.trim(),
        optedIn: true,
        dailyStreak: 0,
        totalWordsSolved: 0
    };
}

export async function setOptedIn(playerId: string, optedIn: boolean): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
        'UPDATE users SET opted_in = ?, updated_at = NOW() WHERE game_center_id = ?',
        [optedIn, playerId]
    );
    return result.affectedRows > 0;
}

export async function upsertScore(
    playerId: string,
    language: string,
    dailyStreak: number,
    totalWordsSolved: number
): Promise<boolean> {
    const [userRows] = await pool.query<RowDataPacket[]>(
        'SELECT id FROM users WHERE game_center_id = ?',
        [playerId]
    );
    if (userRows.length === 0) return false;

    const userId = userRows[0].id;

    await pool.query(
        `INSERT INTO leaderboard_entries (user_id, language, daily_streak, total_words_solved, last_updated)
         VALUES (?, ?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE
           daily_streak = VALUES(daily_streak),
           total_words_solved = VALUES(total_words_solved),
           last_updated = NOW()`,
        [userId, language, dailyStreak, totalWordsSolved]
    );

    return true;
}

export async function getStreakLeaderboard(playerId: string, language: string): Promise<LeaderboardEntry[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT u.game_center_id, u.display_name, le.daily_streak
         FROM users u
         JOIN leaderboard_entries le ON le.user_id = u.id
         WHERE u.opted_in = TRUE AND le.language = ?
         ORDER BY le.daily_streak DESC`,
        [language]
    );

    return rows.map((row, i) => ({
        rank: i + 1,
        displayName: row.display_name,
        score: row.daily_streak,
        isCurrentUser: row.game_center_id === playerId
    }));
}

export async function getTotalLeaderboard(playerId: string, language: string): Promise<LeaderboardEntry[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT u.game_center_id, u.display_name, le.total_words_solved
         FROM users u
         JOIN leaderboard_entries le ON le.user_id = u.id
         WHERE u.opted_in = TRUE AND le.language = ?
         ORDER BY le.total_words_solved DESC`,
        [language]
    );

    return rows.map((row, i) => ({
        rank: i + 1,
        displayName: row.display_name,
        score: row.total_words_solved,
        isCurrentUser: row.game_center_id === playerId
    }));
}

export async function getUserProfile(playerId: string): Promise<UserProfile | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT u.id, u.game_center_id, u.display_name, u.opted_in,
                le.daily_streak, le.total_words_solved
         FROM users u
         JOIN leaderboard_entries le ON le.user_id = u.id
         WHERE u.game_center_id = ? AND le.language = 'no'`,
        [playerId]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
        id: row.id,
        playerId: row.game_center_id,
        displayName: row.display_name,
        optedIn: !!row.opted_in,
        dailyStreak: row.daily_streak,
        totalWordsSolved: row.total_words_solved
    };
}
