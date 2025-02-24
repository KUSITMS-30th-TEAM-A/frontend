import React, { useState } from "react";
import Image from "next/image";
import closeButtonIcon from "@/src/assets/svg/chatbot_imagemodal_close_button.svg";

const ImgUrlModal = ({ imageUrl, onClose }: { imageUrl: string, onClose: () => void }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-4 rounded-lg">
          {/* imageUrl이 외부 url(https://) 이면 Image 컴포넌트로 띄우면 오류가 발생해서 img tag로 출력 */}
          <img 
            src={imageUrl} 
            alt="확대 이미지" 
            className="max-w-[500px] max-h-full" />
          <button 
            onClick={onClose} 
            className="absolute top-0 right-0 text-grayscale-50 p-2 rounded-full">
            <Image src={closeButtonIcon} alt="닫기 버튼"  width={24} height={24}/>
          </button>
        </div>
      </div>
    );
  };
  
  export default ImgUrlModal;