import { useState, useEffect } from "react";

interface UseVisibilityWithFadeOptions {
  animationDuration: number; // 페이드아웃 지속 시간 (ms)
}


// 스크롤 내림을 감지했을 때 특정 컴포넌트가 사라지도록 하는 이벤트
const useVisibilityWithFade = (
  scrollDirection: "up" | "down" | null,
  options: UseVisibilityWithFadeOptions
) => {
  const [isVisible, setIsVisible] = useState(true); // Div의 가시성 상태
  const [isFadingOut, setIsFadingOut] = useState(false); // 페이드아웃 여부

  // 폰 기종마다 높이가 다름
  // 높이가 긴 폰 기종에선 스크롤이 필요없으므로 그런 경우엔 스크롤이 불가하다고 알림


  // 새로 방문하거나 새로고침한 경우에는 특정 컴포넌트를 띄우고
  // 하위 페이지 url로 이동하고 다시 온 경우에는 특정 컴포넌트를 띄우지 않도록 하는 이벤트 (스크롤 불가하다고)
  useEffect(() => {
    // 페이지 첫 로드 시 sessionStorage 확인
    const scrollDivHidden = sessionStorage.getItem("scrollDivHidden");

    if (scrollDivHidden === "true") {
      setIsVisible(false); // 숨김 상태로 설정
    }
  }, []);

  // 스크롤 내림 감지 및 페이드아웃 효과로 특정 컴포넌트가 사라지게하는 이벤트
  useEffect(() => {
    // 스크롤 불가하면 안 띄워
    if (!isVisible || scrollDirection === null) return;

    // 스크롤 가능한데 내림을 처음 감지하면 불가로 바꿔
    if (scrollDirection === "down") {
      // 첫 스크롤 시 페이드아웃 트리거
      setIsFadingOut(true);

      // options.animationDuration 뒤에 완전히 숨김
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("scrollDivHidden", "true"); // 상태 저장
      }, options.animationDuration);

      return () => clearTimeout(timer); // 타이머 정리
    }
  }, [scrollDirection, isVisible, options.animationDuration]);

  return { isVisible, isFadingOut };
};

export default useVisibilityWithFade;
