# 비트컴퓨터학원 홈페이지

비트컴퓨터학원 교육과정 안내, 상담 문의, 관리자 과정/문의 관리를 위한 Next.js 프로젝트입니다.

## 주요 기능

- 방문자 홈페이지
- 교육과정 검색 및 상세
- 상담 문의 접수
- 관리자 로그인
- 교육과정 등록/수정/공개 관리
- 문의 목록/상세/처리 상태 관리

## 개발 실행

```powershell
npm.cmd install
npm.cmd run dev -- -p 3000
```

## 검증

```powershell
npm.cmd run lint
npm.cmd run build
```

## DB 설정

자세한 절차는 [DB 연결 및 초기화 가이드](C:/Users/User/Desktop/코덱스/bithome/docs/db-setup.md)를 참고합니다.

```powershell
npm.cmd run check:env
npm.cmd run db:push
npm.cmd run db:seed
```

## 배포

Supabase와 GitHub 배포 절차는 [GitHub + Supabase + Vercel 배포 가이드](C:/Users/User/Desktop/코덱스/bithome/docs/github-supabase-deploy.md)를 확인합니다.

최종 배포 전에는 [배포 체크리스트](C:/Users/User/Desktop/코덱스/bithome/docs/deployment-checklist.md)를 점검합니다.
