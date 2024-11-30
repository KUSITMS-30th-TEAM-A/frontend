
import { postClova, getGuide } from "./ChatbotApiService";
import { ClovaPostRequestType, GuideGetParamsType } from "./ChatbotApiType";

import { getStadiumChatApiData } from "@/src/constants/ChatbotData";


export const handleGetGuideAnswer = async ({stadiumName, categoryName, orderNumber}: GuideGetParamsType) => {
    try {
        const stadiumApiData = getStadiumChatApiData(stadiumName);
        
        // API 요청
        const response = await getGuide(
            {
                stadiumName: stadiumApiData,
                categoryName: categoryName,
                orderNumber: orderNumber,
            }
        );
        
        //console.log("챗봇 가이드 데이터 받았당 >> ", response);

        // 파싱
        const data = response.payload;
        const parsedData = {
            answer: data.answer,
            imageUrl: data.imgUrl ?? "",    // imgUrl이 null일 경우 빈 문자열 반환
            linkName: data.linkName ?? "",  // linkName이 null일 경우 빈 문자열 반환
            link: data.link ?? "",          // link가 null일 경우 빈 문자열 반환
        };

        //console.log(parsedData);
        
        return parsedData;

    } catch (error) {
        console.error('챗봇 가이드 데이터 가져오는 중 오류 발생:', error);
    }
};


export const handleGetClovaAnswer = async ({message}: ClovaPostRequestType) => {
    try {
        
        // API 요청
        const response = await postClova(
            {
                message: message,
            }
        );
        
        console.log("챗봇 클로바 데이터 받았당 >> ", response);

        // 파싱
        const data = response.payload;
        const parsedData = {
            answer: data.answer,    // 클로바 답변
        };

        //console.log(parsedData);
        
        return parsedData;

    } catch (error) {
        console.error('챗봇 클로바 데이터 가져오는 중 오류 발생:', error);
    }
};