/**
 * i18n translation tests.
 * Verifies every translation key has an entry for all four languages,
 * and that month names and language name constants are correct.
 */

import { t, getMonthNames, languageNames } from '../utils/i18n';

const LANGUAGES: Language[] = ['no', 'en', 'sv', 'da'];

// All keys used in the app
const USED_KEYS = [
    'dailyGame', 'randomGame', 'leaderboard', 'help', 'settings',
    'fillAllLetters', 'useGreenLetters', 'cantUseDarkGray', 'failedAnswer',
    'correctGuess', 'wordNotInList',
    'correctStreak', 'daysSingular', 'daysPlural',
    'hardMode', 'hardModeDesc', 'extremeMode', 'extremeModeDesc',
    'colorTheme', 'language',
    'themeBlack', 'themeWhite', 'themeGray', 'themeBlue', 'themeGreen',
    'madeBy',
    'howToPlay', 'tutorialIntro', 'tutorialColors', 'tutorialGoal',
    'tutorialDifference', 'tutorialDaily', 'tutorialRandom',
    'statistics', 'gamesPlayed', 'gamesWon', 'winPercentage',
    'distribution', 'average', 'attempt', 'close',
    'notAvailable', 'leaderboardRequiresGameCenter',
    'joinLeaderboard', 'loginGameCenterDesc', 'loginGameCenter',
    'longestStreak', 'mostWords', 'couldNotLoadLeaderboard', 'tryAgain',
    'noPlayersYet', 'you', 'yourPlacement', 'leaveLeaderboard',
    'couldNotLogin', 'couldNotLeave',
    'shareHard', 'shareExtreme'
];

describe('t() translation function', () => {
    it('returns a non-empty string for every key in every language', () => {
        for (const key of USED_KEYS) {
            for (const lang of LANGUAGES) {
                const result = t(key, lang);
                expect(result.length).toBeGreaterThan(0);
            }
        }
    });

    it('falls back to the key string for unknown keys', () => {
        expect(t('unknownKey_xyz', 'no')).toBe('unknownKey_xyz');
    });

    it('Norwegian "help" is "Hjelp"', () => {
        expect(t('help', 'no')).toBe('Hjelp');
    });

    it('English "help" is "Help"', () => {
        expect(t('help', 'en')).toBe('Help');
    });

    it('Swedish "settings" is "Inställningar"', () => {
        expect(t('settings', 'sv')).toBe('Inställningar');
    });

    it('Danish "settings" is "Indstillinger"', () => {
        expect(t('settings', 'da')).toBe('Indstillinger');
    });
});

describe('getMonthNames()', () => {
    it('returns an array of 12 month names for every language', () => {
        for (const lang of LANGUAGES) {
            const months = getMonthNames(lang);
            expect(months).toHaveLength(12);
            months.forEach((m) => expect(m.length).toBeGreaterThan(0));
        }
    });

    it('Norwegian march is "mars"', () => {
        expect(getMonthNames('no')[2]).toBe('mars');
    });

    it('English march is "March"', () => {
        expect(getMonthNames('en')[2]).toBe('March');
    });

    it('Swedish may is "maj"', () => {
        expect(getMonthNames('sv')[4]).toBe('maj');
    });

    it('Danish march is "marts"', () => {
        expect(getMonthNames('da')[2]).toBe('marts');
    });
});

describe('languageNames', () => {
    it('has a name for every language', () => {
        for (const lang of LANGUAGES) {
            expect(languageNames[lang].length).toBeGreaterThan(0);
        }
    });

    it('Norwegian name is "Norsk"', () => {
        expect(languageNames['no']).toBe('Norsk');
    });

    it('English name is "English"', () => {
        expect(languageNames['en']).toBe('English');
    });
});
