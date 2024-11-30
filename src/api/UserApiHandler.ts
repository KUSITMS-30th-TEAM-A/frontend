// API 연동 함수
import { postSignup, getUserInfo, postNickname } from './UserApiService'; // API 함수들 가져오기


import { useRouter } from "next/router";


////////////////////////////////////////////////////////
// 회원가입 이벤트
interface SignupProps {
  nickname: string
}

export const handleSignup = async ({nickname}: SignupProps) => {
  const router = useRouter();

  try {
    // API 통신
    // 유저에게 닉네임을 받은 후, 바디에 닉네임 넣어서 API를 요청
    await postSignup(
        {  },
        { nickname }
    );

    // 라우팅
    // 회원가입 성공 후 메인 페이지로 이동
    router.push("/");

  } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
  }
};

