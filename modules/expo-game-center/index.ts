import { requireOptionalNativeModule, Platform } from 'expo-modules-core';
import { MOCK_GAME_CENTER } from '../../utils/constants';

export interface GameCenterPlayer {
    playerID: string;
    displayName: string;
    alias: string;
}

const MOCK_PLAYER: GameCenterPlayer = {
    playerID: 'gc_1001',
    displayName: 'Testspiller',
    alias: 'Testspiller'
};

const ExpoGameCenter =
    Platform.OS === 'ios' ? requireOptionalNativeModule('ExpoGameCenter') : null;

export async function authenticate(): Promise<GameCenterPlayer> {
    if (MOCK_GAME_CENTER) return MOCK_PLAYER;
    if (!ExpoGameCenter) {
        throw new Error('Game Center is only available on iOS');
    }
    return ExpoGameCenter.authenticate();
}

export function isAuthenticated(): boolean {
    if (MOCK_GAME_CENTER) return true;
    if (!ExpoGameCenter) return false;
    return ExpoGameCenter.isAuthenticated();
}

export async function getPlayer(): Promise<GameCenterPlayer> {
    if (MOCK_GAME_CENTER) return MOCK_PLAYER;
    if (!ExpoGameCenter) {
        throw new Error('Game Center is only available on iOS');
    }
    return ExpoGameCenter.getPlayer();
}

export const isGameCenterAvailable = MOCK_GAME_CENTER || Platform.OS === 'ios';
