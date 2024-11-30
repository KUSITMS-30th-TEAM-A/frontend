import React, { useState } from "react";
import Image from "next/image";
import stadiumDropdownIcon from "../../../assets/svg/stadium_dropdown.svg";

import { useOutsideClick } from "@/src/hooks/useOutsideClick";

interface SeatDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  selectedColor: string;
}


export default function SeatDropdown({ options, selectedOption, onSelect, selectedColor }: SeatDropdownProps) {
  // 드롭 다운 토글 기능
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // 드롭다운 외부 클릭시 드롭다운 닫히는 이벤트
  const dropdownRef = useOutsideClick(() => setIsDropdownOpen(false));

  return (
    <div ref={dropdownRef} className="relative w-[220px] bg-white rounded-lg">
      {/* 토글 버튼 */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between py-[6px] px-3 border border-gray-300 rounded-lg w-full h-[36px] text-md font-semibold text-gray-800"
      >
        <span>{selectedOption || "구역을 선택하세요"}</span>
        <Image src={stadiumDropdownIcon} alt="dropdown icon" width={12} height={12} />
      </button>

      {/** 좌석 메뉴 */}
      <div
        className={`absolute left-0 w-full mt-2 bg-white shadow-lg text-sm z-10 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isDropdownOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <ul className="list-none max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsDropdownOpen(false);
              }}
              className={`px-4 py-[10px] cursor-pointer ${
                option === selectedOption ? "text-white font-semibold" : "text-gray-800"
              } ${index === 0 ? "rounded-t-lg" : ""} ${index === options.length - 1 ? "rounded-b-lg" : ""} ${
                option !== selectedOption ? "hover:bg-gray-100" : ""
              }`}
              style={option === selectedOption ? { backgroundColor: selectedColor } : {}}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
