import React, { useState } from "react";
import Image from "next/image";
import closeButtonIcon from "@/src/assets/svg/chatbot_imagemodal_close_button.svg";

const ImageModal = ({ imageSrc, onClose }: { imageSrc: string, onClose: () => void }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-4 rounded-lg">
          <Image 
            src={imageSrc} 
            alt="확대 이미지" 
            className="max-w-full max-h-full"
            width={500}  // 임시 너비
            height={500} // 임시 높이
          />
          <button 
            onClick={onClose} 
            className="absolute top-0 right-0 text-grayscale-50 p-2 rounded-full">
            <Image src={closeButtonIcon} alt="닫기 버튼"  width={24} height={24}/>
          </button>
        </div>
      </div>
    );
  };
  
  export default ImageModal;