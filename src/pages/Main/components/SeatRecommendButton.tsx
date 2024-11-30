import React from "react";
import { useRouter } from "next/router";

import { StadiumType } from "@/src/constants/ZoneData";

interface Props {
  stadiumName: StadiumType;
}


export default function FindSectionButton({stadiumName}: Props) {
  const router = useRouter();

  // 클릭시 발동하는 이벤트
  const handleClick = () => {
    redirect();
  };

  // 추천 질문 페이지로 이동 이벤트
  const redirect = () => {
    router.push({
      pathname: '/recommend/question',  // 리다이렉트할 경로
      query: {                          // 쿼리 파라미터 전달
        stadiumName: stadiumName,
      },
    });
  }

  return (
    <div className="flex w-full mt-[42px]">
      {/** 상대 위치로 배트 이미지를 시작하기 버튼으로부터 40px 위에, 왼쪽으로부터 13% 위치에 배치 */}
      {/** 상대 위치로 공 이미지를 시작하기 버튼으로부터 40px 위에, 왼쪽으로부터 85% 위치에 배치 */}
      <div className="relative w-full">
        {/** z-10 relative: 맨 위에 배치 */}
        <button
          onClick={handleClick}
          className="flex justify-center items-center w-full rounded-[8px] h-[60px] bg-main-50 text-grayscale-0 text-lg font-bold hover:bg-mainhover-50 z-0"
        >
          나에게 맞는 구역 찾으러 가기
        </button>
      </div>
    </div>
  );
}
