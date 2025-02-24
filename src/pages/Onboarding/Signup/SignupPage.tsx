// pages/signup.tsx
import { useState } from "react";
import { useRouter } from "next/router";

import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupPage3 from "./SignupPage3";

import { handleSignup } from "../../../api/UserApiHandler";

export interface Props {
    previousStep: () => void;
    nextStep: () => void;
}

const SignupPage = () => {
    // 닉네임 상태 관리
    const [nickname, setNickname] = useState('');

    // 페이지 상태 관리
    const [step, setStep] = useState(1);
    const router = useRouter();

    const previousStep = () => {
        // 이전 step 페이지로 이동
        if (step > 1) setStep(step - 1);
        // 초기 step 페이지에선 이전 경로로 이동
        else window.history.back();
    };

    const nextStep = async () => {
        // 다음 step 페이지로 이동
        if (step < 3) {
            setStep(step + 1);
            
        // 마지막 페이지에선 회원가입 이벤트 수행
        }else {
            // Promise<boolean>을 반환하는 비동기 함수
            handleSignup({nickname});
        }
    };


    switch(step) {
        case 1:
            return <SignupPage1 previousStep={previousStep} nextStep={nextStep} nickname={nickname} setNickname={setNickname}/>;
        case 2:
            return <SignupPage2 previousStep={previousStep} nextStep={nextStep}/>;
        case 3:
            //return <SignupPage3 previousStep={previousStep} nextStep={nextStep} nickname={nickname}/>;
        default:
            return null;
    }
    /*
    return (
        <div>
        {step === 1 && <div>Step 1: 기본 정보 입력</div>}
        {step === 2 && <div>Step 2: 추가 정보 입력</div>}
        {step === 3 && <div>Step 3: 약관 동의</div>}
        <button onClick={nextStep}>다음</button>
        </div>
    );
    */
};

export default SignupPage;