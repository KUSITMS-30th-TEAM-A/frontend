import React, { useState } from "react";
import Image from "next/image";
import { maxChatWidth } from "@/src/constants/ChatbotData";
import ImageModal from "@/src/components/dialogs/ImageModal";
import useImageModal from "@/src/hooks/useImageModal";

interface Props {
  imgIcon: string;
}

// 챗봇 커스텀 말풍선 컴포넌트
// 프론트 단에서 저장한 이미지를 출력하는 말풍선
const RookieImageMessage = ({imgIcon}: Props) => {
  // 이미지 모달 훅
  const { isModalOpen, selectedImage, openModal, closeModal } = useImageModal();  // 훅 사용

  
  return (
    <div className="mb-2">
        {/* 이미지 내용 */}
        <Image
          src={imgIcon}
          alt="채팅창 이미지"
          className={`${maxChatWidth} h-auto rounded-md cursor-pointer`}
          onClick={() => openModal(imgIcon)}
          width={500}  // 임시 너비
          height={300} // 임시 높이
        />

        {/* 이미지를 모달창으로 띄우기 */}
        {isModalOpen && <ImageModal imageSrc={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default RookieImageMessage;
