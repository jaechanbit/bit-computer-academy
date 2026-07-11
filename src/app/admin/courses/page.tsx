import Link from "next/link";
import { CourseCategory, CourseStatus } from "@prisma/client";
import { AdminShell } from "@/components/admin-shell";
import { courseCategoryLabels, courseStatusLabels } from "@/data/admin-labels";
import { requireAdminSession } from "@/lib/auth";
import { getPrisma } from "@/lib/db";
import { toggleCoursePublishAction } from "./actions";

type AdminCoursesPageProps = {
  searchParams: Promise<{
    category?: CourseCategory;
    status?: CourseStatus;
    saved?: string;
    error?: string;
  }>;
};

type AdminCourseListItem = {
  id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  status: CourseStatus;
  startDate: Date | null;
  isPublished: boolean;
  updatedAt: Date;
};

async function getCourses(category?: CourseCategory, status?: CourseStatus) {
  const prisma = getPrisma();

  return prisma.course.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      status: true,
      startDate: true,
      isPublished: true,
      updatedAt: true,
    },
  });
}

export default async function AdminCoursesPage({ searchParams }: AdminCoursesPageProps) {
  const session = await requireAdminSession();
  const params = await searchParams;
  let courses: AdminCourseListItem[] = [];
  let dbUnavailable = false;

  try {
    courses = await getCourses(params.category, params.status);
  } catch (error) {
    console.error(error);
    dbUnavailable = true;
  }

  return (
    <AdminShell session={session}>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black text-primary">교육과정 관리</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">교육과정 목록</h2>
          <p className="mt-3 text-sm text-slate-600">방문자에게 노출되는 교육과정을 등록하고 관리합니다.</p>
        </div>
        <Link href="/admin/courses/new" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-bold text-white">
          새 과정 등록
        </Link>
      </div>

      <form className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[1fr_1fr_120px]">
        <select className="h-11 rounded-md border border-slate-300 px-3 text-sm" name="category" defaultValue={params.category ?? ""}>
          <option value="">전체 분류</option>
          {Object.entries(courseCategoryLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select className="h-11 rounded-md border border-slate-300 px-3 text-sm" name="status" defaultValue={params.status ?? ""}>
          <option value="">전체 상태</option>
          {Object.entries(courseStatusLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <button className="h-11 rounded-md bg-slate-950 text-sm font-bold text-white" type="submit">
          필터
        </button>
      </form>

      {params.saved ? (
        <div className="mt-5 rounded-md bg-teal-50 px-4 py-3 text-sm font-bold text-teal-700">
          저장되었습니다.
        </div>
      ) : null}
      {params.error ? (
        <div className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          요청을 처리하지 못했습니다. 입력값을 확인해주세요.
        </div>
      ) : null}

      {dbUnavailable ? (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-black text-amber-950">데이터베이스 연결이 필요합니다</h2>
          <p className="mt-3 leading-7 text-amber-800">
            과정 관리를 사용하려면 PostgreSQL 연결 후 `.env`의 `DATABASE_URL`을 설정하고
            `npm run db:push`, `npm run db:seed`를 실행해주세요.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">과정명</th>
                  <th className="px-4 py-3">분류</th>
                  <th className="px-4 py-3">개강일</th>
                  <th className="px-4 py-3">모집상태</th>
                  <th className="px-4 py-3">공개</th>
                  <th className="px-4 py-3">수정일</th>
                  <th className="px-4 py-3">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-950">{course.title}</p>
                      <p className="mt-1 text-xs text-slate-500">/{course.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{courseCategoryLabels[course.category]}</td>
                    <td className="px-4 py-3 text-slate-600">{course.startDate?.toLocaleDateString("ko-KR") ?? "미정"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-primary">
                        {courseStatusLabels[course.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{course.isPublished ? "공개" : "비공개"}</td>
                    <td className="px-4 py-3 text-slate-600">{course.updatedAt.toLocaleDateString("ko-KR")}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <Link className="font-bold text-primary" href={`/admin/courses/${course.id}/edit`}>
                          수정
                        </Link>
                        <form action={toggleCoursePublishAction}>
                          <input name="id" type="hidden" value={course.id} />
                          <input name="isPublished" type="hidden" value={String(course.isPublished)} />
                          <button className="font-bold text-slate-700" type="submit">
                            {course.isPublished ? "비공개" : "공개"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {courses.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-slate-500">등록된 과정이 없습니다.</div>
          ) : null}
        </div>
      )}
    </AdminShell>
  );
}
