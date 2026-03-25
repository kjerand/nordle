import { getDayOfYear } from './getDayOfYear';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateLoss = (language: Language = 'no') => {
    const dayOfYear = getDayOfYear();
    const streakKey = `@streak_${language}`;

    AsyncStorage.getItem(streakKey)
        .then((data) => {
            if (data) {
                const [streak, day] = data.split(':');
                const parsedDay = parseInt(day);

                if (parsedDay === dayOfYear) return;

                AsyncStorage.setItem(streakKey, '0:' + dayOfYear);
            } else {
                AsyncStorage.setItem(streakKey, '0:' + dayOfYear);
            }
        })
        .catch(() => {
            AsyncStorage.setItem(streakKey, '0:' + dayOfYear);
        });
};
