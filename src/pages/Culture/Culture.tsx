import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import CultureHeader from "../../components/layout/CultureHeader";
import NavBar from "../../components/layout/NavBar";
import cultureData from "../../constants/CultureData";
import Tab from "./components/TabBackgroundPink";

import Food from "./Food/Food";
import Entertainment from "./Entertainment/Entertainment";
import ServiceReady from "../../components/page/ServiceReady";
import { StadiumType } from "../../constants/ZoneData";

import { useStadiumContext } from "@/src/context/StadiumContext";

const Culture = () => {
  const [selectedTab, setSelectedTab] = useState<"먹거리" | "즐길거리">("먹거리");
  
  // 전역 스타디움 관리
  const context = useStadiumContext();
  if (!context) { // 예외 처리
    return <div>스타디움 값을 못 가져왔습니다.</div>;
  }
  const { 
    selectedStadium, setSelectedStadium
  } = context;


  const handleTabSelect = (tab: "먹거리" | "즐길거리") => {
    setSelectedTab(tab);
  };


  const router = useRouter();
  useEffect(() => {
    // 추천 결과 페이지에서 왔을 때, 스타디움 값을 쿼리 파라미터로 가져오기
    if (router.query.stadiumName) {
      const stadiumName = router.query.stadiumName as StadiumType;
      
      // 확인
      console.log("야구 문화 페이지로 리다이렉트 했슴다: ")
      console.log(stadiumName);
      setSelectedStadium(stadiumName);
    }
    
  }, [router.query]);
  

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
