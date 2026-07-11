import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { PageShell } from "@/components/page-shell";
import { getPublicCourses } from "@/lib/public-courses";

export default async function Home() {
  const courses = await getPublicCourses();
  const featuredCourses = courses.slice(0, 6);
  const generalCount = courses.filter((course) => course.category === "GENERAL").length;
  const trainingCardCount = courses.filter((course) => course.category === "TRAINING_CARD").length;

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-black text-accent">남원 IT 교육 · 자격증 과정</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              원하는 컴퓨터 교육과정을 찾고 상담 문의까지 한 번에.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              비트컴퓨터학원은 일반과정과 국민내일배움카드과정을 운영하며, ITQ,
              컴퓨터활용능력, 워드프로세서, 그래픽 실무 등 실무 중심 교육을 안내합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-bold text-white" href="/courses">
                교육과정 보기
              </Link>
              <Link className="inline-flex h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-6 font-bold text-slate-900" href="/inquiry">
                상담 문의
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-black text-slate-950">과정 빠른 검색</h2>
            <form action="/courses" className="mt-5 space-y-3">
              <input
                className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm outline-none focus:border-primary"
                name="q"
                placeholder="과정명을 입력하세요"
              />
              <select
                className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm outline-none focus:border-primary"
                name="category"
                defaultValue=""
              >
                <option value="">전체 과정</option>
                <option value="GENERAL">일반과정</option>
                <option value="TRAINING_CARD">국민내일배움카드과정</option>
              </select>
              <button className="h-12 w-full rounded-md bg-slate-950 font-bold text-white" type="submit">
                검색하기
              </button>
            </form>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link href="/courses?category=GENERAL" className="rounded-lg bg-white p-4 text-center">
                <span className="block text-2xl font-black text-primary">{generalCount}</span>
                <span className="text-sm font-bold text-slate-600">일반과정</span>
              </Link>
              <Link href="/courses?category=TRAINING_CARD" className="rounded-lg bg-white p-4 text-center">
                <span className="block text-2xl font-black text-accent">{trainingCardCount}</span>
                <span className="text-sm font-bold text-slate-600">국민내일배움카드</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black text-primary">모집중 과정</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">주요 교육과정</h2>
          </div>
          <Link href="/courses" className="text-sm font-bold text-primary">전체 보기</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-14 md:grid-cols-3">
          {[
            ["자격증 대비", "ITQ, 컴퓨터활용능력, 워드프로세서 등 목표에 맞춰 준비합니다."],
            ["실무 중심", "업무에 바로 쓰는 엑셀, 문서 작성, 그래픽 실습을 다룹니다."],
            ["상담 안내", "과정 선택이 어렵다면 전화 또는 문의 폼으로 상담을 남길 수 있습니다."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-slate-200 p-5">
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
