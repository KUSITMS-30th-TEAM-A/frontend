/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosInstance, V1_URL } from './axiosInstance';

// API 연동 타입
import { signupURL, SignupPostParamsType, SignupPostRequestType,
         userInfoURL, UserInfoGetParamsType,
         nicknameCheckURL, NicknameCheckPostParamsType, NicknameCheckPostRequestType} from "./UserApiType"

/** 백엔드와 API 연동 */
// 추가: POST 요청 및 응답받기
export const postSignup = async (
  {  }: SignupPostParamsType,
  {nickname}: SignupPostRequestType) => {
  
  try {
    const response = await AxiosInstance.post(`${V1_URL}${signupURL}`, 
      // Request Data 전달
      {
        nickname,
      },
      // 쿼리 파라미터 전달
      {
        params: {  }
      }
    );
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    console.error(`signup POST에서 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


// 조회: GET 요청 및 응답받기
export const getUserInfo = async ({  }: UserInfoGetParamsType) => {
  try {
    const response = await AxiosInstance.get(`${V1_URL}${userInfoURL}`, 
      // 쿼리 파라미터 전달
      {
        params: {  },
      }
    );

    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;
    
  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    console.error(`userInfo GET에서 오류 발생:`, error);
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


// 추가: POST 요청 및 응답받기
export const postNickname = async (
  {  }: NicknameCheckPostParamsType,
  {nickname}: NicknameCheckPostRequestType) => {

  try {
    const response = await AxiosInstance.post(`${V1_URL}${nicknameCheckURL}`, 
      // Request Data 전달
      {
        nickname,
      },
      // 쿼리 파라미터 전달
      {
        params: {  },
      }
    );
    
    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;

  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    console.error(`nickname POST에서 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};
