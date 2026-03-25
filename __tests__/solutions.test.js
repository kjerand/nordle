/**
 * Word list integrity tests.
 * All four language solution lists are checked for:
 *  - correct word length (5 letters)
 *  - no duplicates
 *  - every solution present in the corresponding dictionary
 *  - sufficient vocabulary (at least 200 words per language)
 */

const LANGUAGES = ['no', 'en', 'sv', 'da'];

LANGUAGES.forEach((lang) => {
    const solutions = require(`../assets/words/${lang}/solutions.json`);
    const dict = require(`../assets/words/${lang}/dict.json`);

    describe(`[${lang}] solutions.json`, () => {
        test('has at least 200 solution words', () => {
            expect(solutions.words.length).toBeGreaterThanOrEqual(200);
        });

        test('all solution words are exactly 5 characters', () => {
            const invalid = solutions.words.filter((w) => w.length !== 5);
            expect(invalid).toEqual([]);
        });

        test('all solution words are lowercase', () => {
            const nonLower = solutions.words.filter((w) => w !== w.toLowerCase());
            expect(nonLower).toEqual([]);
        });

        test('no duplicate words in solutions', () => {
            const seen = new Set();
            const duplicates = [];
            for (const word of solutions.words) {
                if (seen.has(word)) duplicates.push(word);
                seen.add(word);
            }
            expect(duplicates).toEqual([]);
        });

        test('all solution words exist in the dictionary', () => {
            const missing = solutions.words.filter((w) => !dict[w]);
            expect(missing).toEqual([]);
        });
    });

    describe(`[${lang}] dict.json`, () => {
        test('dictionary has more words than solutions', () => {
            expect(Object.keys(dict).length).toBeGreaterThanOrEqual(
                solutions.words.length
            );
        });

        test('all dictionary words are exactly 5 characters', () => {
            const invalid = Object.keys(dict).filter((w) => w.length !== 5);
            expect(invalid).toEqual([]);
        });
    });
});

// Legacy compatibility: original files still importable
describe('legacy word files', () => {
    test('assets/words/solutions.json is importable', () => {
        const sol = require('../assets/words/solutions.json');
        expect(Array.isArray(sol.words)).toBe(true);
    });

    test('assets/words/dict.json is importable', () => {
        const dict = require('../assets/words/dict.json');
        expect(typeof dict).toBe('object');
    });
});
