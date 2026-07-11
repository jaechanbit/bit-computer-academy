import { CourseCategory } from "@prisma/client";
import { CourseCard } from "@/components/course-card";
import { PageShell } from "@/components/page-shell";
import { courseCategoryLabels } from "@/data/admin-labels";
import { getPublicCourses } from "@/lib/public-courses";

type CoursesPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: CourseCategory;
  }>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const keyword = params.q?.trim() ?? "";
  const category = params.category;
  const courses = await getPublicCourses();
  const filteredCourses = courses.filter((course) => {
    const matchesKeyword = keyword
      ? `${course.title} ${course.summary} ${course.description}`.toLowerCase().includes(keyword.toLowerCase())
      : true;
    const matchesCategory = category ? course.category === category : true;
    return matchesKeyword && matchesCategory;
  });

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-sm font-black text-accent">교육과정</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">교육과정 찾기</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          일반과정과 국민내일배움카드과정을 검색하고 관심 과정에 대해 상담 문의를 남길 수 있습니다.
        </p>

        <form className="mt-8 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[1fr_240px_120px]">
          <input
            className="h-11 rounded-md border border-slate-300 px-4 text-sm outline-none focus:border-primary"
            name="q"
            placeholder="과정명 또는 키워드 검색"
            defaultValue={keyword}
          />
          <select
            className="h-11 rounded-md border border-slate-300 px-4 text-sm outline-none focus:border-primary"
            name="category"
            defaultValue={category ?? ""}
          >
            <option value="">전체</option>
            <option value="GENERAL">{courseCategoryLabels.GENERAL}</option>
            <option value="TRAINING_CARD">{courseCategoryLabels.TRAINING_CARD}</option>
          </select>
          <button className="h-11 rounded-md bg-primary font-bold text-white" type="submit">
            검색
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-600">총 {filteredCourses.length}개 과정</p>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
