import React from "react";
import { EntertainmentItem } from "../../../../constants/CultureData";
import Image from "next/image";

interface EntertainmentViewAllPageProps {
  title: string; // 전체보기 페이지 제목
  data: EntertainmentItem[]; // 렌더링할 데이터
  onBack: () => void; // 뒤로가기 동작
}

const EntertainmentViewAllPage = ({
  title,
  data,
  onBack,
}: EntertainmentViewAllPageProps) => {
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
          <div key={index} className="mb-8">
            <div className="flex items-start">
              {/* 이미지 */}
              <div className="flex-shrink-0 w-[92px] h-[92px] overflow-hidden rounded-lg relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={92}
                  height={92}
                  className="object-cover w-full h-full"
                />
                {/* 순번 표시 */}
                <span className="absolute top-[-8px] left-[-8px] w-5 h-5 bg-main-50 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              {/* 텍스트 정보 */}
              <div className="ml-4 flex-grow">
                <h3 className="text-md font-bold text-grayscale-90 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-grayscale-90 leading-5">
                • {item.description}
                </p>
              </div>
            </div>

            {/* 팁 */}
            {item.tip && (
              <div className="mt-3 p-3 bg-main-5 rounded-md">
                <p className="text-xs text-main-50 font-semibold">
                  ❗ {item.tip}
                </p>
              </div>
            )}

            {/* 구분선 */}
            {index < data.length - 1 && (
              <hr className="my-6 border-t border-grayscale-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntertainmentViewAllPage;
