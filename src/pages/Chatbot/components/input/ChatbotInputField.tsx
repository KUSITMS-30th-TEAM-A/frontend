import React, { useState, useCallback } from "react";
import Image from "next/image";
import chatbotClickIcon from "@/src/assets/svg/chatbot_click.svg";

import FAQCategoryBar from "./FAQCategoryBar";
import FAQCategoryButton from "./FAQCategoryButton";

import ChatbotClovaLoading from "@/src/pages/Chatbot/components/loading/ChatbotClovaLoading"

// 외부 클릭시 닫히는 이벤트 훅
import { useOutsideClick } from "@/src/hooks/useOutsideClick";

// 클로바 API
import { handleGetClovaAnswer } from "@/src/api/ChatbotApiHandler";

interface Props {
  isStadiumSelected: boolean; // boolean 값을 props로 받음
  onSelect: (category: string) => void;
  onClovaResponseUpdate: (question: string, answer: string) => void;
}

const ChatbotInputField = ({isStadiumSelected, onSelect, onClovaResponseUpdate}: Props) => {
  const [isFAQCategoryVisible, setIsFAQCategoryVisible] = useState(false);
  const [inputClovaMessage, setInputClovaMessage] = useState("");   // 클로바에게 보낼 메시지
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태 관리

  ///////////////////////////////////////////////
  ////// 카테고리 관련
  // FAQCategory 컴포넌트 외부 클릭 시 카테고리바 닫기
  const closeFAQCategory = () => {
    setIsFAQCategoryVisible(false);
  };

  // FAQCategory 컴포넌트 감지를 위한 ref
  const categoryRef = useOutsideClick(closeFAQCategory);

  // 카테고리바 or 카테고리 버튼을 토글로 렌더링
  const renderFAQCategory = () => {
    if(isFAQCategoryVisible) {
      return (
        <div ref={categoryRef}>
          <FAQCategoryBar setIsFAQCategoryVisible={setIsFAQCategoryVisible} onSelect={onSelect} />
        </div>
      );
    }else {
      return <FAQCategoryButton setIsFAQCategoryVisible={setIsFAQCategoryVisible} />
    }
  };


  ///////////////////////////////////////////////
  ////// 클로바 관련
  // 전송 버튼 클릭시 클로바에게 메시지 전송
  const handleSendButton = useCallback(async () => {
    const inputQuestion = inputClovaMessage;

    // 빈 메시지인 경우 처리하지 않음
    if (inputClovaMessage.trim() === "") {
      return;
    }

    // 전송 후 입력창 비우기 (빠르게 상태 업데이트)
    setInputClovaMessage("");
    setIsLoading(true); // 로딩 시작


    try {
      // 메시지를 API 파라미터로 전송 및 응답 받기
      const response = await handleGetClovaAnswer({
        message: inputClovaMessage,
      });
      console.log(response);

      if (!response) {
        return; // response가 없으면 종료
      }
      
      // 부모 컴포넌트에 클로바 데이터 업데이트
      onClovaResponseUpdate(
        inputQuestion?? "",     // 질문
        response.answer ?? "",  // 답변
      );

    } catch (error) {
        // 부모 컴포넌트에 클로바 데이터 업데이트
        onClovaResponseUpdate(
          inputQuestion ?? "",
          "클로바 답변을 받는 것에 실패하였습니다 (에러명: "+error+")",
        );

    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }

  }, [inputClovaMessage, onClovaResponseUpdate]);


  // Enter 키 입력시 버튼 클릭 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendButton(); // Enter 키가 눌리면 handleSendButton 호출
    }
  };


  return (
    <>
      {/* 플러스 버튼 리스트 */}
      {/* 야구장 구역을 선택한 경우에만 함수 호출 */}
      {isStadiumSelected && renderFAQCategory()}

      {/* 입력창 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-[500px] w-full bg-white flex justify-center items-center px-2 pt-3 pb-4">
        <div className="flex items-center w-full bg-grayscale-5 rounded-full px-2 py-[10px]">
          <input
            type="text"
            placeholder="챗봇에게 메시지 보내기"
            className="border-none w-full bg-transparent text-grayscale-60 text-xs font-medium outline-none px-2"
            value={inputClovaMessage} // input 값 초기화
            onChange={(e) => setInputClovaMessage(e.target.value)} // input 값이 변경될 때 상태 업데이트
            onKeyDown={handleKeyDown} // Enter 키 눌렀을 때 이벤트 처리
          />
        </div>
        <button 
          className="ml-2 bg-main-50 rounded-full p-2 flex items-center justify-center text-xxs hover:bg-mainhover-50"
          onClick={handleSendButton}
        >
          <Image src={chatbotClickIcon} alt="메시지 보내기 아이콘" width={20} height={20} />
        </button>
      </div>

      {/* 로딩 상태일 때 렌더링 */}
      {isLoading && (
        <ChatbotClovaLoading/>
      )}
    </>
  );
};

export default ChatbotInputField;
