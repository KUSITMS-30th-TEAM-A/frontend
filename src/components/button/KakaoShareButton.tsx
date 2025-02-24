"use client";

import React from "react";
import { useEffect, useState } from "react";
import { createKakaoShareMessage } from "@/src/utils/kakaoMessage";
import Image from "next/image";
import shareButtonGrayIcon from "@/src/assets/webp/share_gray.webp";

type KakaoShareButtonProps = {
  resultId: number | null; // 결과 ID
  nickname?: string; // 유형 닉네임
  hashTags: string[]; // 해시태그 배열
};

export default function KakaoShareButton({ resultId, nickname, hashTags }: KakaoShareButtonProps) {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    // Kakao SDK 초기화
    if (!document.getElementById("kakao-sdk")) {
      const script = document.createElement("script");
      script.id = "kakao-sdk";
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.onload = () => {
        console.log("Kakao SDK 로드 완료");
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init("d4d5e84e53ce18afa1d4f5ecbc14a552");
          setIsKakaoInitialized(true);
          console.log("Kakao SDK 초기화 완료");
        }
      };
      script.onerror = () => {
        console.error("Kakao SDK 스크립트 로드 실패");
      };
      document.head.appendChild(script);
    } else if (window.Kakao && window.Kakao.isInitialized()) {
      setIsKakaoInitialized(true);
    }
  }, []);

  const handleShare = () => {
    if (!isKakaoInitialized) {
      console.error("Kakao SDK가 초기화되지 않았습니다.");
      return;
    }

    if (!resultId) {
      console.error("resultId가 없습니다.");
      return;
    }

    try {
      // Kakao 메시지 생성 및 공유
      const message = createKakaoShareMessage(resultId, nickname, hashTags);
      window.Kakao.Share.sendCustom(message);
    } catch (error) {
      console.error("Kakao 공유 중 오류 발생:", error);
    }
  };

  return (
    <div
      onClick={handleShare}
      style={{ cursor: isKakaoInitialized ? "pointer" : "not-allowed" }}
      aria-disabled={!isKakaoInitialized}
    >
      <Image
        src={shareButtonGrayIcon}
        alt="공유 버튼"
        width={28}
        height={24}
        className={`cursor-${isKakaoInitialized ? "pointer" : "not-allowed"}`}
      />
    </div>
  );
}