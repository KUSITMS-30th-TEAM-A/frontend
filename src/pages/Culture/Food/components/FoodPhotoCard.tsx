import React from "react";
import Image from "next/image";
import { FoodItem } from "../../../../constants/CultureData";
import LocationIcon from "../../../../assets/svg/culture_location.svg";
import MenuIcon from "../../../../assets/svg/culture_menu.svg";

interface FoodPhotoCardProps {
  food: FoodItem;
  onClick: () => void;
}

const FoodPhotoCard = ({ food, onClick }: FoodPhotoCardProps) => {
  if (!food || !food.image) return null;

  return (
    <div
      className="flex-shrink-0 w-[173px] bg-white rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={food.image}
        alt={food.title}
        width={173}
        height={150}
        className="w-full h-[150px] object-cover rounded-t-lg"
      />

      {/* 제목 */}
      <div className="px-2 py-3">
        <h4 className="text-md font-bold text-grayscale-90 mb-[6px]">
          {food.title}
        </h4>

        {/* 위치 */}
        {food.location && (
          <div className="flex items-start gap-1 mb-[4px]">
            <Image
              src={LocationIcon}
              alt="location icon"
              width={14}
              height={14}
              className="mt-[2px]"
            />
            <p className="text-xs font-medium">
              <span className="text-grayscale-70">위치</span>{" "}
              <span className="text-grayscale-90">{food.location}</span>
            </p>
          </div>
        )}

        {/* 대표 메뉴 */}
        {food.menu && (
          <div className="flex items-start gap-1">
            <Image
              src={MenuIcon}
              alt="menu icon"
              width={14}
              height={14}
              className="mt-[2px]"
            />
            <p className="text-xs font-medium">
              <span className="text-grayscale-70">대표메뉴</span>{" "}
              <span className="text-grayscale-90">{food.menu}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodPhotoCard;
