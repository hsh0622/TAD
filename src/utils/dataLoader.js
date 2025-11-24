import regionData from '../data/regionData.json';

export const loadRegionData = async () => {
    // Simulate async data loading
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(regionData);
        }, 500);
    });
};
