import React, { useState, useEffect, useRef } from "react";
import BackLogoBar from "../../components/layout/BackLogoBar";
import { stadiumList } from "../../constants/ZoneData";
import StadiumSelection from "./components/stadiumcategory/StadiumSelection";
import ChatbotInputField from "./components/ChatbotInputField";

import DateBanner from "./components/DateBanner";

import { questionCategories } from "@/src/constants/ChatbotData";

import RookieChat from "./components/RookieChat";
import UserChat from "./components/UserChat";
import CategoryChat from "./components/CategoryChat";

const Chatbot = () => {
  // 스타디움 선택 관련
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);  // 선택한 스타디움 저장
  const isStadiumSelected = selectedStadium !== null && selectedStadium !== ""; // 스타디움 선택 여부
  const [showInitialMessages, setShowInitialMessages] = useState(false);        // 초기 메시지 출력 여부
  
  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stadium);
  };
  

  // 챗봇 첫 인사 렌더링 관련
  useEffect(() => {
    // 챗봇 페이지 들어온 후 초기 메시지 표시
    const timer = setTimeout(() => {
      setShowInitialMessages(true);
    }, );

    return () => clearTimeout(timer);
  }, []);


  // 카테고리 선택 관련 (배열로 저장해야 프론트에서 관리 및 계속 대화 생성 가능)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const MAX_CATEGORIES = 15; // 카테고리 최대 개수 지정
  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prevCategories) => {
      // 배열이 최대 개수를 넘으면 가장 오래된 항목 제거 후 새로운 항목 추가
      const updatedCategories = [...prevCategories, category];
      if (updatedCategories.length > MAX_CATEGORIES) {
        updatedCategories.shift(); // 가장 오래된 항목 제거
      }
      return updatedCategories;
    });
  };


  // 가이드 챗봇 답변 관련
  const [responseGuideData, setResponseGuideData] = useState<string[]>([]); // API 응답 저장
  const handleGuideResponseUpdate = (response: string) => {
    setResponseGuideData((prev) => [...prev, response]); // 새 응답 데이터 추가
  };
  

  // 자동 스크롤 기능
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // 채팅이 추가될 때 스크롤 맨 아래로 이동
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [selectedStadium, selectedCategories]);


  return (
    <>
      {/* 1. 헤더바 */}
      <div>
        <BackLogoBar />
      </div>

      <div className="flex justify-center items-center min-h-screen bg-grayscale-50 mt-[55px] pb-[60px]">
        <div className="flex flex-col h-full max-w-[500px] w-full bg-grayscale-10">
          {/* 채팅 영역 */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto mb-10"
          >
      
            {/* 2. 오늘 날짜 */}
            <DateBanner date={new Date()} />

            {/* 3. 채팅 내역  */}
            <div className="px-1">
              
              {/* 채팅1: 구장 선택, 루키 시작 인사말, 필수 출력 */}
              {showInitialMessages && (
                <RookieChat 
                  initialMessage={questionCategories.greetings} 
                  contentList={[
                    {
                      type: "component",
                      content: <StadiumSelection stadiums={stadiumList} onSelect={handleStadiumSelect} />
                    }
                  ]}
                />
              )}


              
              {/* 야구장 선택시 */}
              {selectedStadium && (
                <>
                  {/* 채팅2: 사용자 답변, 필수 출력 */}
                  <UserChat messageList={[selectedStadium]}/>

                  {/* 채팅3: */}
                  <RookieChat 
                    initialMessage={[`'${selectedStadium}'을(를) 선택하셨군요!😁`]} 
                    contentList={[
                      {
                        type: "textList",
                        content: questionCategories.baseballCategories.userMessage
                      }
                    ]}
                />
                </>
              )}

              {/* 카테고리 선택시 배열에 저장 및 순차 출력 */}
              {selectedStadium && selectedCategories.map((categoryFrontName, index) => (
                <div key={index}>
                  <>
                    {/* 사용자 답변 출력 */}
                    <UserChat messageList={[categoryFrontName]} />

                    {/* 선택된 카테고리에 대한 챗봇 응답 출력 */}
                    <RookieChat 
                      contentList={[
                        {
                        type: "component",
                        content: <CategoryChat stadiumName={selectedStadium} categoryFrontName={categoryFrontName} onResponseUpdate={handleGuideResponseUpdate} />
                        }
                      ]}
                      />
                  </>
                </div>
              ))}
            </div>
          </div>
          

          {/* 4. 채팅 입력창 */}
          <ChatbotInputField isStadiumSelected={isStadiumSelected} onSelect={handleCategorySelect} />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
