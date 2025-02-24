import { useEffect, useState } from 'react';
import InitPage from '@/src/pages/Onboarding/Login/InitPage'; // 온보딩 컴포넌트
import SignupPage3 from "@/src/pages/Onboarding/Signup/SignupPage3";
import CoachMark from "@/src/pages/Main/components/CoachMark";
import Main from '@/src/pages/Main/Main'; // 메인 컴포넌트

export const onboardingHistoryName = "hasCompletedOnboarding";

const HomePage = () => {
    // 로직: init -> signup -> onboarding -> coachmark -> main
    const [currentPage, setCurrentPage] = useState<'init' | 'signup' | 'onboarding' | 'coachmark' | 'main'>('init'); // 페이지 상태
    
    useEffect(() => {
        // localStorage에서 사용자가 온보딩을 완료했는지 확인
        const hasCompletedOnboarding = localStorage.getItem(onboardingHistoryName);

        // 이미 온보딩을 완료했으면 바로 Main 페이지로
        if (hasCompletedOnboarding === 'true') {
            setCurrentPage('main');
        // 온보딩을 완료하지 않았다면 InitPage로
        } else {
            setCurrentPage('init');
        }
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행


    useEffect(() => {
        // 초기 페이지
        if (currentPage === 'init') {
            // 1.5초 후 InitPage에서 SignupPage3로 전환
            const initTimer = setTimeout(() => {
                setCurrentPage('onboarding');
            }, 1500);
            
            // 타이머 초기화
            return () => clearTimeout(initTimer);
        }

    }, [currentPage]); // currentPage가 변경될 때마다 useEffect 실행
    

    return (
        <>
            {/* 초기 페이지 */}
            {currentPage === 'init' && <InitPage/>} 

            {/* 온보딩 페이지 */}
            {currentPage === 'onboarding' && <SignupPage3 onComplete={() => setCurrentPage('coachmark')}/>} 

            {/* 코치마크 페이지 */}
            {currentPage === 'coachmark' && <CoachMark onClose={() => setCurrentPage('main')}/>}

            {/* 메인 페이지 */}
            {currentPage === 'main' && <Main />}
        </>
    );
};

export default HomePage;
