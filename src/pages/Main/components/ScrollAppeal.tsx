
import React from "react";
import Image from 'next/image';
import mainScrollIcon from "../../../assets/webp/main_scroll.webp";


const ScrollAppeal = () => {
    const text = "아래로 스크롤 해보세요!"
    return (
        <div className="absolute bottom-0 left-0 w-full h-[203px] bg-gradient-to-b from-white/0 to-white/100 flex flex-col items-center justify-center mb-[10px]">
            <Image src={mainScrollIcon} alt="스크롤 이미지" width={24} height={52}/>
            <p className="text-center text-grayscale-90 text-lg">{text}</p>
        </div>
    );
};

export default ScrollAppeal;
