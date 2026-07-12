import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { PageShell } from "@/components/page-shell";
import { getPublicCourses } from "@/lib/public-courses";

const heroCourseSlugs = [
  "itq",
  "computer-literacy-level-1",
  "word-processor",
  "practical-excel",
  "photoshop",
  "illustrator",
  "itq-master",
  "computer-literacy-level-1-practical",
];

export default async function Home() {
  const courses = await getPublicCourses();
  const featuredCourses = courses.slice(0, 6);
  const heroCourses = heroCourseSlugs
    .map((slug) => courses.find((course) => course.slug === slug))
    .filter((course): course is NonNullable<typeof course> => Boolean(course))
    .slice(0, 8);

  return (
    <PageShell>
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-black text-teal-300">비트컴퓨터학원 · 남원 IT 교육</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
              지금 모집중인
              <br />
              <span className="text-teal-300">자격증·실무 과정</span>을
              <br />
              한눈에 확인하세요.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              ITQ, 컴퓨터활용능력, 워드프로세서, 포토샵, 일러스트, 엑셀실무까지
              일반과정과 국민내일배움카드과정을 함께 안내합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex h-12 items-center justify-center rounded-md bg-teal-400 px-6 font-black text-slate-950" href="/courses">
                교육과정 보기
              </Link>
              <Link className="inline-flex h-12 items-center justify-center rounded-md border border-white/25 px-6 font-black text-white" href="/inquiry">
                상담 문의하기
              </Link>
            </div>
          </div>

          <div className="relative min-h-[380px] lg:min-h-[470px]">
            <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-white/[0.04]" />
            <div className="absolute inset-x-6 top-8 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <p className="text-sm font-black text-teal-200">대표 교육과정</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {heroCourses.map((course, index) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className={[
                      "min-h-20 rounded-xl border border-white/15 p-4 transition hover:-translate-y-1 hover:border-teal-300 hover:bg-white/15",
                      index % 3 === 0 ? "bg-teal-300 text-slate-950" : "bg-white/10 text-white",
                    ].join(" ")}
                  >
                    <span className="block text-xs font-black opacity-70">
                      {course.supportsTrainingCard ? "국비지원" : "일반과정"}
                    </span>
                    <span className="mt-2 block text-lg font-black leading-tight">{course.title}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="absolute bottom-8 left-6 right-6 rounded-2xl bg-slate-900/90 p-5 shadow-2xl ring-1 ring-white/10">
              <p className="text-sm font-black text-slate-300">빠른 과정 검색</p>
              <form action="/courses" className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  className="h-12 flex-1 rounded-md border border-white/15 bg-white px-4 text-sm text-slate-950 outline-none focus:border-teal-300"
                  name="q"
                  placeholder="과정명을 검색해보세요"
                />
                <button className="h-12 rounded-md bg-white px-6 font-black text-slate-950" type="submit">
                  검색
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black text-primary">현재 모집중인 과정</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">원하는 과정을 바로 찾아보세요</h2>
          </div>
          <form action="/courses" className="flex w-full max-w-md items-center gap-2 rounded-full border border-orange-400 bg-white px-5 py-3">
            <input className="min-w-0 flex-1 outline-none" name="q" placeholder="과정명을 검색해보세요" />
            <button className="font-black text-orange-500" type="submit">
              검색
            </button>
          </form>
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
            ["상담 안내", "과정 선택이 어렵다면 전화 또는 문의 폼으로 상담을 도와드립니다."],
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
