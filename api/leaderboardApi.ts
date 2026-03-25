import Constants from 'expo-constants';
import { Platform } from 'react-native';

const DEV_API_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:8080/api'
    : 'http://localhost:8080/api';

const API_BASE_URL = __DEV__
    ? DEV_API_URL
    : (Constants.expoConfig?.extra?.apiBaseUrl ||
       'https://nordle-api-HASH-ew.a.run.app/api');

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

const request = async <T>(
    path: string,
    options?: RequestInit
): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request failed: ${response.status}`);
    }

    return response.json();
};

export const leaderboardApi = {
    async register(
        playerId: string,
        displayName: string
    ): Promise<UserProfile> {
        return request<UserProfile>('/register', {
            method: 'POST',
            body: JSON.stringify({ playerId, displayName })
        });
    },

    async optOut(playerId: string): Promise<void> {
        await request<void>('/opt-out', {
            method: 'POST',
            body: JSON.stringify({ playerId })
        });
    },

    async optIn(playerId: string): Promise<void> {
        await request<void>('/opt-in', {
            method: 'POST',
            body: JSON.stringify({ playerId })
        });
    },

    async updateScores(
        playerId: string,
        dailyStreak: number,
        totalWordsSolved: number,
        language: Language = 'no'
    ): Promise<void> {
        await request<void>('/scores', {
            method: 'POST',
            body: JSON.stringify({
                playerId,
                dailyStreak,
                totalWordsSolved,
                language
            })
        });
    },

    async getStreakLeaderboard(
        playerId: string,
        language: Language = 'no'
    ): Promise<LeaderboardEntry[]> {
        return request<LeaderboardEntry[]>(
            `/leaderboard/streak?playerId=${encodeURIComponent(playerId)}&language=${language}`
        );
    },

    async getTotalWordsLeaderboard(
        playerId: string,
        language: Language = 'no'
    ): Promise<LeaderboardEntry[]> {
        return request<LeaderboardEntry[]>(
            `/leaderboard/total?playerId=${encodeURIComponent(playerId)}&language=${language}`
        );
    },

    async getUserProfile(playerId: string): Promise<UserProfile | null> {
        try {
            return await request<UserProfile>(
                `/profile?playerId=${encodeURIComponent(playerId)}`
            );
        } catch {
            return null;
        }
    }
};
