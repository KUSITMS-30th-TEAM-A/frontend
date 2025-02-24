import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import backLeftButtonGrayIcon from "../../assets/webp/back_left_button_gray.webp";

type BackBarProps = {
  title: string;
};

export default function BackGuideHeader({ title }: BackBarProps) {
  const router = useRouter();

  return (
    <div className="fixed top-0 max-w-[500px] w-full flex items-center justify-center py-[14px] px-2 bg-white border-b border-grayscale-10">
      {/** 뒤로가기 버튼 */}
      <div className="absolute left-2 flex items-center">
        <Image
          src={backLeftButtonGrayIcon}
          alt="뒤로가기 버튼"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      {/** 가운데 구장 텍스트 */}
      <div className="text-lg font-semibold text-grayscale-90">
        {title}
      </div>
    </div>
  );
}
