import React from "react";

interface CategoryHeaderProps {
  title: string;
  level: number; // 대분류(1) 소분류(2)
  showButton?: boolean; // 전체보기 버튼 표시 여부
  onClick?: () => void;
}

const CategoryHeader = ({ title, level, showButton = false, onClick }: CategoryHeaderProps) => {
  return (
    <div className={`flex justify-between items-center mb-4 ${level === 1 ? "mt-6" : ""}`}>
      <h2
        className={`${
          level === 1 ? "text-xl text-grayscale-90 font-bold" : "text-md text-grayscale-90 font-semibold"
        }`}
      >
        {title}
      </h2>
      {showButton && (
        <button
          onClick={onClick}
          className="text-sm font-regular text-grayscale-80"
        >
          전체보기 &gt;
        </button>
      )}
    </div>
  );
};

export default CategoryHeader;
