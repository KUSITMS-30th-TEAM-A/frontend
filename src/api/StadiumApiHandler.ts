// API 연동 함수
import { getStadiumInfo, getGuide } from './StadiumApiService'; // API 함수들 가져오기
import { ZoneGetParamsType, ZoneGetResponseType, ZoneType,
         GuideGetParamsType, GuideGetResponseType, ReferenceGroup, Reference } from "./StadiumApiType";


////////////////////////////////////////////////////////
// 사용자가 고른 스타디움에 대한 정보 가져오는 이벤트
export const handleGetStadiumInfo = async ({stadiumName}: ZoneGetParamsType) => {
  try {
    
    // API 통신
    // 유저에게 닉네임을 받은 후, 바디에 닉네임 넣어서 API를 요청
    const response = await getStadiumInfo(
        { stadiumName }
    );

    // 확인
    console.log("🐻 스타디움 정보를 받았습니당: ");
    console.log(response);

    const payload = response.payload;
    // 파싱 (swagger 보면서 작성)
    /** response 참고
     * {
        "isSuccess": true,
        "code": "201",
        "message": "추천 받은 유저성향과 구역을 저장하였습니다.",
        "payload": {
          "imgUrl": "",
          "introduction": "",
          "zones": []
        }
      }
     */
    const stadiumInfo: ZoneGetResponseType = {
      imgUrl: payload.imgUrl,
      introduction: payload.introduction,
      zones: payload.zones.map((zone: any) => ({
        zoneName: zone.zoneName,
        zoneColor: zone.zoneColor,
      })),
    };

    //console.log(stadiumInfo);

    return stadiumInfo;

  } catch (error) {
      console.error('스타디움 정보를 가져오는 중 오류 발생:', error);
  }
};


////////////////////////////////////////////////////////
// 사용자 프로필 정보를 가져와서 파싱하는 이벤트
export const handleGuide = async ({stadiumName, zoneName}: GuideGetParamsType) => {
  try {
    // API 통신
    const response = await getGuide(
        { stadiumName, zoneName }
    );

    // 확인
    console.log("🐻 가이드 데이터를 가져왔습니당: ");
    console.log(response);

    // 구역 데이터 받기 (swagger 보면서 작성)
    const data = response.payload;
    
    // 데이터 파싱
    const parsedData: GuideGetResponseType = {
      imgUrl: data.imgUrl,
      zoneName: data.zoneName,
      zoneColor: data.zoneColor,
      explanation: data.explanation,
      firstBaseSide: data.firstBaseSide,
      thirdBaseSide: data.thirdBaseSide,
      entrance: data.entrance,
      stepSpacing: data.stepSpacing,
      seatSpacing: data.seatSpacing,
      usageInformation: data.usageInformation,
      tip: data.tip,
      referencesGroup: data.referencesGroup.map((group: any) => ({
        groupTitle: group.groupTitle,
        references: group.references.map((ref: any) => ({
          title: ref.title,
          contents: ref.contents,
        }))
      }))
    };

    // 파싱된 데이터 출력
    console.log("🐻 파싱된 가이드 데이터: ");
    console.log(parsedData);

    return parsedData;

  } catch (error) {
      console.error('프로필 데이터 가져오는 중 오류 발생:', error);
  }
};