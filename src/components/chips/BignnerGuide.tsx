import React from "react";
import Image from "next/image";
import baseballTipIcon from "../../assets/svg/baseballTip.svg";

interface BignnerGuideProps {
  onClick: () => void;
}

function BignnerGuide({ onClick }: BignnerGuideProps) {
  return (
    <button onClick={onClick}>
      <Image src={baseballTipIcon} alt="야구 직관 Tip" width={101} height={30} />
    </button>
  );
}

export default BignnerGuide;
