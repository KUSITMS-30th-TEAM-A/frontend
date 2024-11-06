import React, { useState } from "react";
import Image from "next/image";
import stadiumDropdownIcon from "../../../assets/webp/stadium_dropdown.webp";

interface SeatDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

export default function SeatDropdown({ options, selectedOption, onSelect }: SeatDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative w-[220px]">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between py-[6px] px-3 border border-gray-300 rounded-lg w-full h-[36px] text-md font-semibold text-gray-800"
      >
        <span>{selectedOption || "구역을 선택하세요"}</span>
        <Image src={stadiumDropdownIcon} alt="dropdown icon" width={16} height={16} />
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white shadow-lg text-sm z-10 rounded-lg">
          <ul className="list-none max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsDropdownOpen(false);
                }}
                className={`px-4 py-[10px] cursor-pointer ${
                  option === selectedOption ? "bg-red-500 text-white font-semibold" : "text-gray-800"
                } ${index === 0 ? "rounded-t-lg" : ""} ${index === options.length - 1 ? "rounded-b-lg" : ""} ${
                  option !== selectedOption ? "hover:bg-gray-100" : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}