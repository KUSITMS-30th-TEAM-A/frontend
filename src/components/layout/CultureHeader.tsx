import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import GuideIcon from "../../assets/webp/guide_header.webp";
import NotificationIcon from "../../assets/webp/notification_gray.webp";
import Dropdown from "../dropdown/BigDropdown";
import CoachMark from "../../pages/Main/components/CoachMark";
import { StadiumType } from "@/src/constants/ZoneData";

interface CultureHeaderProps {
  onStadiumSelect: (stadium: StadiumType) => void;
  selectedStadium: StadiumType; // 추가된 Prop
}

const CultureHeader = ({ onStadiumSelect, selectedStadium }: CultureHeaderProps) => {
  const [isCoachMarkVisible, setIsCoachMarkVisible] = useState(false);
  const router = useRouter();

  // 코치마크 아이콘 클릭
  const handleGuideClick = () => {
    setIsCoachMarkVisible(true);
  };

  // 코치마크 닫기
  const handleCloseCoachMark = () => {
    setIsCoachMarkVisible(false);
  };

   // 알림 버튼 클릭 시 Alarm 페이지로 이동
   const handleNotificationClick = () => {
    router.push("/alarm");
  };

  return (
    <>
      <div className={`${isCoachMarkVisible ? "hidden" : "block"}`}>
        <div className="flex justify-between items-center py-3 px-4 border-b border-grayscale-10 w-full z-20">
          <Dropdown
            options={[StadiumType.JAMSIL, StadiumType.SUWON_KT]} // 드롭다운 옵션
            selectedOption={selectedStadium} // 선택된 경기장 전달
            onSelect={onStadiumSelect} // 선택 이벤트 전달
          />

          {/* 코치마크, 알림 아이콘 */}
          <div className="flex space-x-3">
            <Image
              src={GuideIcon}
              alt="Guide Icon"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handleGuideClick}
            />
            <Image
              src={NotificationIcon}
              alt="Notification Icon"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handleNotificationClick}
            />
          </div>
        </div>
      </div>

      {/* 코치마크 렌더링 */}
      {isCoachMarkVisible && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-100 flex items-center justify-center">
          <CoachMark onClose={handleCloseCoachMark} />
        </div>
      )}
    </>
  );
};

export default CultureHeader;
