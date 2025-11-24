
import React, { useEffect, useState } from 'react';
import useRegionStore from '../store/regionStore';
import SolutionCard from '../components/SolutionCard';
import { generateSolutionsForRegion } from '../utils/solutionGenerator';

const SolutionsPage = () => {
    const { regions, fetchRegions } = useRegionStore();
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        fetchRegions();
    }, [fetchRegions]);

    useEffect(() => {
        if (regions.length > 0) {
            const allSolutions = [];

            // Sort by score ascending (worst first)
            const sortedRegions = [...regions].sort((a, b) => a.score - b.score);

            sortedRegions.forEach(region => {
                const regionSolutions = generateSolutionsForRegion(region);
                regionSolutions.forEach(sol => {
                    allSolutions.push({
                        region: region.regionName,
                        ...sol
                    });
                });
            });
            setSolutions(allSolutions);
        }
    }, [regions]);

    return (
        <div className="p-4 pb-20">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">AI 자동 정책 제안</h1>
            <p className="mb-6 text-gray-600">지역별 데이터를 기반으로 AI가 생성한 맞춤형 정책 제안입니다.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {solutions.map((sol, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="text-xs font-bold text-gray-500 mb-1 uppercase">{sol.region}</div>
                        <SolutionCard
                            title={sol.title}
                            description={sol.description}
                            type={sol.type}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolutionsPage;
