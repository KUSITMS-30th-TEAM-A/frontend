import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

import ResultHeader from "@/src/components/layout/ResultHeader";
import NavBar from "@/src/components/layout/NavBar";

import Image from 'next/image';
import crownGoldIcon from '@/src/assets/webp/recommend_crown_gold.webp';
import crownSilverIcon from '@/src/assets/webp/recommend_crown_silver.webp';
import crownBronzeIcon from '@/src/assets/webp/recommend_crown_bronze.webp';
import tipPinkIcon from '@/src/assets/svg/recommend_tip_pink.svg';
import rightArrowIcon from "@/src/assets/webp/recommend_right_arrow.webp"

// Enum으로 추천 구역 Data 관리
import { StadiumType} from "../../constants/ZoneData"

// 백엔드로부터 받은 추천 지역 관리
import { ZoneGetResponseType } from "../../api/ResultApiType";

// 프로필 API 관련
import { handleProfile, handlePrint } from "../../api/ResultApiHandler";
import { ProfileGetResponseType } from "../../api/ResultApiType";

// 자세히 보러가기 클릭시 현재 야구장의 모든 좌석 리스트 API 관련
import { handleGetStadiumInfo } from "@/src/api/StadiumApiHandler";
import { ZoneGetParamsType } from "@/src/api/StadiumApiType";

// TIP 모달창 관련
import useModal from '@/src/hooks/useModal';
import SeatTipDialog from "@/src/components/dialogs/SeatTipDialog";

// 예약 모달창 관련
import ChooseBaseballTeamDialog from "@/src/components/dialogs/ChooseBaseballTeamDialog";

// 반응형 이벤트
import { useScreenWidth } from "@/src/hooks/useReaction";

// zone 관리: KT or 잠실
// 부모로부터 인자로 받기
export interface Props {
    //stadium: StadiumType;
    resultId: number | null;
    setResultId: Dispatch<SetStateAction<number | null>>;
}

