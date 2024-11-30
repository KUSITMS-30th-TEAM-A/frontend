import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import HitzoneLogo from "../../assets/svg/hitzone_logo.svg";
import GuideIcon from "../../assets/webp/guide_header.webp";
import NotificationIcon from "../../assets/webp/notification_gray.webp";
import CoachMark from "../../pages/Main/components/CoachMark";

const MainHeader = () => {
  const [isCoachMarkVisible, setIsCoachMarkVisible] = useState(false);
  const router = useRouter();

  // 코치마크 아이콘 클릭 시 상태 변경
  const handleGuideClick = () => {
    setIsCoachMarkVisible(true);
  };

  // 알림 버튼 클릭 시 Alarm 페이지로 이동
  const handleNotificationClick = () => {
    router.push("/alarm");
  };

  // 코치마크 닫기
  const handleCloseCoachMark = () => {
    setIsCoachMarkVisible(false);
  };

  return (
    <>
      <div className={`${isCoachMarkVisible ? "hidden" : "block"}`}>
        <div className="flex justify-between items-center p-4 border-b border-grayscale-10 w-full z-20 fixed top-0 bg-white max-w-[500px] mx-auto">
          {/* 히트존 로고 */}
          <Link href="/">
            <Image
              src={HitzoneLogo}
              alt="Hitzone Logo"
              width={154}
              height={27}
              className="cursor-pointer"
            />
          </Link>

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

export default MainHeader;
