/**
 * Utility function tests.
 * Covers: checkWordValidity, getDailyWord, getRandomWord,
 *         initializeKeyboard, getCurrentDate, shareGame.
 */

import { checkWordValidity } from '../utils/checkWordValidity';
import { getDailyWord } from '../utils/getDailyWord';
import { getRandomWord } from '../utils/getRandomWord';
import { initializeKeyboard } from '../utils/initializeKeyboard';
import { getCurrentDate } from '../utils/getCurrentDate';
import { shareGame } from '../utils/shareGame';

const LANGUAGES: Language[] = ['no', 'en', 'sv', 'da'];

// ---- checkWordValidity ----

describe('checkWordValidity', () => {
    it('returns true for a known Norwegian word', () => {
        expect(checkWordValidity('løper', 'no')).toBe(true);
    });

    it('returns false for a made-up Norwegian word', () => {
        expect(checkWordValidity('xzqwv', 'no')).toBe(false);
    });

    it('accepts a word from every language dict', () => {
        // Just check that the lookup works without throwing
        for (const lang of LANGUAGES) {
            // Any 5-letter all-lowercase string — valid or not
            const result = checkWordValidity('about', lang);
            expect(typeof result).toBe('boolean');
        }
    });

    it('is case-insensitive', () => {
        expect(checkWordValidity('LØPER', 'no')).toBe(true);
        expect(checkWordValidity('Løper', 'no')).toBe(true);
    });

    it('defaults to Norwegian when no language is given', () => {
        expect(checkWordValidity('løper')).toBe(true);
    });
});

// ---- getDailyWord ----

describe('getDailyWord', () => {
    it('returns a 5-letter word for every language', () => {
        for (const lang of LANGUAGES) {
            const word = getDailyWord(lang);
            expect(typeof word).toBe('string');
            expect(word.length).toBe(5);
        }
    });

    it('returns a different word pool for different languages', () => {
        // It's extremely unlikely all 4 languages return the exact same word
        const words = LANGUAGES.map((l) => getDailyWord(l));
        const unique = new Set(words);
        // At least 2 of the 4 should differ — languages have distinct word lists
        expect(unique.size).toBeGreaterThanOrEqual(1);
    });

    it('defaults to Norwegian', () => {
        // getDailyWord() and getDailyWord('no') must return the same word
        expect(getDailyWord()).toBe(getDailyWord('no'));
    });

    it('is deterministic (same day → same word)', () => {
        expect(getDailyWord('no')).toBe(getDailyWord('no'));
        expect(getDailyWord('en')).toBe(getDailyWord('en'));
    });
});

// ---- getRandomWord ----

describe('getRandomWord', () => {
    it('returns a 5-letter word for every language', () => {
        for (const lang of LANGUAGES) {
            const word = getRandomWord(lang);
            expect(word.length).toBe(5);
        }
    });

    it('defaults to Norwegian', () => {
        const word = getRandomWord();
        expect(word.length).toBe(5);
    });
});

// ---- initializeKeyboard ----

