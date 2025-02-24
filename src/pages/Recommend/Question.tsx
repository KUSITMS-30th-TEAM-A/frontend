import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

import HeaderBar from "../../components/layout/HeaderBar";
import HeaderBackBar from "../../components/layout/HeaderBackBar";
import Question1 from "./Question/Question1";
import Question2 from "./Question/Question2";
import Question3 from "./Question/Question3";
import Question4 from "./Question/Question4";

import { StadiumType, SeatType, Keyword } from "../../constants/ZoneData"
import { handleSave, handlePrint } from "../../api/ResultApiHandler";

import { ZoneGetResponseType } from "../../api/ResultApiType";

// zone 관리: KT or 잠실
// 부모로부터 인자로 받기
export interface Props {
    //stadium: StadiumType;
    setResultId: Dispatch<SetStateAction<number | null>>;
    recommendedZoneList: ZoneGetResponseType[];
    setRecommendedZoneList: Dispatch<SetStateAction<ZoneGetResponseType[]>>;
}

export interface QuestionProps {
    previousStep: () => void;
    nextStep: () => void;
}



const Page = ({/*stadium,*/ setResultId, recommendedZoneList, setRecommendedZoneList}: Props) => {
    // 선택한 좌석
    const [selectedSeat, setSelectedSeat] = useState(SeatType.NONE);

    // 선택한 파트너
    const [selectedParter, setSelectedParter] = useState(Keyword.NONE);
    const handleParterKeywordItem = (keyword: Keyword) => {
        setSelectedParter(keyword);
        handleKeywordItem(keyword);
    }

    // 선택한 키워드 배열
    const [selectedKeywordItems, setSelectedKeywordItems] = useState<Keyword[]>([]);
    const handleKeywordItem = (newKeywordItem: Keyword) => {
        // 선택한 값이 파트너 값이면 중복 불가
        // 기존 파트너 값은 배열에서 제거하고 넣기
        const keywordPartnerGroup = [Keyword.PARTNER1, Keyword.PARTNER2, Keyword.PARTNER3];
        if(keywordPartnerGroup.includes(newKeywordItem)) {
            setSelectedKeywordItems((prevKeywordItems: Keyword[]) => {
                return [
                    // 기존 파트너 값을 제외한 배열 값
                    ...prevKeywordItems.filter((prevKeywordItem) => !keywordPartnerGroup.includes(prevKeywordItem)),
                    // 새로운 파트너 값
                    newKeywordItem
                ];
            });
            return;
        }

        // 그 외는 중복 가능
        // 배열에 그냥 넣기
        setSelectedKeywordItems((prevKeywordItems: Keyword[]) => {
            // 기존 배열에 존재하는 아이템이면
            if (prevKeywordItems.includes(newKeywordItem)) {
                // 배열에서 제거
                return prevKeywordItems.filter((item) => item !== newKeywordItem);
            } else {
                // 배열에 없으면 추가
                return [...prevKeywordItems, newKeywordItem];
            }
        });
    };


    // 선택한 위시
    const keywordWishGroup = [Keyword.WISH1, Keyword.WISH2, Keyword.WISH3,
        Keyword.WISH4, Keyword.WISH5, Keyword.WISH6, Keyword.WISH7
    ];
    // 배열에 wish 값이 하나 이상 포함되어 있는 지 확인하는 함수
    const hasWish = selectedKeywordItems.some((v) => keywordWishGroup.includes(v));


    // 선택한 노위시
    const keywordNowishGroup = [Keyword.NOWISH1, Keyword.NOWISH2, Keyword.NOWISH3, Keyword.NOWISH4];
    // 배열에 nowish 값이 하나 이상 포함되어 있는 지 확인하는 함수
    const hasNowish = selectedKeywordItems.some((v) => keywordNowishGroup.includes(v));
    // 배열에서 nowish 아이템 모두 제거하는 함수
    const clearNowishItems = () => {
        // 선택된 keywords에서 nowish 아이템 제거한 리스트
        const selectedItems = selectedKeywordItems.filter((item) => !keywordNowishGroup.includes(item));
        setSelectedKeywordItems(selectedItems);
    };
    


    //////////////////////////////////////////////////////////
    // 스타디움
    const [selectedStadium, setSelectedStadium] = useState<StadiumType>(StadiumType.NONE);
    
    const router = useRouter();

    // 질문 페이지로 리다이렉트해서 온 경우 실행되는 이벤트
    // 쿼리로 전달받은 파라미터로 로컬 변수 업데이트
    useEffect(() => {
        // 추천 존 리스트를 쿼리 파라미터로 가져오기
        if (router.query.stadiumName) {
            const stadiumName = (router.query.stadiumName as StadiumType);

            // 스타디움 이벤트 발동
            setSelectedStadium(stadiumName);

            // 확인
            console.log("추천 구역 질문 페이지로 리다이렉트 했슴다: ")
            console.log(stadiumName);
        }

    }, [router.query]); // 쿼리 파라미터가 변경될 때마다(결과 페이지로 전환시) 실행



    //////////////////////////////////////////////////////////
    // API 통신 호출 이벤트 (로컬 데이터 업뎃)
    const handleGetResultId = async () => {
        // 백엔드에 데이터 전송 후 반환 값 가져오기 (API 통신)
        const resultId = await handleSave({stadium:selectedStadium, seat:selectedSeat, keywords:selectedKeywordItems});
        console.log("🐻‍❄️ 추천 질문 데이터 전송하구 resultId 받았당! ");
        console.log(resultId);

        // 반환 값 저장
        setResultId(resultId);

        // 질문 작성 완료 후 결과 페이지로 이동
        //router.push('/recommend/results');

        // 질문 작성 완료 후 결과 페이지로 이동 및 백엔드로부터 받은 resultId 전송
        router.push({
            pathname: '/recommend/results',
            query: { 
                resultId: JSON.stringify(resultId),
                selectedStadium: selectedStadium,
            }, 
        });
    }


    //////////////////////////////////////////////////////////
    // 페이지 상태 관리
    const [step, setStep] = useState(1);

    // 이전 버튼 이벤트
    const previousStep = () => {
        // 이전 step 페이지로 이동
        if (step > 1) setStep(step - 1);
        // 초기 step 페이지에선 이전 경로로 이동
        else window.history.back();
    };

    // 다음 버튼 이벤트
    const nextStep = () => {
        // step1 페이지
        if (step == 1) {
            // 좌석을 선택했으면 다음 step 페이지로 이동
            if(selectedSeat != SeatType.NONE){
                setStep(step + 1);

            // 좌석을 선택하지 않았으면
            }else{
                // 이동 막음
            }
        
        // step2 페이지
        }else if(step == 2){
            // 파트너를 선택했으면 다음 step 페이지로 이동
            if(selectedParter != Keyword.NONE){
                setStep(step + 1);

            // 파느너를 선택하지 않았으면
            }else{
                // 이동 막음
            }
        
        // step3 페이지
        }else if(step < 4) {
            // 값을 선택했으면
            if(hasWish) {
                // 다음 step 페이지로 이동
                setStep(step + 1);
            }
        // step4 페이지
        }else {
            // 값을 선택했으면
            /*
            if(hasNowish) {
                // API 연동 및 결과 페이지로 리다이렉트
                handleGetResultId();
                console.log(selectedKeywordItems);
            }
            */

            // API 연동 및 결과 페이지로 리다이렉트
            handleGetResultId();
            console.log(selectedKeywordItems);
        }
    };

    // 닫기 버튼 이벤트
    const close = () => {
        // main 홈으로 이동
        router.push("/");
    }


    /** 렌더링 */
    const renderBar = () => {
        switch(step) {
            case 1:
                return <HeaderBar stadium={selectedStadium} closeEvent={close}/>
            default:
                return <HeaderBackBar stadium={selectedStadium} prevEvent={previousStep} closeEvent={close}/>;
        }
    };

    const renderContents = () => {
        switch(step) {
            case 1:
                return <Question1 previousStep={previousStep} nextStep={nextStep} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>;
            
            case 2:
                return <Question2 previousStep={previousStep} nextStep={nextStep} selectedParter={selectedParter} handleParterKeywordItem={handleParterKeywordItem}/>;
            
            case 3:
                return <Question3 previousStep={previousStep} nextStep={nextStep} selectedZone={selectedStadium} selectedKeywordItems={selectedKeywordItems} handleKeywordItem={handleKeywordItem} hasWish={hasWish}/>;
            
            case 4:
                return <Question4 previousStep={previousStep} nextStep={nextStep} selectedKeywordItems={selectedKeywordItems} handleKeywordItem={handleKeywordItem} hasNowish={hasNowish} clearNowishItems={clearNowishItems}/>;
            
            default:
                return null;
        }
    };
    
    return (
        <div className="flex justify-center items-start bg-main-0 w-full h-screen bg-fff">
            <div className="relative flex flex-col items-center w-full h-screen">
                
                {/** 헤더 */}
                {renderBar()}

                {/** 상태에 따라 다른 컴포넌트 렌더링 */}
                {renderContents()}
            </div>
        </div>
    );
}


export default Page