import React from 'react';
import { BASE_URL } from '../../../api/axiosInstance';  // 백엔드 서버 주소

import Image from 'next/image';
import logoIcon from '../../../assets/svg/hitzone_logo.svg';
import ballWhiteIcon from '../../../assets/svg/ball_white.svg';
import ballPinkIcon from '../../../assets/svg/ball_pink.svg';
import loginNaverIcon from '../../../assets/svg/login_naver.svg';
import loginKakaoIcon from '../../../assets/svg/login_kakao.svg';
import loginGoogleIcon from '../../../assets/svg/login_google.svg';

const Page = () => {
    // 로그인 이벤트 (클라이언트 리다이렉트)
    // 로그인 버튼 클릭 시, 각 소셜 로그인 URL로 리다이렉트
    const handleLogin = (provider: string) => {
        // provider를 이용하여 소셜마다 다 다른 동적 url로 이동
        window.location.href = `${BASE_URL}/oauth2/authorization/${provider}`;
    };

    // 렌더링
    return (
        <div className="flex justify-center items-start w-full h-screen bg-fff">
            <div className="relative flex flex-col items-center h-screen">
                {/** 하얀 야구공 마크 */}
                <div className="flex justify-center items-center w-full h-[111px] mb-[85px]">
                    <div className="absolute left-[-15%] top-[30px]">
                        <Image src={ballWhiteIcon} alt="white baseball" width={111} height={111} />
                    </div>
                </div>

                {/** 로고 */}
                <div className="flex flex-col justify-center items-center mt-4">
                    <Image src={logoIcon} alt="Logo" width={258} height={45} />
                    <p className="text-md text-grayscale-90 font-medium mt-3">
                        나에게 가장 Fit한 Zone에서 야구를 즐겨보세요
                    </p>
                </div>

                {/** 핑크 야구공 마크 */}
                <div className="flex justify-center items-center w-full h-[187px] mt-[100px]">
                    <div className="absolute right-[-15%]">
                        <Image src={ballPinkIcon} alt="pink baseball" width={187} height={187} />
                    </div>
                </div>

                {/** 소셜 로그인 버튼 */}
                <div className="absolute bottom-[75px] ">
                    {/*
                    <button  onClick={() => signIn("google", { callbackUrl: "/" })}>
                        <Image src={loginNaverIcon} alt="pink baseball" className="mb-3" width={370} height={48}/>
                    </button>
                    <button  onClick={() => signIn("kakao", { callbackUrl: "/" })}>
                        <Image src={loginKakaoIcon} alt="pink baseball" className="mb-3" width={370} height={48}/>
                    </button>
                    <button  onClick={() => signIn("naver", { callbackUrl: "/" })}>
                        <Image src={loginGoogleIcon} alt="pink baseball" className="mb-3" width={370} height={48}/>
                    </button>
                    */}
                    {/*
                    <button onClick={() => (window.location.href = "https://git.hitzone.store/oauth2/authorization/google")}>
                        <Image src={loginGoogleIcon} alt="Google 로그인" width={370} height={48} className="mb-3" />
                    </button>
                    <button onClick={() => (window.location.href = "https://git.hitzone.store/oauth2/authorization/kakao")}>
                        <Image src={loginKakaoIcon} alt="Kakao 로그인" width={370} height={48} className="mb-3" />
                    </button>
                    <button onClick={() => (window.location.href = "https://git.hitzone.store/oauth2/authorization/naver")}>
                        <Image src={loginNaverIcon} alt="Naver 로그인" width={370} height={48} className="mb-3" />
                    </button>
                    */}
                    <button onClick={() => handleLogin("naver")}>
                        <Image src={loginNaverIcon} alt="Naver 로그인" width={370} height={48} className="mb-3" />
                    </button>
                    <button onClick={() => handleLogin("kakao")}>
                        <Image src={loginKakaoIcon} alt="Kakao 로그인" width={370} height={48} className="mb-3" />
                    </button>
                    <button onClick={() => handleLogin("google")}>
                        <Image src={loginGoogleIcon} alt="Google 로그인" width={370} height={48} className="mb-3" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page