import React from "react";
import { FoodItem } from "../../../../constants/CultureData";
import Image from "next/image";
import LocationIcon from "../../../../assets/svg/culture_location.svg";
import MenuIcon from "../../../../assets/svg/culture_menu.svg";
import PriceIcon from "../../../../assets/svg/culture_price.svg";

interface FoodViewAllPageProps {
  title: string; // 전체보기 페이지 제목
  data: FoodItem[]; // 렌더링할 데이터
  onBack: () => void; // 뒤로가기 동작
}

const FoodViewAllPage = ({ title, data, onBack }: FoodViewAllPageProps) => {
  return (
    <div className="pb-20">
    {/* 헤더 */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-lg font-semibold">
          ←
        </button>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div>
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex mb-4">
              {/* 이미지 */}
              <div className="flex-shrink-0 w-[98px] h-[98px] overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={92}
                  height={92}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* 텍스트 정보 */}
              <div className="ml-4 flex-grow">
                <h3 className="text-md font-bold text-grayscale-90 mb-2">
                  {item.title}
                </h3>

                {/* 위치 */}
                <div className="flex items-center mb-2">
                  <Image
                    src={LocationIcon}
                    alt="location icon"
                    width={16}
                    height={16}
                  />
                  <span className="ml-2 text-xs font-medium text-grayscale-90">
                    {item.location}
                  </span>
                </div>

                {/* 메뉴 */}
                <div className="flex items-center mb-2">
                  <Image
                    src={MenuIcon}
                    alt="menu icon"
                    width={16}
                    height={16}
                  />
                  <span className="ml-2 text-xs font-medium text-grayscale-90">
                    {item.menu}
                  </span>
                </div>

                {/* 가격 */}
                <div className="flex items-center">
                  <Image
                    src={PriceIcon}
                    alt="price icon"
                    width={16}
                    height={16}
                  />
                  <span className="ml-2 text-xs font-medium text-grayscale-90">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>

            {/* 설명 */}
            <p className="mt-2 text-xs font-semibold text-main-50 bg-main-5 p-3 rounded-md">
              ❗ {item.description}
            </p>

            {/* 구분선 */}
            {index < data.length - 1 && (
              <hr className="my-5 border-t border-grayscale-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodViewAllPage;
