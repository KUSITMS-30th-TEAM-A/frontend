import React from "react";
import Image from "next/image";
import tailIcon from "@/src/assets/webp/chatbot_message_left_tail_white_big.webp";  // 꼬랑지
import { maxChatWidth } from "@/src/constants/ChatbotData";

interface Props {
    messageList: string[];
}

// 챗봇 말풍선 컴포넌트 타입1 (꼬랑지가 붙은 버젼)
const RookieMessageWithTail = ({messageList}: Props) => {
  return (
    <div className={`relative bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 ${maxChatWidth}`}>
        {/* 말풍선 꼬랑지 */}
        <Image src={tailIcon} alt="꼬랑지" className="absolute left-[-12px] top-2 w-5 h-5"/>

        {/** 메시지 1줄 이상 배열로 받아서 여러 p태그로 메시지 출력하기 */}
        {messageList.map((message, index) => (
            <p key={index}>{message}</p>
        ))}
    </div>
  );
};

export default RookieMessageWithTail;
