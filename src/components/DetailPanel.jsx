import React from 'react';
import useRegionStore from '../store/regionStore';
import { generateSolutionsForRegion } from '../utils/solutionGenerator';

const DetailPanel = () => {
    const { selectedRegion } = useRegionStore();

    if (!selectedRegion) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg h-full flex items-center justify-center text-gray-500">
                <p>지도에서 지역을 선택하여 상세 정보를 확인하세요.</p>
            </div>
        );
    }

    const getScoreColor = (score) => {
        if (score >= 50) return 'text-green-600';
        if (score >= 30) return 'text-yellow-600';
        return 'text-red-600';
    };

    const solutions = generateSolutionsForRegion(selectedRegion);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">{selectedRegion.regionName}</h2>

            <div className="mb-6">
                <p className="text-sm text-gray-500 uppercase tracking-wide">접근성 점수</p>
                <p className={`text-4xl font-bold ${getScoreColor(selectedRegion.score)}`}>
                    {selectedRegion.score}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">평균 접근 시간</p>
                    <p className="text-lg font-semibold">{selectedRegion.avgAccessTime} 분</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">버스 정류장 수</p>
                    <p className="text-lg font-semibold">{selectedRegion.busStops} 개</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">버스 노선 수</p>
                    <p className="text-lg font-semibold">{selectedRegion.busRoutes} 개</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">인구 수</p>
                    <p className="text-lg font-semibold">{selectedRegion.population.toLocaleString()} 명</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">고령화율</p>
                    <p className="text-lg font-semibold">{selectedRegion.agingRate}%</p>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="font-bold text-lg mb-2">분석 결과</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {selectedRegion.score < 30 && (
                        <li className="text-red-600 font-medium">⚠️ 교통 취약 지역</li>
                    )}
                    {selectedRegion.avgAccessTime > 60 && (
                        <li>평균 접근 시간이 매우 높음 (60분 초과).</li>
                    )}
                    {selectedRegion.agingRate > 20 && (
                        <li>초고령 사회 진입 (20% 초과).</li>
                    )}
                    {selectedRegion.busStops < 50 && (
                        <li>버스 정류장 부족.</li>
                    )}
                </ul>
            </div>

            {solutions.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                    <h3 className="font-bold text-lg mb-3 text-blue-700">맞춤형 정책 제안</h3>
                    <div className="space-y-3">
                        {solutions.map((sol, idx) => (
                            <div key={idx} className="bg-blue-50 p-3 rounded border border-blue-100">
                                <p className="font-bold text-sm text-blue-900">{sol.title}</p>
                                <p className="text-xs text-blue-800 mt-1">{sol.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailPanel;