const Page = ({/*stadium,*/ resultId, setResultId}: Props) => {
    // 스타디움
    const [selectedStadium, setSelectedStadium] = useState<StadiumType>(StadiumType.NONE);
    
    /////////////////////////////////////////////
    // Question 페이지와 상태 동기화
    const router = useRouter();
    const [profileData, setProfileData] = useState<ProfileGetResponseType>();
    useEffect(() => {
        // 추천 존 리스트를 쿼리 파라미터로 가져오기
        if (router.query.resultId) {
            const resultId = JSON.parse(router.query.resultId as string);
            
            // 확인
            console.log("추천 구역 결과 페이지로 리다이렉트 했슴다: ")
            console.log(resultId);
            //console.log(stadium);
            //console.log(recommendedZoneList);
            setResultId(resultId);
        }

        if (router.query.selectedStadium) {
            const selectedStadium = router.query.selectedStadium as StadiumType;

            setSelectedStadium(selectedStadium);
        }

    }, [router.query]); // 쿼리 파라미터가 변경될 때마다(결과 페이지로 전환시) 실행



    /////////////////////////////////////////////
    // 추천 구역 이벤트
    const [recommendedZoneList, setRecommendedZoneList] = useState<ZoneGetResponseType[]>([]);
    const handleResultData = async () => {
        // 사용자 정보 가져오기
        const parsedProfileData = await handleProfile(resultId);
        if (parsedProfileData) {  // undefined가 아니면 처리
            setProfileData(parsedProfileData);
        }

        // 전체(최대 3개) 구역 추천 정보 가져오기
        const parsedZoneList = await handlePrint(3, resultId);  // handlePrint (= handleGetZoneList)
        if (parsedZoneList) {  // undefined가 아니면 처리
            setRecommendedZoneList(parsedZoneList);
        } 

        
        // 확인
        /*
        console.log(resultId);
        console.log(parsedZoneList);
        console.log(recommendedZoneList);
        console.log(parsedProfileData);
        */
    }
    useEffect(() => {
        handleResultData();
    }, [resultId]);

    // index마다 다른 왕관 이미지 띄우기
    const crownIcons = [
        crownGoldIcon,
        crownSilverIcon,
        crownBronzeIcon
    ];

    // TIP 모달창 이벤트
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null); // 열린 모달의 인덱스를 저장
    

    
    /////////////////////////////////////////////
    // 선택된 스타디움의 좌석 정보 가져오는 API 호출 이벤트
    const handleStadiumInfo = async () => {
        const params: ZoneGetParamsType = {
            stadiumName: selectedStadium as string,
        };

        const stadiumApiData = await handleGetStadiumInfo(params);
        if (stadiumApiData) {
            const stadiumInfo = stadiumApiData;
            const zoneNameList = stadiumApiData.zones.map((zone) => zone.zoneName);

            return zoneNameList;
        }

        return [];
    };

    /////////////////////////////////////////////
    // 지세히 보러가기 이벤트
    const handleDetailPage = async (index: number) => {
        // zoneNameList 가져오기
        const zoneNameList = await handleStadiumInfo();
        
        // 비동기 작업(handleStadiumInfo) 완료 후 페이지 전환
        moveDetailPage(index, zoneNameList);
    }

    const moveDetailPage = (index: number, zoneNameList: string[]) => {
        // 선택된 섹션에 따라 리다이렉트
        router.push({
        pathname: '/guide/zone',  // 리다이렉트할 경로
        query: {                  // 쿼리 파라미터 전달
            stadiumName: selectedStadium,
            zoneName: recommendedZoneList[index].name,
            zoneColor: recommendedZoneList[index].color,
            zoneNameList: zoneNameList,
        },
        });
    }


    /////////////////////////////////////////////
    // 예매하러 가기 버튼 클릭 시 모달창 띄우기 이벤트
    const {
        isOpen: isReservationOpen,
        openModal: openReservationModal,
        closeModal: closeReservationModal,
    } = useModal();
    
    // 버튼 클릭시 리다이렉트 이벤트가 아닌 모달창 이벤트 활성화하기로 함
    /*
    const handleBooking = () => {
        // 예매 페이지로 리다이렉트
        router.push('/booking');
    };
    */


    /////////////////////////////////////////////
    // 추천 다시 받기 버튼 클릭 시 리다이렉트 이벤트
    const handleRedirectToRecommendation = () => {
        // 추천 다시 받기 페이지로 리다이렉트
        router.push({
            pathname: '/recommend/question',  // 리다이렉트할 경로
            query: {                          // 쿼리 파라미터 전달
                stadiumName: selectedStadium,
            },
        });
    };


    /////////////////////////////////////////////
    // 문화 페이지로 이동 버튼 클릭 시 리다이렉트 이벤트
    const handleRedirectToCulture = () => {
        // 추천 다시 받기 페이지로 리다이렉트
        router.push({
            pathname: '/culture',  // 리다이렉트할 경로
            query: {                          // 쿼리 파라미터 전달
                stadiumName: selectedStadium,
            },
        });
    };



    /////////////////////////////////////////////
    // 반응형 이벤트
    const { isSmall, isMedium, isLarge, isExtraLarge } = useScreenWidth();

    const rookieSize = isSmall
        ? "w-[80px] h-[80px] "
        : isMedium
        ? "w-[97px] h-[97px] "
        : isLarge
        ? "w-[102px] h-[102px] "
        : "w-[106px] h-[106px] ";

    const textProfileSize = isSmall
        ? "text-xs"
        : isMedium
        ? "text-md"
        : isLarge
        ? "text-lg "
        : "text-lg ";

    const textNickNameSize = isSmall
        ? "text-lg "
        : isMedium
        ? "text-2xl "
        : isLarge
        ? "text-3xl "
        : "text-3xl ";

    const textHashtagSize = isSmall
        ? "text-xxxxs"
        : isMedium
        ? "text-xxxs"
        : isLarge
        ? "text-xs "
        : "text-xs ";

    const textTypeSize = isSmall
        ? "text-xxxs"
        : isMedium
        ? "text-xs"
        : isLarge
        ? "text-sm "
        : "text-sm ";

    const textZonePropileSize = isSmall
        ? "text-md"
        : isMedium
        ? "text-md "
        : isLarge
        ? "text-md "
        : "text-md ";

    const textZoneSize = isSmall
        ? "text-sm"
        : isMedium
        ? "text-md"
        : isLarge
        ? "text-md "
        : "text-md ";
    


    return (
        <div className="flex justify-center items-start bg-grayscale-5 w-full h-screen bg-fff overflow-y-auto scrollbar-hide pt-14">
            <div className="relative flex flex-col items-center w-full h-screen">
                {/** 임시 확인
                <ChooseBaseballTeamDialog/>
                <SeatTipDialog/> */}

                {/** 헤더 */}
                <ResultHeader
                resultId={resultId}
                nickname={profileData?.nickname || "기본 닉네임"}
                hashTags={profileData?.hashTags ?? []}
                />
                
                {/** 야구장 유형 */}
                <div className="flex justify-start w-full mt-[20px] px-[16px]">
                    {/** 프로필 이미지 */}
                    <div className={`${rookieSize} relative`}>
                        {/** Profile API 연동 데이터: 프로필 이미지 */}
                        {profileData ? (
                            <Image src={profileData.imgUrl} alt="프로필 이미지" layout="fill" objectFit="cover "/>
                        ) : null
                        }
                        {/** 프로필 백 그라운드: 연분홍 동그라미 */}
                        <div className="bg-grayscale-0 border border-[0px] rounded-full w-full h-full" />
                    </div>

                    {/** Profile API 연동 데이터 */}
                    <div className="flex-grow ml-[16px]">
                        <p className={`${textProfileSize} text-grayscale-90 font-semibold`}>
                            나의 야구장 유형은
                        </p>
                        <p className={`${textNickNameSize} text-main-50 font-black relative top-[-5px]`}>
                            {profileData?.nickname}
                        </p>
                        <div className={`relative text-start bg-main-0 ${textTypeSize} text-grayscale-90 font-medium px-[14px] py-[8px] mt-[2px] rounded-lg w-full text-center`}>
                            <div className="flex gap-[6px] mb-[6px] ">
                                {/** 해시 태그 */}
                                {profileData?.hashTags !== null ? (profileData?.hashTags.map((hashTag, index) => (
                                    <p key={index} className={`${textHashtagSize} px-[6px] py-[2px] text-main-70 font-medium bg-main-5 border border-0 rounded-md`}>
                                        {hashTag}
                                    </p>
                                ))
                                ) : (
                                    <>
                                    </>
                                )}
                            </div>
                            {profileData?.type}
                            <div className="absolute top-2 left-[-12px] w-0 h-0 border-b-[12px] border-r-[12px] border-t-transparent border-b-transparent border-r-main-0"/>

                            {/** 문구
                            <p>
                                {profileData?.explanation}
                            </p>
                            */}
                        </div>
                    </div>
                </div>


                {/** 추천 구역 */}
                <div className="w-full px-[16px] mt-[32px]">
                    {/** 타이틀 */}
                    <p className={`${textZonePropileSize} text-grayscale-90 font-bold`}>
                        나의 추천 구역
                    </p>
                    
                    {/** Zones API 연동 데이터 : 더미데이터 */}
                    {recommendedZoneList ? (
                        recommendedZoneList.map((zone, index) => {
                            // 인덱스에 맞는 이미지 선택
                            const selectedCrownIcon = crownIcons[index % crownIcons.length];  // index가 배열 길이를 넘어갈 경우 반복
                            const zoneName = recommendedZoneList[index].name;
                            const zoneColor = zone.color;
                            const zoneTip = recommendedZoneList[index].tip;
                            console.log(zoneColor);
                            console.log(zoneColor);
                            
                            const openModal = () => setOpenModalIndex(index);
                            const closeModal = () => setOpenModalIndex(null);
                    
                            return (
                                <div key={index} className="bg-grayscale-0 border border-[0px] rounded-lg mt-[12px] px-3 pt-3 pb-[10px]">
                                    <Image src={selectedCrownIcon} alt="왕관 이미지" className="w-[17px] h-[9px] left-[-2px]"/>
                                    <div className="flex w-full justify-between ">
                                        <div className="flex w-full justify-start items-center">
                                            <p className={`${textZoneSize} text-grayscale-90 font-semibold mr-[8px]`}>
                                                {index+1} {zone.name}
                                            </p>
                                            <Image src={tipPinkIcon} alt="핑크색 팁 이미지" className="w-[32px] h-[18px] cursor-pointer " onClick={openModal}/>
                                            {openModalIndex === index && zone.referencesGroup.length > 0 && (
                                                <SeatTipDialog
                                                    zoneName={zoneName}
                                                    zoneColor={zoneColor}
                                                    tip={zoneTip}
                                                    referencesGroup={zone.referencesGroup[0]}
                                                    onClose={closeModal}
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-glow justify-end  items-center text-center min-w-[100px] gap-[4px] cursor-pointer "
                                             onClick={() => handleDetailPage(index)}>
                                            <p className="text-xxs text-grayscale-40 font-medium ">
                                                자세히 보러가기
                                            </p>
                                            <Image src={rightArrowIcon} alt="자세히 보러가기 아이콘" width={5} height={5} className="flex-glow justify-end "/>
                                        </div>
                                    </div>
                                    <div className="mt-[4px] whitespace-pre-wrap text-justify">
                                        <p className="text-xs text-grayscale-90 font-regular px-[8px] py-[5px]">
                                            {[zone.explanations]}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="bg-grayscale-5 border border-[0px] rounded-[4px] h-[104px] mt-[12px] p-[12px]">
                            추천 구역이 없습니다!
                        </div>
                    )}
                    {/** 다음 버튼, 맨 아래에 배치 */}
                    <div className="relative flex justify-center items-center text-center border border-0 rounded-[8px] mb-3 h-[48px] w-full gap-[8px] mt-5">
                        <div className="bg-white border border-grayscale-30 rounded-[8px] cursor-pointer" onClick={handleRedirectToRecommendation}>
                            <p className="text-md text-grayscale-60 font-semibold min-w-[135px] px-[8px] py-[12px]">
                                추천 다시 받기
                            </p>
                        </div>
                        <div className="bg-main-50 border border-0 rounded-[8px] w-full cursor-pointer" onClick={openReservationModal}>
                            <p className="text-md text-main-0 font-semibold px-[8px] py-[12px]">
                                예매하러 가기
                            </p>
                        </div>
                    </div>
                    {/** 야구 문화 이동 버튼 */}
                    <div className="relative flex justify-center items-center text-center mb-24">
                        {/* 이후에 잠실, KT 야구장 각각 다르게 설정 필요 */}
                        <div 
                            className="bg-main-10 rounded-[8px] cursor-pointer w-full py-3"
                            onClick={handleRedirectToCulture}
                        >
                            <p className="text-md text-main-60 font-semibold">
                                직관 필수 코스, 한눈에 살펴보기!
                            </p>
                        </div>
                    </div>
                </div>


                {/** 상태에 따라 다른 컴포넌트 렌더링 
                {renderContents()}
                */}

                {isReservationOpen && selectedStadium && (
                <ChooseBaseballTeamDialog
                    stadiumName={selectedStadium}
                    onClose={() => {
                    closeReservationModal();
                    }}
                />
                )}
              <NavBar />
            </div>
        </div>
    )
}


export default Page