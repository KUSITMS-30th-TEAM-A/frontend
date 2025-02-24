import React, { useState } from "react";
import FoodModal from "./components/FoodModal";
import FoodPhotoCard from "./components/FoodPhotoCard";
import FoodViewAllPage from "./components/FoodViewAllPage";
import ViewAllButton from "../components/ViewAllButton";
import { FoodItem } from "../../../constants/CultureData";

interface FoodProps {
  data: {
    internal: {
      meals: FoodItem[];
      desserts: FoodItem[];
    };
    external: FoodItem[];
  };
}

const Food = ({ data }: FoodProps) => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewAllCategory, setViewAllCategory] = useState<{
    title: string;
    data: FoodItem[];
  } | null>(null);

  // 카드 클릭 시 모달 열기
  const handleCardClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  // 전체보기 클릭 시 전체보기 페이지 열기
  const handleViewAll = (title: string, data: FoodItem[]) => {
    setViewAllCategory({ title, data });
  };

  // 뒤로가기 버튼 클릭 시 전체보기 페이지 닫기
  const handleBack = () => {
    setViewAllCategory(null);
  };

  // 전체보기 페이지 렌더링
  if (viewAllCategory) {
    return (
      <FoodViewAllPage
        title={viewAllCategory.title}
        data={viewAllCategory.data}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="bg-grayscale-5 pb-16">
      {/* 구장 내부 */}
      <section>
        <h2 className="text-lg font-bold mb-4">구장 내부</h2>

        {/* 구장 내부 - 식사류 */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold">식사류</h3>
          <ViewAllButton
            title="전체보기"
            onClick={() => handleViewAll("구장 내부 - 식사류", data.internal.meals)}
          />
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.internal.meals.map((food, idx) => (
            <FoodPhotoCard
              key={idx}
              food={food}
              onClick={() => handleCardClick(food)}
            />
          ))}
        </div>

        {/* 구장 내부 - 후식류 */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold">후식류</h3>
          <ViewAllButton
            title="전체보기"
            onClick={() => handleViewAll("구장 내부 - 후식류", data.internal.desserts)}
          />
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.internal.desserts.map((food, idx) => (
            <FoodPhotoCard
              key={idx}
              food={food}
              onClick={() => handleCardClick(food)}
            />
          ))}
        </div>
      </section>

      {/* 구장 외부 */}
      <section className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">구장 외부</h2>
          <ViewAllButton
            title="전체보기"
            onClick={() => handleViewAll("구장 외부", data.external)}
          />
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.external.map((food, idx) => (
            <FoodPhotoCard
              key={idx}
              food={food}
              onClick={() => handleCardClick(food)}
            />
          ))}
        </div>
      </section>

      {/* 포토카드 모달 */}
      {isModalOpen && selectedFood && (
        <FoodModal
          food={selectedFood}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Food;
