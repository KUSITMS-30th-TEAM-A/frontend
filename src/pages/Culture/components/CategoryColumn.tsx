import React from "react";
import Image from "next/image";
import LocationIcon from "../../../assets/svg/culture_location.svg";
import MenuIcon from "../../../assets/svg/culture_menu.svg";
import PriceIcon from "../../../assets/svg/culture_price.svg";

interface CategoryColumnData {
  title: string;
  location?: string;
  menu?: string;
  price?: string;
  description?: string;
  image: string;
}

interface CategoryColumnProps {
  data: CategoryColumnData[];
  onCardClick?: (data: CategoryColumnData) => void;
}

const CategoryColumn = ({ data, onCardClick }: CategoryColumnProps) => {
  return (
    <div className="flex flex-col">
      {data.map((item, index) => (
        <div key={index}>
          <div
            className="cursor-pointer"
            onClick={() => onCardClick?.(item)}
          >
            <div className="flex">
              {/* 이미지 */}
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={92}
                  height={92}
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex flex-col justify-between ml-4 flex-grow">
                {/* 가게 이름 */}
                <h3 className="text-md font-bold text-grayscale-90">{item.title}</h3>

                {/* 위치 */}
                {item.location && (
                  <div className="flex items-center mt-2">
                    <Image
                      src={LocationIcon}
                      alt="location icon"
                      width={16}
                      height={16}
                    />
                    <p className="flex text-xs font-semibold text-grayscale-70 ml-[2px]">
                      위치
                    </p>
                    <p className="text-xs font-medium text-grayscale-90 ml-[6px]">
                      {item.location}
                    </p>
                  </div>
                )}

                {/* 대표 메뉴 */}
                {item.menu && (
                  <div className="flex items-center mt-2">
                    <Image
                      src={MenuIcon}
                      alt="menu icon"
                      width={16}
                      height={16}
                    />
                    <p className="flex text-xs font-semibold text-grayscale-70 ml-[2px]">
                      대표메뉴
                    </p>
                    <p className="text-xs font-medium text-grayscale-90 ml-[6px]">
                      {item.menu}
                    </p>
                  </div>
                )}

                {/* 가격 */}
                {item.price && (
                  <div className="flex items-center mt-2">
                    <Image
                      src={PriceIcon}
                      alt="price icon"
                      width={16}
                      height={16}
                    />
                    <p className="flex text-xs font-semibold text-grayscale-70 ml-[2px]">
                      가격
                    </p>
                    <p className="text-xs font-medium text-grayscale-90 ml-[6px]">
                      {item.price}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 설명 */}
            {item.description && (
              <div className="bg-main-5 p-3 rounded-md text-xs text-main-50 font-semibold mt-3">
                ❗ {item.description}
              </div>
            )}
          </div>

          {/* 구분선 */}
          {index < data.length - 1 && (
            <hr className="border-t border-grayscale-10 my-6" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryColumn;
