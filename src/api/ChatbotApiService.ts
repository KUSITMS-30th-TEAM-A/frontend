/** API 연동 관련 모듈, 변수 가져오기 */
import { AxiosInstance, V1_URL } from './axiosInstance';

// API 연동 타입
import { clovaURL, ClovaPostParamsType, ClovaPostRequestType,
         guideURL, GuideGetParamsType} from "./ChatbotApiType";


/** 백엔드와 API 연동 */
// 추가: POST 요청 및 응답받기
export const postClova = async (
  //{  }: ClovaPostParamsType,
  {message}: ClovaPostRequestType) => {
  
  try {
    const response = await AxiosInstance.post(`https://git.hitzone.store/api/v1/chatbot/clova`, 
//    const response = await AxiosInstance.post(`${V1_URL}${clovaURL}`, 
      // Request Data 전달
      {
        message,
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
    console.error(`clova POST에서 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


// 조회: GET 요청 및 응답받기
export const getGuide = async ({stadiumName, categoryName, orderNumber}: GuideGetParamsType) => {
  try {
    const response = await AxiosInstance.get(`https://git.hitzone.store/api/v1/chatbot/guide`, 
//    const response = await AxiosInstance.get(`${V1_URL}${guideURL}`, 
      // 쿼리 파라미터 전달
      {
        params: {stadiumName, categoryName, orderNumber},
      }
    );

    // 백엔드 서버로부터 API의 응답 데이터 받은 후 리턴
    return response.data;
    
  } catch (error) {
    // 이 부분은 나중에 errorHandler.ts 만들어서 에러별로 다르게 처리 가능
    console.error(`guide GET에서 오류 발생:`, error);
    
    // 에러를 반환해서(던져서) 컴포넌트에서 처리해도 됨
    throw error;
  }
};


