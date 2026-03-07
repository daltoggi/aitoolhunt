# API Documentation

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://aitoolhunt.vercel.app/api`

## Endpoints

### GET /api/tools
도구 목록 조회 (페이지네이션, 필터, 검색)

**Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | 페이지 번호 |
| pageSize | number | 12 | 페이지 크기 (max: 50) |
| category | string | - | 카테고리 slug (예: ai-writing) |
| tag | string | - | 태그 이름 |
| search | string | - | 검색어 (이름, 설명 매칭) |
| pricing | string | - | 가격 유형 (free/freemium/paid/contact) |
| sort | string | newest | 정렬 (newest/name/featured) |

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "ChatGPT",
        "slug": "chatgpt",
        "shortDescription": "...",
        "categoryId": 1,
        "categoryName": "AI Writing",
        "categorySlug": "ai-writing",
        "logoUrl": null,
        "pricingType": "freemium",
        "isFeatured": true,
        "tags": ["chatbot", "writing"]
      }
    ],
    "total": 47,
    "page": 1,
    "pageSize": 12,
    "totalPages": 4
  }
}
```

### GET /api/categories
카테고리 목록 조회

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "AI Writing",
      "slug": "ai-writing",
      "description": "...",
      "iconName": "pen-tool",
      "toolCount": 5
    }
  ]
}
```

## Pages (SEO)

| Path | Type | Description |
|------|------|-------------|
| `/` | Dynamic SSR | 홈페이지 |
| `/tools/{slug}` | Dynamic SSR | 도구 상세 |
| `/categories` | Dynamic SSR | 카테고리 목록 |
| `/categories/{slug}` | Dynamic SSR | 카테고리별 도구 |
| `/search` | Dynamic SSR | 검색 |
| `/about` | Static | 소개 |
| `/sitemap.xml` | Dynamic | 사이트맵 |
| `/robots.txt` | Static | 크롤러 규칙 |
