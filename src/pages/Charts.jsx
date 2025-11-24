import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import useRegionStore from "../store/regionStore";
import ChartCard from "../components/ChartCard";

const ChartsPage = () => {
  const { regions, fetchRegions } = useRegionStore();

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  // Prepare data for charts
  const sortedByAccessTime = [...regions]
    .sort((a, b) => b.avgAccessTime - a.avgAccessTime)
    .slice(0, 10);

  const scatterData = regions.map((r) => ({
    x: r.agingRate,
    y: r.avgAccessTime,
    z: r.population,
    name: r.regionName,
  }));

  // Automated Analysis Text
  const highAgingHighAccessTime = regions.filter(
    (r) => r.agingRate > 30 && r.avgAccessTime > 100
  ).length;
  const analysisText1 = `고령화율이 30% 이상인 지역 중 ${highAgingHighAccessTime}곳이 평균 접근 시간이 100분을 초과하여 교통 취약도가 매우 높게 나타납니다.`;

  return (
    <div className="p-4 pb-20 px-[150px]">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">데이터 분석</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard
          title="평균 접근 시간 상위 10개 지역 (취약)"
          analysis="이 지역들은 대중교통 접근성이 가장 열악합니다. DRT 도입 등 시급한 개선이 필요합니다."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedByAccessTime}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="regionName"
                type="category"
                width={100}
                style={{ fontSize: "12px" }}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="avgAccessTime"
                fill="#ef4444"
                name="평균 접근 시간 (분)"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="고령화율 vs 접근 시간 상관관계"
          analysis={analysisText1}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="고령화율" unit="%" />
              <YAxis type="number" dataKey="y" name="접근 시간" unit="분" />
              <ZAxis type="number" dataKey="z" range={[50, 400]} name="인구" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter name="지역" data={scatterData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default ChartsPage;
