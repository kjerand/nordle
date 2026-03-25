type Translations = {
    [key: string]: {
        no: string;
        en: string;
        sv: string;
        da: string;
    };
};

const translations: Translations = {
    // Menu
    dailyGame: {
        no: 'Dagens Nordle',
        en: 'Daily Nordle',
        sv: 'Dagens Nordle',
        da: 'Dagens Nordle'
    },
    randomGame: {
        no: 'Tilfeldig Nordle',
        en: 'Random Nordle',
        sv: 'Slumpmässig Nordle',
        da: 'Tilfældig Nordle'
    },
    leaderboard: {
        no: 'Toppliste',
        en: 'Leaderboard',
        sv: 'Topplista',
        da: 'Toppliste'
    },
    help: {
        no: 'Hjelp',
        en: 'Help',
        sv: 'Hjälp',
        da: 'Hjælp'
    },
    settings: {
        no: 'Innstillinger',
        en: 'Settings',
        sv: 'Inställningar',
        da: 'Indstillinger'
    },

    // Game
    fillAllLetters: {
        no: 'Du må fylle ut alle bokstavene før du gjetter!',
        en: 'You must fill in all the letters before guessing!',
        sv: 'Du måste fylla i alla bokstäver innan du gissar!',
        da: 'Du skal udfylde alle bogstaver før du gætter!'
    },
    useGreenLetters: {
        no: 'Du må bruke de grønne bokstavene!',
        en: 'You must use the green letters!',
        sv: 'Du måste använda de gröna bokstäverna!',
        da: 'Du skal bruge de grønne bogstaver!'
    },
    cantUseDarkGray: {
        no: 'Du kan ikke bruke mørk grå bokstaver!',
        en: 'You cannot use dark gray letters!',
        sv: 'Du kan inte använda mörkgrå bokstäver!',
        da: 'Du kan ikke bruge mørkegrå bogstaver!'
    },
    failedAnswer: {
        no: 'Du klarte det ikke. Riktig svar var ',
        en: 'You did not get it. The correct answer was ',
        sv: 'Du klarade det inte. Rätt svar var ',
        da: 'Du klarede det ikke. Det rigtige svar var '
    },
    correctGuess: {
        no: 'Du tippet riktig!',
        en: 'You guessed correctly!',
        sv: 'Du gissade rätt!',
        da: 'Du gættede rigtigt!'
    },
    wordNotInList: {
        no: 'Dette ordet finnes ikke i listene våre.',
        en: 'This word is not in our word list.',
        sv: 'Detta ord finns inte i vår ordlista.',
        da: 'Dette ord findes ikke i vores ordliste.'
    },

    // Streak
    correctStreak: {
        no: 'Riktig tippet ',
        en: 'Correct guess ',
        sv: 'Rätt gissat ',
        da: 'Rigtig gættet '
    },
    daysSingular: {
        no: ' dag på rad!',
        en: ' day in a row!',
        sv: ' dag i rad!',
        da: ' dag i træk!'
    },
    daysPlural: {
        no: ' dager på rad!',
        en: ' days in a row!',
        sv: ' dagar i rad!',
        da: ' dage i træk!'
    },

    // Settings
    hardMode: {
        no: 'Vanskelig modus',
        en: 'Hard mode',
        sv: 'Svårt läge',
        da: 'Svær tilstand'
    },
    hardModeDesc: {
        no: 'Vanskelig modus krever at du må bruke alle bokstaver som er blitt grønne.',
        en: 'Hard mode requires you to use all letters that have turned green.',
        sv: 'Svårt läge kräver att du använder alla bokstäver som blivit gröna.',
        da: 'Svær tilstand kræver at du bruger alle bogstaver der er blevet grønne.'
    },
    extremeMode: {
        no: 'Streng modus',
        en: 'Extreme mode',
        sv: 'Strikt läge',
        da: 'Streng tilstand'
    },
    extremeModeDesc: {
        no: 'Streng modus krever at du må bruke alle bokstaver som er blitt grønne og du kan ikke bruke bokstaver som er blitt mørk grå.',
        en: 'Extreme mode requires you to use all letters that have turned green and you cannot use letters that have turned dark gray.',
        sv: 'Strikt läge kräver att du använder alla bokstäver som blivit gröna och du kan inte använda bokstäver som blivit mörkgrå.',
        da: 'Streng tilstand kræver at du bruger alle bogstaver der er blevet grønne og du kan ikke bruge bogstaver der er blevet mørkegrå.'
    },
    colorTheme: {
        no: 'Fargetema',
        en: 'Color theme',
        sv: 'Färgtema',
        da: 'Farvetema'
    },
    language: {
        no: 'Språk',
        en: 'Language',
        sv: 'Språk',
        da: 'Sprog'
    },
    themeBlack: {
        no: 'Svart',
        en: 'Black',
        sv: 'Svart',
        da: 'Sort'
    },
    themeWhite: {
        no: 'Hvit',
        en: 'White',
        sv: 'Vit',
        da: 'Hvid'
    },
    themeGray: {
        no: 'Grå',
        en: 'Gray',
        sv: 'Grå',
        da: 'Grå'
    },
    themeBlue: {
        no: 'Blå',
        en: 'Blue',
        sv: 'Blå',
        da: 'Blå'
    },
    themeGreen: {
        no: 'Grønn',
        en: 'Green',
        sv: 'Grön',
        da: 'Grøn'
    },
    madeBy: {
        no: 'Laget av Kjerand Evje',
        en: 'Made by Kjerand Evje',
        sv: 'Skapad av Kjerand Evje',
        da: 'Lavet af Kjerand Evje'
    },

    // Tutorial
    howToPlay: {
        no: 'Slik spiller du',
        en: 'How to play',
        sv: 'Så spelar du',
        da: 'Sådan spiller du'
    },
    tutorialIntro: {
        no: 'Gjett det skjulte ordet på fem bokstaver. Etter hvert forsøk avslører fargene hvor nær du er.',
        en: 'Guess the hidden five-letter word. After each attempt, the colors reveal how close you are.',
        sv: 'Gissa det dolda ordet på fem bokstäver. Efter varje försök avslöjar färgerna hur nära du är.',
        da: 'Gæt det skjulte ord på fem bogstaver. Efter hvert forsøg afslører farverne hvor tæt du er.'
    },
    tutorialColors: {
        no: 'Grønn betyr at bokstaven er riktig plassert. Gul betyr at bokstaven finnes i ordet, men på en annen plass. Svart betyr at bokstaven ikke er med i ordet.',
        en: 'Green means the letter is in the right spot. Yellow means the letter is in the word but in the wrong position. Black means the letter is not in the word at all.',
        sv: 'Grön betyder att bokstaven är rätt placerad. Gul betyder att bokstaven finns i ordet, men på fel plats. Svart betyder att bokstaven inte finns i ordet.',
        da: 'Grøn betyder at bogstavet er rigtigt placeret. Gul betyder at bogstavet er i ordet, men på en forkert plads. Sort betyder at bogstavet ikke er i ordet.'
    },
    tutorialGoal: {
        no: 'Bruk ledetrådene til å knekke ordet før forsøkene dine er brukt opp!',
        en: 'Use the clues to crack the word before you run out of attempts!',
        sv: 'Använd ledtrådarna för att knäcka ordet innan dina försök tar slut!',
        da: 'Brug ledetrådene til at knække ordet før dine forsøg er brugt op!'
    },
    tutorialDifference: {
        no: 'Spillmoduser',
        en: 'Game modes',
        sv: 'Spellägen',
        da: 'Spiltilstande'
    },
    tutorialDaily: {
        no: 'Dagens Nordle gir alle spillere det samme ordet. Et nytt ord kommer hver dag ved midnatt.',
        en: 'Daily Nordle gives every player the same word. A new word arrives each day at midnight.',
        sv: 'Dagens Nordle ger alla spelare samma ord. Ett nytt ord kommer varje dag vid midnatt.',
        da: 'Dagens Nordle giver alle spillere det samme ord. Et nyt ord kommer hver dag ved midnat.'
    },
    tutorialRandom: {
        no: 'Tilfeldig Nordle gir deg et nytt, unikt ord hver gang — perfekt for ekstra øvelse.',
        en: 'Random Nordle gives you a fresh, unique word every time — perfect for extra practice.',
        sv: 'Slumpmässig Nordle ger dig ett nytt, unikt ord varje gång — perfekt för extra övning.',
        da: 'Tilfældig Nordle giver dig et nyt, unikt ord hver gang — perfekt til ekstra øvelse.'
    },

    // Statistics
    statistics: {
        no: 'Statistikk',
        en: 'Statistics',
        sv: 'Statistik',
        da: 'Statistik'
    },
    gamesPlayed: {
        no: 'Antall spill',
        en: 'Games played',
        sv: 'Antal spel',
        da: 'Antal spil'
    },
    gamesWon: {
        no: 'Antall vunnet',
        en: 'Games won',
        sv: 'Antal vunna',
        da: 'Antal vundet'
    },
    winPercentage: {
        no: 'Vinnprosent',
        en: 'Win percentage',
        sv: 'Vinstprocent',
        da: 'Vindprocent'
    },
    distribution: {
        no: 'Fordeling:',
        en: 'Distribution:',
        sv: 'Fördelning:',
        da: 'Fordeling:'
    },
    average: {
        no: 'Snitt',
        en: 'Average',
        sv: 'Snitt',
        da: 'Snit'
    },
    attempt: {
        no: 'Forsøk',
        en: 'Attempt',
        sv: 'Försök',
        da: 'Forsøg'
    },
    close: {
        no: 'Lukk',
        en: 'Close',
        sv: 'Stäng',
        da: 'Luk'
    },

    // Leaderboard
    notAvailable: {
        no: 'Ikke tilgjengelig',
        en: 'Not available',
        sv: 'Inte tillgänglig',
        da: 'Ikke tilgængelig'
    },
    leaderboardRequiresGameCenter: {
        no: 'Topplisten krever Apple Game Center og er kun tilgjengelig på iOS.',
        en: 'The leaderboard requires Apple Game Center and is only available on iOS.',
        sv: 'Topplistan kräver Apple Game Center och är bara tillgänglig på iOS.',
        da: 'Topplisten kræver Apple Game Center og er kun tilgængelig på iOS.'
    },
    joinLeaderboard: {
        no: 'Bli med på topplisten!',
        en: 'Join the leaderboard!',
        sv: 'Gå med på topplistan!',
        da: 'Bliv med på topplisten!'
    },
    loginGameCenterDesc: {
        no: 'Logg inn med Game Center for å dele dine resultater med andre Nordle-spillere og se hvor du plasserer deg.',
        en: 'Log in with Game Center to share your results with other Nordle players and see where you rank.',
        sv: 'Logga in med Game Center för att dela dina resultat med andra Nordle-spelare och se var du placerar dig.',
        da: 'Log ind med Game Center for at dele dine resultater med andre Nordle-spillere og se hvor du placerer dig.'
    },
    loginGameCenter: {
        no: 'Logg inn med Game Center',
        en: 'Log in with Game Center',
        sv: 'Logga in med Game Center',
        da: 'Log ind med Game Center'
    },
    longestStreak: {
        no: 'Lengste streak',
        en: 'Longest streak',
        sv: 'Längsta streak',
        da: 'Længste streak'
    },
    mostWords: {
        no: 'Flest ord',
        en: 'Most words',
        sv: 'Flest ord',
        da: 'Flest ord'
    },
    couldNotLoadLeaderboard: {
        no: 'Kunne ikke laste topplisten. Prøv igjen senere.',
        en: 'Could not load the leaderboard. Try again later.',
        sv: 'Kunde inte ladda topplistan. Försök igen senare.',
        da: 'Kunne ikke indlæse topplisten. Prøv igen senere.'
    },
    tryAgain: {
        no: 'Prøv igjen',
        en: 'Try again',
        sv: 'Försök igen',
        da: 'Prøv igen'
    },
    noPlayersYet: {
        no: 'Ingen spillere ennå. Vær den første!',
        en: 'No players yet. Be the first!',
        sv: 'Inga spelare ännu. Var den första!',
        da: 'Ingen spillere endnu. Vær den første!'
    },
    you: {
        no: ' (deg)',
        en: ' (you)',
        sv: ' (dig)',
        da: ' (dig)'
    },
    yourPlacement: {
        no: 'Din plassering',
        en: 'Your rank',
        sv: 'Din placering',
        da: 'Din placering'
    },
    leaveLeaderboard: {
        no: 'Forlat topplisten',
        en: 'Leave leaderboard',
        sv: 'Lämna topplistan',
        da: 'Forlad topplisten'
    },
    couldNotLogin: {
        no: 'Kunne ikke logge inn med Game Center. Sjekk at du er logget inn i Innstillinger.',
        en: 'Could not log in with Game Center. Check that you are logged in in Settings.',
        sv: 'Kunde inte logga in med Game Center. Kontrollera att du är inloggad i Inställningar.',
        da: 'Kunne ikke logge ind med Game Center. Tjek at du er logget ind i Indstillinger.'
    },
    couldNotLeave: {
        no: 'Kunne ikke forlate topplisten. Prøv igjen.',
        en: 'Could not leave the leaderboard. Try again.',
        sv: 'Kunde inte lämna topplistan. Försök igen.',
        da: 'Kunne ikke forlade topplisten. Prøv igen.'
    },

    // Share
    shareHard: {
        no: '[Vanskelig]',
        en: '[Hard]',
        sv: '[Svårt]',
        da: '[Svær]'
    },
    shareExtreme: {
        no: '[Streng]',
        en: '[Extreme]',
        sv: '[Strikt]',
        da: '[Streng]'
    }
};

const monthNames: { [key in Language]: string[] } = {
    no: [
        'januar', 'februar', 'mars', 'april', 'mai', 'juni',
        'juli', 'august', 'september', 'oktober', 'november', 'desember'
    ],
    en: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
    sv: [
        'januari', 'februari', 'mars', 'april', 'maj', 'juni',
        'juli', 'augusti', 'september', 'oktober', 'november', 'december'
    ],
    da: [
        'januar', 'februar', 'marts', 'april', 'maj', 'juni',
        'juli', 'august', 'september', 'oktober', 'november', 'december'
    ]
};

export const t = (key: string, language: Language): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry['no'];
};

export const getMonthNames = (language: Language): string[] => {
    return monthNames[language];
};

export const languageNames: { [key in Language]: string } = {
    no: 'Norsk',
    en: 'English',
    sv: 'Svenska',
    da: 'Dansk'
};
