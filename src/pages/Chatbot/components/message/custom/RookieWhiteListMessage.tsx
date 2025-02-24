import React from "react";
import { maxChatWidth, minCategoryWidth } from "@/src/constants/ChatbotData";

interface Props {
    messageList: string[];
}

// 챗봇 커스텀 말풍선 컴포넌트
// 메시지를 리스트로 출력
const RookieWhiteListMessage = ({messageList}: Props) => {
  return (
    <div className={`bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 ${maxChatWidth}`}>
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

export default RookieWhiteListMessage;
