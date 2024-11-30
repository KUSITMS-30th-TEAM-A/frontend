import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import backLeftButtonGrayIcon from "../../../assets/webp/back_left_button_gray.webp";

interface HeaderProps {
  stadiumName: string;
  onBack?: () => void;
}

const AllPageHeader = ({ stadiumName, onBack }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-grayscale-10">
      <Image
        src={backLeftButtonGrayIcon}
        alt="뒤로가기 버튼"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={handleBack}
      />
      <h1 className="text-lg font-semibold text-center flex-grow">{stadiumName}</h1>
      <div style={{ width: 24, height: 24 }} />
    </div>
  );
};

export default AllPageHeader;
