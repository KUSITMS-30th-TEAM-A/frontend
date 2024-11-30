import React from 'react';
import Image from 'next/image';
import closeButtonGrayIcon from '../../assets/webp/close_button_gray.webp';

enum Teams {
  DOOSAN = '두산베어스',
  LOTTE = '롯데 자이언츠',
  SAMSUNG = '삼성 라이온즈',
  KIUM = '키움히어로즈',
  HANWHA = '한화이글스',
  KIA_TIGERS = 'KIA 타이거즈',
  KIA_WIZ = 'KIA wiz',
  LG = 'LG 트윈스',
  NC = 'NC 다이노스',
  SSG = 'SSG 랜더스'
}

type ReservationDialogProps = {
  onClose: () => void; // 다이얼로그 닫기 핸들러
  onTeamSelect: (team: Teams) => void; // 팀 선택 핸들러
};

export default function ReservationDialog({ onClose, onTeamSelect }: ReservationDialogProps) {
  return (
    <div className="flex flex-col border border-0 rounded-[12px] max-w-[324px] bg-white shadow-lg">
      {/* 상단 타이틀 */}
      <div className="flex justify-between items-center p-4 border-b border-grayscale-10">
        <h2 className="text-md font-bold text-grayscale-90">어느 구단의 예매처를 원하시나요?</h2>
        <button onClick={onClose} aria-label="닫기 버튼">
          <Image src={closeButtonGrayIcon} alt="닫기 버튼" className="w-6 h-6" />
        </button>
      </div>

      {/* 구단 리스트 */}
      <div className="p-5 space-y-3">
        {Object.values(Teams).map((team) => (
          <button
            key={team}
            onClick={() => onTeamSelect(team as Teams)}
            className="w-full bg-grayscale-5 text-grayscale-90 py-[7px] rounded-md text-center text-xs font-regular hover:bg-grayscale-10 transition"
          >
            {team}
          </button>
        ))}
      </div>
    </div>
  );
}
