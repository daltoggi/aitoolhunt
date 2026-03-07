# Tech Stack Validation

## 검토 기준
| 기준 | 가중치 |
|------|--------|
| 버전 호환성 | 높음 |
| TypeScript 친화성 | 높음 |
| 배포 용이성 | 높음 |
| 유지보수성 | 중간 |
| 생태계 안정성 | 중간 |
| 비용 | 높음 |
| 학습 곡선 | 낮음 |

## 최종 선택 스택

### Frontend: Next.js 15 (App Router)
- ✅ SSG/SSR 모두 지원 → SEO 최적화 핵심
- ✅ React Server Components → 빠른 초기 로딩
- ✅ 이미지 최적화 내장
- ✅ Vercel과 최고 호환
- ✅ TypeScript 1급 지원
- **버전**: 15.x (stable)

### API: Next.js Route Handlers + packages/api 라이브러리
- MVP 단계: Next.js API Routes 활용 (단일 배포)
- packages/api: 비즈니스 로직/데이터 접근 레이어 분리
- 향후: 독립 Fastify 서비스로 분리 가능
- **결정 이유**: 배포 복잡도 최소화, 무료 tier 최대 활용

### DB: SQLite (better-sqlite3) + Drizzle ORM
- ✅ 제로 설정, 서버 불필요
- ✅ Drizzle: TypeScript 네이티브 ORM
- ✅ 마이그레이션 기능 내장
- ✅ PostgreSQL 전환 용이 (Drizzle 어댑터 교체)
- **프로덕션 경로**: Turso (LibSQL cloud) 무료 tier

### UI: Tailwind CSS v4 + shadcn/ui
- ✅ 유틸리티 퍼스트 → 빠른 프로토타이핑
- ✅ shadcn/ui: 복사-붙여넣기 방식, 의존성 최소
- ✅ 접근성 기본 내장 (Radix UI 기반)
- ✅ 반응형 설계 기본 지원

### Testing: Vitest + Playwright
- Vitest: 단위/통합 테스트 (Vite 기반, 빠름)
- Playwright: E2E 테스트
- @testing-library/react: 컴포넌트 테스트

### 빌드 도구: Turborepo
- ✅ pnpm workspace 네이티브 지원
- ✅ 캐시 기반 빌드 최적화
- ✅ Vercel 제작사 도구

### 문서: OpenAPI (Swagger) + Markdown

## 탈락 후보 및 사유

| 후보 | 탈락 이유 |
|------|-----------|
| NestJS (API) | MVP에 과도한 복잡도, 별도 배포 필요 |
| Fastify (독립) | 추가 호스팅 비용, MVP 불필요 |
| PostgreSQL (직접) | 외부 서비스 필요, 비용 발생 |
| Redis | MVP 규모에서 불필요 |
| Meilisearch | 별도 호스팅 필요, MVP 과도 |
| Prisma | Drizzle 대비 무거움, Edge 호환 이슈 |

## 호환성 매트릭스
| 패키지 | 버전 | Node 25 | TypeScript 5.x | ESM |
|--------|------|---------|-----------------|-----|
| Next.js | 15.x | ✅ | ✅ | ✅ |
| Drizzle ORM | 0.38+ | ✅ | ✅ | ✅ |
| better-sqlite3 | 11.x | ✅ | ✅ | ✅ |
| Tailwind CSS | 4.x | ✅ | ✅ | ✅ |
| shadcn/ui | latest | ✅ | ✅ | ✅ |
| Vitest | 3.x | ✅ | ✅ | ✅ |
| Playwright | 1.50+ | ✅ | ✅ | ✅ |
| Turborepo | 2.x | ✅ | ✅ | ✅ |
