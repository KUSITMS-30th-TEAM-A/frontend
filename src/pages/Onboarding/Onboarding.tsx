import React, { useEffect, useState } from 'react';

import InitPage from "./Login/InitPage"
import LoginPage from "./Login/LoginPage"
import SignupPage1 from "./Signup/SignupPage1"
import SignupPage2 from "./Signup/SignupPage2"
import SignupPage3 from "./Signup/SignupPage3"


const Onboarding = () => {
    // 로딩 상태 관리
    const [loading, setLoading] = useState(true);

    // 로그인 상태 관리
    //const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 처음/기존 사용자 상태 관리
    //const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

    // 회원가입 단계 상태 관리
    


    // 로딩 상태 시뮬레이션
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            // 여기서 백엔드랑 API 통신하면서 로그인 상태와 최초 사용자 여부를 설정하기
            // 예를 들어:
            // setIsLoggedIn(true); // 로그인 상태 업데이트
            // setIsFirstTimeUser(false); // 기존 사용자로 업데이트

        }, 1000); // 1초 후 로딩 종료

        return () => clearTimeout(timer);
    }, []);


    // 로딩 상태시 렌더링
    if (loading) {
        return <InitPage />;
    }

    
    // 로그아웃 상태시 렌더링
    return <LoginPage />;
    /*
    if (!isAuthenticated) {
        return <LoginPage />;
    }
    */
    
    
    // 로그인 및 처음 사용자 상태시 렌더링
    /*
    if (isAuthenticated && isFirstTimeUser) {
        return <SignupPage1 />
        //return <SignupPage3 userName={"서여니"} />
    }
    */
    
    
    // 로그인된 기존 사용자일 경우 메인 페이지로 이동
    /*
    if (isAuthenticated && !isFirstTimeUser) {
        router.replace('/');
    }

    return null; // 리디렉션 중일 때 아무것도 렌더링하지 않음
    */
}

export default Onboarding