# GitHub + Supabase + Vercel 배포 가이드

## 1. 권장 구조

비트컴퓨터학원 홈페이지는 관리자 기능과 DB 저장 기능이 있으므로 다음 구조를 권장합니다.

| 역할 | 서비스 |
| --- | --- |
| 코드 저장소 | GitHub |
| 데이터베이스 | Supabase PostgreSQL |
| 앱 배포 | Vercel |
| 운영 도메인 | bit-edu.com |

중요:
- GitHub는 코드를 올리고 배포 서비스와 연결하는 곳입니다.
- GitHub Pages만으로는 관리자 로그인, 문의 저장, DB 연동 기능을 운영하기 어렵습니다.
- Next.js 서버 기능을 사용하려면 Vercel, Render, Railway, Fly.io, VPS 같은 Node.js 실행 환경이 필요합니다.

## 2. Supabase 준비

1. Supabase 프로젝트를 생성합니다.
2. SQL Editor에서 Prisma 전용 사용자를 만듭니다.
3. Connect 메뉴에서 connection string을 확인합니다.
4. 다음 두 값을 준비합니다.

```text
DATABASE_URL=Supavisor transaction pooler, port 6543
DIRECT_URL=Supavisor session pooler, port 5432
```

Supabase 공식 Prisma 문서 기준으로, 서버리스/자동 확장 환경에서는 운영 앱 연결에 transaction mode 문자열을 사용하고 Prisma 스키마 반영에는 session pooler 또는 direct connection 문자열을 사용합니다.

공식 문서:
- https://supabase.com/docs/guides/database/prisma
- https://supabase.com/docs/guides/database/connecting-to-postgres

## 3. 로컬 `.env` 작성

```text
DATABASE_URL="postgresql://prisma.PROJECT_REF:PASSWORD@REGION.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://prisma.PROJECT_REF:PASSWORD@REGION.pooler.supabase.com:5432/postgres"
ADMIN_USERNAME="admin"
ADMIN_INITIAL_PASSWORD="초기비밀번호"
ADMIN_NAME="관리자"
SESSION_SECRET="32자-이상의-긴-랜덤-문자열"
NEXT_PUBLIC_SITE_URL="https://bit-edu.com"
```

## 4. 로컬 DB 초기화

```powershell
npm.cmd run check:env
npm.cmd run db:push
npm.cmd run db:seed
```

이 작업을 Supabase 연결값으로 한 번 실행하면 운영 DB에 테이블과 초기 데이터가 만들어집니다.

## 5. GitHub 저장소 생성

GitHub에서 새 저장소를 만듭니다.

추천 저장소명:

```text
bit-computer-academy
```

로컬에서 연결:

```powershell
git init
git add .
git commit -m "Initial bit computer academy website"
git branch -M main
git remote add origin https://github.com/계정명/bit-computer-academy.git
git push -u origin main
```

주의:
- `.env`는 절대 커밋하지 않습니다.
- `.env.example`만 커밋합니다.

## 6. Vercel 배포

1. Vercel에 로그인합니다.
2. GitHub 저장소를 Import 합니다.
3. Framework Preset은 Next.js로 설정합니다.
4. Environment Variables에 다음 값을 등록합니다.

```text
DATABASE_URL
DIRECT_URL
ADMIN_USERNAME
ADMIN_INITIAL_PASSWORD
ADMIN_NAME
SESSION_SECRET
NEXT_PUBLIC_SITE_URL
```

5. Deploy를 실행합니다.

## 7. 배포 후 DB 초기화

Vercel 배포 전에 로컬에서 `db:push`, `db:seed`를 Supabase에 실행했다면 별도 초기화는 필요 없습니다.

운영 배포 후 스키마 변경이 생기면 다음 절차를 다시 검토합니다.

```powershell
npm.cmd run db:push
npm.cmd run db:seed
```

## 8. 도메인 연결

Vercel 프로젝트 Settings에서 `bit-edu.com` 도메인을 추가합니다.

DNS 관리 화면에서 Vercel이 안내하는 A 레코드 또는 CNAME을 설정합니다.

확인:
- `https://bit-edu.com`
- SSL 인증서 정상 발급
- `www` 사용 여부 결정

## 9. 배포 후 테스트

확인할 URL:
- `/`
- `/courses`
- `/inquiry`
- `/admin/login`
- `/admin/courses`
- `/admin/inquiries`

확인할 기능:
- 관리자 로그인
- 과정 등록/수정
- 방문자 화면에 과정 반영
- 문의 접수
- 관리자 문의 확인
- 문의 처리 상태 변경
