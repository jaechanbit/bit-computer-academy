import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminSession } from "@/lib/auth";
import { CourseForm } from "../course-form";

export default async function NewCoursePage() {
  const session = await requireAdminSession();

  return (
    <AdminShell session={session}>
      <Link href="/admin/courses" className="text-sm font-bold text-primary">
        교육과정 목록
      </Link>
      <h2 className="mt-4 text-3xl font-black text-slate-950">교육과정 등록</h2>
      <p className="mt-3 text-sm text-slate-600">새 교육과정을 등록합니다.</p>
      <div className="mt-6">
        <CourseForm />
      </div>
    </AdminShell>
  );
}
