import React from "react";
import Image from "next/image";
import readyPopupIcon from "../../assets/svg/readyPopup.svg";

interface ReadyStadiumPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReadyStadiumPopup({ isOpen, onClose }: ReadyStadiumPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-[300px] text-center relative">
        <Image
          src={readyPopupIcon}
          alt="준비 중"
          width={285}
          height={192}
          className="mx-auto mb-6"
        />
        <p className="text-lg text-grayscale-90 mb-6 font-bold">해당 구장은 현재 준비 중입니다.</p>
        <button
          onClick={onClose}
          className="bg-main-50 text-white w-full px-4 py-2 rounded-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
}
