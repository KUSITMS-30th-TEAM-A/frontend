import React from "react";
import Image from "next/image";
import NextButtonGray from "../../../assets/svg/next_button_gray.svg";

interface ViewAllButtonProps {
  title: string;
  onClick: () => void;
}

const ViewAllButton = ({ title, onClick }: ViewAllButtonProps) => {
  return (
    <button
      className="flex items-center text-sm font-regular"
      onClick={onClick}
    >
      {title}
      <Image
        src={NextButtonGray}
        alt="Next"
        width={16}
        height={16}
        className="ml-1"
      />
    </button>
  );
};

export default ViewAllButton;
