import React from "react";
import Image from "next/image";
import tailIcon from "@/src/assets/webp/chatbot_message_left_tail_white_big.webp";  // 꼬랑지
import { maxChatWidth, minCategoryWidth } from "@/src/constants/ChatbotData";

interface Props {
    messageList: string[];
}

// 챗봇 커스텀 말풍선 컴포넌트 (꼬랑지가 붙은 버젼)
// 메시지를 리스트로 출력
const RookieWhiteListMessageWithTail = ({messageList}: Props) => {
  return (
    <div className={`relative bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 ${maxChatWidth}`}>
        {/* 말풍선 꼬랑지 */}
        <Image src={tailIcon} alt="꼬랑지" className="absolute left-[-12px] top-2 w-5 h-5"/>

        {/** 메시지 1줄 이상 배열로 받아서 여러 li 태그로 메시지 출력하기 */}
        <ul className="space-y-1.5">
            {messageList.map((message, index) => (
                <li
                  key={index}
                  className={`px-2 text-xs text-left font-regular text-grayscale-90 rounded-md ${minCategoryWidth} w-full`}
                >
                  {message}
                </li>
            ))}
        </ul>
    </div>
  );
};

export default RookieWhiteListMessageWithTail;
