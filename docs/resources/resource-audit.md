# Resource Audit

## 조사 일시
2026-03-08

## 1. 로컬 개발 환경
| 항목 | 값 |
|------|-----|
| OS | macOS Sonoma 14.1 (Apple Silicon M-series) |
| Node.js | v25.8.0 |
| npm | 11.11.0 |
| pnpm | 10.30.3 |
| Git | 2.50.1 |
| Shell | Zsh |

## 2. 사용 가능 외부 자원 (Resource Map 기반)

### AI API (향후 자동화용)
| 서비스 | 상태 | 용도 |
|--------|------|------|
| OpenAI GPT-4 | ✅ Active | 향후 AI 도구 설명 자동 생성 |
| Anthropic Claude | ✅ Active | 향후 콘텐츠 생성 |
| Google Gemini | ✅ Active | 향후 데이터 수집/정제 |

### 인프라
| 서비스 | 상태 | 용도 |
|--------|------|------|
| AWS EC2 (ap-northeast-2) | ✅ Active | 필요시 API 서버 |
| GitHub (daltoggi) | ✅ Active | 코드 저장소 |
| Telegram Bot | ✅ Active | 알림/모니터링 |

### 도메인/결제
| 항목 | 상태 | 비고 |
|------|------|------|
| GoDaddy 계정 | ✅ Active | 도메인 구매 가능 |
| taxbard.kr | 사용중 (Slot 03) | 이 프로젝트용 아님 |
| 결제 수단 | ✅ Active | 월 $120 예산 한도 |

### 이 프로젝트에서 사용할 자원
- **코드 저장소**: GitHub (daltoggi)
- **호스팅**: Vercel (무료 tier)
- **DB**: SQLite (로컬) → Vercel/Turso (프로덕션)
- **도메인**: MVP는 `*.vercel.app` → 이후 커스텀 도메인 구매
- **알림**: Telegram Bot 연동 가능

## 3. 비용 전략
MVP 단계: 월 $0 (무료 tier만 활용)
- **Vercel Hobby**: 무료 (월 100GB 대역폭)
- **Turso Free**: 무료 (500개 DB, 9GB)
- **GitHub**: 무료
- **도메인**: MVP에선 `.vercel.app` 사용 ($0)

성장 시: 월 ~$30 예상
- 커스텀 도메인: ~$15/년
- Vercel Pro: $20/월 (필요시)

## 4. 보안 원칙
- ⚠️ API 키는 절대 코드/Git에 포함하지 않음
- ⚠️ `.env.local`로만 관리, `.gitignore`에 등록
- ⚠️ Resource Map 원본은 프로젝트에 복사하지 않음
- ⚠️ 민감 정보는 Vercel 환경변수로만 설정

## 5. 가정 (Assumptions)
- GitHub (daltoggi) 계정으로 새 리포지토리 생성 가능
- Vercel 계정 생성 후 GitHub 연동 가능
- MVP 트래픽은 무료 한도 내
- AI 도구 데이터는 초기 수동 seed → 향후 AI API로 자동화
