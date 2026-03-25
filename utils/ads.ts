import { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import {
    InterstitialAd,
    AdEventType,
    TestIds
} from 'react-native-google-mobile-ads';

// Replace with your real AdMob interstitial ad unit ID from https://admob.google.com
const AD_UNIT_ID = Platform.select({
    ios: TestIds.INTERSTITIAL,
    android: TestIds.INTERSTITIAL
}) as string;

const interstitial = InterstitialAd.createForAdRequest(AD_UNIT_ID);

export function useInterstitialAd() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const onLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => setLoaded(true)
        );

        const onClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                setLoaded(false);
                interstitial.load();
            }
        );

        interstitial.load();

        return () => {
            onLoaded();
            onClosed();
        };
    }, []);

    const showAd = useCallback(() => {
        if (loaded) {
            interstitial.show();
        }
    }, [loaded]);

    return { showAd, adLoaded: loaded };
}
