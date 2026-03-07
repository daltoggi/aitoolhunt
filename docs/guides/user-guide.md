# AI Tool Hunt - User Guide

## 사이트 개요
AI Tool Hunt는 다양한 AI 도구를 카테고리별로 탐색하고 비교할 수 있는 디렉토리 사이트입니다.

## 주요 기능

### 1. 홈페이지
- Featured 도구 확인
- 카테고리별 빠른 탐색
- 최근 추가된 도구 목록

### 2. 카테고리 탐색
- 10개 카테고리: Writing, Image, Video, Coding, Productivity, Marketing, Voice, Research, Design, Chatbot
- 각 카테고리의 도구 수 표시
- 카테고리 클릭 시 해당 도구 목록

### 3. 도구 상세
- 도구 설명, 기능, 사용 사례
- 가격 정보 (Free/Freemium/Paid/Contact)
- 공식 웹사이트 링크
- 관련 도구 추천

### 4. 검색
- 도구 이름, 설명으로 검색
- 가격 유형 필터 (All/Free/Freemium/Paid)

## 관리자 가이드

### 도구 추가
`packages/api/src/seed/data.ts`에 새 도구 데이터 추가 후:
```bash
rm packages/api/local.db
pnpm db:seed
cp packages/api/local.db packages/web/local.db
```

### 도구 데이터 구조
```typescript
{
  name: '도구 이름',
  slug: 'tool-slug',
  description: '상세 설명',
  shortDescription: '한줄 요약',
  categorySlug: 'ai-writing',
  websiteUrl: 'https://...',
  pricingType: 'freemium',
  features: ['기능1', '기능2'],
  useCases: ['사용사례1', '사용사례2'],
  isFeatured: false,
  tags: ['tag1', 'tag2'],
}
```
