import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, link, color }) => (
    <Link to={link} className={`block p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${color} text-white`}>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="opacity-90">{description}</p>
    </Link>
);

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
            <div className="text-center max-w-3xl mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                    전국 대중교통 <span className="text-blue-600">접근성</span> 대시보드
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    AI 기반 대한민국 대중교통 취약지역 분석 및 시각화.
                    데이터 기반의 정책 수립을 위한 인사이트를 제공합니다.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">데이터: KTDB & KOSIS</span>
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">범위: 전국 (샘플)</span>
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700">업데이트: 2024.11</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                <FeatureCard
                    title="지도 분석"
                    description="접근성 점수와 취약 지역을 시각화한 인터랙티브 지도입니다."
                    link="/map"
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <FeatureCard
                    title="데이터 차트"
                    description="고령화율, 인구, 교통 접근성 간의 상관관계를 심층 분석합니다."
                    link="/charts"
                    color="bg-gradient-to-br from-purple-500 to-purple-600"
                />
                <FeatureCard
                    title="정책 제안"
                    description="각 지역의 특성에 맞춘 AI 기반 맞춤형 정책 솔루션을 제안합니다."
                    link="/solutions"
                    color="bg-gradient-to-br from-green-500 to-green-600"
                />
            </div>
        </div>
    );
};

export default Home;
