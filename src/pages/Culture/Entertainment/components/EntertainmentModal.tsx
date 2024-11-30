import React from "react";
import Image from "next/image";
import CloseButton from "../../../../assets/webp/close_button_gray.webp";
import { EntertainmentItem } from "../../../../constants/CultureData";

interface EntertainmentModalProps {
  item: EntertainmentItem; // 이름을 'item'으로 변경
  onClose: () => void;
}

const EntertainmentModal = ({ item, onClose }: EntertainmentModalProps) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 max-w-[324px] w-full relative">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <Image
            src={CloseButton}
            alt="Close Button"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </button>

        {/* 제목 */}
        <h2 className="text-lg font-bold text-gray-900 mb-5">{item.title}</h2>

        {/* 설명 */}
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <div className="text-sm text-grayscale-80">
            <p>• {item.description}</p>
            </div>
        </div>

        {/* 이미지 */}
        <div className="mb-4">
          <Image
            src={item.image}
            alt={item.title}
            width={500}
            height={300}
            className="w-full rounded-lg object-cover max-h-[165px]"
          />
        </div>

        {/* 구분선 */}
        <div className="border-t border-grayscale-10 my-5"></div>

        {/* 팁 */}
        <div className="text-sm text-main-50 font-semibold">
          ❗️ {item.tip}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentModal;
