/** URL */
// 온보딩 회원가입
export const signupURL = "/signup";

/** API Type */
// POST 파라미터
export interface SignupPostParamsType {
    //registerToken: string;    //  자동으로 됨
};

// POST 요청
export interface SignupPostRequestType {
    nickname: string;
}


////////////////////////////////////////////////////////
/** URL */
// 유저 회원 정보
export const userInfoURL = "/user-info";

/** API Type */
// GET 파라미터
export interface UserInfoGetParamsType {
    //accessToken: string;    //  자동으로 됨
};

// GET 응답:  백엔드로부터 받을 데이터
export interface UserInfoGetResponseType {
    nickname: string;
    email: string;
}


////////////////////////////////////////////////////////
/** URL */
// 닉네임 중복 유무 정보
export const nicknameCheckURL = "/check"

/** API Type */
// POST 파라미터
export interface NicknameCheckPostParamsType {
    // 없음  
};

// POST 요청
export interface NicknameCheckPostRequestType {
    nickname: string;
}



