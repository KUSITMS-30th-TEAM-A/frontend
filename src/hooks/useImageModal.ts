import { useState } from "react";

// 이미지 모달을 위한 커스텀 훅
const useImageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // 모달 열기
  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  // 커스텀 훅에서 상태와 함수 반환
  return { isModalOpen, selectedImage, openModal, closeModal };
};

export default useImageModal;
