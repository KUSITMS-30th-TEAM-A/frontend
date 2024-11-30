import React, { useState } from "react";
import EntertainmentModal from "./components/EntertainmentModal";
import EntertainmentPhotoCard from "./components/EntertainmentPhotoCard";
import EntertainmentViewAllPage from "./components/EntertainmentViewAllPage";
import ViewAllButton from "../components/ViewAllButton";
import { EntertainmentItem } from "../../../constants/CultureData";

interface EntertainmentProps {
  data: {
    internal: EntertainmentItem[];
    external: EntertainmentItem[];
  };
}

const Entertainment = ({ data }: EntertainmentProps) => {
  const [selectedItem, setSelectedItem] = useState<EntertainmentItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewAllCategory, setViewAllCategory] = useState<{
    title: string;
    data: EntertainmentItem[];
  } | null>(null);

  // 카드 클릭 시 모달 열기
  const handleCardClick = (item: EntertainmentItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // 전체보기 클릭 시 전체보기 페이지 열기
  const handleViewAll = (title: string, data: EntertainmentItem[]) => {
    setViewAllCategory({ title, data });
  };

  // 뒤로가기 버튼 클릭 시 전체보기 페이지 닫기
  const handleBack = () => {
    setViewAllCategory(null);
  };

  // 전체보기 페이지 렌더링
  if (viewAllCategory) {
    return (
      <EntertainmentViewAllPage
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">구장 내부</h2>
          <ViewAllButton
            title="전체보기"
            onClick={() => handleViewAll("구장 내부", data.internal)}
          />
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.internal.map((item, idx) => (
            <EntertainmentPhotoCard
              key={idx}
              item={item}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </section>

      {/* 구장 외부 */}
      <section className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">구장 외부</h2>
          <ViewAllButton
            title="전체보기"
            onClick={() => handleViewAll("구장 외부", data.external)}
          />
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.external.map((item, idx) => (
            <EntertainmentPhotoCard
              key={idx}
              item={item}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </section>

      {/* 모달 */}
      {isModalOpen && selectedItem && (
        <EntertainmentModal
          item={selectedItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Entertainment;
