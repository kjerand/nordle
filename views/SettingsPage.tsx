import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Switch
} from 'react-native';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    BACKGROUND,
    BUTTONS,
    FONT,
    SMALLSCREEN,
    TEXT,
    ACCENT,
    CARD,
    SECONDARY_TEXT
} from '../utils/constants';

import { setTheme } from '../store/theme';
import { setMode } from '../store/settings';
import { setLanguage } from '../store/language';
import { t, languageNames } from '../utils/i18n';

const LANGUAGES: Language[] = ['no', 'en', 'sv', 'da'];

const THEMES = [
    { value: 'black', color: '#1a0f2e' },
    { value: 'default', color: '#0d1f2d' },
    { value: 'blue', color: '#0a0e2e' },
    { value: 'green', color: '#061a0f' },
    { value: 'white', color: '#fff0f5' }
] as const;

const SettingsPage = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: RootState) => state.theme);
    const { mode } = useSelector((state: RootState) => state.settings);
    const { language } = useSelector((state: RootState) => state.language);

    const cardBg = CARD[theme];
    const textColor = TEXT[theme];
    const subtextColor = SECONDARY_TEXT[theme];

    const toggleMode = (targetMode: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const newMode = mode === targetMode ? 0 : targetMode;
        dispatch(setMode(newMode));
        AsyncStorage.setItem('@mode', String(newMode));
    };

    const Section = ({
        title,
        children
    }: {
        title: string;
        children: React.ReactNode;
    }) => (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: subtextColor }]}>
                {title}
            </Text>
            <View style={[styles.card, { backgroundColor: cardBg }]}>
                {children}
            </View>
        </View>
    );

    const ToggleRow = ({
        label,
        description,
        value,
        onToggle,
        isLast
    }: {
        label: string;
        description: string;
        value: boolean;
        onToggle: () => void;
        isLast?: boolean;
    }) => (
        <View
            style={[
                styles.toggleRow,
                !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: BACKGROUND[theme] }
            ]}
        >
            <View style={styles.toggleTextContainer}>
                <Text style={[styles.toggleLabel, { color: textColor }]}>
                    {label}
                </Text>
                <Text style={[styles.toggleDescription, { color: subtextColor }]}>
                    {description}
                </Text>
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: BUTTONS[theme], true: ACCENT }}
                thumbColor="#fff"
            />
        </View>
    );

    return (
        <ScrollView
            style={{ backgroundColor: BACKGROUND[theme] }}
            contentContainerStyle={styles.container}
        >
            <Section title={t('language', language).toUpperCase()}>
                <View style={styles.languageGrid}>
                    {LANGUAGES.map((lang) => {
                        const isActive = language === lang;
                        return (
                            <Pressable
                                key={lang}
                                onPress={() => {
                                    dispatch(setLanguage(lang));
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    AsyncStorage.setItem('@language', lang);
                                }}
                                style={[
                                    styles.languageButton,
                                    {
                                        backgroundColor: isActive
                                            ? ACCENT
                                            : 'transparent'
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.languageText,
                                        {
                                            color: isActive
                                                ? '#fff'
                                                : textColor,
                                            fontWeight: isActive
                                                ? '700'
                                                : '400'
                                        }
                                    ]}
                                >
                                    {languageNames[lang]}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </Section>

            <Section title={t('colorTheme', language).toUpperCase()}>
                <View style={styles.themeRow}>
                    {THEMES.map(({ value, color }) => {
                        const isActive = theme === value;
                        return (
                            <Pressable
                                key={value}
                                onPress={() => {
                                    dispatch(setTheme(value));
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Medium
                                    );
                                    AsyncStorage.setItem('@theme', value);
                                }}
                                style={styles.themeOptionContainer}
                            >
                                <View
                                    style={[
                                        styles.themeSwatch,
                                        { backgroundColor: color },
                                        isActive && {
                                            borderColor: ACCENT,
                                            borderWidth: 2.5
                                        }
                                    ]}
                                >
                                    {isActive && (
                                        <View style={styles.themeCheckDot} />
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </Section>

            <Section title={t('hardMode', language).toUpperCase()}>
                <ToggleRow
                    label={t('hardMode', language)}
                    description={t('hardModeDesc', language)}
                    value={mode === 1}
                    onToggle={() => toggleMode(1)}
                />
                <ToggleRow
                    label={t('extremeMode', language)}
                    description={t('extremeModeDesc', language)}
                    value={mode === 2}
                    onToggle={() => toggleMode(2)}
                    isLast
                />
            </Section>

            <Text style={[styles.signature, { color: subtextColor }]}>
                {t('madeBy', language)}
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 50,
        flexGrow: 1
    },
    section: {
        marginBottom: 28
    },
    sectionTitle: {
        fontSize: 13,
        fontFamily: FONT,
        fontWeight: '600',
        letterSpacing: 1.2,
        marginBottom: 8,
        marginLeft: 4
    },
    card: {
        borderRadius: 14,
        overflow: 'hidden'
    },
    languageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
        gap: 8
    },
    languageButton: {
        flex: 1,
        minWidth: '45%',
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 10
    },
    languageText: {
        fontSize: 16,
        fontFamily: FONT
    },
    themeRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 18,
        paddingHorizontal: 8
    },
    themeOptionContainer: {
        alignItems: 'center'
    },
    themeSwatch: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    themeCheckDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: ACCENT
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16
    },
    toggleTextContainer: {
        flex: 1,
        marginRight: 12
    },
    toggleLabel: {
        fontSize: 17,
        fontFamily: FONT,
        fontWeight: '600',
        marginBottom: 2
    },
    toggleDescription: {
        fontSize: 13,
        fontFamily: FONT,
        lineHeight: 18
    },
    signature: {
        fontSize: 14,
        fontFamily: FONT,
        textAlign: 'center',
        marginTop: 'auto',
        paddingBottom: 10
    }
});

export default SettingsPage;
