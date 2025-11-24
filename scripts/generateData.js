import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mock implementation of calculateScore to avoid import issues in Node script without type module setup for src
const calculateScore = (data) => {
    const { busStops, busRoutes, population, avgAccessTime, agingRate } = data;
    const score = (busStops * 0.4) +
        (busRoutes * 0.3) +
        (population / 10000 * 0.2) -
        (avgAccessTime * 0.5) -
        (agingRate * 0.2);
    return parseFloat(score.toFixed(2));
};

const regions = [
    { regionName: "서울특별시 종로구", avgAccessTime: 15.2, busStops: 450, busRoutes: 80, population: 138879, agingRate: 19.8, coordinates: [37.5730, 126.9794] },
    { regionName: "서울특별시 강남구", avgAccessTime: 12.5, busStops: 600, busRoutes: 120, population: 537000, agingRate: 14.5, coordinates: [37.5172, 127.0473] },
    { regionName: "서울특별시 노원구", avgAccessTime: 20.1, busStops: 520, busRoutes: 65, population: 493486, agingRate: 18.2, coordinates: [37.6542, 127.0568] },
    { regionName: "부산광역시 해운대구", avgAccessTime: 25.4, busStops: 380, busRoutes: 55, population: 390000, agingRate: 21.5, coordinates: [35.1631, 129.1636] },
    { regionName: "부산광역시 중구", avgAccessTime: 18.5, busStops: 150, busRoutes: 30, population: 40000, agingRate: 28.5, coordinates: [35.1062, 129.0324] },
    { regionName: "대구광역시 수성구", avgAccessTime: 22.8, busStops: 410, busRoutes: 60, population: 410000, agingRate: 19.2, coordinates: [35.8580, 128.6306] },
    { regionName: "대구광역시 군위군", avgAccessTime: 150.5, busStops: 40, busRoutes: 8, population: 23000, agingRate: 48.75, coordinates: [36.2428, 128.5728] },
    { regionName: "인천광역시 연수구", avgAccessTime: 28.2, busStops: 350, busRoutes: 45, population: 390000, agingRate: 13.5, coordinates: [37.4102, 126.6782] },
    { regionName: "인천광역시 강화군", avgAccessTime: 135.2, busStops: 80, busRoutes: 15, population: 69000, agingRate: 35.2, coordinates: [37.7464, 126.4879] },
    { regionName: "광주광역시 광산구", avgAccessTime: 30.5, busStops: 420, busRoutes: 50, population: 400000, agingRate: 12.5, coordinates: [35.1395, 126.7937] },
    { regionName: "대전광역시 유성구", avgAccessTime: 25.1, busStops: 390, busRoutes: 48, population: 350000, agingRate: 13.8, coordinates: [36.3623, 127.3563] },
    { regionName: "울산광역시 울주군", avgAccessTime: 85.4, busStops: 200, busRoutes: 25, population: 220000, agingRate: 18.5, coordinates: [35.5384, 129.2126] },
    { regionName: "세종특별자치시", avgAccessTime: 35.2, busStops: 300, busRoutes: 40, population: 389443, agingRate: 11.6, coordinates: [36.4800, 127.2890] },
    { regionName: "경기도 수원시", avgAccessTime: 20.5, busStops: 800, busRoutes: 150, population: 1195045, agingRate: 14.2, coordinates: [37.2636, 127.0286] },
    { regionName: "경기도 가평군", avgAccessTime: 110.2, busStops: 120, busRoutes: 20, population: 62000, agingRate: 28.5, coordinates: [37.8315, 127.5096] },
    { regionName: "경기도 연천군", avgAccessTime: 125.5, busStops: 90, busRoutes: 18, population: 42000, agingRate: 29.8, coordinates: [38.0964, 127.0749] },
    { regionName: "강원도 춘천시", avgAccessTime: 65.4, busStops: 250, busRoutes: 35, population: 280000, agingRate: 21.5, coordinates: [37.8813, 127.7298] },
    { regionName: "강원도 화천군", avgAccessTime: 140.2, busStops: 50, busRoutes: 10, population: 24000, agingRate: 26.5, coordinates: [38.1062, 127.7082] },
    { regionName: "충청북도 청주시", avgAccessTime: 45.2, busStops: 550, busRoutes: 70, population: 850000, agingRate: 17.5, coordinates: [36.6424, 127.4890] },
    { regionName: "충청북도 괴산군", avgAccessTime: 130.5, busStops: 60, busRoutes: 12, population: 37000, agingRate: 38.5, coordinates: [36.8153, 127.7960] },
    { regionName: "충청남도 천안시", avgAccessTime: 40.5, busStops: 600, busRoutes: 85, population: 650000, agingRate: 15.5, coordinates: [36.8151, 127.1139] },
    { regionName: "충청남도 청양군", avgAccessTime: 145.2, busStops: 45, busRoutes: 10, population: 30000, agingRate: 39.5, coordinates: [36.4588, 126.8000] },
    { regionName: "전라북도 전주시", avgAccessTime: 35.8, busStops: 500, busRoutes: 65, population: 650000, agingRate: 18.5, coordinates: [35.8242, 127.1480] },
    { regionName: "전라북도 무주군", avgAccessTime: 138.5, busStops: 55, busRoutes: 11, population: 23000, agingRate: 37.5, coordinates: [36.0068, 127.6603] },
    { regionName: "전라남도 목포시", avgAccessTime: 38.2, busStops: 300, busRoutes: 40, population: 220000, agingRate: 20.5, coordinates: [34.8118, 126.3922] },
    { regionName: "전라남도 신안군", avgAccessTime: 160.5, busStops: 30, busRoutes: 5, population: 38000, agingRate: 42.5, coordinates: [34.8336, 126.3513] },
    { regionName: "경상북도 포항시", avgAccessTime: 42.5, busStops: 480, busRoutes: 60, population: 500000, agingRate: 22.5, coordinates: [36.0190, 129.3435] },
    { regionName: "경상북도 의성군", avgAccessTime: 155.2, busStops: 50, busRoutes: 10, population: 50000, agingRate: 48.88, coordinates: [36.3527, 128.6971] },
    { regionName: "경상남도 창원시", avgAccessTime: 32.5, busStops: 700, busRoutes: 100, population: 1030000, agingRate: 19.5, coordinates: [35.2279, 128.6818] },
    { regionName: "경상남도 합천군", avgAccessTime: 142.3, busStops: 57, busRoutes: 12, population: 40810, agingRate: 46.87, coordinates: [35.5669, 128.1653] },
    { regionName: "제주특별자치도 제주시", avgAccessTime: 45.2, busStops: 400, busRoutes: 50, population: 490000, agingRate: 17.5, coordinates: [33.4996, 126.5312] },
    { regionName: "제주특별자치도 서귀포시", avgAccessTime: 65.8, busStops: 200, busRoutes: 30, population: 180000, agingRate: 21.5, coordinates: [33.2541, 126.5601] }
];

const processedData = regions.map(region => ({
    ...region,
    score: calculateScore(region)
}));

const outputDir = path.join(process.cwd(), 'src', 'data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'regionData.json'), JSON.stringify(processedData, null, 2));

console.log(`Successfully generated data for ${processedData.length} regions.`);
