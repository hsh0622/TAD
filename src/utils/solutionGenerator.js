export const generateSolutionsForRegion = (region) => {
    const solutions = [];

    if (region.score < 30) {
        solutions.push({
            title: "중점 개선 지역 지정",
            description: `종합 접근성 점수가 매우 낮습니다 (${region.score}점). 즉각적인 종합 대책 검토가 필요합니다.`,
            type: "urgent"
        });
    }
    if (region.avgAccessTime > 60) {
        solutions.push({
            title: "버스 배차 간격 단축",
            description: `평균 접근 시간이 ${region.avgAccessTime}분으로 깁니다. 주요 노선의 배차를 늘려야 합니다.`,
            type: "service"
        });
    }
    if (region.busRoutes < 15) {
        solutions.push({
            title: "노선 확충 필요",
            description: `운행 노선이 ${region.busRoutes}개에 불과합니다. 순환 버스 등 신규 노선 도입이 시급합니다.`,
            type: "infrastructure"
        });
    }
    if (region.agingRate > 30) {
        solutions.push({
            title: "노인 친화 이동 지원",
            description: `고령화율이 ${region.agingRate}%입니다. 저상버스 도입 및 도어-투-도어 이동 지원이 필요합니다.`,
            type: "policy"
        });
    }
    if (region.population < 30000) {
        solutions.push({
            title: "수요응답형 교통(DRT) 도입",
            description: `인구 밀도가 낮습니다 (${region.population.toLocaleString()}명). 고정 노선보다 DRT가 효율적입니다.`,
            type: "service"
        });
    }

    return solutions;
};
