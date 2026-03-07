# Engineering Tooling Decisions

## TypeScript 설정
- **target**: ES2022 (최신 기능 활용)
- **strict**: true (타입 안전성 최대)
- **noUncheckedIndexedAccess**: true (인덱스 접근 안전성)
- **moduleResolution**: bundler (Next.js 호환)
- 루트 `tsconfig.base.json`에서 공통 설정 상속

## ESLint
- 웹 패키지: `next/core-web-vitals` 확장 (Next.js 공식 규칙)
- 루트: `@eslint/js` + `typescript-eslint` (공통 규칙)
- import 정렬 규칙은 ESLint 호환 이슈로 Next.js 내장 규칙 활용

## Prettier
- semi: true
- singleQuote: true
- trailingComma: all
- printWidth: 100
- tailwindcss 플러그인으로 클래스 자동 정렬

## 빌드 도구
- **Turborepo**: 패키지 간 빌드 의존성 관리, 캐시 최적화
- **pnpm workspaces**: 모노레포 패키지 관리

## Git Hooks
- 추후 husky/lint-staged 추가 예정
- 현재는 수동 lint/format 실행

## VS Code
- prettier 기본 포매터
- ESLint 자동 수정
- Tailwind CSS 인텔리센스
- Mermaid 미리보기 확장
