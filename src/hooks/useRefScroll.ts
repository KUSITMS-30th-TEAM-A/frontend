import { useState, useEffect, useRef } from "react";

// 특정 div 태그에 스크롤 발생 이벤트를 감지하는 훅
// div에 overflow-auto가 css로 설정된 경우 window.scrollY로는 감지가 불가하여
// 해당 div의 참조(ref)를 생성하고, 그 참조에 이벤트를 바인딩해야 한다
const useRefScroll = <T extends HTMLElement>() => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null> (null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    let prevScrollPos = 0;
    let startY: number | null = null;

    // 데스크탑 전용
    // overflow-auto가 설정된 div에서 height가 짧아서 scroll bar가 생기는 경우에 스크롤을 감지하는 이벤트
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const currentScrollPos = container.scrollTop;

      if (currentScrollPos > prevScrollPos) {
        setScrollDirection("down");
      } else if (currentScrollPos < prevScrollPos) {
        setScrollDirection("up");
      }

      setScrollPosition(currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    // 데스크탑 전용
    // height가 이미 길아서 scroll bar가 안 생기는 경우에 마우스 휠로 스크롤을 감지하는 이벤트
    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;

      // 마우스 휠 스크롤 방향 감지
      if (e.deltaY > 0) {
        setScrollDirection("down");
      } else if (e.deltaY < 0) {
        setScrollDirection("up");
      }

      // wheel 이벤트는 scrollTop 값을 직접 변경하지 않으므로, 이를 업데이트
      setScrollPosition(container.scrollTop);
    };


    // 모바일 기기 전용
    // 터치를 감지하는 이벤트
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startY === null) return;

      const currentY = e.touches[0].clientY;
      const container = containerRef.current;
      if (!container) return;

      if (currentY > startY) {
        setScrollDirection("up");
      } else if (currentY < startY) {
        setScrollDirection("down");
      }

      setScrollPosition(container.scrollTop);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("wheel", handleWheel);  // wheel 이벤트 추가
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  return { scrollDirection, scrollPosition, containerRef };
};

export default useRefScroll;
