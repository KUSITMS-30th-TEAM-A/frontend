import { useState, useEffect } from "react";

import { ScreenWidthSize } from "@/src/constants/ReactionData";

interface ScreenSizeState {
  isSmall: boolean; // <= 360px
  isMedium: boolean; // > 360px and < 400px
  isLarge: boolean; // >= 400px and < 500px
  isExtraLarge: boolean; // >= 500px
}

/**
 * Custom hook to detect screen width ranges.
 * @returns {ScreenSizeState} - An object representing screen size states.
 */
export const useScreenWidth = (): ScreenSizeState => {
  const [screenSize, setScreenSize] = useState<ScreenSizeState>({
    isSmall: false,
    isMedium: false,
    isLarge: false,
    isExtraLarge: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isSmall: width <= ScreenWidthSize.SMALL,
        isMedium: width > ScreenWidthSize.SMALL && width < ScreenWidthSize.LARGE,
        isLarge: width > ScreenWidthSize.LARGE && width < ScreenWidthSize.EXTRA_LARGE,
        isExtraLarge: width > ScreenWidthSize.EXTRA_LARGE,
      });
    };

    // Initial check and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
