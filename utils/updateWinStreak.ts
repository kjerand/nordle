import { getDayOfYear } from './getDayOfYear';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateWinStreak = (setPopupTimeout: CallableFunction) => {
    const dayOfYear = getDayOfYear();
    AsyncStorage.getItem('@streak')
        .then((data) => {
            if (data) {
                const [streak, day] = data.split(':');
                const parsedDay = parseInt(day);
                let parsedStreak = parseInt(streak);

                if (dayOfYear - parsedDay === 1) {
                    parsedStreak += 1;
                    AsyncStorage.setItem(
                        '@streak',
                        parsedStreak + ':' + dayOfYear
                    );
                    setPopupTimeout(
                        'Riktig tippet ' + parsedStreak + ' dager på rad!'
                    );
                } else if (dayOfYear === parsedDay) {
                    AsyncStorage.setItem(
                        '@streak',
                        parsedStreak + ':' + dayOfYear
                    );
                    setPopupTimeout(
                        'Riktig tippet ' +
                        parsedStreak +
                        ' ' +
                        (parsedStreak === 1 ? 'dag' : 'dager') +
                        ' på rad!'
                    );
                } else {
                    AsyncStorage.setItem('@streak', '1:' + dayOfYear);
                    setPopupTimeout('Riktig tippet 1 dag på rad!');
                }
            } else {
                AsyncStorage.setItem('@streak', '1:' + dayOfYear);
                setPopupTimeout('Riktig tippet 1 dag på rad!');
            }
        })
        .catch(() => {
            AsyncStorage.setItem('@streak', '1:' + dayOfYear);
            setPopupTimeout('Riktig tippet 1 dag på rad!');
        });
};
