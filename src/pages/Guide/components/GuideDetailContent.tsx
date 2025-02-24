import React, { useState, useEffect } from "react";
import Image from "next/image";
import StadiumInfo from "../../Main/components/StadiumInfo";
import SeatDropdown from "./SeatDropdown";
import tipIcon from "../../../assets/svg/guide_tip_button.svg";

import { handleGuide } from "@/src/api/StadiumApiHandler";
import { GuideGetParamsType, GuideGetResponseType, ReferenceGroup, Reference, ZoneType } from "@/src/api/StadiumApiType";

import useModal from "@/src/hooks/useModal";
import SeatTipDialog from "@/src/components/dialogs/SeatTipDialog";

import { useRouter } from "next/router"; // useRouter를 임포트합니다.
import { StadiumType } from "@/src/constants/ZoneData";
import BackGuideHeader from "../../../components/layout/BackGuideHeader";
import NavBar from "@/src/components/layout/NavBar";
/*
interface Props extends GuideGetParamsType {
  zoneColor: string;
  zoneNameList: string[];
  onSelectZone: (option: string) => void;
}
*/

//export default function GuideDetailContent({stadiumName, zoneName, zoneColor, zoneNameList, onSelectZone}: Props) {
export default function GuideDetailContent() {
  // 공통 클래스 정의
  const containerClass = "bg-white";
  const sectionTitleClass =
    "text-sm font-semibold text-grayscale-80 px-2 py-[2px] mb-2 bg-grayscale-5 inline-block rounded-md";
  const sectionContentClass =
    "text-sm font-regular text-black leading-relaxed";

  // 모달창 이벤트
  const { isOpen, openModal, closeModal } = useModal();

  // 쿼리 파라미터에서 값 가져오기
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 가져옵니다.
  const { stadiumName, zoneName, zoneColor, zoneNameList } = router.query as {
    stadiumName?: StadiumType;
    zoneName?: string;
    zoneColor?: string;
    zoneNameList?: string[];
  };

  const [selectedZone, setSelectedZone] = useState<string>("");
  const [guideData, setGuideData] = useState<GuideGetResponseType>();

  // 가이드 데이터 관리
  const handleGuideData = async () => {
    if (typeof stadiumName === "string" && selectedZone) {
      // API 호출
      const guideData = await handleGuide({
        stadiumName,
        zoneName: selectedZone,
      });

      if (guideData) {  // undefined가 아니면 처리
        setGuideData(guideData);
      }
    }
  };

  // 상태 변경될 때마다 실행
  const handleZoneClick = (zoneName: string) => {
    setSelectedZone(zoneName);
  };

  useEffect(() => {
    if (zoneName) handleZoneClick(zoneName);
  }, [stadiumName, zoneName]); // 쿼리 파라미터가 변경될 때마다 실행

  useEffect(() => {
    handleGuideData();
  }, [selectedZone]); // 쿼리 파라미터가 변경될 때마다 API 호출

  return (
    <>
      <div className="sticky top-0 z-10 bg-white mb-[54px]">
        <BackGuideHeader title={stadiumName || "구장 이름 없음"} />
      </div>
      <div className="relative px-4 pb-20 pt-5 bg-grayscale-5 overflow-y-auto scrollbar-hide">
        {/* 가이드 데이터가 null이 아닐 때 렌더링 */}
        {guideData ? (
          <>
            {/* 좌석 선택 드롭다운 및 Tip 버튼 */}
            <div className="flex items-center mb-4">
              <SeatDropdown
                options={zoneNameList?? []}
                selectedOption={selectedZone}
                onSelect={handleZoneClick}
                selectedColor={guideData.zoneColor?? zoneColor}
              />
              <button className="ml-auto w-[54px] h-[30px] flex items-center justify-center">
                <Image
                  src={tipIcon}
                  alt="Tip"
                  width={54}
                  height={30}
                  onClick={openModal}
                />
              </button>
              {isOpen &&
                guideData.referencesGroup &&
                guideData.referencesGroup.length > 0 && (
                  <SeatTipDialog
                    zoneName={guideData.zoneName}
                    zoneColor={guideData.zoneColor}
                    tip={guideData.tip}
                    referencesGroup={guideData.referencesGroup[0]} // 첫 번째 referencesGroup만 전달
                    onClose={closeModal} // 모달 닫기 함수
                  />
                )}
            </div>

            {/* 야구장 좌석 이미지 */}
            <div className="relative">
              <Image
                src={guideData.imgUrl}
                alt={`${guideData.zoneName} 이미지`}
                className="w-full rounded-lg"
                width={370}
                height={198}
              />
            </div>

            {/* 구장 정보 */}
            <StadiumInfo
              stadiumName={stadiumName ?? ""}
              firstBase={guideData.firstBaseSide}
              thirdBase={guideData.thirdBaseSide}
            />

            <div className="bg-white mt-4 p-4 rounded-xl mb-2">
              {/* 상단 타이틀 섹션 */}
              <div className="bg-white">
                <h2
                  className="text-lg font-bold"
                  style={{ color: guideData.zoneColor }}
                >
                  {guideData.zoneName}
                </h2>
                <p className="text-sm font-semibold text-grayscale-80 mt-[2px] pb-4 border-b border-grayscale-10">
                  {guideData.explanation}
                </p>
              </div>

              {/* 세부 정보 섹션 */}
              <div className={`${containerClass} space-y-3 mt-4`}>
                {[
                  { title: "출입구 위치", contents: guideData.entrance },
                  { title: "단차 정보", contents: guideData.stepSpacing },
                  {
                    title: "좌석 간 간격 (무릎 간격) 정보",
                    contents: guideData.seatSpacing,
                  },
                  { title: "이용 정보", contents: guideData.usageInformation },
                ].map((section, index) =>
                  // content가 빈 문자열(null, undefined, "")이 아닌 경우에만 출력
                  section.contents &&
                  section.contents.some((content) => content.trim() !== "") ? (
                    <div key={index}>
                      <h3 className={sectionTitleClass}>{section.title}</h3>
                      {section.contents.map((content: string, contentIndex: number) => (
                        <p key={contentIndex} className={sectionContentClass}>
                          {content}
                        </p>
                      ))}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </>
        ) : null}
        <NavBar />
      </div>
    </>
  );
}
