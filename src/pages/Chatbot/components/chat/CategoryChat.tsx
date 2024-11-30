import React, { useState } from "react";
import { questionCategories } from "@/src/constants/ChatbotData";

import Image from "next/image";
import tailIcon from "@/src/assets/webp/chatbot_message_left_tail_white_big.webp";  // 꼬랑지

import RookieWhiteListMessageWithTail from "@/src/pages/Chatbot/components/message/custom/RookieWhiteListMessageWithTail";
import RookieImageMessage from "@/src/pages/Chatbot/components/message/custom/RookieImageMessage";

import { GuideGetResponseType } from "@/src/api/ChatbotApiType";
import { handleGetGuideAnswer } from "@/src/api/ChatbotApiHandler";

interface Props {
    stadiumName: string;
    categoryFrontName: string;
    onGuideResponseUpdate: (answer: string, imgUrl: string, linkName: string, link: string, categoryName: string, subCategoryName: string) => void; // 부모로 데이터 전달 콜백
}


// 사용자가 카테고리 클릭시 나오는 커스텀 대화창
const CategoryChat = ({stadiumName, categoryFrontName, onGuideResponseUpdate}: Props) => {
    // 사용자가 선택한 카테고리
    const categories = questionCategories.questionCategories;

    // prop으로 받은 카테고리와 일치하는 항목 필터링
    const filteredCategory = Object.values(categories).find(
        (category) => category.frontendValue === categoryFrontName
    ) || "";


    // 카테고리 클릭시 하위 값 존재 여부에 따른 렌더링 함수
    const renderCategoryDetails = (categoryData: typeof categories[keyof typeof categories]) => (
        <div>
            
            {/* 프론트에서 처리하는 데이터: 이미지 출력 */}
            {/* image 값이 있는 경우: image 렌더링 */}
            {"image" in categoryData && categoryData.image && (
                <div className="mb-2">
                    {/* 이미지 내용 출력*/}
                    <RookieImageMessage imgIcon={categoryData.image.src} />
                </div>
            )}

            
            {/* 프론트에서 처리하는 데이터: 텍스트 출력 */}
            {/* answer 값이 있는 경우: answer 렌더링 */}
            {"answer" in categoryData && categoryData.answer && (
                <div className="mb-2">
                    {/* 답변 내용 출력 */}
                    <RookieWhiteListMessageWithTail messageList={categoryData.answer} />
                </div>
            )}

            
            {/* 백엔드에서 받아오기 전 세부 카테고리 데이터: 리스트 출력 */}
            {/* subcategories 값이 있는 경우: subcategories 렌더링 */}
            {"subcategories" in categoryData && categoryData.subcategories && (
                <div className="p-4 bg-main-0 rounded-lg shadow mb-2">

                    {/* 말풍선 꼬랑지 */}
                    <Image src={tailIcon} alt="꼬랑지" className="absolute left-[-12px] top-2 w-5 h-5"/>
                    
                    {/* 선택한 카테고리에 따른 컴포 제목 */}
                    <h3 className="text-xs font-regular text-grayscale-90 mb-2">
                        {
                            categoryData.icon? categoryData.icon + " 어떤 점이 궁금하신가요?" : null
                        }
                    </h3>
                    
                    {/* 세부 카테고리 내용 */}
                    <ul className="space-y-1.5">
                        {categoryData.subcategories.frontendValues.map((subcategoryName, index) => (
                            <li
                                key={index}
                                className="py-1 px-2 text-xs min-w-[180px] w-full text-center font-regular text-grayscale-90 bg-grayscale-5 hover:bg-grayscale-10 rounded-md cursor-pointer"
                                onClick={async () => {
                                try {
                                    const response = await handleGetGuideAnswer({
                                        stadiumName,
                                        categoryName: categoryData.backendValue,
                                        orderNumber:
                                            categoryData.subcategories.backendParameters[index],
                                    });

                                    //console.log(response);

                                    if (!response) {
                                        // response가 undefined인 경우 undefined 반환
                                        return undefined;
                                    }
                                    
                                    // 부모 컴포넌트에 업데이트
                                    onGuideResponseUpdate(
                                        response.answer ?? "",              // answer가 없으면 빈 문자열
                                        response.imageUrl ?? null,          // imageUrl이 없으면 null
                                        response.linkName ?? null,
                                        response.link ?? null,
                                        categoryData.frontendValue,   // categoryName (props에서 전달받은 값)
                                        subcategoryName            // 선택한 subCategoryName
                                    );
                                    
                                    //alert(`응답 데이터: ${response}`);
                                } catch (error) {
                                    //alert("API 호출에 실패했습니다.");
                                }
                                }}
                            >
                                {/* 리스트에 값 넣기*/}
                                {subcategoryName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
    
    // 필터링된 카테고리가 없을 경우 아무것도 렌더링X
    if (!filteredCategory) {
        return null;
    }

    return (
        <div className="relative max-w-[250px]">
            <ul>
            {Object.entries(categories).map(([key, category]) => {
                return filteredCategory === category ? (
                <li key={key}>
                    {/* 선택한 카테고리에 따른 세부 내용 렌더링 함수 호출 */}
                    {renderCategoryDetails(category)}
                </li>
                ) : null;
            })}
            </ul>
        </div>
    );
};
  
export default CategoryChat;
