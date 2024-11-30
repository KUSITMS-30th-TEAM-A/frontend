import { useEffect } from "react";

export function usePreventScroll(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      // 스크롤 비활성화
      document.body.style.overflow = "hidden";
    } else {
      // 스크롤 복구
      document.body.style.overflow = "";
    }

    // 컴포넌트 언마운트 시 스크롤 복구
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}
