import { StaticImageData } from "next/image";
import meal01 from "../assets/webp/culture/meal01.webp";
import meal02 from "../assets/webp/culture/meal02.webp";
import meal03 from "../assets/webp/culture/meal03.webp";
import meal04 from "../assets/webp/culture/meal04.webp";
import meal05 from "../assets/webp/culture/meal05.webp";

import dessert01 from "../assets/webp/culture/dessert01.webp";
import dessert02 from "../assets/webp/culture/dessert02.webp";
import dessert03 from "../assets/webp/culture/dessert03.webp";
import dessert04 from "../assets/webp/culture/dessert04.webp";

import out01 from "../assets/webp/culture/out01.webp";
import out02 from "../assets/webp/culture/out02.webp";
import out03 from "../assets/webp/culture/out03.webp";
import out04 from "../assets/webp/culture/out04.webp";
import out05 from "../assets/webp/culture/out05.webp";

import enjoy01 from "../assets/webp/culture/enjoy01.webp";
import enjoy02 from "../assets/webp/culture/enjoy02.webp";
import enjoy03 from "../assets/webp/culture/enjoy03.webp";
import enjoy04 from "../assets/webp/culture/enjoy04.webp";

// 데이터 타입 정의
export interface FoodItem {
    title: string;
    location: string;
    menu: string;
    price: string;
    description: string;
    image: string | StaticImageData;
  }
  
  export interface EntertainmentItem {
    title: string;
    description: string;
    tip: string;
    image: string | StaticImageData;
  }

