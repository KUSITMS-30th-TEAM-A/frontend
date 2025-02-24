import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import LocationIcon from "../../../assets/svg/culture_location.svg";
import MenuIcon from "../../../assets/svg/culture_menu.svg";

interface CategoryRowData {
  title: string;
  location?: string;
  menu?: string;
  description?: string;
  image: string | StaticImageData;
}

interface CategoryRowProps {
  data: CategoryRowData[];
  isActivity: boolean;
  onCardClick: (data: CategoryRowData) => void;
}

const CategoryRow = ({ data, isActivity, onCardClick }: CategoryRowProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[173px] bg-white rounded-lg cursor-pointer"
          onClick={() => onCardClick(item)}
        >
          <Image
            src={item.image}
            alt={item.title}
            width={173}
            height={150}
            className="w-full h-[150px] object-cover rounded-t-lg"
          />
          <div className="px-2 py-3">
            <h4 className="text-md font-bold text-grayscale-90 mb-[6px]">
              {item.title}
            </h4>
            {item.location && (
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
                  <span className="text-grayscale-90">{item.location}</span>
                </p>
              </div>
            )}
            {item.menu && (
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
                  <span className="text-grayscale-90">{item.menu}</span>
                </p>
              </div>
            )}
            {isActivity && item.description && (
              <p className="text-xs font-medium text-grayscale-90">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryRow;
