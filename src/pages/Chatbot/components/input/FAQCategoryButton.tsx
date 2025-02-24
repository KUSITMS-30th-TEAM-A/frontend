import React from "react";

import Image from "next/image";
import openButtonIcon from "@/src/assets/svg/chatbot_category_open_button_gray.svg";

interface Props {
  setIsFAQCategoryVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FAQCategoryButton = ({setIsFAQCategoryVisible}: Props) => {
  return (
    <div className="fixed bottom-[60px] left-1/2 transform -translate-x-1/2 max-w-[500px] w-full px-5 py-3 bg-grayscale-0 rounded-t-2xl transition-transform cursor-pointer">
      <div className="flex justify-center gap-1"
           onClick={() => setIsFAQCategoryVisible(true)}>
        <p className="text-sm flex text-center items-center text-grayscale-90 font-regular">
            자주 물어보는 질문
        </p>
        <Image src={openButtonIcon} alt="오픈 아이콘" width={24} height={24} />
      </div>
    </div>
  );
};

export default FAQCategoryButton;
