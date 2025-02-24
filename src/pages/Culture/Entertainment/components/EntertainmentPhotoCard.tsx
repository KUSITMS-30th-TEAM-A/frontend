import React from "react";
import Image from "next/image";
import { EntertainmentItem } from "../../../../constants/CultureData";

interface EntertainmentPhotoCardProps {
  item: EntertainmentItem;
  onClick: () => void;
}

const EntertainmentPhotoCard = ({ item, onClick }: EntertainmentPhotoCardProps) => {
  if (!item || !item.image) return null;

  return (
    <div
      className="flex-shrink-0 w-[173px] bg-white rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={item.image}
        alt={item.title}
        width={173}
        height={150}
        className="w-full h-[150px] object-cover rounded-t-lg"
      />
      <div className="px-2 py-3">
        <h4 className="text-md font-bold text-grayscale-90 mb-[6px]">
          {item.title}
        </h4>
        <p className="text-xs text-grayscale-70">{item.description}</p>
      </div>
    </div>
  );
};

export default EntertainmentPhotoCard;
