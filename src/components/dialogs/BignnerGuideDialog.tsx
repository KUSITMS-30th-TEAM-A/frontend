import React, { useState } from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import closeIcon from "../../assets/webp/close_button_gray.webp";
import nextButtonIcon from "../../assets/webp/next_button.webp";
import backButtonIcon from "../../assets/webp/back_button.webp";
import { tips } from "../../constants/tipData";
import { usePreventScroll } from "@/src/hooks/usePreventScroll";

interface ChipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BignnerGuideDialog = ({ isOpen, onClose }: ChipModalProps) => {
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const router = useRouter();

  usePreventScroll(isOpen);

  const handleClose = () => {
    setActiveTipIndex(0); // 모달 닫힐 때 인덱스를 0으로 초기화
    onClose();
  };

  if (!isOpen) return null;

  const handleNextTip = () => {
    setActiveTipIndex((prevIndex) => Math.min(prevIndex + 1, tips.length - 1));
  };

  const handlePreviousTip = () => {
    setActiveTipIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div 
        className="bg-white rounded-xl w-[324px] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 타이틀 고정 */}
        <div className="flex justify-between items-center p-5">
          <h2 className="text-lg font-bold text-grayscale-90">야구 직관 Tip</h2>
          <button onClick={handleClose}>
            <Image src={closeIcon} alt="닫기 버튼" width={24} height={24} />
          </button>
        </div>

        {/* Tip 내용 */}
        <div className="flex-1 px-5 mb-4">
          <h3 className="text-md font-bold text-grayscale-90 mb-2">야구장 관람 매너</h3>
          <div className="text-sm font-semibold text-grayscale-90 flex items-center gap-2 mb-2">
            <span className="w-4 h-4 bg-main-40 rounded-full text-white flex items-center justify-center">
              {activeTipIndex + 1}
            </span>
            {tips[activeTipIndex].title}
          </div>
          <img 
            src={tips[activeTipIndex].image.src} 
            alt={`Tip ${activeTipIndex + 1}`} 
            className="block mb-2" 
            loading="eager"
          />
          <p className="text-[12px] font-regular text-grayscale-90 bg-grayscale-5 p-3 rounded-lg min-h-[79px]"
            style={{ textAlign: 'justify' }}>
            {tips[activeTipIndex].description}
          </p>
        </div>

        {/* 이전 및 다음 버튼 */}
        <div className="flex justify-between px-5 pb-3">
          {activeTipIndex > 0 && (
            <button onClick={handlePreviousTip} className="flex items-center gap-1 text-sm text-grayscale-50">
              <Image src={backButtonIcon} alt="Previous Button" width={14} height={14} />
              이전
            </button>
          )}
          {activeTipIndex < tips.length - 1 ? (
            <button onClick={handleNextTip} className="flex items-center gap-1 text-sm text-grayscale-50 ml-auto">
              다음
              <Image src={nextButtonIcon} alt="Next Button" width={14} height={14} />
            </button>
          ) : (
            <div className="ml-auto" />
          )}
        </div>

        {/* 챗봇 질문 버튼 고정 */}
        <div className="px-5 pb-5 mt-[18px]">
          <button 
            className="w-full py-3 text-center font-medium text-sm text-main-50 bg-main-5 rounded-lg"
            onClick={() => router.push("/chatbot")}
          >
            챗봇에게 질문하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BignnerGuideDialog;
