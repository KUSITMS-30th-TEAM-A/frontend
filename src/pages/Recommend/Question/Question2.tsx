import React from 'react'

import { QuestionProps } from "../Question"
import { Keyword } from "../../../constants/ZoneData"

import Image from 'next/image';
import baseballBatIcon from '../../../assets/svg/question02.svg';


interface Props extends QuestionProps {
    //clientKeywords: string;   // 백엔드에서 clientKeywords라는 이름으로 string 값으로 받음. "나 혼자" 이렇게
    selectedParter: Keyword;
    handleParterKeywordItem: (keyword: Keyword) => void;
}

const Page = ({previousStep, nextStep, selectedParter, handleParterKeywordItem}: Props) => {

    return (
        <div className="w-full px-[16px]">
            {/** 상태 바: 2/4 단계 */}
            <div className="py-[24px]">
                <div className="flex items-center justify-start bg-grayscale-5 rounded-r-full overflow-hidden w-full h-[7px] ">
                    <div className="bg-main-40 h-full w-2/4 rounded-full"></div>
                </div>
            </div>
            
            {/** 폼 */}
            <div className="flex flex-col justify-start w-full ">
                <p className="text-xl text-grayscale-90 font-bold">
                    나의 야구 관람 파트너는?
                </p>
                <p className="text-sm text-grayscale-60 font-medium mt-[2px] mb-[32px]">
                    1개를 선택해주세요.
                </p>

                {/** 버튼 */}
                <div className="flex flex-col z-10 gap-[12px]">
                    <div className={`flex justify-start items-center bg-grayscale-5 border rounded-[8px] w-full"
                         cursor-pointer ${selectedParter === Keyword.PARTNER1 ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleParterKeywordItem(Keyword.PARTNER1)}
                    >
                        <p className="text-sm font-medium text-center p-[16px]">
                            🙋🏻 나 혼자
                        </p>
                    </div>

                    <div className={`flex justify-start items-center bg-grayscale-5 border rounded-[8px] w-full"
                         cursor-pointer ${selectedParter === Keyword.PARTNER2 ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleParterKeywordItem(Keyword.PARTNER2)}
                    >
                        <p className="text-sm font-medium text-center p-[16px]">
                            👥 같은 팀 팬과
                        </p>
                    </div>

                    <div className={`flex justify-start items-center bg-grayscale-5 border rounded-[8px] w-full"
                         cursor-pointer ${selectedParter === Keyword.PARTNER3 ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleParterKeywordItem(Keyword.PARTNER3)}
                    >
                        <p className="text-sm font-medium text-center p-[16px]">
                            👥 다른 팀 팬과
                        </p>
                    </div>
                </div>
            </div>



            {/** next 버튼 */}
            <div className="absolute bottom-0 left-0 w-full px-[16px]">
                {/** 상대 위치로 배트 이미지를 시작하기 버튼으로부터 82px 위에, 왼쪽으로부터 32% 위치에 배치 */}
                <div className="relative">
                    <Image src={baseballBatIcon} alt="야구 방망이 이미지" width={319} height={181}
                        className="absolute bottom-[82px] left-[32%] transform -translate-x-1/2"
                    />
                    {/**z-10 relative:  맨 위에 배치 */}
                    <div className={`flex justify-center items-center border rounded-[8px] h-[48px] mb-[40px] z-10 relative
                                   ${selectedParter === Keyword.NONE ? 'bg-grayscale-10' : 'bg-grayscale-80 cursor-pointer'}`}
                         onClick={nextStep}
                    >
                        <p className={`text-md font-semibold 
                                     ${selectedParter === Keyword.NONE ? 'text-grayscale-70' : 'text-grayscale-0'}`}
                         >
                            다음
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Page