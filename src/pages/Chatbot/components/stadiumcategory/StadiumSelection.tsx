import React, { useState } from "react";
import Image from "next/image";
import stadiumIcon from "@/src/assets/svg/chatbot_select_stadium.svg";

import { StadiumType } from "@/src/constants/ZoneData";

interface StadiumSelectionProps {
  stadiums: string[];
  onSelect: (stadium: string) => void;
}

const StadiumSelection = ({ stadiums, onSelect }: StadiumSelectionProps) => {
  // 선택한 구장 저장
  const [selectedStadium, setSelectedStadium] = useState<string>("");

  // 1번 선택시 더 이상 선택 불가하도록
  const handleClick = (stadium: string) => {
    if (isProvidedStadium(stadium) && !selectedStadium) {
      setSelectedStadium(stadium);
      onSelect(stadium); // 부모로 선택된 값 전달
    }
  };

  // 선택 가능한지 여부를 판단하는 함수
  const isProvidedStadium = (stadium: string): boolean =>
    stadium === StadiumType.JAMSIL || stadium === StadiumType.SUWON_KT;


  // 카테고리에서 스타디움 리스트를 렌더링하는 함수
  const renderStadium = (stadium: string) => {
    return (
      <div
        key={stadium}
        onClick={() => handleClick(stadium)}
        className={`py-2 rounded-md text-center
          ${
            stadium === selectedStadium? "bg-grayscale-10 text-grayscale-30" :   // 선택한 구장인 경우
            isProvidedStadium(stadium)? "bg-grayscale-5 text-grayscale-90 cursor-pointer hover:bg-grayscale-10":  // 제공하는 구장이고 선택한 구장이 없는 경우
            isProvidedStadium(stadium) && selectedStadium? "bg-grayscale-5 text-grayscale-90":    // 제공하는 구장이고 선택한 구장이 있는 경우
            "bg-grayscale-5 text-grayscale-30" // 제공하지 않는 구장인 경우
          }`
        }>
        {stadium}
      </div>
    )
  }
  
  return (
    <div className="flex">
      <div className="bg-white rounded-lg max-w-[245px] w-full">
        <Image src={stadiumIcon} alt="구장 선택" width={245} height={99} />
        <div className="grid grid-cols-1 gap-2 p-3 text-xs font-regular">
          {stadiums.map((stadium) => (
            renderStadium(stadium)
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StadiumSelection;
