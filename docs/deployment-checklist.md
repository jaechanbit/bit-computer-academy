# 비트컴퓨터학원 배포 체크리스트

## 1. 배포 전 필수 확인

- [ ] 로고 파일 적용
- [ ] Supabase PostgreSQL 프로젝트 준비
- [ ] `.env` 운영 환경변수 등록
- [ ] `npm.cmd run check:env` 통과
- [ ] `npm.cmd run db:push` 실행
- [ ] `npm.cmd run db:seed` 실행
- [ ] `npm.cmd run lint` 통과
- [ ] `npm.cmd run build` 통과
- [ ] 개인정보처리방침 운영자 정보 보완
- [ ] 카카오톡 상담 채널 링크 확정 또는 준비중 처리 유지
- [ ] 지도 노출 방식 최종 확인

## 2. 권장 운영 구조

| 역할 | 서비스 |
| --- | --- |
| 코드 저장소 | GitHub |
| 데이터베이스 | Supabase PostgreSQL |
| 앱 배포 | Vercel |
| 운영 도메인 | bit-edu.com |

GitHub Pages는 정적 파일 호스팅에 가깝기 때문에 이 프로젝트처럼 관리자 로그인, DB 저장, 서버 액션이 필요한 Next.js 앱에는 적합하지 않습니다. GitHub에는 코드를 올리고, 실제 운영 배포는 Vercel 같은 Next.js 호스팅을 사용하는 구성이 안전합니다.

## 3. 운영 환경변수

호스팅 서비스의 환경변수 화면에 다음 값을 등록합니다.

```text
DATABASE_URL
DIRECT_URL
ADMIN_USERNAME
ADMIN_INITIAL_PASSWORD
ADMIN_NAME
SESSION_SECRET
NEXT_PUBLIC_SITE_URL
```

운영 값 예시:

```text
NEXT_PUBLIC_SITE_URL=https://bit-edu.com
```

## 4. 배포 명령

일반적인 Node.js 호스팅 기준:

```powershell
npm.cmd install
npm.cmd run db:generate
npm.cmd run build
npm.cmd run start
```

최초 DB 초기화가 필요하면 다음을 실행합니다.

```powershell
npm.cmd run db:push
npm.cmd run db:seed
```

## 5. 도메인 연결

도메인: `bit-edu.com`

확인할 DNS 항목:
- A 레코드 또는 CNAME이 호스팅 서비스 안내값과 일치하는지 확인
- `www` 사용 여부 결정
- SSL 인증서 발급 및 HTTPS 접속 확인

## 6. 배포 후 확인 URL

- [ ] `/`
- [ ] `/about`
- [ ] `/courses`
- [ ] `/inquiry`
- [ ] `/location`
- [ ] `/privacy`
- [ ] `/admin/login`
- [ ] `/admin`
- [ ] `/admin/courses`
- [ ] `/admin/inquiries`

## 7. 운영 테스트

- [ ] 방문자 과정 검색
- [ ] 과정 상세 확인
- [ ] 문의 폼 접수
- [ ] 관리자 로그인
- [ ] 문의 목록 확인
- [ ] 문의 처리 상태 변경
- [ ] 과정 등록
- [ ] 과정 수정
- [ ] 과정 공개/비공개 전환
- [ ] 방문자 화면에 관리자 수정 내용 반영

## 8. 보안 확인

- [ ] `.env` 파일이 저장소에 포함되지 않음
- [ ] 관리자 초기 비밀번호 변경
- [ ] `SESSION_SECRET`이 충분히 김
- [ ] 관리자 페이지가 비로그인 상태에서 차단됨
- [ ] 개인정보처리방침에 실제 운영 정보 반영
- [ ] HTTPS 접속 강제
