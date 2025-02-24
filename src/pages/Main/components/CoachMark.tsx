import React, { useState } from "react";
import Image from "next/image";
import coachMark1 from "../../../assets/webp/coachmark01.webp";
import coachMark2 from "../../../assets/webp/coachmark02.webp";
import coachMark3 from "../../../assets/webp/coachmark03.webp";
import closeButtonIcon from "../../../assets/webp/close_button_white.webp";

interface CoachMarkProps {
  onClose: () => void;
}

const CoachMark = ({ onClose }: CoachMarkProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const images = [coachMark1, coachMark2, coachMark3];
  
  // 버튼 스타일 정의
  const commonButtonClass = "absolute w-10 h-10 bg-white bg-opacity-40 rounded-full flex items-center justify-center transform -translate-y-1/2";
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-[402px] flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-6 left-4 rounded-full flex items-center justify-center z-30"
        >
          <Image
            src={closeButtonIcon}
            alt="닫기 버튼"
            width={24}
            height={24}
            objectFit="contain"
          />
        </button>

        <div className="relative w-full h-full">
          <Image
            src={images[currentStep - 1]}
            alt={`코치마크 ${currentStep}`}
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* 이전 버튼 */}
        {currentStep > 1 && (
          <button
            onClick={handlePrev}
            className={`${commonButtonClass} left-[10px] top-1/2`}
          >
            <span>&larr;</span>
          </button>
        )}

        {/* 다음 버튼 */}
        {currentStep < 3 && (
          <button
            onClick={handleNext}
            className={`${commonButtonClass} right-[10px] top-1/2`}
          >
            <span>&rarr;</span>
          </button>
        )}

        {/* 마지막 페이지 히트존 바로가기 */}
        {currentStep === 3 && (
          <button
            onClick={onClose}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-4 w-[92%] h-[48px] bg-main-50 text-grayscale-0 text-md font-semibold rounded-[8px] hover:bg-main-60 z-0"
          >
            HitZone으로 가기
          </button>
        )}
      </div>
    </div>
  );
};

export default CoachMark;
