/** URL */
// 클로바 챗봇
export const clovaURL = "/chatbot/clova";

/** API Type */
// POST 파라미터
export interface ClovaPostParamsType {
};

// POST 요청
export interface ClovaPostRequestType {
    message: string;
}

// POST 응답:  백엔드로부터 받을 데이터
export interface ClovaPostResponseType {
    answer: string;
}


////////////////////////////////////////////////////////
/** URL */
// 가이드 챗봇
export const guideURL = "/chatbot/guide";

/** API Type */
// GET 파라미터
export interface GuideGetParamsType {
    stadiumName: string;
    categoryName: string;
    orderNumber: number;
};

// GET 응답
export interface GuideGetResponseType {
    answer: string;
    imgUrl: string | null;      // 이미지
    linkName: string | null;    // 이동 경로명
    link: string | null;        // 이동 경로
}