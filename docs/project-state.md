# Project State - AI Tool Hunt

**최종 업데이트**: 2026-03-08
**프로젝트**: AI Tool Directory (aitoolhunt)
**상태**: MVP 구현 완료, GitHub push 및 Vercel 배포 대기

---

## 현재 아키텍처

### 구조
```
모노레포 (pnpm workspaces + Turborepo)
├── packages/web     → Next.js 15 (App Router, SSR)
├── packages/api     → Drizzle ORM + SQLite + 비즈니스 로직
├── packages/shared  → 타입 정의, SEO 유틸, 상수
├── packages/ui      → 재사용 UI 컴포넌트 (Tailwind)
└── docs/            → 전체 문서
```

### 페이지
- `/` - 홈 (Featured + Categories + Latest)
- `/tools/{slug}` - 도구 상세 (47개 도구)
- `/categories` - 카테고리 목록 (10개)
- `/categories/{slug}` - 카테고리별 도구
- `/search` - 검색 + 필터
- `/about` - 소개
- `/api/tools` - REST API
- `/api/categories` - REST API

## 선택한 기술 스택

| 레이어 | 기술 |
|--------|------|
| Frontend | Next.js 15, React 19 |
| Styling | Tailwind CSS v4, shadcn/ui 패턴 |
| DB | SQLite (better-sqlite3) + Drizzle ORM |
| Build | Turborepo, pnpm 10 |
| Test | Vitest (14 tests passing) |
| Deploy | Vercel (대기 중) |

## 완료된 작업

### Phase 0: 자원 조사 ✅
- 로컬 환경 확인 (Node 25, pnpm 10)
- Resource Map 분석 (GitHub: daltoggi 활용 가능)
- 비용 전략: MVP $0 (무료 tier)

### Phase 1: 아키텍처 설계 ✅
- 4개 Mermaid 다이어그램 (system-context, container, data-flow, deployment)
- 기술 스택 결정 및 호환성 검증
- 아키텍처 개요 문서

### Phase 2: 모노레포 + 개발환경 ✅
- pnpm workspace 구성
- TypeScript, ESLint, Prettier 설정
- 4개 패키지 생성 및 의존성 설치
- 빌드 성공 (First Load JS: 102KB shared)

### Phase 3: 핵심 구현 ✅
- DB 스키마 (categories, tools, tags, tool_tags)
- 47개 AI 도구 시드 데이터 (10개 카테고리, 94개 태그)
- ToolService, CategoryService 비즈니스 로직
- 6개 페이지 (홈, 카테고리, 도구상세, 검색, About, API)
- SEO: sitemap.xml, robots.txt, OpenGraph, Structured Data
- AdSense 6개 슬롯 placeholder

### Phase 4: 테스트 ✅
- 14개 단위 테스트 통과 (slug, SEO 유틸)

### Phase 5: 문서화 ✅
- WBS (12개 작업 항목)
- 리스크 레지스터 (11개 리스크)
- UI/UX 원칙 (10개 법칙 적용)
- API 문서
- 배포/운영 가이드
- AdSense 통합 가이드
- 사용자 가이드

### Phase 6: 버그 수정 ✅
- better-sqlite3 네이티브 모듈 dev 모드 로딩 이슈 해결
  - ESM import → require() 전환 (네이티브 C++ 모듈 호환)
  - webpack externals 명시적 설정 추가
- 프로덕션 빌드 & dev 서버 모두 정상 동작 확인
- local.db를 Git에 포함 (Vercel 서버리스 배포용)

## 남은 작업

### 즉시 필요 (사용자 액션)
1. **GitHub 인증** - `gh auth login` 실행 후 daltoggi 계정 인증
2. **GitHub 저장소 생성 & push** - 아래 명령어 실행:
   ```bash
   gh repo create daltoggi/aitoolhunt --public --source=. --remote=origin --push
   ```
3. **Vercel 배포** - https://vercel.com 에서:
   - GitHub 계정 연동
   - daltoggi/aitoolhunt 리포 import
   - Framework: Next.js (자동 감지)
   - Root Directory: `packages/web`
   - Build Command: `cd ../.. && pnpm install && pnpm --filter @aitoolhunt/web build`
   - Output Directory: `.next`

### 향후 (Phase 2)
1. Turso(LibSQL cloud) 마이그레이션 → SSG/ISR 전환
2. AI 자동 도구 수집 (OpenAI API 활용)
3. AI 설명 자동 생성
4. 도구 수 1000+ 확장
5. 커스텀 도메인 구매
6. Google AdSense 실제 적용
7. E2E 테스트 (Playwright)

## 결정 사항

| 결정 | 이유 |
|------|------|
| SQLite over PostgreSQL | 무료, 제로 설정, MVP 적합 |
| force-dynamic over SSG | better-sqlite3 빌드 호환 문제 회피 |
| Next.js API Routes over Fastify | 단일 배포, 무료 tier 최대 활용 |
| Drizzle over Prisma | 경량, Edge 호환, TypeScript 네이티브 |
| require() over ESM import | 네이티브 C++ 모듈 webpack 호환성 |
| local.db Git 포함 | Vercel 서버리스에서 시드 불가 |

## 리스크 현황

| 리스크 | 심각도 | 상태 |
|--------|--------|------|
| better-sqlite3 빌드 이슈 | 높음 | ✅ 해결 (dynamic 전환 + require()) |
| better-sqlite3 dev 모드 | 높음 | ✅ 해결 (require + webpack externals) |
| Vercel 계정 필요 | 중간 | 사용자 액션 필요 |
| GitHub 인증 필요 | 중간 | 사용자 액션 필요 |
| 데이터 정확성 | 중간 | 수동 검증 완료 |

## 파일 구조 요약
```
exit 2/
├── packages/
│   ├── web/          (Next.js 15 앱)
│   ├── api/          (DB + 서비스)
│   ├── shared/       (타입 + 유틸)
│   └── ui/           (컴포넌트)
├── docs/
│   ├── architecture/ (다이어그램, 아키텍처)
│   ├── resources/    (자원 조사)
│   ├── design/       (UI/UX 원칙)
│   ├── project-management/ (WBS, 마일스톤)
│   ├── engineering/  (툴링 결정)
│   ├── quality/      (테스트 전략)
│   ├── monetization/ (AdSense 가이드)
│   ├── api/          (API 문서)
│   ├── guides/       (사용자 가이드)
│   └── operations/   (배포 가이드)
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

## Git 커밋 히스토리
1. `feat: AI Tool Hunt MVP - complete monorepo setup with 47 AI tools`
2. `fix: resolve better-sqlite3 native module loading in Next.js dev mode`
3. `chore: include local.db for Vercel deployment and update gitignore`
