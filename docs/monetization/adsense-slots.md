# AdSense Slot Integration Guide

## 현재 상태
Placeholder 컴포넌트 구현 완료. 실제 AdSense 스크립트 미삽입.

## 광고 슬롯 위치

| Slot ID | 위치 | 포맷 | 파일 |
|---------|------|------|------|
| `header-banner` | 홈 Hero 아래 | horizontal (728x90) | `app/page.tsx` |
| `tool-detail-top` | 도구 설명 위 | horizontal (728x90) | `app/tools/[slug]/page.tsx` |
| `tool-detail-middle` | Features 아래 | horizontal (728x90) | `app/tools/[slug]/page.tsx` |
| `sidebar` | 도구 상세 사이드바 | rectangle (300x250) | `app/tools/[slug]/page.tsx` |
| `category-list` | 카테고리 목록 상단 | horizontal (728x90) | `app/categories/[slug]/page.tsx` |
| `search-results` | 검색 결과 상단 | horizontal (728x90) | `app/search/page.tsx` |

## 적용 방법

### 1. AdSense 계정 준비
1. Google AdSense 계정 생성
2. 사이트 등록 및 승인 대기
3. Publisher ID (ca-pub-XXXXXXXXXXXXXXXX) 획득

### 2. 환경변수 설정
```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### 3. AdSlot 컴포넌트 수정
`packages/ui/src/components/ad-slot.tsx`의 주석 처리된 부분을 실제 코드로 교체:

```tsx
<ins className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
  data-ad-slot={slot}
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

### 4. Head에 AdSense 스크립트 추가
`app/layout.tsx`의 `<head>`에:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

## Affiliate 링크
각 도구의 `affiliateUrl` 필드에 제휴 링크 설정 가능.
"Visit Website" 버튼이 affiliateUrl을 우선 사용.
