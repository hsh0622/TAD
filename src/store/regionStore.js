import { create } from 'zustand';
import { loadRegionData } from '../utils/dataLoader';

const useRegionStore = create((set, get) => ({
    regions: [],
    filteredRegions: [],
    selectedRegion: null,
    isLoading: false,
    filters: {
        minAccessTime: 0,
        maxAccessTime: 200,
        minAgingRate: 0,
        maxAgingRate: 100,
        minPopulation: 0,
        minBusStops: 0,
    },

    fetchRegions: async () => {
        set({ isLoading: true });
        try {
            const data = await loadRegionData();
            set({ regions: data, filteredRegions: data, isLoading: false });
        } catch (error) {
            console.error("Failed to load regions:", error);
            set({ isLoading: false });
        }
    },

    setSelectedRegion: (region) => set({ selectedRegion: region }),

    setFilters: (newFilters) => {
        const currentFilters = get().filters;
        const updatedFilters = { ...currentFilters, ...newFilters };
        set({ filters: updatedFilters });
        get().applyFilters();
    },

    applyFilters: () => {
        const { regions, filters } = get();
        const filtered = regions.filter(region => {
            return (
                region.avgAccessTime >= filters.minAccessTime &&
                region.avgAccessTime <= filters.maxAccessTime &&
                region.agingRate >= filters.minAgingRate &&
                region.agingRate <= filters.maxAgingRate &&
                region.population >= filters.minPopulation &&
                region.busStops >= filters.minBusStops
            );
        });
        set({ filteredRegions: filtered });
    },
}));

export default useRegionStore;
