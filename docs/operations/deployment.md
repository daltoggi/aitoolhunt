# Deployment & Operations Guide

## 로컬 개발 환경

### 요구사항
- Node.js >= 20
- pnpm >= 10

### 설치 및 실행
```bash
# 의존성 설치
pnpm install

# DB 시드
pnpm db:seed

# 개발 서버 시작
pnpm dev
```
서버: http://localhost:3000

### 빌드
```bash
pnpm build
```

## 배포 (Vercel)

### 1. GitHub 저장소 생성
```bash
git remote add origin https://github.com/daltoggi/aitoolhunt.git
git push -u origin main
```

### 2. Vercel 연동
1. https://vercel.com 에서 GitHub 계정 연동
2. "Import Project" → aitoolhunt 레포 선택
3. Framework: Next.js (자동 감지)
4. Root Directory: `packages/web`
5. Build Command: `cd ../.. && pnpm build --filter @aitoolhunt/web`
6. Install Command: `cd ../.. && pnpm install`

### 3. 환경변수 설정
Vercel Dashboard → Settings → Environment Variables:
```
DATABASE_URL=./local.db
```

### 4. 배포
- main 브랜치 push 시 자동 배포
- PR 생성 시 Preview 배포

## 프로덕션 체크리스트
- [ ] Vercel 계정 생성
- [ ] GitHub 연동
- [ ] 환경변수 설정
- [ ] 도메인 설정 (선택)
- [ ] Google Search Console 등록
- [ ] Google AdSense 신청 (콘텐츠 충분 시)

## 장애 대응

### 빌드 실패
1. `pnpm build` 로컬 테스트
2. `packages/web/.next` 삭제 후 재빌드
3. 타입 에러 확인: `pnpm typecheck`

### DB 초기화
```bash
rm packages/api/local.db
pnpm db:seed
cp packages/api/local.db packages/web/local.db
```

## 모니터링
- Vercel Analytics (무료)
- Vercel Speed Insights (무료)