const cultureData = {
  food: {
    internal: {
      // 구장 내부 식사류   
      meals: [
        {
          title: "통밥",
          location: "2층 B06 / 2.5층 C05",
          menu: "김치말이국수",
          price: "국수 7,000원 (삼겹살+국수 세트 26,000원)",
          description: "잠실야구장의 최고 인기 메뉴, 김치말이국수! 전석 매진일 기준 경기 1시간 전 주문 필요해요.",
          image: meal01,
        },
        {
          title: "원샷 치킨",
          location: "1층 A03 / 2층 B27",
          menu: "크림새우원샷",
          price: "14,000원~",
          description: "맥주 위에 크림새우와 치킨이 올라간 원샷 치킨! 더운 날 먹기 좋아요.",
          image: meal02,
        },
        {
          title: "명인만두",
          location: "1층 A19 / 2층 B30",
          menu: "만떡 세트",
          price: "13,000원~",
          description: "간단하게 하나씩 집어먹기 편한 명인만두! 분식도 함께 팔아서 먹기 좋아요.",
          image: meal03,
        },
        {
          title: "이가네 떡볶이",
          location: "2층 B33, B40",
          menu: "이가네떡볶이",
          price: "떡볶이 6,500원 / 세트 10,000원~",
          description: "부산에서 유명한 이가네 떡볶이! 떡볶이가 무말랭이가 들어가서 시원한 맛이에요.",
          image: meal04,
        },
        {
          title: "초량어묵",
          location: "내야 1루 출입구 앞",
          menu: "프라이돈(갈비튀김)",
          price: "20,000원",
          description: "양념갈비튀김을 맛 볼 수 있는 초량어묵! 바베큐 소스 또는 소이 소스에 양파와 함께 찍어드세요.",
          image: meal05,
        },
      ],
      // 구장 내부 후식류  
      desserts: [
        {
          title: "와팡",
          location: "2층 B08 / 2.5층 C03 / 3층 D06",
          menu: "한라봉샤벳와팡",
          price: "5,500원~",
          description: "잠실야구장의 대표 디저트 와팡! 더운 날, 달달한 디저트로 먹기 좋아요.",
          image: dessert01,
        },
        {
          title: "백미당",
          location: "2층 B31",
          menu: "유기농 우유 아이스크림",
          price: "4,900원~",
          description: "우유맛이 나는 아이스크림, 백미당! 더운 날에는 컵으로 받아 먹기를 추천해요.",
          image: dessert02,
        },
        {
          title: "달콤커피",
          location: "22층 B07, B29",
          menu: "레몬에이드, 청포도에이드, 말차라떼",
          price: "에이드 6,500원",
          description: "가성비 좋은 달콤커피! 가볍게 먹을 커피나 에이드를 찾는 분들에게 추천해요.",
          image: dessert03,
        },
        {
          title: "카페그라운드",
          location: "2층 B07, B29",
          menu: "오리지널 컵빙수, 망고 컵빙수, 녹차인절미 컵빙수",
          price: "오리지널 8,000원 / 망고, 녹차인절미 8,500원",
          description: "더운 날 시원하게 먹을 수 있는 컵빙수! 컵 형태여서 숟가락으로 먹다가 빨대로 마실 수도 있어요.",
          image: dessert04,
        },
      ],
    },
    // 구장 외부 (먹거리)
    external: [
      {
        title: "파오파오",
        location: "잠실 새마을시장 (잠실새내역 3번 출구)",
        menu: "고기만두, 김치만두",
        price: "3인분 15,000원 / 1인분 6,000원",
        description: "새마을시장의 대표 먹거리 파오파오! 평일 웨이팅은 약 30분이니 참고하세요.",
        image: out01,
      },
      {
        title: "깻잎닭강정",
        location: "잠실 새마을시장 (잠실새내역 3번 출구)",
        menu: "양념닭강정",
        price: "소 7,000원 / 중 9,500원 / 대 10,000원",
        description: "깻잎향이 나는 깻잎닭강정! 야구 시간대에는 대(大) 사이즈만 주문이 가능해요.",
        image: out02,
      },
      {
        title: "잭슨피자",
        location: "종합운동장 9번 출구",
        menu: "수퍼잭슨, 하와이안, 페퍼로니",
        price: "퍼스널 10,800원~ / 레귤러 20,300원~ / 라지 32,300원~",
        description: "야구장과도 가깝고 간편하게 먹기 좋은 잭슨피자! 인원에 맞게 여러 사이즈로 주문할 수 있어요.",
        image: out03,
      },
      {
        title: "직화계",
        location: "잠실새내역 4번출구",
        menu: "숯불순살구이, 닭껍질튀김",
        price: "숯불순살구이 19,000원 / 닭껍질튀김 4,000원",
        description: "숯불향치킨을 맛 볼 수 있는 직화계! 사리를 추가하면 충분한 양으로 먹을 수 있어요.",
        image: out04,
      },
      {
        title: "나레초밥",
        location: "잠실새내역 먹자골목",
        menu: "만원초밥, 모듬초밥",
        price: "10,000원~",
        description: "가성비 있게 먹기 좋은 나레초밥! 포장 시에는 미니우동이 제공되지 않으니 참고하세요.",
        image: out05,
      },
    ],
  },
  entertainment: {
    // 구장 내부 (즐길거리)
    internal: [
      {
        title: "포토카드",
        description: "선수들의 사진을 뽑을 수 있는 포토카드!",
        tip: "기계의 QR을 통해 원하는 선수나, 자신의 사진으로 커스텀 포토카드를 뽑을 수 있으니 참고하세요!",
        image: enjoy01,
      },
      {
        title: "브랜드데이",
        description: "잠실야구장 스폰서 브랜드 중 하나가 구장 밖 매표소 근처에서 이벤트 하는 날!",
        tip: "수시로 진행되기 때문에 야구장에 가는 날에 미리 확인하면 좋아요!",
        image: enjoy02,
      },
      {
        title: "굿즈샵",
        description: "야구 유니폼이나 기타 굿즈들을 구경, 구매하고 싶다면 굿즈샵에 방문해보세요! ",
        tip: "두산베어스, LG트윈스 뿐만 아니라 전 구단 굿즈샵도 있어, 타 팬도 방문할 수 있어요.",
        image: enjoy03,
      },
    ],
    // 구장 외부 (즐길거리)
    external: [
      {
        title: "브랜드데이",
        description: "잠실야구장 스폰서 브랜드 중 하나가 구장 밖 매표소 근처에서 이벤트 하는 날!",
        tip: "수시로 진행되기 때문에 야구장에 가는 날에 미리 확인하면 좋아요!",
        image: enjoy04,
      },
    ],
  },
};

export default cultureData;