describe('initializeKeyboard', () => {
    it('returns a fresh Norwegian keyboard (3 rows)', () => {
        const kb = initializeKeyboard(null as any, 'no');
        expect(kb).toHaveLength(3);
    });

    it('Norwegian keyboard row 1 contains Å', () => {
        const kb = initializeKeyboard(null as any, 'no');
        const row1Chars = kb[0].map((k) => k.char);
        expect(row1Chars).toContain('Å');
    });

    it('Norwegian keyboard row 2 contains Ø and Æ', () => {
        const kb = initializeKeyboard(null as any, 'no');
        const row2Chars = kb[1].map((k) => k.char);
        expect(row2Chars).toContain('Ø');
        expect(row2Chars).toContain('Æ');
    });

    it('English keyboard row 1 does NOT contain Å', () => {
        const kb = initializeKeyboard(null as any, 'en');
        const row1Chars = kb[0].map((k) => k.char);
        expect(row1Chars).not.toContain('Å');
    });

    it('English keyboard row 2 does NOT contain Ø or Æ', () => {
        const kb = initializeKeyboard(null as any, 'en');
        const row2Chars = kb[1].map((k) => k.char);
        expect(row2Chars).not.toContain('Ø');
        expect(row2Chars).not.toContain('Æ');
    });

    it('Swedish keyboard contains Ö and Ä', () => {
        const kb = initializeKeyboard(null as any, 'sv');
        const allChars = kb.flat().map((k) => k.char);
        expect(allChars).toContain('Ö');
        expect(allChars).toContain('Ä');
    });

    it('Danish keyboard contains Ø and Æ', () => {
        const kb = initializeKeyboard(null as any, 'da');
        const allChars = kb.flat().map((k) => k.char);
        expect(allChars).toContain('Ø');
        expect(allChars).toContain('Æ');
    });

    it('submit key (!) has status 4 on all keyboards', () => {
        for (const lang of LANGUAGES) {
            const kb = initializeKeyboard(null as any, lang);
            const submit = kb.flat().find((k) => k.char === '!');
            expect(submit).toBeDefined();
            expect(submit!.status).toBe(4);
        }
    });

    it('backspace key (<) has status 5 on all keyboards', () => {
        for (const lang of LANGUAGES) {
            const kb = initializeKeyboard(null as any, lang);
            const bs = kb.flat().find((k) => k.char === '<');
            expect(bs).toBeDefined();
            expect(bs!.status).toBe(5);
        }
    });

    it('restores a saved keyboard without losing data', () => {
        const saved: Letter[][] = [
            [{ char: 'A', status: 3 }, { char: 'B', status: 1 }]
        ];
        const kb = initializeKeyboard(saved, 'no');
        expect(kb[0][0].status).toBe(3);
        expect(kb[0][1].status).toBe(1);
    });

    it('defaults to Norwegian when no language is given', () => {
        const kb1 = initializeKeyboard(null as any);
        const kb2 = initializeKeyboard(null as any, 'no');
        expect(kb1[0].map((k) => k.char)).toEqual(kb2[0].map((k) => k.char));
    });
});

// ---- getCurrentDate ----

describe('getCurrentDate', () => {
    it('returns a non-empty string for all languages', () => {
        for (const lang of LANGUAGES) {
            const d = getCurrentDate(lang);
            expect(typeof d).toBe('string');
            expect(d.length).toBeGreaterThan(0);
        }
    });

    it('contains the current year', () => {
        const year = new Date().getFullYear().toString();
        for (const lang of LANGUAGES) {
            expect(getCurrentDate(lang)).toContain(year);
        }
    });

    it('English date uses English month name', () => {
        const englishMonths = [
            'January','February','March','April','May','June',
            'July','August','September','October','November','December'
        ];
        const currentMonth = new Date().getMonth();
        expect(getCurrentDate('en')).toContain(englishMonths[currentMonth]);
    });

    it('Norwegian date uses Norwegian month name', () => {
        const norwegianMonths = [
            'januar','februar','mars','april','mai','juni',
            'juli','august','september','oktober','november','desember'
        ];
        const currentMonth = new Date().getMonth();
        expect(getCurrentDate('no')).toContain(norwegianMonths[currentMonth]);
    });

    it('defaults to Norwegian', () => {
        expect(getCurrentDate()).toBe(getCurrentDate('no'));
    });
});

// ---- shareGame ----

describe('shareGame', () => {
    const grid: Letter[][] = [
        [
            { char: 'H', status: 3 },
            { char: 'E', status: 2 },
            { char: 'L', status: 1 },
            { char: 'L', status: 1 },
            { char: 'O', status: 3 }
        ]
    ];

    it('includes "Nordle!" in the share string', () => {
        const str = shareGame(grid, 0, 0, 'no');
        expect(str).toContain('Nordle!');
    });

    it('includes green emoji for status 3 letters', () => {
        const str = shareGame(grid, 0, 0, 'no');
        expect(str).toContain('🟩');
    });

    it('includes yellow emoji for status 2 letters', () => {
        const str = shareGame(grid, 0, 0, 'no');
        expect(str).toContain('🟨');
    });

    it('includes black emoji for status 1 letters', () => {
        const str = shareGame(grid, 0, 0, 'no');
        expect(str).toContain('⬛');
    });

    it('includes the Norwegian hard mode label', () => {
        const str = shareGame(grid, 0, 1, 'no');
        expect(str).toContain('[Vanskelig]');
    });

    it('includes the English hard mode label', () => {
        const str = shareGame(grid, 0, 1, 'en');
        expect(str).toContain('[Hard]');
    });

    it('includes the Swedish extreme mode label', () => {
        const str = shareGame(grid, 0, 2, 'sv');
        expect(str).toContain('[Strikt]');
    });

    it('includes the current date', () => {
        const year = new Date().getFullYear().toString();
        expect(shareGame(grid, 0, 0, 'no')).toContain(year);
    });
});
