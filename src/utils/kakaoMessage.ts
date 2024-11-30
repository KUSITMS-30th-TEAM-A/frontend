export const createKakaoShareMessage = (
    resultId: number | null,
    nickname: string | undefined,
    hashTags: string[] = []
  ) => {
    if (!resultId) {
      throw new Error("resultId가 없습니다. 메시지를 생성할 수 없습니다.");
    }
  
    const firstHashTag = hashTags[0] ? `${hashTags[0]}` : "HitZone"; // 첫 번째 해시태그
    const secondHashTag = hashTags[1] ? `${hashTags[1]}` : ""; // 두 번째 해시태그
  
    // Kakao 메시지 데이터 반환
    return {
      templateId: 114573, // Kakao 템플릿 ID
      templateArgs: {
        NICKNAME: nickname || "없는 유형", // 유형 이름
        FIRST_HASHTAG: firstHashTag, // 첫 번째 해시태그
        SECOND_HASHTAG: secondHashTag, // 두 번째 해시태그
        resultId: resultId,
      },
    };
  };
  