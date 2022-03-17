export const createDistribution = (
    distribution: number[],
    currentLevel: number
) => {
    let newDistribution: number[] = [];

    for (let i = 0; i < distribution.length; i++) {
        if (i === currentLevel) newDistribution.push(distribution[i] + 1);
        else newDistribution.push(distribution[i]);
    }

    return newDistribution;
};
