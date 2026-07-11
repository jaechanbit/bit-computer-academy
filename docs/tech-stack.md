# 비트컴퓨터학원 홈페이지 기술스택 결정서

## 1. 문서 개요

- 대상 서비스: 비트컴퓨터학원 홈페이지
- 운영 도메인: bit-edu.com
- 목적:
  - 방문자용 홈페이지와 관리자 페이지를 하나의 프로젝트에서 개발한다.
  - 교육과정, 문의, 관리자 계정을 데이터베이스로 관리한다.
  - 호스팅 배포와 도메인 연결을 고려한 구조로 만든다.

## 2. 권장 기술스택

| 영역 | 선택 기술 | 용도 |
| --- | --- | --- |
| 프론트엔드 | Next.js | 방문자 화면, 관리자 화면 |
| 언어 | TypeScript | 안정적인 개발과 유지보수 |
| 스타일 | Tailwind CSS | 반응형 UI와 빠른 디자인 구현 |
| 백엔드 | Next.js Route Handlers / Server Actions | 문의 접수, 관리자 기능 |
| ORM | Prisma | DB 스키마 관리와 쿼리 |
| 데이터베이스 | PostgreSQL | 과정, 문의, 관리자 계정 저장 |
| 인증 | 세션 기반 관리자 로그인 | 관리자 페이지 보호 |
| 비밀번호 해시 | bcrypt 또는 argon2 | 관리자 비밀번호 보호 |
| 배포 | Node.js 지원 호스팅 또는 VPS | bit-edu.com 운영 |

## 3. 선택 이유

### 3.1 Next.js

선택 이유:
- 방문자용 홈페이지와 관리자 페이지를 한 프로젝트에서 만들기 좋다.
- 페이지 라우팅, 서버 기능, API 기능을 함께 제공한다.
- 검색엔진 노출이 필요한 학원 홈페이지에 적합하다.
- 추후 블로그, 공지사항, 과정 상세 페이지 확장이 쉽다.

### 3.2 TypeScript

선택 이유:
- 교육과정, 문의, 관리자 데이터 구조를 안전하게 다룰 수 있다.
- 개발 중 오타와 타입 오류를 줄일 수 있다.
- 관리자 기능처럼 데이터 변경이 많은 화면에 유리하다.

### 3.3 Tailwind CSS

선택 이유:
- 반응형 화면을 빠르게 구현할 수 있다.
- 브랜드 색상 적용과 디자인 수정이 쉽다.
- 별도 복잡한 디자인 시스템 없이도 깔끔한 UI를 만들 수 있다.

### 3.4 Prisma

선택 이유:
- PostgreSQL 테이블 구조를 코드로 관리할 수 있다.
- 마이그레이션을 통해 DB 변경 이력을 관리하기 좋다.
- TypeScript와 궁합이 좋다.

### 3.5 PostgreSQL

선택 이유:
- 과정, 문의, 관리자 계정 같은 관계형 데이터에 적합하다.
- 검색, 필터, 상태 관리에 안정적이다.
- 호스팅과 클라우드 지원이 넓다.

## 4. 프로젝트 구조안

```text
bithome/
  docs/
    requirements.md
    screen-design.md
    database-design.md
    tech-stack.md
  prisma/
    schema.prisma
    seed.ts
  src/
    app/
      page.tsx
      about/
        page.tsx
      courses/
        page.tsx
        [slug]/
          page.tsx
      inquiry/
        page.tsx
      location/
        page.tsx
      admin/
        page.tsx
        login/
          page.tsx
        courses/
          page.tsx
          new/
            page.tsx
          [id]/
            edit/
              page.tsx
        inquiries/
          page.tsx
          [id]/
            page.tsx
    components/
      layout/
      visitor/
      admin/
      ui/
    lib/
      db.ts
      auth.ts
      validators.ts
    styles/
  public/
    images/
    logo-placeholder.svg
```

## 5. 방문자 라우팅

| 경로 | 화면 | 설명 |
| --- | --- | --- |
| `/` | 홈 | 학원 소개, 과정 검색, 주요 과정 |
| `/about` | 학원소개 | 학원 특징과 교육 방향 |
| `/courses` | 교육과정 목록 | 과정 검색/필터 |
| `/courses/[slug]` | 교육과정 상세 | 과정 상세 및 문의 이동 |
| `/inquiry` | 문의/신청 | 상담 문의 접수 |
| `/location` | 오시는 길 | 주소, 전화, 지도 |

## 6. 관리자 라우팅

| 경로 | 화면 | 설명 |
| --- | --- | --- |
| `/admin/login` | 관리자 로그인 | 관리자 인증 |
| `/admin` | 대시보드 | 과정/문의 현황 |
| `/admin/courses` | 교육과정 관리 | 과정 목록 및 상태 관리 |
| `/admin/courses/new` | 교육과정 등록 | 신규 과정 등록 |
| `/admin/courses/[id]/edit` | 교육과정 수정 | 기존 과정 수정 |
| `/admin/inquiries` | 문의 관리 | 문의 목록 및 상태 관리 |
| `/admin/inquiries/[id]` | 문의 상세 | 문의 내용과 관리자 메모 |

## 7. 환경변수

```text
DATABASE_URL=postgresql://user:password@host:5432/database
ADMIN_USERNAME=admin
ADMIN_INITIAL_PASSWORD=초기비밀번호
ADMIN_NAME=관리자
SESSION_SECRET=랜덤문자열
NEXT_PUBLIC_SITE_URL=https://bit-edu.com
```

주의:
- 실제 비밀번호와 DB 접속 정보는 Git에 커밋하지 않는다.
- `.env`는 로컬 개발 전용으로 사용하고, 운영 환경에서는 호스팅 관리자 화면에 등록한다.

## 8. 배포 방향

### 8.1 권장 호스팅 조건

호스팅 업체 선택 시 다음 조건을 확인한다.

- Node.js 실행 지원
- PostgreSQL 또는 외부 PostgreSQL 연결 지원
- 환경변수 설정 지원
- SSL 인증서 지원
- 도메인 연결 지원
- 빌드 명령 실행 가능

### 8.2 배포 명령 예시

```text
npm install
npm run build
npm run start
```

### 8.3 도메인 연결

- bit-edu.com DNS에서 호스팅 서버로 A 레코드 또는 CNAME을 연결한다.
- SSL 인증서를 적용한다.
- `https://bit-edu.com` 접속을 기본으로 한다.

## 9. 지도 구현 방식

초기 구현:
- API 키 없이 사용할 수 있는 지도 공유/임베드 링크를 우선 사용한다.
- 오시는 길 페이지에 지도와 길찾기 버튼을 제공한다.

추후 확장:
- 카카오맵 또는 네이버 지도 API 키를 발급한다.
- 정확한 마커, 지도 제어, 길찾기 연동을 강화한다.

## 10. 카카오톡 상담 연결 방식

초기 구현:
- 카카오톡 상담 버튼은 준비중 상태로 두거나 전화 상담으로 연결한다.

추후 구현:
- 카카오톡 채널 개설
- 채널 URL 발급
- 홈페이지 상담 버튼에 URL 연결

## 11. 개발 단계

1. Next.js 프로젝트 생성
2. Tailwind CSS 기본 디자인 설정
3. Prisma 설치 및 DB 스키마 작성
4. 초기 교육과정 seed 작성
5. 방문자 홈/교육과정 목록/상세 개발
6. 문의 폼 저장 기능 개발
7. 관리자 로그인 개발
8. 관리자 과정 관리 개발
9. 관리자 문의 관리 개발
10. 지도, 개인정보처리방침, 배포 설정 마무리

