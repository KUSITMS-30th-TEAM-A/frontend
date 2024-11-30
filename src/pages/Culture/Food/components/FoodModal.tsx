import React from "react";
import Image from "next/image";
import CloseButton from "../../../../assets/webp/close_button_gray.webp";
import { FoodItem } from "../../../../constants/CultureData";

interface FoodModalProps {
  food: FoodItem;
  onClose: () => void;
}

const FoodModal = ({ food, onClose }: FoodModalProps) => {
  if (!food) return null;

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

        <h2 className="text-lg font-bold text-gray-900 mb-5">{food.title}</h2>

        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          {/* 위치 */}
          <div className="flex items-start text-sm text-grayscale-80 mb-2">
            <span className="text-grayscale-60 font-semibold w-[70px] shrink-0">위치</span>
            <p className="flex-1">{food.location}</p>
          </div>
          {/* 대표메뉴 */}
          <div className="flex items-start text-sm text-grayscale-80 mb-2">
            <span className="text-grayscale-60 font-semibold w-[70px] shrink-0">대표메뉴</span>
            <p className="flex-1">{food.menu}</p>
          </div>
          {/* 가격 */}
          <div className="flex items-start text-sm text-grayscale-80">
            <span className="text-grayscale-60 font-semibold w-[70px] shrink-0">가격</span>
            <p className="flex-1">{food.price}</p>
          </div>
        </div>

        {/* 이미지 */}
        <div className="mb-4">
          <Image
            src={food.image}
            alt={food.title}
            width={500}
            height={300}
            className="w-full rounded-lg object-cover max-h-[165px]"
          />
        </div>

        {/* 구분선 */}
        <div className="border-t border-grayscale-10 my-5"></div>

        {/* 설명 */}
        <p className="text-main-50 text-sm font-bold mb-2">❗️ {food.description}</p>

        {/* 버튼 */}
        <button
          className="mt-4 w-full py-2 bg-main-5 text-main-50 text-sm rounded-lg font-semibold"
          onClick={() => alert("모든 식사류 보기 클릭")} // 버튼 동작 수정 필요
        >
          모든 식사류 보기
        </button>
      </div>
    </div>
  );
};

export default FoodModal;
