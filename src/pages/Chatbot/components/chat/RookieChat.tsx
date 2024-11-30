import React, { useState, useEffect } from "react";

import RookieProfile from "@/src/pages/Chatbot/components/rookie/RookieProfile";
import RookieMessageWithTail from "@/src/pages/Chatbot/components/message/RookieMessageWithTail";
import RookieMessage from "@/src/pages/Chatbot/components/message/RookieMessage";
import RookiePreformattedMessageWithTail from "@/src/pages/Chatbot/components/message/custom/RookiePreformattedMessageWithTail";
import RookiePreformattedMessage from "@/src/pages/Chatbot/components/message/custom/RookiePreformattedMessage";
import RookieImageMessage from "@/src/pages/Chatbot/components/message/custom/RookieImageMessage";
import RookieImgUrlMessage from "@/src/pages/Chatbot/components/message/custom/RookieImgUrlMessage";
import RookiePreformattedButtonMessage from "@/src/pages/Chatbot/components/message/custom/RookiePreformattedButtonMessage";
import RookiePreformattedButtonMessageWithTail from "@/src/pages/Chatbot/components/message/custom/RookiePreformattedButtonMessageWithTail";

import { questionCategories } from "@/src/constants/ChatbotData";

// << 루키 채팅 구조 >>
// 아래 내용들 중 원하는 것만 선택하여 배열로 받아서 순차적으로 출력.
// 내용물은 총 7가지 종류이고, 같은 종류를 반복적으로 배열 원소로 받을 수 있음.
// 한 원소로 전달받은 내용물은 하나의 루키 프로필, 프로필명과 함께 출력됨.
//
// 1. 이미지 (선택)
//      -> Image 컴포넌트로 출력
// 2. 외부 이미지 URL (선택)
//      -> img 태그로 출력
// 3. 컴포넌트 (선택)
//      -> 그대로 출력
// 4. 텍스트 배열 with tail
//      -> 꼬랑지 말풍선에 출력
//      -> 텍스트 리스트는 줄바꿈으로 원소를 구분해서 하나의 말풍선 안에 출력
//      -> (ex) ["안녕하세요", "나는 박인애입니다."]
// 5. 텍스트 배열
//      -> 일반 말풍선에 출력
// 6. 문자열 with tail
//      -> \n 을 줄바꿈으로 인식하는 꼬랑지 말풍선에 출력
//      -> (ex) "안녕하세요\n나는 박인애입니다."
// 7. 문자열
//      -> \n 을 줄바꿈으로 인식하는 일반 말풍선에 출력
// 8. 버튼 + 문자열 with tail
//      -> \n 을 줄바꿈으로 인식하는 버튼이 달린 꼬랑지 말풍선에 출력
// 9. 버튼 + 문자열
//      -> \n 을 줄바꿈으로 인식하는 버튼이 달린 일반 말풍선에 출력
export type RookieChatContentType = |
{ type: "image"; content: string } | 
{ type: "imgUrl"; content: string } | 
{ type: "component"; content: React.ReactNode} | 
{ type: "textListWithTail"; content: string[] } | 
{ type: "textList"; content: string[] } | 
{ type: "preformattedTextWithTail"; content: string } |
{ type: "preformattedText"; content: string } |
{ type: "preformattedTextButtonWithTail"; content: string; buttonContent:string; url: string; } |
{ type: "preformattedTextButton"; content: string; buttonContent:string; url: string; };

interface RookieChatProps { /*

    initialMessage?: string[];
    initialPreformattedMessage?: string; */
    contentList?: Array<RookieChatContentType>;
}

// 루키 채팅 한 세트를 그룹화한 컴포넌트
const RookieChat = ({contentList}: RookieChatProps) => {

    return (
        <div className="flex items-start mb-2 ">
            {/* 챗봇 프로필 사진 */}
            <RookieProfile/>
            <div className="flex-col px-4 space-y-2">
                {/* 챗봇 이름 */}
                <p className="text-[14px] font-medium text-black">챗봇 {questionCategories.chatbotName}</p>
                
                {/* 프로필, 이름과 함께 렌더링할 내용물들을 순차적으로 출력 */}
                {contentList && contentList.map((item, index) => {
                    switch (item.type) {
                    // 프론트 단에서 관리하는 이미지인 경우: Image 태그
                    case "image":
                        return (
                            <div key={index}>
                                <RookieImageMessage imgIcon={item.content} />
                            </div>
                        );
                    
                    // 백엔드에서 넘겨준 외부 이미지 URL 링크인 경우: img 태그
                    case "imgUrl":
                        return (
                            <div key={index}>
                                <RookieImgUrlMessage imgUrl={item.content} />
                            </div>
                        );

                    // 컴포넌트인 경우: 컴포넌트(item) 그대로 반환
                    case "component":
                        return (
                            <div key={index}>
                                {item.content}
                            </div>
                        );
                        
                    // string[]인 경우: 각 배열 원소를 줄바꿈으로 인식하는 루키 [꼬랑지] 말풍선 컴포에 담아서 반환
                    case "textListWithTail":
                        return (
                            <div key={index}>
                                <RookieMessageWithTail messageList={item.content}/>
                            </div>
                        );

                    // string[]인 경우: 각 배열 원소를 줄바꿈으로 인식하는 루키 말풍선 컴포에 담아서 반환
                    case "textList":
                        return (
                            <div key={index}>
                                <RookieMessage messageList={item.content} />
                            </div>
                        );
                    
                    // string인 경우: \n을 줄바꿈으로 인식하는 루키 [꼬랑지] 말풍선 컴포에 담아서 반환
                    case "preformattedTextWithTail":
                        return (
                            <div key={index}>
                                <RookiePreformattedMessageWithTail message={item.content} />
                            </div>
                        );
                    
                    // string인 경우: \n을 줄바꿈으로 인식하는 루키 말풍선 컴포에 담아서 반환
                    case "preformattedText":
                        return (
                            <div key={index}>
                                <RookiePreformattedMessage message={item.content} />
                            </div>
                        );
                    
                    // string인 경우: \n을 줄바꿈으로 인식하는 버튼이 달린 루키 [꼬랑지] 말풍선 컴포에 담아서 반환
                    case "preformattedTextButtonWithTail":
                        return (
                            <div key={index}>
                                <RookiePreformattedButtonMessageWithTail message={item.content} buttonMsg={item.buttonContent} buttonLinkUrl={item.url} />
                            </div>
                        );
                    
                    // string인 경우: \n을 줄바꿈으로 인식하는 버튼이 달린 루키 말풍선 컴포에 담아서 반환
                    case "preformattedTextButton":
                        return (
                            <div key={index}>
                                <RookiePreformattedButtonMessage message={item.content} buttonMsg={item.buttonContent} buttonLinkUrl={item.url} />
                            </div>
                        );

                    default:
                        return null;
                    }
                })}
            </div>
        </div>
    );
};

export default RookieChat;
