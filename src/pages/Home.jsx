import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ title, description, link }) => (
  <Link
    to={link}
    className="block p-6 text-white transition-all border shadow-lg rounded-xl bg-white/20 backdrop-blur-md border-white/30 hover:shadow-xl"
  >
    <h3 className="mb-2 text-2xl font-bold">{title}</h3>
    <p className="opacity-90">{description}</p>
  </Link>
);

const Home = () => {
  return (
    <div
      className="w-full min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      {/* 투명 오버레이 */}
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-0 bg-black/20 backdrop-blur-[4px] px-[130px]">
        {/* 내용 — 좌우 여백 제거 */}
        <div className="w-full py-10 text-center max-w-screen">
          <h1 className="mb-6 text-5xl font-extrabold text-white">
            전국 대중교통 <span className="text-blue-300">접근성</span> 대시보드
          </h1>

          <p className="mb-12 text-xl text-gray-100">
            지역별 대중교통 접근성을 시각화하고 쉽게 비교할 수 있습니다.
          </p>

          {/* 카드 3개 예시 */}
          <div className="grid grid-cols-1 gap-8 px-10 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="지도 분석"
              description="접근성 점수와 취약 지역을 시각화한 인터랙티브 지도입니다."
              link="/map"
            />
            <FeatureCard
              title="데이터 차트"
              description="고령화율, 인구, 교통 접근성 간의 상관관계를 심층 분석합니다."
              link="/charts"
            />
            <FeatureCard
              title="정책 제안"
              description="각 지역의 특성에 맞춘 AI 기반 맞춤형 정책 솔루션을 제안합니다."
              link="/solutions"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
