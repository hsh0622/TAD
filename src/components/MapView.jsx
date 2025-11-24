import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useRegionStore from '../store/regionStore';

const getColor = (score) => {
    if (score >= 50) return '#22c55e'; // Green-500
    if (score >= 30) return '#eab308'; // Yellow-500
    return '#ef4444'; // Red-500
};

const MapUpdater = ({ regions }) => {
    const map = useMap();
    useEffect(() => {
        if (regions.length > 0) {
            const bounds = regions.map(r => r.coordinates);
            map.fitBounds(bounds);
        }
    }, [regions, map]);
    return null;
};

const MapView = () => {
    const { filteredRegions, setSelectedRegion } = useRegionStore();

    return (
        <MapContainer center={[36.5, 127.5]} zoom={7} className="h-full w-full rounded-lg shadow-lg z-0">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater regions={filteredRegions} />
            {filteredRegions.map((region) => (
                <CircleMarker
                    key={region.regionName}
                    center={region.coordinates}
                    pathOptions={{ color: getColor(region.score), fillColor: getColor(region.score), fillOpacity: 0.7 }}
                    radius={10}
                    eventHandlers={{
                        click: () => setSelectedRegion(region),
                    }}
                >
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-bold text-lg">{region.regionName}</h3>
                            <p>점수: <span className="font-bold">{region.score}</span></p>
                            <p className="text-xs text-gray-500">클릭하여 상세 정보 보기</p>
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
};

export default MapView;
