"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { StaticImageData } from "next/image";
import defaultStadium from "../../../assets/webp/seat/jamsil_default.webp";
import redStadium from "../../../assets/webp/seat/jamsil_red.webp";
import orangeStadium from "../../../assets/webp/seat/jamsil_orange.webp";
import navyStadium from "../../../assets/webp/seat/jamsil_navy.webp";
import blueStadium from "../../../assets/webp/seat/jamsil_blue.webp";
import tableStadium from "../../../assets/webp/seat/jamsil_table.webp";
import premiumStadium from "../../../assets/webp/seat/jamsil_premium.webp";
import greenStadium from "../../../assets/webp/seat/jamsil_green.webp";
import excitingStadium from "../../../assets/webp/seat/jamsil_exciting.webp";

import { StadiumType } from "@/src/constants/ZoneData";
import { getImageDimensions } from "@/src/constants/ReactionData"

// 각 색상별 이미지와 오차값 포함
const colorMap: { [key: string]: { image: StaticImageData; tolerance: number } } = {
  "#DC032A": { image: redStadium, tolerance: 15 },      // 빨강 좌석: tolerance 30
  "#E16900": { image: orangeStadium, tolerance: 35 },   // 주황 좌석: tolerance 35
  "#242953": { image: navyStadium, tolerance: 20 },     // 남색 좌석: tolerance 20
  "#4699F2": { image: blueStadium, tolerance: 25 },     // 파랑 좌석: tolerance 25
  "#7C0065": { image: tableStadium, tolerance: 20 },    // 보라색 좌석: tolerance 20
  "#185DDD": { image: premiumStadium, tolerance: 25 },  // 프리미엄 블루 좌석: tolerance 25
  "#339600": { image: greenStadium, tolerance: 35 },    // 녹색 좌석: tolerance 35
  "#FFE23E": { image: excitingStadium, tolerance: 30 }, // 노랑색 좌석: tolerance 15
};

// HEX 색상을 RGB로 변환하는 함수
const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

// 특정 색상이 목표 색상에 가까운지 판별
const isColorClose = (
  r: number,
  g: number,
  b: number,
  targetColor: { r: number; g: number; b: number },
  tolerance: number
) => {
  return (
    Math.abs(r - targetColor.r) <= tolerance &&
    Math.abs(g - targetColor.g) <= tolerance &&
    Math.abs(b - targetColor.b) <= tolerance
  );
};

interface Props {
  screenWidth: number;
};

const JamsilSeat = ({ screenWidth }: Props) => {
  const [seatImage, setSeatImage] = useState<StaticImageData>(defaultStadium);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const loadImageToCanvas = useCallback(() => {
    const image: HTMLImageElement = document.createElement("img");
    image.src = seatImage.src;
    image.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const scale = window.devicePixelRatio || 1;  // 화면 배율에 따른 픽셀 밀도 조절

        const canvasWidth = getImageDimensions(StadiumType.JAMSIL, screenWidth).width;
        const canvasHeight = getImageDimensions(StadiumType.JAMSIL, screenWidth).height;
        canvas.width = canvasWidth * scale;
        canvas.height = canvasHeight * scale;

        console.log("화면 width: "+screenWidth)
        console.log("잠실 이미지 width: "+canvasWidth);
        console.log("잠실 이미지 height "+canvasHeight);

        canvas.style.width = "100%";
        canvas.style.height = "auto";

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.scale(scale, scale);
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
          setIsImageLoaded(true);
        }
      }
    };
  }, [seatImage]);

  useEffect(() => {
    loadImageToCanvas();
  }, [loadImageToCanvas]);

  useEffect(() => {
    // 캔버스 외부를 클릭했을 때 기본 이미지로 되돌리는 핸들러
    const handleOutsideClick = (event: MouseEvent) => {
      if (canvasRef.current && !canvasRef.current.contains(event.target as Node)) {
        setSeatImage(defaultStadium);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    if (!isImageLoaded) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        const scale = window.devicePixelRatio || 1;
        const pixelData = ctx.getImageData(x * scale, y * scale, 1, 1).data;
        const [r, g, b] = [pixelData[0], pixelData[1], pixelData[2]];

        // 클릭한 색상에 따라 해당 좌석 이미지로 변경
        let matchedImage = defaultStadium;
        Object.keys(colorMap).forEach((hex) => {
          const { image, tolerance } = colorMap[hex];
          const targetColor = hexToRgb(hex);
          if (isColorClose(r, g, b, targetColor, tolerance)) {
            matchedImage = image;
          }
        });
        setSeatImage(matchedImage);
      }
    }
  };

  return (
    <div className="flex justify-center mt-6" onClick={() => setSeatImage(defaultStadium)}>
      <canvas
        ref={canvasRef}
        className={`w-full max-w-[${getImageDimensions(StadiumType.JAMSIL, screenWidth).width}px] mx-auto`}
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default JamsilSeat;
