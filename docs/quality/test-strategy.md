# Test Strategy

## 테스트 레이어

### 1. 단위 테스트 (Unit Tests)
- **도구**: Vitest
- **범위**: shared 유틸 함수, 순수 로직
- **파일**: `*.test.ts`

### 2. 통합 테스트 (Integration Tests)
- **도구**: Vitest
- **범위**: API 서비스 + DB 연동
- **파일**: `*.integration.test.ts`

### 3. E2E 테스트 (향후)
- **도구**: Playwright
- **범위**: 주요 사용자 흐름
- **파일**: `e2e/*.spec.ts`

## 테스트 대상

| 대상 | 유형 | 우선순위 |
|------|------|----------|
| createSlug, isValidSlug | 단위 | P0 |
| SEO 유틸 함수 | 단위 | P0 |
| ToolService.getTools | 통합 | P0 |
| ToolService.getToolBySlug | 통합 | P0 |
| CategoryService.getCategories | 통합 | P0 |
| API Route GET /api/tools | 통합 | P1 |
| 홈페이지 → 도구 상세 흐름 | E2E | P2 |
| 검색 흐름 | E2E | P2 |

## 실행 방법
```bash
pnpm test          # 모든 단위/통합 테스트
pnpm test:e2e      # E2E 테스트
```
