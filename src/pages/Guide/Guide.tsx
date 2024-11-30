import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/layout/MainHeader";
import NavBar from "../../components/layout/NavBar";
import Dropdown from "../Main/components/Dropdown";
import GuideDetailContent from "./components/GuideDetailContent";

import { StadiumType, stadiumList } from "@/src/constants/ZoneData";
import { useStadiumSelector } from "@/src/hooks/useStadiumSelector";
import { useRouter } from "next/router";
import { ZoneGetParamsType, ZoneGetResponseType } from "@/src/api/StadiumApiType";  // 타입들 import
import { handleGetStadiumInfo } from "@/src/api/StadiumApiHandler"; // API 호출 함수

import { useStadiumContext } from "@/src/context/StadiumContext";

const Guide = () => {
  const context = useStadiumContext();
  if (!context) {
    // 예외 처리: context가 없으면 에러를 던지거나 기본값을 사용
    return <div>Loading...</div>;
  }
  const { 
    selectedStadium, setSelectedStadium, 
    selectedSection, setSelectedSection, 
    selectedSectionColor, setSelectedSectionColor, 
    zoneNameList, setZoneNameList, 
    stadiumInfo, setStadiumInfo 
  } = context;
  

  // 스타디움 변경 시, 스타디움 정보 및 구역명 리스트를 가져옵니다.
  const handleStadiumInfo = async () => {
    // 유효하지 않으면 API 호출하지 않음
    if (!selectedStadium) {
      console.log("유효하지 않은 스타디움 값입니다: " + selectedStadium);
      return;
    }
    
    const params: ZoneGetParamsType = {
      stadiumName: selectedStadium as string,
    };

    // API 호출
    const stadiumApiData = await handleGetStadiumInfo(params);
    if (stadiumApiData) {
      setStadiumInfo(stadiumApiData);
      setZoneNameList(stadiumApiData.zones.map(zone => zone.zoneName));

      // 선택된 구역의 색상 업데이트
      const selectedZoneColor = stadiumApiData.zones.find(zone => zone.zoneName === selectedSection)?.zoneColor;
      if (selectedZoneColor) {
        setSelectedSectionColor(selectedZoneColor);
      }
    }
  };
  

  // 스타디움 선택 핸들러
  const handleStadiumSelect = (stadium: StadiumType) => {
    // 선택 가능한 구장인지 확인
    if (stadium === StadiumType.JAMSIL || stadium === StadiumType.SUWON_KT) {
     setSelectedStadium(stadium);
    }
  };

  // 스타디움 변경될 때마다 호출
  useEffect(() => {
    handleStadiumSelect(selectedStadium);
    handleStadiumInfo();
  }, [selectedStadium]);  // selectedStadium 또는 selectedSection이 변경될 때마다 실행



  // Zone 클릭시 가이드 세부 페이지로 이동 및 API 데이터를 쿼리 파라미터로 전달
  const router = useRouter();

  // 구역을 클릭하면 선택된 구역 및 색상 업데이트
  const handleSectionClick = (selectedZone: string) => {
    setSelectedSection(selectedZone);
    if (stadiumInfo) {
      const selectedZoneColor = stadiumInfo.zones.find((zone) => zone.zoneName === selectedZone)?.zoneColor;
      if (selectedZoneColor) {
        setSelectedSectionColor(selectedZoneColor);
      }
    }
  };

  // 선택된 구역과 색상 정보가 업데이트될 때 상세 페이지로 이동
  useEffect(() => {
    // zone을 클릭했으면
    if (selectedSection !== "" && selectedSectionColor !== "") {
      moveDetailPage();
    }
  }, [selectedSection, selectedSectionColor]);

  // 상세 페이지로 이동하는 함수
  const moveDetailPage = () => {
    // 선택된 섹션에 따라 리다이렉트
    router.push({
      pathname: "/guide/zone",  // 리다이렉트할 경로
      query: {                  // 쿼리 파라미터 전달
        stadiumName: selectedStadium,
        zoneName: selectedSection,
        zoneColor: selectedSectionColor,
        zoneNameList: zoneNameList,
      },
    });

    // 페이지 이동 후 상태 초기화
    setTimeout(() => {
      setSelectedSection("");
      setSelectedSectionColor("");
    }, 100); // 100ms 지연 후 초기화
  };

  // router가 '/guide/zone' 경로로 이동할 때 상태 초기화
  useEffect(() => {
    //console.log(router.pathname);
    if (router.pathname !== "/guide") {
      setSelectedSection("");
      setSelectedSectionColor("");
    }
  }, [router.pathname]);


  return (
    <div className="flex flex-col w-full h-screen bg-grayscale-5 pt-16">
      <div className="sticky top-0 z-10 bg-white">
        <Header />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20 pt-[15px] px-4" style={{ maxHeight: "calc(100vh - 80px)" }}>
        {stadiumInfo ? (
          <>
            {/* 스타디움 선택 드롭다운 */}
            <Dropdown options={stadiumList} selectedOption={selectedStadium} onSelect={handleStadiumSelect} />
            <div className="mt-4">
              <Image
                src={stadiumInfo.imgUrl}
                alt={`${selectedStadium} 이미지`}
                className="w-full h-auto rounded-lg"
                width={370}
                height={198}
              />
              <p className="text-center text-sm font-medium text-gray-700 mt-2">{stadiumInfo.introduction}</p>
            </div>

            <h2 className="mt-6 text-lg font-bold text-left text-gray-700">궁금하신 구역을 선택해주세요!</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {stadiumInfo.zones.map((zone, zoneIndex) => (
                <button
                  key={zone.zoneName}
                  className="flex items-center justify-start h-12 bg-white rounded-lg"
                  onClick={() => handleSectionClick(zone.zoneName)}
                  style={{ color: zone.zoneColor }}
                >
                  <div className="w-3 h-3 rounded-sm ml-3 mr-2" style={{ backgroundColor: zone.zoneColor }} />
                  <span className="text-gray-700 text-sm font-medium">{zone.zoneName}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
      <NavBar />
    </div>
  );
};

export default Guide;
