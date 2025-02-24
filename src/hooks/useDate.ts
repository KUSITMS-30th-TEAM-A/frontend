// 형식: 2023년 2월 2일 월요일
export const getFormattedDate1 = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 요일 format
  const daysOfWeekKor = ["일", "월", "화", "수", "목", "금", "토"];
  const daysOfWeek = daysOfWeekKor[date.getDay()];

  return `${year}년 ${month}월 ${day}일 ${daysOfWeek}요일`;
};


// 형식: 2023.02.02
export const getFormattedDate2 = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};


// 연도, 월, 일, 요일 각각 독립된 변수로 반환
export const getFormattedDate3 = () => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

};