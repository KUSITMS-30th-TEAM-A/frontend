/** URL */
// 안 쓸거 같긴 해
// 스타디움 구역 목록
export const zoneURL = "/stadium/zones";

/** API Type */
// GET 파라미터
export interface ZoneGetParamsType {
    stadiumName: string;
};

// GET 응답
// response.paylode
export interface ZoneGetResponseType { 
    imgUrl: string;
    introduction: string;
    zones: ZoneType[];
}

export interface ZoneType { 
    zoneName: string;
    zoneColor: string;
}


////////////////////////////////////////////////////////
/** URL */
// 스타디움 구역 가이드 정보
export const guideURL = "/stadium/zones/guide";

/** API Type */
// GET 파라미터
export interface GuideGetParamsType {
    stadiumName: string;
    zoneName: string;
};

// GET 응답
export interface GuideGetResponseType {       // interface Zone으로 할지 고민
    imgUrl: string;
    zoneName: string;
    zoneColor: string;
    explanation: string;
    firstBaseSide: string;
    thirdBaseSide: string;
    entrance: string[];
    stepSpacing: string[];
    seatSpacing: string[];
    usageInformation: string[];
    tip: string;
    referencesGroup: ReferenceGroup[];
}

export interface ReferenceGroup {
    groupTitle: string;
    references: Reference[];
}

export interface Reference {
    title: string;
    contents: string[];
}

export interface GuideDetail {
    zoneName: string;
    zoneColor: string;
    tip: string;
    referencesGroup: ReferenceGroup;
}