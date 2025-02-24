import React, { useState } from "react";
import Image from "next/image";
import { maxChatWidth } from "@/src/constants/ChatbotData";
import ImgUrlModal from "@/src/components/dialogs/ImgUrlModal";
import useImageModal from "@/src/hooks/useImageModal";

interface Props {
  imgUrl: string;
}

// 챗봇 커스텀 말풍선 컴포넌트
// 백엔드에서 전송받은 이미지 url(http://로 시작)을 출력하는 말풍선
const RookieImgUrlMessage = ({imgUrl}: Props) => {
  // 이미지 모달 훅
  const { isModalOpen, selectedImage, openModal, closeModal } = useImageModal();  // 훅 사용


  return (
    <div className="mb-2">
        {/* 이미지 내용 */}
        <img
            src={imgUrl}
            alt="채팅창 이미지"
            className={`${maxChatWidth} h-auto rounded-md cursor-pointer`}
            onClick={() => openModal(imgUrl)}
        />

        {/* 이미지를 모달창으로 띄우기 */}
        {isModalOpen && <ImgUrlModal imageUrl={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default RookieImgUrlMessage;