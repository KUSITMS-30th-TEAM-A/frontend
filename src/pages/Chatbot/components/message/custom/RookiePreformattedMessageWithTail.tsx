import React from "react";
import Image from "next/image";
import tailIcon from "@/src/assets/webp/chatbot_message_left_tail_white_big.webp";  // 꼬랑지
import { maxChatWidth } from "@/src/constants/ChatbotData";

interface Props {
    message: string;
}

// 챗봇 커스텀 말풍선 컴포넌트 (꼬랑지가 붙은 버젼)
// /n(new line) 등이 반영되도록 whitespace-pre-wrap 스타일 적용한 말풍선
const RookiePreformattedMessageWithTail = ({message}: Props) => {
  return (
    // 메시지를 string으로 받고 줄바꿈을 \n 값으로 구분해서 출력하기
    <div className={`relative whitespace-pre-wrap bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 ${maxChatWidth}`}>
        {/* 말풍선 꼬랑지 */}
        <Image src={tailIcon} alt="꼬랑지" className="absolute left-[-12px] top-2 w-5 h-5"/>
        
        {/* 메시지 출력 */}
        {message}
    </div>
  );
};

export default RookiePreformattedMessageWithTail;
