// 화면 크기에 대한 이넘 정의
export enum ScreenWidthSize {
    SMALL = 360,        // 작은 폰 기종 화면 (360px)
    MEDIUM = 390,       // 일반 폰 기종 화면 (390px)
    LARGE = 400,        // Pro 폰 기종 화면 (400~410px)
    EXTRA_LARGE = 500,  // Web, 패드 등 모바일 이외 전자기기에서 최대 너비 제한 (500px 이상)
}

// 화면 크기별 너비와 높이를 하나의 객체로 통합하여 관리
import { StadiumType } from "./ZoneData";
export interface ImageSize {
    width: number;
    height: number;
}


export const ImageDimensions: Record<StadiumType, Record<ScreenWidthSize, ImageSize>> = {
    [StadiumType.JAMSIL]: {
        [ScreenWidthSize.SMALL]: { width: 328, height: 311 },
        [ScreenWidthSize.MEDIUM]: { width: 347, height: 329 },
        [ScreenWidthSize.LARGE]: { width: 390, height: 369 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 476, height: 451 },
    },
    [StadiumType.SUWON_KT]: {
        [ScreenWidthSize.SMALL]: { width: 293, height: 320 },
        [ScreenWidthSize.MEDIUM]: { width: 342, height: 374 },
        [ScreenWidthSize.LARGE]: { width: 397, height: 434 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 467, height: 510 },
    },


    ///// 제공하지 않는 이미지라서 임시적으로 width, height 모두 0으로 했음
    [StadiumType.GOCHEOK_SKY_DOME]: {
        [ScreenWidthSize.SMALL]: { width: 0, height: 0 },
        [ScreenWidthSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenWidthSize.LARGE]: { width: 0, height: 0 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.KIA_CHAMPIONS_FIELD]: {
        [ScreenWidthSize.SMALL]: { width: 0, height: 0 },
        [ScreenWidthSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenWidthSize.LARGE]: { width: 0, height: 0 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.SAMSUNG_LIONS_PARK]: {
        [ScreenWidthSize.SMALL]: { width: 0, height: 0 },
        [ScreenWidthSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenWidthSize.LARGE]: { width: 0, height: 0 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.HANWHA_EAGLES_PARK]: {
        [ScreenWidthSize.SMALL]: { width: 0, height: 0 },
        [ScreenWidthSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenWidthSize.LARGE]: { width: 0, height: 0 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.LOTTE_GIANTS_PARK]: {
        [ScreenWidthSize.SMALL]: { width: 0, height: 0 },
        [ScreenWidthSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenWidthSize.LARGE]: { width: 0, height: 0 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.SSG_LENDERS_FIELD]: {
        [ScreenWidthSize.SMALL]: { width: 0, height: 0 },
        [ScreenWidthSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenWidthSize.LARGE]: { width: 0, height: 0 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    [StadiumType.CHANDWON_NC_PARK]: {
        [ScreenWidthSize.SMALL]: { width: 0, height: 0 },
        [ScreenWidthSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenWidthSize.LARGE]: { width: 0, height: 0 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
    // 이미 존재하는 stadium 타입들도 그대로 두고, 'NONE'에 대해서만 0 값을 지정
    [StadiumType.NONE]: {
        [ScreenWidthSize.SMALL]: { width: 0, height: 0 },
        [ScreenWidthSize.MEDIUM]: { width: 0, height: 0 },
        [ScreenWidthSize.LARGE]: { width: 0, height: 0 },
        [ScreenWidthSize.EXTRA_LARGE]: { width: 0, height: 0 },
    },
};


// 화면 너비를 기반으로 ScreenWidthSize 결정하는 함수
// 파라미터로 받은 width가 SMALL이랑 같거나 작으면 SMALL, SMALL보다 크고 LARGE보다 작으면 MEDIUM, LARGE 이상은 LARGE를 기준으로 width, height 값을 주는 로직으로 수정해줘
const getScreenWidthSizeFromWindow = (width: number): ScreenWidthSize => {
    if (width <= ScreenWidthSize.SMALL) {
        return ScreenWidthSize.SMALL;
    } else if (width > ScreenWidthSize.SMALL && width < ScreenWidthSize.LARGE) {
        return ScreenWidthSize.MEDIUM;
    } else if (width >= ScreenWidthSize.LARGE && width < ScreenWidthSize.EXTRA_LARGE) {
        return ScreenWidthSize.LARGE;
    } else {
        return ScreenWidthSize.EXTRA_LARGE;
    }
};

// 이미지 크기를 각각의 width와 height로 반환하는 함수
export const getImageDimensions = (stadiumName: StadiumType, windowWidth: number): ImageSize => {
    const screenWidthSize = getScreenWidthSizeFromWindow(windowWidth);
    const dimensions = ImageDimensions[stadiumName]?.[screenWidthSize];
    
    if (dimensions) {
        return { width: dimensions.width, height: dimensions.height };
    } else {
        return { width: 0, height: 0 }; // 기본값
    }
};

