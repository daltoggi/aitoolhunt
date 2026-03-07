# MVP Work Breakdown Structure (WBS)

## WBS-001: 기획
| 항목 | 내용 |
|------|------|
| 작업명 | 프로젝트 범위 정의 |
| 설명 | AI Tool Directory MVP 범위, 기능, 제약 정의 |
| 선행 조건 | 없음 |
| 산출물 | project-spec.md, dev-spec.md |
| 우선순위 | P0 |
| 상태 | ✅ 완료 |

## WBS-002: 아키텍처 설계
| 항목 | 내용 |
|------|------|
| 작업명 | 시스템 아키텍처 설계 |
| 설명 | 마이크로서비스 구조, Mermaid 다이어그램, 기술 스택 결정 |
| 선행 조건 | WBS-001 |
| 산출물 | docs/architecture/*.mmd, overview.md, tech-stack-decision.md |
| 우선순위 | P0 |
| 상태 | ✅ 완료 |

## WBS-003: 개발 환경 구성
| 항목 | 내용 |
|------|------|
| 작업명 | 모노레포 및 개발 도구 설정 |
| 설명 | pnpm workspace, TypeScript, ESLint, Prettier, 패키지 구조 |
| 선행 조건 | WBS-002 |
| 산출물 | 루트 설정 파일, packages/*, .vscode/ |
| 우선순위 | P0 |
| 상태 | ✅ 완료 |

## WBS-004: 데이터 모델
| 항목 | 내용 |
|------|------|
| 작업명 | DB 스키마 및 시드 데이터 |
| 설명 | Drizzle ORM 스키마, 47개 AI 도구 시드 데이터 |
| 선행 조건 | WBS-003 |
| 산출물 | packages/api/src/db/schema.ts, seed/data.ts |
| 우선순위 | P0 |
| 상태 | ✅ 완료 |

## WBS-005: 공통 패키지
| 항목 | 내용 |
|------|------|
| 작업명 | shared 타입/유틸 + UI 컴포넌트 |
| 설명 | 타입 정의, SEO 유틸, 상수, ToolCard, CategoryCard, SearchBar, AdSlot |
| 선행 조건 | WBS-003 |
| 산출물 | packages/shared/*, packages/ui/* |
| 우선순위 | P0 |
| 상태 | ✅ 완료 |

## WBS-006: API 서비스
| 항목 | 내용 |
|------|------|
| 작업명 | 비즈니스 로직 레이어 |
| 설명 | ToolService, CategoryService, DB 클라이언트 |
| 선행 조건 | WBS-004, WBS-005 |
| 산출물 | packages/api/src/services/* |
| 우선순위 | P0 |
| 상태 | ✅ 완료 |

## WBS-007: 프론트엔드 구현
| 항목 | 내용 |
|------|------|
| 작업명 | Next.js 페이지 구현 |
| 설명 | 홈, 카테고리, 도구 상세, 검색, About 페이지 |
| 선행 조건 | WBS-005, WBS-006 |
| 산출물 | packages/web/src/app/* |
| 우선순위 | P0 |
| 상태 | ✅ 완료 |

## WBS-008: SEO 최적화
| 항목 | 내용 |
|------|------|
| 작업명 | 검색엔진 최적화 |
| 설명 | sitemap.xml, robots.txt, 메타태그, OpenGraph, Structured Data |
| 선행 조건 | WBS-007 |
| 산출물 | sitemap.ts, robots.ts, metadata |
| 우선순위 | P0 |
| 상태 | ✅ 완료 |

## WBS-009: 수익화 슬롯
| 항목 | 내용 |
|------|------|
| 작업명 | AdSense placeholder 구현 |
| 설명 | 6개 광고 슬롯 위치에 placeholder 컴포넌트 배치 |
| 선행 조건 | WBS-007 |
| 산출물 | AdSlot 컴포넌트, docs/monetization/* |
| 우선순위 | P1 |
| 상태 | ✅ 완료 |

## WBS-010: 테스트
| 항목 | 내용 |
|------|------|
| 작업명 | 단위/통합 테스트 |
| 설명 | shared 유틸 테스트, API 서비스 테스트 |
| 선행 조건 | WBS-006 |
| 산출물 | *.test.ts 파일 |
| 우선순위 | P1 |
| 상태 | 진행 중 |

## WBS-011: 문서화
| 항목 | 내용 |
|------|------|
| 작업명 | 기술/운영 문서 |
| 설명 | API 문서, 사용자 가이드, 배포 가이드 |
| 선행 조건 | WBS-007 |
| 산출물 | docs/api/*, docs/guides/*, docs/operations/* |
| 우선순위 | P1 |
| 상태 | 진행 중 |

## WBS-012: 배포
| 항목 | 내용 |
|------|------|
| 작업명 | GitHub + Vercel 배포 |
| 설명 | Git 저장소 생성, Vercel 연동, 프로덕션 배포 |
| 선행 조건 | WBS-007, WBS-010 |
| 산출물 | 라이브 URL |
| 우선순위 | P0 |
| 상태 | 대기 |
| 리스크 | Vercel 계정 필요, better-sqlite3 네이티브 모듈 이슈 |
