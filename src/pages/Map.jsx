import React, { useEffect } from "react";
import MapView from "../components/MapView";
import DetailPanel from "../components/DetailPanel";
import useRegionStore from "../store/regionStore";
const MapPage = () => {
  const { fetchRegions, isLoading } = useRegionStore();
  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading data...
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full gap-4 p-4 px-[150px]">
      {" "}
      <h1 className="text-3xl font-bold text-gray-800">
        접근성 지도 분석
      </h1>{" "}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-150px)] gap-4">
        {" "}
        <div className="w-full h-full lg:w-2/3">
          {" "}
          <MapView />{" "}
        </div>{" "}
        <div className="w-full h-full lg:w-1/3">
          {" "}
          <DetailPanel />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default MapPage;
