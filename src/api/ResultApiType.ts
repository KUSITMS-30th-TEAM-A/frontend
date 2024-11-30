/** URL */
// 유저 프로필 정보
export const profileURL = "/results/profile";

/** API Type */
// GET 파라미터
export interface ProfileGetParamsType {
    resultId: number;
};

// GET 응답
// response.paylode.zones   // 1개 ~ 3개
export interface ProfileGetResponseType {       // interface Zone으로 할지 고민
    profileId: number;
    imgUrl: string;
    nickname: string;
    type: string;
    explanation: string;
    hashTags: string[];
}


////////////////////////////////////////////////////////
/** URL */
// 구역 추천 결과 저장
export const saveURL = "/results/save";

/** API Type */
// POST 파라미터
export interface SavePostParamsType {
    //accessToken: string; (선택: 주면 회원, 안 주면 비회원)
};

// POST 요청
export interface SavePostRequestType {
    stadium: string;
    preference: string;
    clientKeywords: string[];
}

// POST 응답:  백엔드로부터 받을 데이터
export interface SavePostResponseType {
    resultId: number;
}


////////////////////////////////////////////////////////
/** URL */
// 추천 구역 리스트
export const zonesURL = "/results/zones";

/** API Type */
// GET 파라미터
export interface ZoneGetParamsType {
    resultId: number;
    count: number;
};

// GET 응답
import { ReferenceGroup } from "./StadiumApiType";
export interface ZoneGetResponseType {       // interface Zone으로 할지 고민
    zoneId: number;
    name: string;
    color: string;
    explanations: string[];
    tip: string;
    referencesGroup: ReferenceGroup[];
}