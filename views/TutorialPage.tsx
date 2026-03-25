import { RootState } from '../store/store';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { BACKGROUND, FONT, TEXT } from '../utils/constants';
import { t } from '../utils/i18n';

const TutorialPage = () => {
    const { theme } = useSelector((state: RootState) => state.theme);
    const { language } = useSelector((state: RootState) => state.language);

    return (
        <View
            style={[styles.container, { backgroundColor: BACKGROUND[theme] }]}
        >
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center'
                }}
            >
                <Text style={[styles.header, { color: TEXT[theme] }]}>
                    {t('howToPlay', language)}
                </Text>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        {t('tutorialIntro', language)}
                    </Text>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        {t('tutorialColors', language)}
                    </Text>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        {t('tutorialGoal', language)}
                    </Text>
                </View>
                <Text style={[styles.header, { color: TEXT[theme] }]}>
                    {t('tutorialDifference', language)}
                </Text>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        {t('tutorialDaily', language)}
                    </Text>
                    <Text style={[styles.textStyle, { color: TEXT[theme] }]}>
                        {t('tutorialRandom', language)}
                    </Text>
                </View>
            </ScrollView>
            <Text style={[styles.signature, { color: TEXT[theme] }]}>
                {t('madeBy', language)}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 50,
        flexGrow: 1
    },
    header: {
        marginTop: 20,
        fontSize: 30,
        fontFamily: FONT,
        fontWeight: 'bold',
        marginBottom: 15,
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 20,
        fontFamily: FONT,
        marginBottom: 15
    },
    textContainer: {
        marginHorizontal: 30
    },
    signature: {
        fontSize: 16,
        fontFamily: FONT,
        justifyContent: 'flex-end',
        marginTop: 'auto'
    }
});
export default TutorialPage;
