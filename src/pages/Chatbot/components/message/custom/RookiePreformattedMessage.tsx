import React from "react";
import { maxChatWidth } from "@/src/constants/ChatbotData";

interface Props {
    message: string;
}

// 챗봇 커스텀 말풍선 컴포넌트
// /n(new line) 등이 반영되도록 whitespace-pre-wrap 스타일 적용한 말풍선
const RookiePreformattedMessage = ({message}: Props) => {
  return (
    // 메시지를 string으로 받고 줄바꿈을 \n 값으로 구분해서 출력하기
    <div className={`whitespace-pre-wrap bg-main-0 p-3 rounded-lg text-xs font-regular text-grayscale-90 ${maxChatWidth}`}>
      {[message]}
    </div>
  );
};

export default RookiePreformattedMessage;
