import Link from "next/link";
import { AdminLoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Link href="/" className="text-sm font-bold text-primary">
          홈으로 돌아가기
        </Link>
        <h1 className="mt-6 text-2xl font-black text-slate-950">관리자 로그인</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          배포 시 생성한 관리자 계정으로 로그인합니다.
        </p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
