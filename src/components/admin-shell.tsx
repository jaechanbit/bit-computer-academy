import Link from "next/link";
import { ReactNode } from "react";
import { logoutAdminAction } from "@/app/admin/login/actions";
import { AdminSession } from "@/lib/auth";

const adminNavItems = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/courses", label: "교육과정 관리" },
  { href: "/admin/inquiries", label: "문의 관리" },
];

export function AdminShell({
  session,
  children,
}: {
  session: AdminSession;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500">{session.name}님 로그인 중</p>
            <h1 className="text-xl font-black text-slate-950">비트컴퓨터학원 관리</h1>
          </div>
          <form action={logoutAdminAction}>
            <button className="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">
              로그아웃
            </button>
          </form>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 pb-4 text-sm font-bold text-slate-700">
          {adminNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 rounded-md px-3 py-2 hover:bg-slate-100">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">{children}</section>
    </main>
  );
}
