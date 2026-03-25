import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'Nordle!',
    slug: 'Nordle',
    version: '1.6.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    splash: {
        backgroundColor: '#262625'
    },
    updates: {
        fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['./assets/images/*', './assets/words/*'],
    plugins: [
        './plugins/withGameCenter',
        [
            'react-native-google-mobile-ads',
            {
                androidAppId: process.env.ADMOB_ANDROID_APP_ID || 'ca-app-pub-3940256099942544~3347511713',
                iosAppId: process.env.ADMOB_IOS_APP_ID || 'ca-app-pub-9727187882727817~1667402163'
            }
        ]
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.kjerandevje.wordlenorge',
        buildNumber: '1.6.0',
        infoPlist: {
            ITSAppUsesNonExemptEncryption: false,
            NSUserTrackingUsageDescription:
                'Denne tillatelsen brukes for å vise relevante annonser.'
        }
    },
    android: {
        package: 'com.kjerandevje.wordlenorge',
        versionCode: 10,
        permissions: []
    },
    extra: {
        apiBaseUrl:
            process.env.API_BASE_URL ||
            'https://nordle-api-HASH-ew.a.run.app/api',
        eas: {
            projectId: 'ef1c426b-e422-4190-82a9-bc3c8c594a5f'
        }
    }
});
