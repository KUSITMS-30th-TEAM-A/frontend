import React, { useState } from "react";
import CultureHeader from "../../components/layout/CultureHeader";
import NavBar from "../../components/layout/NavBar";
import cultureData from "../../constants/CultureData";
import Tab from "./components/TabBackgroundPink";

import Food from "./Food/Food";
import Entertainment from "./Entertainment/Entertainment";
import ServiceReady from "../../components/page/ServiceReady";
import { StadiumType } from "../../constants/ZoneData";

const Culture = () => {
  const [selectedTab, setSelectedTab] = useState<"먹거리" | "즐길거리">("먹거리");
  const [selectedStadium, setSelectedStadium] = useState<StadiumType>(StadiumType.JAMSIL); // 경기장 상태 관리

  const handleTabSelect = (tab: "먹거리" | "즐길거리") => {
    setSelectedTab(tab);
  };

  // 수원KT야구장 선택 시 준비 중인 페이지 렌더링
  if (selectedStadium === StadiumType.SUWON_KT) {
    return (
      <div className="flex flex-col h-screen bg-white -mt-2">
        <div className="sticky top-0 z-10">
          <CultureHeader
            onStadiumSelect={setSelectedStadium}
            selectedStadium={selectedStadium}
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <ServiceReady />
        </div>
        <NavBar />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <CultureHeader
        onStadiumSelect={setSelectedStadium}
        selectedStadium={selectedStadium}
      />
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 bg-grayscale-5">
        <div className="bg-white rounded-lg mb-4">
          <Tab selectedTab={selectedTab} onSelectTab={handleTabSelect} />
        </div>
        {selectedTab === "먹거리" ? (
          <Food data={cultureData.food} />
        ) : (
          <Entertainment data={cultureData.entertainment} />
        )}
      </div>
      <NavBar />
    </div>
  );
};

export default Culture;
