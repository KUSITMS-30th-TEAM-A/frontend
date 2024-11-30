import { useState, useEffect } from "react";

// 전역(window) 스크롤 감지 훅
const useGlobalScroll = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      // 전역 스크롤 방향
      const currentScrollPos = window.scrollY;

      // 전역 스크롤 방향 업데이트
      if (currentScrollPos > prevScrollPos) {
        setScrollDirection("down");
      } else if (currentScrollPos < prevScrollPos) {
        setScrollDirection("up");
      }

      // 전역 스크롤 위치 업데이트
      setScrollPosition(currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    // 전역 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollDirection, scrollPosition };
};

export default useGlobalScroll;
