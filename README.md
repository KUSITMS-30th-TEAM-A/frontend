# ⚾ 히트존 프로젝트 프론트엔드
## 🧢 팀명: 쓰리피트

## 🧢 브랜치 규칙
- feature branch rule
  - 동사X
  - 커밋유형/#이슈번호-이슈명요약(영어,명사)
  - 카멜 케이스
  - `Ex) design/#1-loginPage`
  - `Ex) feat/#2-loginPageApi`
- 브랜치 종류
  - `feature branch` : 각 새로운 기능
  - `develop branch` : 실 개발 진행  (default)
  - `hotfix branch` : 배포 이후 긴급 수정
  - `main branch` : 개발 최종 완료 시 merge

## 🧢 커밋 컨벤션
### 🐻‍❄️ 일반 커밋
- (#1) 🚀 feat: 야구 좌석 컴포넌트 API 연동
- (#2) 🎨 design: 구매 페이지 버튼 칩스 생성
- (#이슈번호) 이모지 커밋유형: 커밋내용
- 커밋내용은 한글, 영어 자유
### 🐻‍❄️ 머지 커밋
- (#3) 🐻‍❄️ FRONT: 야구 좌석 페이지 구현 및 머지 
- (#PR번호) 이모지 대표자: 이슈 내용 요약 및 머지 
<table>
    <thead>
        <tr>
            <th>커밋 유형</th>
            <th>설명</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>⚒️ chore</td>
            <td>빌드 부분 혹은 패키지 매니저 수정 사항 / 파일 이름 변경 및 위치 변경 / 파일 삭제</td>
        </tr>
        <tr>
            <td>🎨 design</td>
            <td>새로운 컴포넌트 추가 / 디자인 요소 수정</td>
        </tr>
        <tr>
            <td>📑 docs</td>
            <td>문서 추가 및 수정</td>
        </tr>
        <tr>
            <td>🚀 feat</td>
            <td>새로운 기능 추가 / 일부 코드 추가 / 일부 코드 수정 (리팩토링과 구분)</td>
        </tr>
        <tr>
            <td>🐞 fix</td>
            <td>버그 수정</td>
        </tr>
        <tr>
            <td>🔄 refactor</td>
            <td>코드 리팩토링</td>
        </tr>
        <tr>
            <td>✂️ remove</td>
            <td>패키지 혹은 폴더, 클래스를 삭제하였을 때 (단독으로 시행하였을 시)</td>
        </tr>
        <tr>
            <td>✏️ rename</td>
            <td>패키지 혹은 폴더명, 클래스명 수정 (단독으로 시행하였을 시)</td>
        </tr>
        <tr>
            <td>✨ style</td>
            <td>코드 의미에 영향을 주지 않는 변경사항 (코드 포맷팅, 오타 수정, 변수명 변경, 에셋 추가)</td>
        </tr>
    </tbody>
</table>
