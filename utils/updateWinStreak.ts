import { getDayOfYear } from './getDayOfYear';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from './i18n';

export const updateWinStreak = (
    setPopupTimeout: CallableFunction,
    language: Language = 'no'
) => {
    const dayOfYear = getDayOfYear();
    const streakKey = `@streak_${language}`;

    AsyncStorage.getItem(streakKey)
        .then((data) => {
            if (data) {
                const [streak, day] = data.split(':');
                const parsedDay = parseInt(day);
                let parsedStreak = parseInt(streak);

                if (
                    dayOfYear - parsedDay === 1 ||
                    parsedDay - dayOfYear === 364
                ) {
                    parsedStreak += 1;
                    AsyncStorage.setItem(
                        streakKey,
                        parsedStreak + ':' + dayOfYear
                    );
                    setPopupTimeout(
                        t('correctStreak', language) +
                            parsedStreak +
                            (parsedStreak === 1
                                ? t('daysSingular', language)
                                : t('daysPlural', language))
                    );
                } else if (dayOfYear === parsedDay) {
                    if (parsedStreak === 0) {
                        setPopupTimeout(t('correctGuess', language));
                        return;
                    }
                    setPopupTimeout(
                        t('correctStreak', language) +
                            parsedStreak +
                            (parsedStreak === 1
                                ? t('daysSingular', language)
                                : t('daysPlural', language))
                    );
                } else {
                    AsyncStorage.setItem(streakKey, '1:' + dayOfYear);
                    setPopupTimeout(
                        t('correctStreak', language) +
                            '1' +
                            t('daysSingular', language)
                    );
                }
            } else {
                AsyncStorage.setItem(streakKey, '1:' + dayOfYear);
                setPopupTimeout(
                    t('correctStreak', language) +
                        '1' +
                        t('daysSingular', language)
                );
            }
        })
        .catch(() => {
            AsyncStorage.setItem(streakKey, '1:' + dayOfYear);
            setPopupTimeout(
                t('correctStreak', language) +
                    '1' +
                    t('daysSingular', language)
            );
        });
};
