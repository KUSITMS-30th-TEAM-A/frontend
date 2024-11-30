import React from "react";
import Image, { StaticImageData } from "next/image";
import CloseButton from "../../../assets/webp/close_button_gray.webp";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    location?: string;
    menu?: string;
    price?: string;
    description?: string;
    tip?: string;
    image: string | StaticImageData;
  } | null;
};

const CultureModal = ({ isOpen, onClose, data }: ModalProps) => {
  if (!isOpen || !data) return null;

  const isActivity = !data.location && !data.menu && !data.price; // 즐길거리 여부 체크

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-grayscale-0 rounded-lg p-5 max-w-[324px] w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <Image
            src={CloseButton}
            alt="Close Button"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </button>

        <h2 className="text-lg font-bold text-grayscale-90 mb-5">구장내부</h2>
        <h3 className="text-md font-bold text-grayscale-90 mb-5">{data.title}</h3>

        {/* 즐길거리 */}
        {isActivity ? (
          <>
            {/* 설명 */}
            <div className="bg-grayscale-5 rounded-lg p-3 mb-4">
              <p className="text-sm text-grayscale-80">• {data.description}</p>
            </div>

            {/* 이미지 */}
            <div className="mb-4">
              <Image
                src={data.image}
                alt={data.title}
                width={500}
                height={300}
                className="w-full rounded-lg object-cover max-h-[165px]"
              />
            </div>

            {/* 팁 */}
            {data.tip && (
              <div>
                <p className="text-sm text-main-50 font-semibold">❗️ {data.tip}</p>
              </div>
            )}
          </>
        ) : (
          // 먹거리/후식류 상세 정보
          <>
            <div className="bg-grayscale-5 rounded-lg p-3 mb-4">
              <div className="flex items-start text-sm text-grayscale-80 mb-2">
                <span className="text-grayscale-60 font-medium w-[70px] shrink-0">위치</span>
                <p className="flex-1">{data.location}</p>
              </div>
              <div className="flex items-start text-sm text-grayscale-80 mb-2">
                <span className="text-grayscale-60 font-medium w-[70px] shrink-0">대표메뉴</span>
                <p className="flex-1">{data.menu}</p>
              </div>
              <div className="flex items-start text-sm text-grayscale-80">
                <span className="text-grayscale-60 font-medium w-[70px] shrink-0">가격</span>
                <p className="flex-1">{data.price}</p>
              </div>
            </div>

            {/* 이미지 */}
            <div className="mb-4">
              <Image
                src={data.image}
                alt={data.title}
                width={500}
                height={300}
                className="w-full rounded-lg object-cover max-h-[165px]"
              />
            </div>

            {/* 설명 */}
            <div className="text-sm text-grayscale-70">
              <p className="text-red-500 font-bold mb-2">❗️ {data.description}</p>
            </div>
          </>
        )}

        {/* 버튼 */}
        <button
          className="mt-4 w-full py-2 bg-main-5 text-main-50 text-sm rounded-lg font-semibold"
          onClick={() => alert("모든 식사류 보기 클릭")} // 임시로 창 띄우기 (이후 수정 필요)
        >
          {isActivity ? "즐길거리 모두 보기" : "모든 식사류 보기"}
        </button>
      </div>
    </div>
  );
};

export default CultureModal;
