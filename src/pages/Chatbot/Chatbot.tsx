import React, { useState, useEffect, useRef } from "react";
import BackLogoBar from "../../components/layout/BackLogoBar";
import { stadiumList } from "../../constants/ZoneData";
import StadiumSelection from "./components/stadiumcategory/StadiumSelection";
import ChatbotInputField from "./components/input/ChatbotInputField";

import DateBanner from "./components/DateBanner";

import { questionCategories } from "@/src/constants/ChatbotData";
import { GuideGetResponseType, ClovaPostResponseType } from "@/src/api/ChatbotApiType";

import RookieChat, { RookieChatContentType } from "./components/chat/RookieChat";
import UserChat from "./components/chat/UserChat";
import CategoryChat from "./components/chat/CategoryChat";

import RookieImageMessage from "./components/message/custom/RookieImageMessage";
import chatbotManualIcon from "@/src/assets/webp/chatbot_manual.webp";

const Chatbot = () => {
  // 스타디움 선택 관련
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);  // 선택한 스타디움 저장
  const isStadiumSelected = selectedStadium !== null && selectedStadium !== ""; // 스타디움 선택 여부
  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stadium);
    setIsLoading(false); // 로딩이 끝나면 isLoading을 false로 설정
  };
  

  // 시간에 따라 채팅창에 띄울 챗 컴포넌트 배열 관리
  const [chatComponents, setChatComponents] = useState<JSX.Element[]>([]);
  // 최대 챗 컴포넌트 개수 지정
  const MAX_CHAT_COMPONENTS = 200;
  // 챗 컴포넌트 추가
  const addChatComponent = (newChatComponent: JSX.Element) => {
    // 무한 추가
    //setChatComponents((prevChatComponents) => [...prevChatComponents, newChatComponent]);

    // 최대 챗 개수 유지하며 추가
    setChatComponents((prevChatComponents) => {
      // 새로운 항목 추가
      const updatedChatComponents = [...prevChatComponents, newChatComponent];

      // 배열이 최대 개수를 넘으면 가장 오래된 항목 제거
      if (updatedChatComponents.length > MAX_CHAT_COMPONENTS) {
        updatedChatComponents.shift(); // 가장 오래된 항목 제거
      }

      // 업뎃
      return updatedChatComponents;
    });
  }


  // 스크롤을 조작할 영역(채팅창 div) 지정
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // 자동 스크롤 기능
  // 채팅이 추가될 때 스크롤 맨 아래로 이동
  const scrollToBottom = () => {
    // 채팅 영역을 넘어서 전체 페이지를 맨 아래로 스크롤
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',  // 부드러운 스크롤
    });
    
    // 채팅 영역 맨 아래로 스크롤
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };


  // 카테고리 선택 관련 (배열로 저장해야 프론트에서 관리 및 계속 대화 생성 가능)
  const [selectedCategory, setSelectedCategory] = useState<string>();

  // 로딩 상태 관련
  const [isLoading, setIsLoading] = useState(true);   // 로딩 상태 추가 // 초기에는 자동 스크롤 실행되지 않도록 하기 위함
  
  // 새로 렌더링
  useEffect(() => {
    scrollToBottom();

  }, [selectedStadium, selectedCategory, chatComponents]);



  // 처음에 보여줄 컨텐츠
  const renderInitialMessage = () => {
    return (
      <>
        {/* 루키 사용 설명서 */}
        <RookieImageMessage imgIcon={chatbotManualIcon.src} />
        
        {/* 스타디움 선택창 */}
        <StadiumSelection stadiums={stadiumList} onSelect={handleStadiumSelect} />
      </>
    );
  }

  // FAQ 카테고리 선택시 렌더링
  const renderCategoryChat = (selectedCategoryFrontName: string) => {
    if (!selectedStadium) return; // selectedCategoryFrontName이 없으면 함수 종료
    if (!selectedCategoryFrontName) return; // selectedCategoryFrontName이 없으면 함수 종료

    // 카테고리 선택
    setSelectedCategory(selectedCategoryFrontName);

    // 선택한 FAQ 카테고리 출력
    addChatComponent(
      <UserChat messageList={[selectedCategoryFrontName]}/>
    );

    // 선택된 카테고리에 대한 서브 카테고리 or 답변 출력
    addChatComponent(
      <RookieChat 
        contentList={[
          {
            type: "component",
            content: <CategoryChat stadiumName={selectedStadium} categoryFrontName={selectedCategoryFrontName} onGuideResponseUpdate={renderSubCategoryChat} />
          }
        ]}
      />
    );
  }

  // 서브 카테고리 선택시 렌더링
  // 가이드 챗봇 답변 관련: 채팅창에 렌더링하게 위한 용도
  const renderSubCategoryChat = (answer: string, imgUrl: string, linkName: string, link: string, categoryName: string, subCategoryName: string) => {
    if (!answer) return;

    const responseGuideData: GuideGetResponseType = {
      answer, imgUrl, linkName, link
    };

    // 렌더링할 챗 컴포넌트 추가
    addChatComponent(
      <div>
        {/* 선택된 서브 카테고리 출력 */}
        <UserChat messageList={[categoryName + " ▶︎ " + subCategoryName]}/>
        
        {/* 선택된 서브 카테고리에 대한 챗봇 응답 출력 */}
        {/* Guide API 답변 출력: 해당 카테고리에만 매핑되는 데이터를 필터링하여 출력 */}
        <div className="py-2">
          {renderGuideAnswerData(responseGuideData)}
        </div>
      </div>
    );
  }

  // 가이드 답변 렌더링
  const renderGuideAnswerData = (response: GuideGetResponseType) => {
    const answerImageUrl = response.imgUrl ?? "";
    const answerString = response.answer ?? "";
    const answerLinkName = response.linkName ?? "";
    const answerLink = response.link ?? "";

    const answerListWithImg: RookieChatContentType[] = [
      { type: "imgUrl", content: answerImageUrl },
      { type: "preformattedText", content: answerString }
    ];
    const answerList: RookieChatContentType[] = [
      { type: "preformattedTextWithTail", content: answerString },
    ];
    const answerListWithBtn: RookieChatContentType[] = [
      { type: "preformattedTextButtonWithTail", content: answerString, buttonContent: answerLinkName, url: answerLink },
    ];

    return (
      <>
        {answerImageUrl  ? (
          // 이미지, 답변 출력
          <RookieChat 
            contentList={answerListWithImg}
          />
        ): answerLink  ? (
          // 이미지, 답변, 링크로 이동하는 버튼 출력
          <RookieChat 
            contentList={answerListWithBtn}
          />
        ): (
          // 답변 출력
          <RookieChat 
            contentList={answerList}
          />
        )}
      </>
    );
  }

  
  // 쿨로바 답변 랜더링
  const renderClovaAnswerData = (question: string, answer: string) => {
    const answerList: RookieChatContentType[] = [
      { type: "preformattedTextWithTail", content: answer },
    ];
    
    // 렌더링할 챗 컴포넌트 추가
    addChatComponent(
      <>
        {/* 사용자 질문 출력 */}
        <UserChat
          messageList={[question]}
        />
        {/* 클로바 답변 출력 */}
        <RookieChat 
          contentList={answerList}
        />
      </>
    );
  };


  return (
    <div>
      <div>
        {/* 1. 헤더바 */}
        <BackLogoBar />
      </div>

      <div className="flex justify-center items-center h-full min-h-screen bg-grayscale-10 mt-[55px] ">
        <div className="flex flex-col h-full max-w-[500px] w-full bg-grayscale-10">
          {/* 채팅 영역 */}
          <div
            ref={chatContainerRef}
            className="flex-1 px-3 py-4 h-full overflow-y-auto mb-10"
          >
      
            {/* 2. 오늘 날짜 */}
            <DateBanner date={new Date()} />

            {/* 3. 채팅 내역  */}
            <div className="px-1">
              
              {/* 채팅1: 구장 선택, 루키 시작 인사말, 필수 출력 */}
              <RookieChat 
                contentList={[
                  {
                    type: "textListWithTail",
                    content: questionCategories.greetings
                  },
                  {
                    type: "component",
                    content: renderInitialMessage()
                  }
                ]}
              />


              
              {/* 야구장 선택시 */}
              {selectedStadium && (
                <>
                  {/* 채팅2: 사용자 답변, 필수 출력 */}
                  <UserChat messageList={[selectedStadium]}/>

                  {/* 채팅3: */}
                  {/* 첫 번째 내용물은 꼬랑지 말풍선에 출력 */}
                  {/* 두 번째 내용물은 일반 말풍선에 출력 */}
                  <RookieChat 
                    contentList={[
                      {
                        type: "textListWithTail",
                        content: [`'${selectedStadium}'을(를) 선택하셨군요!😁`]
                      },

                      {
                        type: "textList",
                        content: questionCategories.baseballCategories.userMessage
                      }
                    ]}
                  />
                </>
              )}

              {/* 카테고리 선택시 배열에 저장 및 순차 출력 */}
              {chatComponents.map((chatComponent, index) => (
                <React.Fragment key={index}>{chatComponent}</React.Fragment>
              ))}
            </div>
          </div>


          {/* 4. 채팅 입력창 */}
          <ChatbotInputField isStadiumSelected={isStadiumSelected} onSelect={renderCategoryChat} onClovaResponseUpdate={renderClovaAnswerData}/>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
