import React from 'react'

import { QuestionProps } from "../Question"
import { SeatType } from "../../../constants/ZoneData"

import Image from 'next/image';
import logoIcon from '../../../assets/svg/hitzone_logo.svg';
import ballPinkIcon from '../../../assets/svg/question01_ball.svg';
import stickIcon from '../../../assets/svg/question01_stick.svg';


interface Props extends QuestionProps {
    selectedSeat: SeatType;   // 백엔드에서 preference라는 이름으로 string 값으로 받음. "3루석" 이렇게
    setSelectedSeat: (seat: SeatType) => void;
}

const Page = ({previousStep, nextStep, selectedSeat, setSelectedSeat}: Props) => {

    const handleSelect = (seat: SeatType) => {
        setSelectedSeat(seat);
    };

    return (
        <div className="w-full max-w-[500px] px-[16px] overflow-hidden">
            {/** 상태 바: 1/4 단계 */}
            <div className="py-[24px]">
                <div className="flex items-center justify-start bg-grayscale-5 rounded-r-full overflow-hidden w-full h-[7px] ">
                    <div className="bg-main-40 h-full w-1/4 rounded-full"></div>
                </div>
            </div>
            
            {/** 폼 */}
            <div className="flex flex-col justify-start w-full ">
                <p className="text-xl text-grayscale-90 font-bold">
                    직관 가는 날 내가 응원하는 팀은?
                </p>
                <p className="text-sm text-grayscale-60 font-medium mt-[2px] mb-[32px]">
                    1개를 선택해주세요.
                </p>
                {/** 버튼 */}
                <div className="flex justify-center items-center gap-[10px] z-10">
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedSeat === SeatType.SEAT1 ? 'border-main-50 text-main-50 bg-main-5' : 'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleSelect(SeatType.SEAT1)}
                    >
                        {/** text-center: 텍스트 가운데 정렬 */}
                        <p className="text-sm font-medium text-center py-[16px]">
                            나는 <strong>1루 홈팀 석</strong>에 <br/>앉고 싶어요
                        </p>
                    </div>
                    <div className={`flex justify-center items-center bg-grayscale-5 border rounded-[8px] w-full p-[16px]"
                         cursor-pointer ${selectedSeat === SeatType.SEAT3 ? 'border-main-50 text-main-50 bg-main-5' : 'border-transparent text-grayscale-80 bg-grayscale-5'}`}
                         onClick={() => handleSelect(SeatType.SEAT3)}
                    >
                        <p className="text-sm font-medium text-center py-[16px]">
                            나는 <strong>3루 원정팀 석</strong>에 <br/>앉고 싶어요
                        </p>
                    </div>
                </div>
                <p className="text-xs text-grayscale-60 font-regular mt-[12px] z-10">
                    ※ 참고로, 홈팀 석이 더 쾌적하게 관람할 수 있어요!
                </p>
            </div>



            {/** next 버튼 */}
            <div className="absolute bottom-0 left-0 w-full px-[16px]">
                {/** 상대 위치로 배트 이미지를 시작하기 버튼으로부터 40px 위에, 왼쪽으로부터 13% 위치에 배치 */}
                {/** 상대 위치로 공 이미지를 시작하기 버튼으로부터 40px 위에, 왼쪽으로부터 85% 위치에 배치 */}
                <div className="relative">
                    <Image src={ballPinkIcon} alt="핑크 야구공 이미지" width={66} height={66}
                        className="absolute bottom-[40px] left-[13%] transform -translate-x-1/2"
                    />
                    <Image src={stickIcon} alt="배트 이미지" 
                        className="absolute bottom-[35px] right-0 w-[60%]"
                    />
                    {/**z-10 relative:  맨 위에 배치 */}
                    <div className={`flex justify-center items-center border rounded-[8px] h-[48px] mb-[40px] z-10 relative
                                   ${selectedSeat === SeatType.NONE ? 'bg-grayscale-10' : 'bg-grayscale-80 cursor-pointer'}`}
                         onClick={nextStep}
                    >
                        <p className={`text-md font-semibold 
                                     ${selectedSeat === SeatType.NONE ? 'text-grayscale-70' : 'text-grayscale-0'}`}
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