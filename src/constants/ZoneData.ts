// Stadium 관리
export enum StadiumType {
    NONE = '',
    JAMSIL = "잠실종합운동장 (잠실)",
    SUWON_KT = "수원KT위즈파크",

    GOCHEOK_SKY_DOME = "고척스카이돔 (키움)",
    KIA_CHAMPIONS_FIELD = "기아 챔피언스 필드 (광주)",
    SAMSUNG_LIONS_PARK = "삼성 라이온즈 파크 (대구)",
    HANWHA_EAGLES_PARK = "한화생명 이글스 파크 (대전)",
    LOTTE_GIANTS_PARK = "사직 야구장 (부산)",
    SSG_LENDERS_FIELD = "SSG 랜더스필드 (인천)",
    CHANDWON_NC_PARK = "창원 NC 파크 (창원)"
}

// Enum type 배열
export const stadiumList = [
    StadiumType.JAMSIL,
    StadiumType.SUWON_KT,
    StadiumType.GOCHEOK_SKY_DOME,
    StadiumType.KIA_CHAMPIONS_FIELD,
    StadiumType.SAMSUNG_LIONS_PARK,
    StadiumType.HANWHA_EAGLES_PARK,
    StadiumType.LOTTE_GIANTS_PARK,
    StadiumType.SSG_LENDERS_FIELD,
    StadiumType.CHANDWON_NC_PARK
];

// String type 배열
function convertEnumArrayToStringArray(stadiumList: StadiumType[]): string[] {
    return stadiumList.map(stadium => stadium.toString());
}
export const stadiumStringList = convertEnumArrayToStringArray(stadiumList);

// 잠실 Zone 관리

// KT Zone 관리

// Seat 관리
export enum SeatType {
    NONE = '',
    SEAT1 = '1루석',
    SEAT3 = '3루석'
}

// keyword 관리
export enum Keyword {
    NONE = '',
    PARTNER1 = '나 혼자',
    PARTNER2 = '같은 팀 팬과',
    PARTNER3 = '다른 팀 팬과',
    WISH1 = '열정적인 응원',
    WISH2 = '경기장 한눈에 보기',
    WISH3 = '편리한 화장실 이용',
    WISH4 = '음식 먹기 편한',
    WISH5 = '빠른 퇴장 가능',
    WISH6 = '선수들 가까이',
    WISH7 = '삼겹살 구워먹기',
    NOWISH1 = '햇빛 싫어요',
    NOWISH2 = '큰 소리 싫어요',
    NOWISH3 = '높은 곳 싫어요',
    NOWISH4 = '비 맞기 싫어요'
}