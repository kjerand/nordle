import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { RootState } from '../store/store';
import {
    setOptedIn,
    setDisplayName,
    setLeaderboardProfile
} from '../store/leaderboard';
import {
    authenticate,
    isGameCenterAvailable
} from '../modules/expo-game-center';
import {
    leaderboardApi,
    LeaderboardEntry
} from '../api/leaderboardApi';
import {
    BACKGROUND,
    CARD,
    TEXT,
    SECONDARY_TEXT,
    FONT,
    ACCENT,
    GOLD,
    SILVER,
    BRONZE,
    SMALLSCREEN
} from '../utils/constants';
import { t } from '../utils/i18n';

type Tab = 'streak' | 'total';

const LeaderboardPage = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.theme);
    const leaderboard = useSelector(
        (state: RootState) => state.leaderboard
    );
    const statistics = useSelector(
        (state: RootState) => state.statistics
    );
    const { language } = useSelector((state: RootState) => state.language);

    const [activeTab, setActiveTab] = useState<Tab>('streak');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);
    const [error, setError] = useState('');

    const fetchLeaderboard = useCallback(async () => {
        //if (!leaderboard.optedIn || !leaderboard.gameCenterPlayerId) return;

        setLoading(true);
        setError('');
        try {
            const playerId = leaderboard.gameCenterPlayerId;

            // Sync local scores before fetching (per-language)
            if (playerId) {
                const streakData = await AsyncStorage.getItem(
                    `@streak_${language}`
                );
                let streak = 0;
                if (streakData) {
                    streak = parseInt(streakData.split(':')[0]) || 0;
                }
                const totalWins = statistics.statistics.totalWins;

                await leaderboardApi.updateScores(
                    playerId,
                    streak,
                    totalWins,
                    language
                );
            }

            const data =
                activeTab === 'streak'
                    ? await leaderboardApi.getStreakLeaderboard(
                          playerId,
                          language
                      )
                    : await leaderboardApi.getTotalWordsLeaderboard(
                          playerId,
                          language
                      );

            setEntries(data);

            const currentUser = data.find((e) => e.isCurrentUser);
            setUserRank(currentUser || null);
        } catch {
            setError(t('couldNotLoadLeaderboard', language));
        } finally {
            setLoading(false);
        }
    }, [
        activeTab,
        leaderboard.optedIn,
        leaderboard.gameCenterPlayerId,
        statistics.statistics.totalWins,
        language
    ]);

    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    const handleGameCenterLogin = async () => {
        setSubmitting(true);
        setError('');
        try {
            const player = await authenticate();

            const profile = await leaderboardApi.register(
                player.playerID,
                player.displayName
            );

            const streakData = await AsyncStorage.getItem(
                `@streak_${language}`
            );
            let streak = 0;
            if (streakData) {
                streak = parseInt(streakData.split(':')[0]) || 0;
            }

            const state: LeaderboardState = {
                optedIn: true,
                displayName: profile.displayName,
                gameCenterPlayerId: profile.playerId,
                dailyStreak: streak,
                totalWordsSolved: statistics.statistics.totalWins
            };

            dispatch(setLeaderboardProfile(state));
            await AsyncStorage.setItem('@leaderboard', JSON.stringify(state));

            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch {
            setError(t('couldNotLogin', language));
        } finally {
            setSubmitting(false);
        }
    };

    const handleOptOut = async () => {
        try {
            await leaderboardApi.optOut(leaderboard.gameCenterPlayerId);

            dispatch(setOptedIn(false));
            dispatch(setDisplayName(''));
            await AsyncStorage.removeItem('@leaderboard');

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } catch {
            setError(t('couldNotLeave', language));
        }
    };

    const getRankColor = (rank: number): string | undefined => {
        if (rank === 1) return GOLD;
        if (rank === 2) return SILVER;
        if (rank === 3) return BRONZE;
        return undefined;
    };

    // --- Platform Not Supported ---
    if (!isGameCenterAvailable) {
        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: BACKGROUND[theme] }
                ]}
            >
                <View style={styles.optInContainer}>
                    <View
                        style={[
                            styles.iconCircle,
                            { backgroundColor: CARD[theme] }
                        ]}
                    >
                        <Feather name="alert-circle" size={48} color={ACCENT} />
                    </View>
                    <Text
                        style={[styles.optInTitle, { color: TEXT[theme] }]}
                    >
                        {t('notAvailable', language)}
                    </Text>
                    <Text
                        style={[
                            styles.optInDescription,
                            { color: SECONDARY_TEXT[theme] }
                        ]}
                    >
                        {t('leaderboardRequiresGameCenter', language)}
                    </Text>
                </View>
            </View>
        );
    }

    // --- Opt-In Screen (Game Center) ---
    if (false) {
        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: BACKGROUND[theme] }
                ]}
            >
                <View style={styles.optInContainer}>
                    <View
                        style={[
                            styles.iconCircle,
                            { backgroundColor: CARD[theme] }
                        ]}
                    >
                        <Feather name="award" size={48} color={ACCENT} />
                    </View>

                    <Text
                        style={[styles.optInTitle, { color: TEXT[theme] }]}
                    >
                        {t('joinLeaderboard', language)}
                    </Text>

                    <Text
                        style={[
                            styles.optInDescription,
                            { color: SECONDARY_TEXT[theme] }
                        ]}
                    >
                        {t('loginGameCenterDesc', language)}
                    </Text>

                    {error !== '' && (
                        <Text style={styles.errorInlineText}>{error}</Text>
                    )}

                    <Pressable
                        style={[
                            styles.gameCenterButton,
                            { opacity: submitting ? 0.6 : 1 }
                        ]}
                        onPress={handleGameCenterLogin}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Feather
                                    name="user-check"
                                    size={20}
                                    color="#fff"
                                />
                                <Text style={styles.gameCenterButtonText}>
                                    {t('loginGameCenter', language)}
                                </Text>
                            </>
                        )}
                    </Pressable>
                </View>
            </View>
        );
    }

    // --- Leaderboard Screen ---
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: BACKGROUND[theme] }
            ]}
        >
            {/* Tab Bar */}
            <View style={[styles.tabBar, { backgroundColor: CARD[theme] }]}>
                <Pressable
                    style={[
                        styles.tab,
                        activeTab === 'streak' && styles.activeTab
                    ]}
                    onPress={() => {
                        setActiveTab('streak');
                        Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light
                        );
                    }}
                >
                    <Feather
                        name="zap"
                        size={18}
                        color={
                            activeTab === 'streak'
                                ? ACCENT
                                : SECONDARY_TEXT[theme]
                        }
                    />
                    <Text
                        style={[
                            styles.tabText,
                            {
                                color:
                                    activeTab === 'streak'
                                        ? TEXT[theme]
                                        : SECONDARY_TEXT[theme]
                            }
                        ]}
                    >
                        {t('longestStreak', language)}
                    </Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.tab,
                        activeTab === 'total' && styles.activeTab
                    ]}
                    onPress={() => {
                        setActiveTab('total');
                        Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light
                        );
                    }}
                >
                    <Feather
                        name="hash"
                        size={18}
                        color={
                            activeTab === 'total'
                                ? ACCENT
                                : SECONDARY_TEXT[theme]
                        }
                    />
                    <Text
                        style={[
                            styles.tabText,
                            {
                                color:
                                    activeTab === 'total'
                                        ? TEXT[theme]
                                        : SECONDARY_TEXT[theme]
                            }
                        ]}
                    >
                        {t('mostWords', language)}
                    </Text>
                </Pressable>
            </View>

            {/* Loading */}
            {loading && (
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color={ACCENT} />
                </View>
            )}

            {/* Error */}
            {error !== '' && !loading && (
                <View style={styles.centerContent}>
                    <Feather
                        name="alert-circle"
                        size={32}
                        color={SECONDARY_TEXT[theme]}
                    />
                    <Text
                        style={[
                            styles.errorText,
                            { color: SECONDARY_TEXT[theme] }
                        ]}
                    >
                        {error}
                    </Text>
                    <Pressable
                        style={styles.retryButton}
                        onPress={fetchLeaderboard}
                    >
                        <Text style={styles.retryButtonText}>
                            {t('tryAgain', language)}
                        </Text>
                    </Pressable>
                </View>
            )}

            {/* Leaderboard List */}
            {!loading && error === '' && (
                <ScrollView
                    style={styles.listContainer}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                >
                    {entries.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text
                                style={[
                                    styles.emptyText,
                                    { color: SECONDARY_TEXT[theme] }
                                ]}
                            >
                                {t('noPlayersYet', language)}
                            </Text>
                        </View>
                    ) : (
                        entries.map((entry) => (
                            <View
                                key={`${entry.rank}-${entry.displayName}`}
                                style={[
                                    styles.entryRow,
                                    {
                                        backgroundColor: entry.isCurrentUser
                                            ? ACCENT + '20'
                                            : CARD[theme],
                                        borderColor: entry.isCurrentUser
                                            ? ACCENT
                                            : 'transparent',
                                        borderWidth: entry.isCurrentUser
                                            ? 1.5
                                            : 0
                                    }
                                ]}
                            >
                                <View style={styles.rankContainer}>
                                    <Text
                                        style={[
                                            styles.rankText,
                                            {
                                                color:
                                                    getRankColor(
                                                        entry.rank
                                                    ) || SECONDARY_TEXT[theme]
                                            }
                                        ]}
                                    >
                                        #{entry.rank}
                                    </Text>
                                </View>

                                <Text
                                    style={[
                                        styles.nameText,
                                        {
                                            color: TEXT[theme],
                                            fontWeight:
                                                entry.isCurrentUser
                                                    ? 'bold'
                                                    : 'normal'
                                        }
                                    ]}
                                    numberOfLines={1}
                                >
                                    {entry.displayName}
                                    {entry.isCurrentUser
                                        ? t('you', language)
                                        : ''}
                                </Text>

                                <Text
                                    style={[
                                        styles.scoreText,
                                        {
                                            color:
                                                getRankColor(entry.rank) ||
                                                TEXT[theme]
                                        }
                                    ]}
                                >
                                    {entry.score}
                                </Text>
                            </View>
                        ))
                    )}
                </ScrollView>
            )}

            {/* User Rank Footer */}
            {!loading && error === '' && userRank && (
                <View
                    style={[
                        styles.userRankBar,
                        { backgroundColor: CARD[theme] }
                    ]}
                >
                    <View style={styles.userRankInner}>
                        <Text
                            style={[
                                styles.userRankLabel,
                                { color: SECONDARY_TEXT[theme] }
                            ]}
                        >
                            {t('yourPlacement', language)}
                        </Text>
                        <View style={styles.userRankRow}>
                            <Text
                                style={[
                                    styles.userRankNumber,
                                    { color: ACCENT }
                                ]}
                            >
                                #{userRank.rank}
                            </Text>
                            <Text
                                style={[
                                    styles.userRankName,
                                    { color: TEXT[theme] }
                                ]}
                            >
                                {userRank.displayName}
                            </Text>
                            <Text
                                style={[
                                    styles.userRankScore,
                                    { color: TEXT[theme] }
                                ]}
                            >
                                {userRank.score}
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            {/* Opt-Out Button */}
            {!loading && (
                <Pressable
                    style={[
                        styles.optOutButton,
                        { borderColor: SECONDARY_TEXT[theme] }
                    ]}
                    onPress={handleOptOut}
                >
                    <Text
                        style={[
                            styles.optOutText,
                            { color: SECONDARY_TEXT[theme] }
                        ]}
                    >
                        {t('leaveLeaderboard', language)}
                    </Text>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12
    },

    // --- Opt-In Styles ---
    optInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: -40
    },
    iconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    },
    optInTitle: {
        fontSize: 28,
        fontFamily: FONT,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center'
    },
    optInDescription: {
        fontSize: 16,
        fontFamily: FONT,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
        paddingHorizontal: 16
    },
    gameCenterButton: {
        width: '100%',
        height: 52,
        borderRadius: 26,
        backgroundColor: ACCENT,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    gameCenterButtonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: FONT,
        fontWeight: 'bold'
    },
    errorInlineText: {
        color: '#e74c3c',
        fontSize: 14,
        fontFamily: FONT,
        marginBottom: 16,
        textAlign: 'center',
        paddingHorizontal: 8
    },

    // --- Tab Bar ---
    tabBar: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 4,
        marginBottom: 12
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        gap: 6
    },
    activeTab: {
        backgroundColor: ACCENT + '25'
    },
    tabText: {
        fontSize: 15,
        fontFamily: FONT,
        fontWeight: '600'
    },

    // --- List ---
    listContainer: {
        flex: 1
    },
    listContent: {
        paddingBottom: 16
    },
    entryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 6
    },
    rankContainer: {
        width: 48
    },
    rankText: {
        fontSize: 16,
        fontFamily: FONT,
        fontWeight: 'bold'
    },
    nameText: {
        flex: 1,
        fontSize: 16,
        fontFamily: FONT
    },
    scoreText: {
        fontSize: 18,
        fontFamily: FONT,
        fontWeight: 'bold',
        minWidth: 40,
        textAlign: 'right'
    },

    // --- User Rank Footer ---
    userRankBar: {
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 8
    },
    userRankInner: {
        alignItems: 'center'
    },
    userRankLabel: {
        fontSize: 12,
        fontFamily: FONT,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4
    },
    userRankRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    userRankNumber: {
        fontSize: 22,
        fontFamily: FONT,
        fontWeight: 'bold'
    },
    userRankName: {
        fontSize: 16,
        fontFamily: FONT,
        flex: 1
    },
    userRankScore: {
        fontSize: 18,
        fontFamily: FONT,
        fontWeight: 'bold'
    },

    // --- Opt-Out ---
    optOutButton: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: SMALLSCREEN ? 16 : 24
    },
    optOutText: {
        fontSize: 14,
        fontFamily: FONT
    },

    // --- Empty / Error ---
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12
    },
    emptyContainer: {
        paddingVertical: 60,
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 16,
        fontFamily: FONT,
        textAlign: 'center'
    },
    errorText: {
        fontSize: 15,
        fontFamily: FONT,
        textAlign: 'center',
        paddingHorizontal: 20
    },
    retryButton: {
        backgroundColor: ACCENT,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginTop: 8
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: FONT,
        fontWeight: '600'
    }
});

export default LeaderboardPage;
