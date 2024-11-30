import React from "react";
import { maxChatWidth } from "@/src/constants/ChatbotData";

interface Props {
    messageList: string[]; // 문자열을 배열로 받아서 다음 줄에 작성
}

// 챗봇 말풍선 컴포넌트 타입2
const RookieMessage = ({messageList}: Props) => {
  return (
    // 메시지를 string 배열로 받고 줄바꿈을 배열 원소로 구분해서 출력하기
    <div className={`bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 ${maxChatWidth}`}>
        {/** 메시지 1줄 이상 배열로 받아서 여러 p태그로 메시지 출력하기 */}
        {messageList.map((message, index) => (
            <p key={index}>{message}</p>
        ))}
    </div>
  );
};

export default RookieMessage;
