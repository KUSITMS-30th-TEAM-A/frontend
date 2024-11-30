import React from "react";
import { maxChatWidth } from "@/src/constants/ChatbotData";
import { useRouter } from 'next/router';

interface Props {
    message: string;
    buttonMsg: string;
    buttonLinkUrl: string;
}

// 챗봇 커스텀 말풍선 컴포넌트 (버튼이 붙은 버젼)
// /n(new line) 등이 반영되도록 whitespace-pre-wrap 스타일 적용한 말풍선
const RookiePreformattedButtonMessage = ({message, buttonMsg, buttonLinkUrl}: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(buttonLinkUrl); // 이동할 URL
  };
  
  return (
    // 메시지를 string으로 받고 줄바꿈을 \n 값으로 구분해서 출력하기
    <div className={`relative whitespace-pre-wrap bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 ${maxChatWidth}`}>
        {/* 메시지 출력 */}
        {message}

        {/* 버튼 출력 */}
        <div className="flex justify-center">
            <div className="relative w-full mt-[12px]">
              <button 
                className="flex justify-center items-center w-full rounded-[8px] h-[32px] bg-main-50 text-grayscale-0 text-xs font-semibold hover:bg-mainhover-50 z-10 cursor-pointer"
                onClick={handleClick}
              >
                {buttonMsg}
              </button>
            </div>
        </div>
    </div>
  );
};

export default RookiePreformattedButtonMessage;
