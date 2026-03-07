# Project State - AI Tool Hunt

**최종 업데이트**: 2026-03-08
**프로젝트**: AI Tool Directory (aitoolhunt)
**상태**: ✅ MVP 완료 + 배포 완료

**🌐 라이브 URL**: https://aitoolhunt.vercel.app
**📦 GitHub**: https://github.com/daltoggi/aitoolhunt

---

## 현재 아키텍처

### 구조
```
모노레포 (pnpm workspaces + Turborepo)
├── packages/web     → Next.js 15 (App Router, SSG)
├── packages/api     → Drizzle ORM + SQLite + 비즈니스 로직
├── packages/shared  → 타입 정의, SEO 유틸, 상수
├── packages/ui      → 재사용 UI 컴포넌트 (Tailwind)
└── docs/            → 전체 문서
```

### 페이지 (66개 정적 생성)
- `/` - 홈 (Featured + Categories + Latest) ○
- `/tools/{slug}` - 도구 상세 (47개 도구) ●
- `/categories` - 카테고리 목록 (10개) ○
- `/categories/{slug}` - 카테고리별 도구 ●
- `/search` - 클라이언트 사이드 검색 + 필터 ○
- `/about` - 소개 ○
- `/sitemap.xml` - SEO 사이트맵 ○

## 선택한 기술 스택

| 레이어 | 기술 |
|--------|------|
| Frontend | Next.js 15, React 19 |
| Styling | Tailwind CSS v4, shadcn/ui 패턴 |
| DB | SQLite (better-sqlite3) + Drizzle ORM |
| Build | Turborepo, pnpm 10 |
| Test | Vitest (14 tests passing) |
| Deploy | ✅ Vercel (배포 완료) |
| Rendering | SSG (전체 정적 생성) |

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
- 6개 페이지 (홈, 카테고리, 도구상세, 검색, About)
- SEO: sitemap.xml, robots.txt, OpenGraph, Structured Data
- AdSense 6개 슬롯 placeholder

### Phase 4: 테스트 ✅
- 14개 단위 테스트 통과 (slug, SEO 유틸)

### Phase 5: 문서화 ✅
- WBS, 리스크 레지스터, UI/UX 원칙, API 문서, 배포 가이드 등 15개+ 문서

### Phase 6: 버그 수정 ✅
- better-sqlite3 네이티브 모듈 dev 모드 로딩 이슈 해결
- webpack externals commonjs 패턴으로 SSG 빌드 호환
- local.db를 Git에 포함 (Vercel 빌드 시 사용)

### Phase 7: 배포 ✅
- GitHub 저장소 생성 (daltoggi/aitoolhunt)
- 전체 SSG 전환 (force-dynamic → generateStaticParams)
- 검색 페이지 클라이언트 사이드 전환 (prebuild JSON)
- Vercel 배포 완료 — 66개 페이지 정적 생성
- 라이브: https://aitoolhunt.vercel.app

## 향후 작업 (Phase 2)
1. Turso(LibSQL cloud) 마이그레이션 → ISR 전환
2. AI 자동 도구 수집 (OpenAI API 활용)
3. AI 설명 자동 생성
4. 도구 수 1000+ 확장
5. 커스텀 도메인 구매
6. Google AdSense 실제 적용
7. E2E 테스트 (Playwright)
8. REST API 복원 (Turso 전환 후)

## 결정 사항

| 결정 | 이유 |
|------|------|
| SQLite over PostgreSQL | 무료, 제로 설정, MVP 적합 |
| SSG over SSR | Vercel 서버리스에서 네이티브 모듈 런타임 이슈 회피 |
| 클라이언트 검색 over 서버 검색 | SSG 호환, 47개 도구로 JSON 크기 작음 |
| Drizzle over Prisma | 경량, Edge 호환, TypeScript 네이티브 |
| require() over ESM import | 네이티브 C++ 모듈 webpack 호환성 |
| local.db Git 포함 | Vercel 빌드 시 시드 데이터 접근 필요 |

## 리스크 현황

| 리스크 | 심각도 | 상태 |
|--------|--------|------|
| better-sqlite3 빌드 이슈 | 높음 | ✅ 해결 (SSG + webpack externals) |
| better-sqlite3 dev 모드 | 높음 | ✅ 해결 (require + webpack externals) |
| Vercel 런타임 호환 | 높음 | ✅ 해결 (전체 SSG 전환) |
| 데이터 정확성 | 중간 | ✅ 수동 검증 완료 |

## Git 커밋 히스토리
1. `feat: AI Tool Hunt MVP - complete monorepo setup with 47 AI tools`
2. `fix: resolve better-sqlite3 native module loading in Next.js dev mode`
3. `chore: include local.db for Vercel deployment and update gitignore`
4. `docs: update project-state.md with Phase 6 completion and deploy guide`
5. `feat: convert to full SSG for Vercel deployment compatibility`
