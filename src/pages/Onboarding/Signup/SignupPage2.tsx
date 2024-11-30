import React, { useState } from 'react';
import BackBar from "../../../components/layout/BackBar"
import { Props } from "./SignupPage";

import AlarmQuestionDialog from "../../../components/dialogs/AlarmQuestionDialog"

const Page = ({previousStep, nextStep}: Props) => {
    return (
        <div className="relative justify-center items-center w-full h-screen ">
            {/** 뒤로가기 바 */}
            <div className="w-full border-b border-grayscale-10 py-[15px]"
                 onClick={previousStep}>
                <BackBar />
            </div>

            {/**임시로 
            <AlarmQuestionDialog/>
            */}
            {/** 컨텐츠 */}
            <div className="px-[16px]">
                {/** 상태 바 */}
                <div className="py-[24px]">
                    <div className="flex items-center justify-start bg-main-40 rounded-full overflow-hidden w-full h-[7px] ">
                    </div>
                </div>

                {/** 알람 설정 폼 */}
                <div>
                    <p className="text-xl text-grayscale-90 font-bold">
                        알람 설정
                    </p>
                    <p className="text-sm text-grayscale-60 font-medium mt-[2px]">
                        알람 설정은 언제든지 변경할 수 있어요.
                    </p>

                    {/** 알람 허용 선택 박스 */}
                    <div className="flex justify-between items-center bg-grayscale-5 border rounded-[12px] p-[16px] mt-[30px]">
                        <div>
                            <p className="text-sm text-grayscale-90 font-bold mb-[4px]">
                                알람 허용
                            </p>
                            <p className="text-xs text-grayscale-90 font-medium">
                                HitZone의 소식을 빠르게 받아보실 수 있어요.
                            </p>
                        </div>
                        <div className="flex">
                            <div className="flex justify-center items-center bg-main-50 rounded-l-[8px] overflow-hidden w-[42px] h-[31px]">
                                <p className="text-xs text-main-0 font-bold ">
                                    ON
                                </p>
                            </div>
                            <div className="flex justify-center items-center bg-main-0 rounded-r-[8px] overflow-hidden w-[42px] h-[31px] border border-main-50 ">
                                <p className="text-xs text-main-50 font-bold ">
                                    OFF
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/** next 버튼 */}
            <div className="absolute bottom-0 left-0 w-full px-[16px]">
                <div className="flex justify-center items-center bg-main-50 border rounded-[8px] h-[48px] mb-[40px]">
                    <p className="text-md text-white font-semibold ">
                        <button onClick={nextStep}>다음</button>
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Page