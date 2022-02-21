import { getDayOfYear } from './getDayOfYear';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const updateLoss = () => {
    const dayOfYear = getDayOfYear() + 5;
    AsyncStorage.getItem('@streak')
        .then((data) => {
            if (data) {
                const [streak, day] = data.split(':');
                const parsedDay = parseInt(day);

                if (parsedDay === dayOfYear) return;

                AsyncStorage.setItem('@streak', '0:' + dayOfYear);
            } else {
                AsyncStorage.setItem('@streak', '0:' + dayOfYear);
            }
        })
        .catch(() => {
            AsyncStorage.setItem('@streak', '0:' + dayOfYear);
        });
};
