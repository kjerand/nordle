import { useCallback } from 'react';

export function useInterstitialAd() {
    const showAd = useCallback(() => {}, []);
    return { showAd, adLoaded: false };
}
