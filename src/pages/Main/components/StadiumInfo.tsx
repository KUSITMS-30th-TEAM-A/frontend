import React from "react";
import { StadiumType } from "@/src/constants/ZoneData";

interface StadiumInfoProps {
  stadiumName: string; //StadiumType;
  firstBase?: string;
  thirdBase?: string;
}

function StadiumInfo({ stadiumName, firstBase, thirdBase }: StadiumInfoProps) {
  // 임시
  const defaultFirstBase = firstBase || (stadiumName === StadiumType.JAMSIL ? "두산베어스, LG 트윈스" : stadiumName === StadiumType.SUWON_KT ? "KT WIZ" : "");
  const defaultThirdBase = thirdBase || (stadiumName === StadiumType.JAMSIL ? "상대팀" : "상대팀");

  return (
    <div className="flex justify-center gap-5 mt-5 text-xs font-medium">
      <div className="text-center flex items-center gap-2">
        <span className="px-2 py-[2px] bg-grayscale-50 text-grayscale-0 rounded-md">1루</span>
        <span>{defaultFirstBase}</span>
      </div>
      <div className="text-center flex items-center gap-2">
        <span className="px-2 py-[2px] bg-grayscale-0 text-grayscale-80 rounded-md">3루</span>
        <span>{defaultThirdBase}</span>
      </div>
    </div>
  );
}

export default StadiumInfo;
