import React from 'react'

import { QuestionProps } from "../Question"
import { StadiumType, Keyword } from "../../../constants/ZoneData"

import Image from 'next/image';
import gloveIcon from '../../../assets/svg/question03.svg';


interface Props extends QuestionProps {
    selectedZone: StadiumType;
    selectedKeywordItems: Keyword[];
    handleKeywordItem: (keyword: Keyword) => void;
    hasWish: boolean;
}

const Page = ({previousStep, nextStep, selectedZone, selectedKeywordItems, handleKeywordItem, hasWish}: Props) => {

    return (
        <div className="w-full px-[16px]">
            {/** 상태 바: 3/4 단계 */}
            <div className="py-[24px]">
                <div className="flex items-center justify-start bg-grayscale-5 rounded-r-full overflow-hidden w-full h-[7px] ">
                    <div className="bg-main-40 h-full w-3/4 rounded-full"></div>
                </div>
            </div>
            
            {/** 폼 */}
            <div className="flex flex-col justify-start w-full ">
                <p className="text-xl text-grayscale-90 font-bold">
                    내가 야구장에서 원하는 것은?
                </p>
                <p className="text-sm text-grayscale-60 font-medium mt-[2px] mb-[32px]">
                    중복 선택이 가능해요.
                </p>

                {/** 버튼 */}
                <div className="flex justify-center items-center gap-[12px] mb-[12px] z-10">
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.WISH1) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.WISH1)}
                    >
                        {/** text-center: 텍스트 가운데 정렬 */}
                        <p className="text-sm font-medium text-center py-[16px]">
                            ❤️‍🔥 열정적인 응원
                        </p>
                    </div>
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.WISH2) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.WISH2)}
                    >
                        <p className="text-sm font-medium text-center py-[16px]">
                            👥 경기장 한눈에 보기
                        </p>
                    </div>
                </div>
                
                <div className="flex justify-center items-center gap-[12px] mb-[12px] z-10">
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.WISH3) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.WISH3)}
                    >
                        {/** text-center: 텍스트 가운데 정렬 */}
                        <p className="text-sm font-medium text-center py-[16px]">
                            🚻 편리한 화장실 이용
                        </p>
                    </div>
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.WISH4) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.WISH4)}
                    >
                        <p className="text-sm font-medium text-center py-[16px]">
                            🍗 음식 먹기 편한
                        </p>
                    </div>
                </div>
                
                <div className="flex justify-center items-center gap-[12px] mb-[12px] z-10">
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.WISH5) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.WISH5)}
                    >
                        {/** text-center: 텍스트 가운데 정렬 */}
                        <p className="text-sm font-medium text-center py-[16px]">
                            💨 빠른 퇴장 가능
                        </p>
                    </div>
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedKeywordItems.includes(Keyword.WISH6) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleKeywordItem(Keyword.WISH6)}
                    >
                        <p className="text-sm font-medium text-center py-[16px]">
                            🙋 선수들 가까이
                        </p>
                    </div>
                </div>
                
                {/** KT 구역일 땐 아이템 하나 더 추가 */}
                {selectedZone === StadiumType.SUWON_KT ?
                    <div className="flex justify-center items-center gap-[12px] mb-[12px] z-10">
                        <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                            cursor-pointer ${selectedKeywordItems.includes(Keyword.WISH7) ? 'border-main-50 text-main-50 bg-main-5':'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                            onClick={() => handleKeywordItem(Keyword.WISH7)}
                        >
                            {/** text-center: 텍스트 가운데 정렬 */}
                            <p className="text-sm font-medium text-center py-[16px]">
                                🥓 삼겹살 구워먹기
                            </p>
                        </div>

                        {/** 2열 맞추려고 만든 유령 블록 */}
                        <div className="w-full"/>
                    </div>
                    : <></>
                }
            </div>



            {/** next 버튼 */}
            <div className="absolute bottom-0 left-0 w-full px-[16px]">
                {/** 상대 위치로 글로브 이미지를 시작하기 버튼으로부터 15px 위에, 왼쪽으로부터 68% 위치에 배치 */}
                <div className="relative">
                    <Image src={gloveIcon} alt="야구 글로브 이미지"
                        className="absolute bottom-[15px] left-[68%] w-[70%] transform -translate-x-1/2"
                    />
                    {/**z-10 relative:  맨 위에 배치 */}
                    <div className={`flex justify-center items-center border rounded-[8px] h-[48px] mb-[40px] z-10 relative
                                   ${!hasWish? 'bg-grayscale-10' : 'bg-grayscale-80 cursor-pointer'}`}
                         onClick={nextStep}
                    >
                        <p className={`text-md font-semibold 
                                     ${!hasWish? 'text-grayscale-70' : 'text-grayscale-0'}`}
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