/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "!./node_modules"
  ],
  theme: {
    extend: {
      fontSize: {
        "3xl": ["24px", "150%"],
        "2xl": ["22px", "150%"],
        xl: ["20px", "150%"],
        lg: ["18px", "150%"],
        md: ["16px", "150%"],
        sm: ["14px", "150%"],
        xs: ["12px", "150%"],
        xxs: ["11px", "150%"],
        xxxs: ["10px", "150%"],
        xxxxs: ["8px", "150%"],
      },

      fontWeight: {
        regular: "400",
      },

      colors: {
        main: {
          0: "#FFFFFF",
          5: "#FFECF0",
          10: "#FDC4D0",
          20: "#FDC4D0",
          30: "#FB8099",
          40: "#FA6885",
          50: "#F94267",
          60: "#E33C5E",
          70: "#B12F49",
          80: "#892439",
          90: "#691C2B",
        },
        mainhover: {
          50: "#F82A53", // main에서 채도랑 명도 올림
        },
        grayscale: {
          0: "#ffffff",
          5: "#F2F3F6",
          10: "#D7D8E2",
          20: "#C4C6D3",
          30: "#A9ABBF",
          40: "#989BB3",
          50: "#7E82A0",
          60: "#737692",
          70: "#595C72",
          80: "#454858",
          90: "#353743",
        },
        success: {
          10: "#B0EED8",
          50: "#00C782",
          60: "#00B576",
        },
        error: {
          10: "#FFC8C8",
          50: "#FF4C4C",
          60: "#E84545",
        },
        warning: {
          10: "#FFF4C0",
          50: "#FFDD33",
          60: "#E8C92E",
        },
        kt: {
          cheer: "#B23039", // 응원지정석
          sky: "#65C5DE", // 스카이석
          skyzone: "#292F46", // 스카이존
          kidsland: "#008FD7", // 키즈랜드 캠핑존
          central: "#5E346E", // 중앙지정석
          genie: "#599741", // 지니티비석
          ybox: "#F5A545", // Y박스석
          wheelchair: "#FFF100", // 휠체어석
          alphashopping: "#E95560", // KT알파쇼핑석
          geniezone: "#35659E", // 지니존
          exciting: "#3EA6A5", // 익사이팅, 하이파이브
          outfield: "#CEDA82", // 외야잔디석
          coffee: "#855F37", // 정지영커피로스터즈
          pub7: "#A1A2A2", // 7 PUB
          kpop: "#307443", // K-팝 아카데미
          tving: "#E3A3B1", // 티빙 테이블석
          gate1_1: "#4D70B5", // gate 1-1
          gate1_2: "#C64371", // gate 1-2
          gate3_1: "#45AEAF", // gate 3-1
          gate3_2: "#E87B35", // gate 3-2
          gate3_3: "#459643", // gate 3-3
        },
        jamsil: {
          red: "#DC032A", // 레드석
          orange: "#E16900", // 오렌지석
          navy: "#242953", // 네이비석
          blue: "#4699F2", // 블루석
          table: "#7C0065", // 테이블석
          premium: "#185DDD", // 프리미엄석 (켈리존)
          green: "#339600", // 외야그린석
          exciting: "#6D6D6D", // 익사이팅존
        },
      },

      screens: {
        desktop: "1080px",
        tablet: "767px",
        mobile: "390px",
      },
    },
  },
  plugins: [],
};