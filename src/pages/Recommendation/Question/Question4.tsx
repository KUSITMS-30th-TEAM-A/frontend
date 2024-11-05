import React from 'react'

import { QuestionProps, Keyword } from "../Question"

import Image from 'next/image';
import pinkZoneIcon from '../../../assets/svg/question04.svg';


interface Props extends QuestionProps {
    selectedKeywordItems: Keyword[];
    handleKeywordItem: (keyword: Keyword) => void;
    hasNowish: boolean;
}

const Page = ({previousStep, nextStep, selectedKeywordItems, handleKeywordItem, hasNowish}: Props) => {

    return (
        <div className="w-full px-[16px]">
            {/** 상태 바: 3/4 단계 */}
            <div className="py-[24px]">
                <div className="flex items-center justify-start bg-main-40 rounded-full overflow-hidden w-full h-[7px] ">
                </div>
            </div>
            
            {/** 폼 */}
            <div className="flex flex-col justify-start w-full ">
                <p className="text-xl text-grayscale-90 font-bold">
                    내가 야구장에서 원하지 않는 것은?
                </p>
                <p className="text-sm text-grayscale-60 font-medium mt-[2px] mb-[32px]">
                    중복 선택이 가능해요.
                </p>

                {/** 버튼 */}
                <div className="flex justify-center items-center gap-[12px] mb-[12px] z-10">
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.NOWISH1) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.NOWISH1)}
                    >
                        {/** text-center: 텍스트 가운데 정렬 */}
                        <p className="text-sm font-medium text-center py-[16px]">
                            ☀️ 햇빛 싫어요
                        </p>
                    </div>
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.NOWISH2) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.NOWISH2)}
                    >
                        <p className="text-sm font-medium text-center py-[16px]">
                            📢 큰 소리 싫어요
                        </p>
                    </div>
                </div>
                
                <div className="flex justify-center items-center gap-[12px] mb-[12px] z-10">
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.NOWISH3) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.NOWISH3)}
                    >
                        {/** text-center: 텍스트 가운데 정렬 */}
                        <p className="text-sm font-medium text-center py-[16px]">
                            😵‍💫 높은 곳 싫어요
                        </p>
                    </div>
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.NOWISH4) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.NOWISH4)}
                    >
                        <p className="text-sm font-medium text-center py-[16px]">
                            ☔️ 비맞기 싫어요
                        </p>
                    </div>
                </div>
            </div>



            {/** next 버튼 */}
            <div className="absolute bottom-0 left-0 w-full px-[16px]">
                {/** 상대 위치로 핑크 존 이미지를 시작하기 버튼으로부터 7px 위에, 왼쪽으로부터 70% 위치에 배치 */}
                <div className="relative">
                    <Image src={pinkZoneIcon} alt="핑크 야구장 이미지" width={405} height={405}
                        className="absolute bottom-[7px] left-[70%] transform -translate-x-1/2"
                    />
                    {/**z-10 relative:  맨 위에 배치 */}
                    <div className={`flex justify-center items-center border rounded-[8px] h-[48px] mb-[40px] z-10 relative
                                   ${!hasNowish? 'bg-grayscale-10' : 'bg-grayscale-80'}`}
                    >
                        <p className={`text-md font-semibold 
                                    ${!hasNowish? 'text-grayscale-70' : 'text-grayscale-0'}`}
                         >
                            <button onClick={nextStep}>나에게 딱 맞는 구역 추천 받기</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Page