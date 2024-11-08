import React, { useState } from "react";

// API 연동 함수
import { getProfile, postZone, getZones } from './ResultApiService'; // API 함수들 가져오기
import { SavePostRequestType, SavePostResponseType, 
         ZoneGetResponseType, ReferenceGroup, Reference } from "./ResultApiType";

import { StadiumType, SeatType, Keyword } from "../constants/ZoneData";


////////////////////////////////////////////////////////
// 사용자가 고른 추천 구역 데이터 전달 이벤트
interface RecommendQuestionProps {
  stadium: StadiumType;
  seat: SeatType;
  keywords: Keyword[];
}


// SavePostRequestType을 생성하는 함수 예제
function createSavePostRequest(
  stadium: StadiumType,
  preference: SeatType,
  keywords: Keyword[]
): SavePostRequestType {
  return {
      stadium: stadium,  // Enum 타입을 문자열로 매핑
      preference: preference,  // Enum 타입을 문자열로 매핑
      clientKeywords: keywords  // Enum 배열을 문자열 배열로 매핑
  };
}

interface RecommendQuestionProps {
  stadium: StadiumType;
  seat: SeatType;
  keywords: Keyword[];
}


// 데이터 전송 함수
export const handleSave = async ({stadium, seat, keywords}: RecommendQuestionProps) => {
  try {
    
    const requestData: SavePostRequestType = createSavePostRequest(stadium, seat, keywords);
    const s = requestData.stadium;
    const p = requestData.preference;
    const c = requestData.clientKeywords;

    // API 통신
    // 유저에게 닉네임을 받은 후, 바디에 닉네임 넣어서 API를 요청
    const response = await postZone(
        {  },
        { stadium:s, preference:p, clientKeywords:c }
    );

    // 확인
    console.log("🐻 추천 구역 데이터를 백엔드에 전송했습니당: ");
    console.log(response);

    // 데이터 받기 및 저장 (swagger 보면서 작성)
    /** response 참고
     * {
        "isSuccess": true,
        "code": "201",
        "message": "추천 받은 유저성향과 구역을 저장하였습니다.",
        "payload": {
          "resultId": 1
        }
      }
     */
    return response.payload.resultId;

  } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
  }
};


////////////////////////////////////////////////////////
// 추천 구역 데이터를 가져와서 출력하는 이벤트
// count
// 1) 카톡 공유용: 최소인 1개
// 2) 구역 추천 결과: 최대인 3개
export const handlePrint = async (count: number, resultId: number | null) => {
  // null 값이면 API 요청 ㄴㄴ
  if (resultId === null)
    return;

  try {
    // API 통신
    const response = await getZones(
        { resultId, count }
    );

    // 확인
    console.log("🐻 모든 추천 구역 데이터를 가져왔습니당: ");
    console.log(response);

    // 구역 데이터 받기 (swagger 보면서 작성)
    const data = response.payload.zones;
    
    // 콘솔로 확인
    //console.log('메렁')
    //console.log(data);
    //console.log(data.length);
    
    // 데이터 파싱 (배열)
    const parsedData: ZoneGetResponseType[] = data.map((zone: ZoneGetResponseType) => ({
      name: zone.name,
      explanations: zone.explanations.join(', '),
      tip: zone.tip,
      zoneId: zone.zoneId,
      references: zone.referencesGroup.map((group: ReferenceGroup) => ({
        groupTitle: group.groupTitle,
        references: group.references.map((ref: Reference) => ({
          title: ref.title,
          content: ref.content,
        })),
      })),
    }));

    return parsedData;

  } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
  }
};


////////////////////////////////////////////////////////