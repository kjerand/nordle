export const getRandomWord = () => {
    const words = ['PIANO', 'SPRNG', 'LOFFE', 'LØPER'];
    const index = Math.floor(Math.random() * words.length);
    return words[index];
};
