import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-lg font-black">비트컴퓨터학원</p>
          <div className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
            <p>전북특별자치도 남원시 의총로 81-10</p>
            <p>대표전화 063-626-9060</p>
            <p>운영 도메인 bit-edu.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-sm text-slate-300 md:items-end">
          <Link href="/courses" className="hover:text-white">교육과정</Link>
          <Link href="/inquiry" className="hover:text-white">상담 문의</Link>
          <Link href="/location" className="hover:text-white">오시는 길</Link>
          <Link href="/privacy" className="hover:text-white">개인정보처리방침</Link>
          <Link href="/admin/login" className="hover:text-white">관리자 로그인</Link>
        </div>
      </div>
    </footer>
  );
}
