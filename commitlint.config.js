// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],

  // 필요에 따라 규칙을 추가하거나 수정할 수 있습니다.
  rules: {
    // 커밋 메시지 헤더 최대 길이
    "header-max-length": [2, "always", 100],
    // 커밋 메시지 유형
    "type-enum": [
      2,
      "always",
      [
        "⚒️ chore",
        "🎨 design",
        "📑 docs",
        "🚀 feat",
        "🐞 fix",
        "🔄 refactor",
        "✂️ remove",
        "✏️ rename",
        "✨ style",
      ],
    ],

    // 커밋명 제목이 비어있지 않도록 설정
    "subject-empty": [2, "never"],

    // 타입(커밋 유형)이 비어있지 않도록 설정
    "type-empty": [2, "never"],

    // 커밋명 제목 끝에 마침표를 사용하지 않도록 설정
    "subject-full-stop": [2, "never"],

    // 커밋 형식
    // 이슈번호 이모지 커밋유형:(콜론) 커밋내용
    "header-pattern": [
      2,
      "always",
      /^(#\d+)\s+(.*?)\s+(chore|design|docs|feat|fix|refactor|remove|rename|style)\s*:\s*(.*)$/, // 패턴 정의
    ],
  },
};
