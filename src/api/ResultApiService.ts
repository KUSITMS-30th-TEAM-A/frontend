/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosInstance, V1_URL } from './axiosInstance';

// API 연동 타입
import { profileURL, ProfileGetParamsType,
         saveURL, SavePostParamsType, SavePostRequestType,
         zonesURL, ZoneGetParamsType} from "./ResultApiType";


/** 백엔드와 API 연동 */
// 조회: GET 요청 및 응답받기
export const getProfile = async ({resultId}: ProfileGetParamsType) => {
  try {
    const response = await AxiosInstance.get(`https://git.hitzone.store/api/v1/results/profile`, 
//    const response = await AxiosInstance.get(`${V1_URL}${profileURL}`, 
      // 쿼리 파라미터 전달
      {
        params: {resultId},
      }
    );

    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;
    
  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    console.error(`profile GET에서 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


// 추가: POST 요청 및 응답받기
export const postZone = async (
  {  }: SavePostParamsType,
  {stadium, preference, clientKeywords}: SavePostRequestType) => {
  
  try {
    const response = await AxiosInstance.post(`https://git.hitzone.store/api/v1/results/save`, 
//    const response = await AxiosInstance.post(`${V1_URL}${saveURL}`, 
      // Request Data 전달
      {
        stadium, preference, clientKeywords
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
    console.error(`구역 추천 결과 저장 POST에서 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


// 조회: GET 요청 및 응답받기
export const getZones = async ({resultId, count}: ZoneGetParamsType) => {
  try {
    const response = await AxiosInstance.get(`https://git.hitzone.store/api/v1/results/zones`, 
//    const response = await AxiosInstance.get(`${V1_URL}${zonesURL}`, 
      // 쿼리 파라미터 전달
      {
        params: {resultId, count},
      }
    );

    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;
    
  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    console.error(`추천 구역 리스트 GET에서 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


