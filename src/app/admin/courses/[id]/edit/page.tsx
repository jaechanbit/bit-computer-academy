import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminSession } from "@/lib/auth";
import { getPrisma } from "@/lib/db";
import { CourseForm } from "../../course-form";

type EditCoursePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const session = await requireAdminSession();
  const { id } = await params;
  let course = null;
  let dbUnavailable = false;

  try {
    const prisma = getPrisma();
    course = await prisma.course.findUnique({ where: { id } });
  } catch (error) {
    console.error(error);
    dbUnavailable = true;
  }

  if (!dbUnavailable && !course) {
    notFound();
  }

  return (
    <AdminShell session={session}>
      {dbUnavailable || !course ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-black text-amber-950">데이터베이스 연결이 필요합니다</h2>
          <p className="mt-3 leading-7 text-amber-800">
            과정 수정을 사용하려면 PostgreSQL 연결 후 `.env`의 `DATABASE_URL`을 설정해주세요.
          </p>
        </div>
      ) : (
        <>
          <Link href="/admin/courses" className="text-sm font-bold text-primary">
            교육과정 목록
          </Link>
          <h2 className="mt-4 text-3xl font-black text-slate-950">교육과정 수정</h2>
          <p className="mt-3 text-sm text-slate-600">{course.title} 과정 정보를 수정합니다.</p>
          <div className="mt-6">
            <CourseForm course={course} />
          </div>
        </>
      )}
    </AdminShell>
  );
}
