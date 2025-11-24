/**
 * Calculates the accessibility score for a region.
 * Formula: (busStops * 0.4) + (busRoutes * 0.3) + (population / 10000 * 0.2) - (avgAccessTime * 0.5) - (agingRate * 0.2)
 * Lower score means more vulnerable.
 * @param {Object} data - Region data
 * @returns {number} Calculated score
 */
export const calculateScore = (data) => {
    const { busStops, busRoutes, population, avgAccessTime, agingRate } = data;
    const score = (busStops * 0.4) +
        (busRoutes * 0.3) +
        (population / 10000 * 0.2) -
        (avgAccessTime * 0.5) -
        (agingRate * 0.2);
    return parseFloat(score.toFixed(2)); // Return with 2 decimal places
};

export const isVulnerable = (score, threshold = 30) => {
    return score < threshold;
};
