import Link from "next/link";
import { CourseCategory } from "@prisma/client";
import { CourseCard } from "@/components/course-card";
import { PageShell } from "@/components/page-shell";
import { courseCategoryLabels } from "@/data/admin-labels";
import { getPublicCourses, PublicCourse } from "@/lib/public-courses";

type CoursesPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: CourseCategory;
  }>;
};

const categoryOptions: Array<{ value: "" | CourseCategory; label: string; href: string }> = [
  { value: "", label: "전체", href: "/courses" },
  { value: "GENERAL", label: "일반과정", href: "/courses?category=GENERAL" },
  { value: "TRAINING_CARD", label: "국비교육과정", href: "/courses?category=TRAINING_CARD" },
];

function appendKeyword(href: string, keyword: string) {
  if (!keyword) {
    return href;
  }

  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}q=${encodeURIComponent(keyword)}`;
}

function CourseSection({
  title,
  description,
  courses,
}: {
  title: string;
  description: string;
  courses: PublicCourse[];
}) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-5 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black text-primary">{title}</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">{description}</h2>
        </div>
        <p className="text-sm font-bold text-slate-500">{courses.length}개 과정</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
}

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
  const generalCourses = filteredCourses.filter((course) => course.category === "GENERAL");
  const trainingCardCourses = filteredCourses.filter((course) => course.category === "TRAINING_CARD");

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-sm font-black text-accent">교육과정</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">교육과정 찾기</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          일반과정과 국비교육과정을 구분해서 확인하고, 과정명이나 키워드로 필요한 수업을 빠르게 찾아보세요.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categoryOptions.map((option) => {
            const isActive = (category ?? "") === option.value;

            return (
              <Link
                key={option.label}
                href={appendKeyword(option.href, keyword)}
                className={`inline-flex h-11 items-center justify-center rounded-md border px-4 text-sm font-black ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"
                }`}
              >
                {option.label}
              </Link>
            );
          })}
        </div>

        <form className="mt-5 grid gap-3 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-[1fr_240px_120px]">
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

        <div className="mt-8 flex items-center justify-between rounded-md bg-slate-100 px-4 py-3">
          <p className="text-sm font-bold text-slate-700">총 {filteredCourses.length}개 과정</p>
          {keyword ? <p className="text-sm text-slate-500">검색어: {keyword}</p> : null}
        </div>

        {filteredCourses.length > 0 ? (
          <>
            <CourseSection title="국비교육과정" description="국민내일배움카드로 상담 가능한 과정" courses={trainingCardCourses} />
            <CourseSection title="일반과정" description="자격증과 실무 역량을 준비하는 과정" courses={generalCourses} />
          </>
        ) : (
          <div className="mt-10 rounded-md border border-slate-200 bg-white p-10 text-center">
            <p className="text-lg font-black text-slate-950">검색 결과가 없습니다.</p>
            <p className="mt-2 text-sm text-slate-600">다른 과정명이나 키워드로 다시 검색해보세요.</p>
          </div>
        )}
      </section>
    </PageShell>
  );
}
