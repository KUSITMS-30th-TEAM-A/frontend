import { useState } from 'react';

function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 모달 열기
  const openModal = () => setIsOpen(true);

  // 모달 닫기
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    openModal,
    closeModal
  };
}

export default useModal;
