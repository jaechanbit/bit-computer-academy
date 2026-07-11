# 비트컴퓨터학원 DB 연결 및 초기화 가이드

## 1. 목적

이 문서는 비트컴퓨터학원 홈페이지를 실제 Supabase PostgreSQL 데이터베이스와 연결하고, 초기 관리자 및 교육과정 데이터를 넣는 절차를 정리합니다.

## 2. Supabase에서 필요한 정보

Supabase 프로젝트를 만든 뒤 다음 값을 확인합니다.

| 항목 | 설명 |
| --- | --- |
| Project Ref | Supabase 프로젝트 고유 ID |
| Region | DB 리전 |
| Database password | DB 비밀번호 |
| Session pooler | Prisma 관리/스키마 반영용 연결 문자열 |
| Transaction pooler | 서버리스 운영 환경용 연결 문자열 |

참고:
- https://supabase.com/docs/guides/database/prisma
- https://supabase.com/docs/guides/database/connecting-to-postgres

## 3. Supabase Prisma 사용자 생성

Supabase Dashboard의 SQL Editor에서 Prisma 전용 사용자를 만듭니다.

```sql
create user "prisma" with password '강력한-비밀번호' bypassrls createdb;
grant "prisma" to "postgres";

grant usage on schema public to prisma;
grant create on schema public to prisma;
grant all on all tables in schema public to prisma;
grant all on all routines in schema public to prisma;
grant all on all sequences in schema public to prisma;

alter default privileges for role postgres in schema public grant all on tables to prisma;
alter default privileges for role postgres in schema public grant all on routines to prisma;
alter default privileges for role postgres in schema public grant all on sequences to prisma;
```

주의:
- 예시 비밀번호는 실제 운영용 강력한 비밀번호로 바꿉니다.
- GitHub, 문서, 채팅에 실제 비밀번호를 남기지 않습니다.

## 4. `.env` 파일 생성

프로젝트 루트에 `.env` 파일을 만들고 `.env.example`을 기준으로 값을 채웁니다.

```text
DATABASE_URL="postgresql://prisma.PROJECT_REF:PASSWORD@REGION.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://prisma.PROJECT_REF:PASSWORD@REGION.pooler.supabase.com:5432/postgres"
ADMIN_USERNAME="admin"
ADMIN_INITIAL_PASSWORD="초기비밀번호"
ADMIN_NAME="관리자"
SESSION_SECRET="32자-이상의-긴-랜덤-문자열"
NEXT_PUBLIC_SITE_URL="https://bit-edu.com"
```

설명:
- `.env` 파일은 Git에 올리지 않습니다.
- `DATABASE_URL`은 운영 앱 연결용입니다. Vercel 같은 서버리스 배포에서는 Supavisor transaction pooler, port `6543`을 권장합니다.
- `DIRECT_URL`은 Prisma 스키마 반영용입니다. Supavisor session pooler, port `5432`를 사용합니다.
- `ADMIN_INITIAL_PASSWORD`는 첫 로그인 뒤 반드시 변경하는 운영 흐름이 필요합니다.
- `SESSION_SECRET`은 32자 이상의 추측하기 어려운 문자열을 사용합니다.

## 5. 환경변수 점검

```powershell
npm.cmd run check:env
```

성공 메시지:

```text
Environment variables look ready.
```

## 6. DB 테이블 생성

```powershell
npm.cmd run db:push
```

이 명령은 `prisma/schema.prisma` 기준으로 Supabase PostgreSQL에 테이블을 생성합니다.

## 7. 초기 데이터 입력

```powershell
npm.cmd run db:seed
```

입력되는 데이터:
- 초기 관리자 계정
- 일반과정 9개
- 국민내일배움카드과정 4개

## 8. DB 확인 도구

```powershell
npm.cmd run db:studio
```

Prisma Studio가 열리면 다음 테이블을 확인합니다.

- `admins`
- `courses`
- `inquiries`
- `inquiry_status_logs`

## 9. 초기 동작 확인

1. 개발 서버 실행

```powershell
npm.cmd run dev -- -p 3000
```

2. 관리자 로그인 접속

```text
http://localhost:3000/admin/login
```

3. 확인할 기능

- 관리자 로그인
- 교육과정 목록 조회
- 교육과정 등록/수정
- 문의 폼 접수
- 관리자 문의 목록 확인
- 문의 처리 상태 변경

## 10. 자주 생기는 문제

### DATABASE_URL 오류

확인:
- DB 주소, 계정, 비밀번호, DB명이 정확한지 확인합니다.
- Supabase pooler 주소와 port가 맞는지 확인합니다.
- 운영 앱은 `6543`, Prisma 스키마 반영은 `5432` 사용을 기준으로 합니다.

### 관리자 로그인이 안 됨

확인:
- `npm.cmd run db:seed` 실행 여부
- `.env`의 `ADMIN_USERNAME`, `ADMIN_INITIAL_PASSWORD`
- `SESSION_SECRET` 설정 여부

### 문의가 저장되지 않음

확인:
- `inquiries` 테이블 생성 여부
- 문의 폼 개인정보 동의 체크 여부
- 서버 로그의 Prisma 오류 메시지
