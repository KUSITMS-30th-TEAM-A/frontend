/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosInstance, V1_URL } from './axiosInstance';

// API 연동 타입
import { zoneURL, ZoneGetParamsType,
         guideURL, GuideGetParamsType} from "./StadiumApiType";


/** 백엔드와 API 연동 */
// 선택된 스타디움 정보 조회: GET 요청 및 응답받기
export const getStadiumInfo = async ({stadiumName}: ZoneGetParamsType) => {
  try {
    const response = await AxiosInstance.get(`https://git.hitzone.store/api/v1/stadium/zones`, 
//    const response = await AxiosInstance.get(`${V1_URL}${zoneURL}`, 
      // 쿼리 파라미터 전달
      {
        params: {stadiumName},
      }
    );

    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;
    
  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    console.error(`구역 목록 GET에서 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};



// 선택된 구역별 가이드 조회: GET 요청 및 응답받기
export const getGuide = async ({stadiumName, zoneName}: GuideGetParamsType) => {
  try {
    const response = await AxiosInstance.get(`https://git.hitzone.store/api/v1/stadium/zones/guide`, 
//    const response = await AxiosInstance.get(`${V1_URL}${guideURL}`, 
      // 쿼리 파라미터 전달
      {
        params: {stadiumName, zoneName},
      }
    );

    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;
    
  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    console.error(`구역 가이드 정보 GET에서 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


