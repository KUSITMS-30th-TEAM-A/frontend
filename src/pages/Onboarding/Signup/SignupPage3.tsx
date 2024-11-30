import React, { useState } from 'react';
import HeaderCenterBar from "@/src/components/layout/HeaderCenter";

import Image from 'next/image';
import signupConfettiIcon from '../../../assets/svg/signup_confetti.svg';
import signupRookieIcon from '../../../assets/svg/signup_rookie.svg';
import signupZonePinkIcon from '../../../assets/svg/signup_zone_pink.svg';

import onboardingRookieIcon from "@/src/assets/webp/onboarding_welcome_rookie.webp";
import onboardingZoneBackgroundIcon from "@/src/assets/webp/onboarding_welcome_zone_background.webp";

import { onboardingHistoryName } from "@/src/pages/Home/HomePage";

interface Props {
    onComplete: () => void;
}

const Page = ({onComplete}: Props) => {
    const handleComplete = () => {
        // 온보딩 완료 후 localStorage에 상태 저장
        localStorage.setItem(onboardingHistoryName, 'true');
        onComplete(); // 다음 페이지로 전환
    };

    return (
        <div className="relative justify-center items-center w-full h-screen ">
            {/** 헤더바 */}
            <HeaderCenterBar />
            
            {/** 배경 이미지, 맨 뒤에, 중앙에 배치 */}
            <Image src={signupConfettiIcon} alt="축하 배경 이미지" className="absolute left-1/2 -translate-x-1/2 translate-y-[20px] justify-center z-[-1]" />

            {/** 컨텐츠 */}
            <div className="px-[18px] mt-[120px]">
                {/** 알람 설정 폼 */}
                <div>
                    <p className="text-xl text-grayscale-90 font-bold">
                        환영해요!
                    </p>
                    <p className="text-lg text-grayscale-90 font-semibold mt-[2px]">
                        나에게 가장 Fit한 Zone에서 <br/>야구를 즐겨보세요
                    </p>
                </div>
            </div>
            
            <Image 
                src={onboardingZoneBackgroundIcon} 
                alt="핑크 야구장 배경 아마자" 
                className="absolute bottom-0 left-0 w-full z-[-1]" 
            />

            {/** next 버튼 */}
            <div className="absolute bottom-0 left-0 w-full px-[16px]">
                {/** 상대 위치로 루키 이미지를 시작하기 버튼으로부터 220px 위에 배치 */}
                <div className="relative">
                    <Image 
                        src={onboardingRookieIcon} 
                        alt="루키" 
                        className="absolute bottom-[170px] left-1/2 transform -translate-x-1/2  z-[-1]"
                        width={255}
                        height={319}
                    />
                    <div className="flex justify-center items-center bg-main-50 border rounded-[8px] h-[48px] mb-[40px]">
                        <p className="text-md text-white font-semibold ">
                            <button onClick={handleComplete}>Hitzone 시작하기</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Page