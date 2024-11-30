import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

import useRefScroll from "@/src//hooks/useRefScroll";
import useVisibilityWithFade from "@/src/hooks/useVisibilityWithFade";
import { useStadiumSelector } from '@/src/hooks/useStadiumSelector';

import Header from "../../components/layout/MainHeader";
import NavBar from "../../components/layout/NavBar";
import BignnerGuide from "../../components/chips/BignnerGuide";
import BignnerGuideDialog from "../../components/dialogs/BignnerGuideDialog";
import ReadyStadiumDialog from "../../components/dialogs/ReadyStadiumDialog";
import Dropdown from "./components/Dropdown";
import JamsilSeat from "./components/JamsilSeat";
import KtwizSeat from "./components/KtwizSeat";
import StadiumInfo from "./components/StadiumInfo";
import SeatRecommendButton from "./components/SeatRecommendButton";
import ChatBot from "../../components/button/FloatingChatbotButton";

import ScrollAppeal from "./components/ScrollAppeal";

// Enum으로 추천 구역 Data 관리
import { StadiumType, stadiumList } from "../../constants/ZoneData";

import { useStadiumContext } from "@/src/context/StadiumContext";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 준비 중 팝업 상태

  // 메인홈 스타디움 관리
  const context = useStadiumContext();
  if (!context) {
    // 예외 처리: context가 없으면 에러를 던지거나 기본값을 사용
    return <div>Loading...</div>;
  }
  const { 
    selectedStadium, setSelectedStadium
  } = context;

  useEffect(() => {
    // 처음 로드 시 한 번만 JAMSIL로 설정
    if (!selectedStadium) {
      setSelectedStadium(StadiumType.JAMSIL);
    }
    handleStadiumSelect(selectedStadium)
  }, [selectedStadium]);


  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closePopup = () => setIsPopupOpen(false);


  // 스타디움 선택 핸들러
  const handleStadiumSelect = (stadium: StadiumType) => {
    // 선택 가능한 구장인지 확인
    if (stadium === StadiumType.JAMSIL || stadium === StadiumType.SUWON_KT) {
     setSelectedStadium(stadium);
    }
  };

  ///////////////////////////////////////////////////////////
  // 🐻 INAE 추가 코드
  // 로그인, 회원가입 상태 관리
  /*
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // 로그인 페이지로 리디렉션 (이동)
      router.push("/login");

    } else if (status === "authenticated") {
      const isFirstTimeUser = true; // 예시로 설정, 실제 사용자 DB 정보로 확인 필요

      // 회원 가입 페이지로 리디렉션 (이동)
      if (isFirstTimeUser) {
        router.push("/onboarding");
      }
    }
  }, [status, router]);
  */
  ///////////////////////////////////////////////////////////

  if (status === "loading") {
    return <div>Loading...</div>;
  }


  // 스크롤 이벤트
  const { scrollDirection, scrollPosition, containerRef } = useRefScroll<HTMLDivElement>(); // 스크롤 감지 훅
  const animationDuration = 1500; // 1.5초, 사라지는 애니메이션 길이
  const { isVisible, isFadingOut } = useVisibilityWithFade(scrollDirection, { // 스크롤 내림 감지시 컴포넌트 숨기는 훅
    animationDuration,
  });
  const renderScrollState = () => {
    return (
      <>
        <p>스크롤 방향: {scrollDirection || "아직 없음"}</p>
        <p>현재 스크롤 위치: {scrollPosition}px</p>
      </>
    );
  }
  const renderScrollApil = () => {
    if (!isVisible) return null;

    return (
      <div
        className={`transition-opacity ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
        style={{
          transitionDuration: `${animationDuration}ms`, // 15초 애니메이션
        }}
      >
        <ScrollAppeal />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} // 스크롤을 감지할 특정 div에 Ref를 바인딩
      className="flex flex-col w-full overflow-auto scrollbar-hide pt-14"
      /*
      style={{
        height: '1000px', // 높이를 설정하여 스크롤을 발생시킬 수 있도록
        overflowY: 'scroll', // 수직 스크롤 활성화
      }}
      */
      >
      <Header />
      <div className="flex-1 px-4 pb-24 bg-grayscale-5">
        <p className="text-xl font-bold text-grayscale-90 pt-5 text-left w-full">
          오늘은 어느 야구장에 방문하시나요?
        </p>

        {/* 야구장 드롭다운 */}
        <div className="flex items-center gap-4 justify-between mt-4 w-full">
          <Dropdown
            options={stadiumList}
            selectedOption={selectedStadium}
            onSelect={handleStadiumSelect}
          />
          {/* 초보자 구역 가이드 버튼 */}
          <BignnerGuide onClick={toggleModal} />
        </div>

        {/* 초보자 구역 가이드 모달 */}
        <BignnerGuideDialog isOpen={isModalOpen} onClose={toggleModal} />

        {/* 야구장 좌석 이미지 선택 */}
        <div className="mt-4 flex justify-center">
          {selectedStadium === StadiumType.JAMSIL ? (
            <JamsilSeat screenWidth={window.innerWidth} />
          ) : selectedStadium === StadiumType.SUWON_KT ? (
            <KtwizSeat screenWidth={window.innerWidth} />
          ) : (
            <p className="text-grayscale-90">해당 구장은 추후 업데이트 예정입니다 :)</p>
          )}
        </div>

        {/* 구장 정보 */}
        <StadiumInfo stadiumName={selectedStadium} />

        {/* 나에게 맞는 구역 찾으러 가기 버튼 */}
        <div className="flex justify-center">
          {/**부모 */}
          <SeatRecommendButton stadiumName={selectedStadium} />
        </div>
      </div>

      {/* ScrollAppeal 컴포넌트 */}
      {renderScrollApil()}
      
      {/* 하단 네비게이션 바 */}
      <NavBar />

      {/* 플로팅 챗봇 버튼 */}
      <ChatBot />

      {/* 준비 중인 구장 선택 시 나오는 팝업 */}
      <ReadyStadiumDialog isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default Main;
