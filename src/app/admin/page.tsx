import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  return (
    <AdminShell session={session}>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-sm font-bold text-primary">{session.name}님 로그인 중</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">관리자 대시보드</h2>
        <p className="mt-3 leading-7 text-slate-600">
          관리자 인증이 연결되었습니다. 문의 관리 화면에서 접수된 상담 문의를 확인하고 처리 상태를 변경할 수 있습니다.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Link href="/admin/courses" className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-black text-slate-950">교육과정 관리</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">과정 등록, 수정, 공개 상태 관리를 연결할 예정입니다.</p>
        </Link>
        <Link href="/admin/inquiries" className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-black text-slate-950">문의 관리</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">접수된 문의 확인과 처리 상태 변경을 관리합니다.</p>
        </Link>
      </div>
    </AdminShell>
  );
}
