import React from "react";
import { questionCategories } from "@/src/constants/ChatbotData";

interface Props {
  setIsFAQCategoryVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (category: string) => void;
}

const FAQCategoryBar = ({ setIsFAQCategoryVisible, onSelect }: Props) => {
  const { baseballCategories, questionCategories: categories } = questionCategories;
  
  // 카테고리 선택시 발동하는 이벤트 핸들
  const handleClick = (category: string) => {
    // 선택한 카테고리 저장
    onSelect(category);
    
    // 카테고리바 닫기
    setIsFAQCategoryVisible(false);
  };

  return (
    <div className="fixed bottom-[60px] left-1/2 transform -translate-x-1/2 max-w-[500px] w-full bg-grayscale-5 rounded-t-2xl transition-transform pb-2">
      {/** 상태 바 */}
      <div className="flex justify-center text-center items-center pt-3 py-3 cursor-pointer hover:bg-grayscale-10"
           onClick={() => setIsFAQCategoryVisible(false)}
      >
        <div className="w-9 h-[2px] bg-main-40 rounded-full"/>
      </div>

      {/** 카테고리 */}
      <div className="flex flex-col ">
        {Object.keys(categories).map((key) => {
            const category = categories[key as keyof typeof categories];
            return (
              <div 
                key={key}
                onClick={() => handleClick(category.frontendValue)}
                className="cursor-pointer px-5 py-1.5 hover:bg-grayscale-10" 
                >
                <p
                  className="text-sm flex text-grayscale-90 font-regular "
                >
                  {category.frontendValue}
                </p>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default FAQCategoryBar;
