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
      <section className="bg-[#07111f] text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16 lg:py-20">
          <div className="max-w-5xl">
            <p className="text-sm font-black text-teal-300">비트컴퓨터학원 · 남원 IT 교육</p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
              자격증부터 실무까지,
              <br />
              필요한 컴퓨터 교육을
              <br />
              한곳에서 안내합니다.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              ITQ, 컴퓨터활용능력, 워드프로세서, 엑셀실무, 포토샵, 일러스트 과정과
              국민내일배움카드 과정을 확인하고 간단한 상담 문의를 남겨보세요.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex h-12 items-center justify-center rounded-md bg-teal-300 px-6 font-black text-slate-950" href="/courses">
                교육과정 보기
              </Link>
              <Link className="inline-flex h-12 items-center justify-center rounded-md border border-white/25 px-6 font-black text-white" href="/inquiry">
                상담 문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black text-primary">과정 검색</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">원하는 과정을 바로 찾아보세요</h2>
          </div>
          <form action="/courses" className="flex w-full max-w-md items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-3 focus-within:border-primary">
            <input className="min-w-0 flex-1 outline-none" name="q" placeholder="예: ITQ, 엑셀, 컴퓨터활용능력" />
            <button className="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white" type="submit">
              검색
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/courses?category=GENERAL" className="rounded-md border border-slate-200 bg-white p-5 transition hover:border-primary">
            <p className="text-sm font-black text-slate-500">일반과정</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{generalCount}개 과정</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">자격증과 실무 활용을 목적에 맞게 선택합니다.</p>
          </Link>
          <Link href="/courses?category=TRAINING_CARD" className="rounded-md border border-slate-200 bg-white p-5 transition hover:border-primary">
            <p className="text-sm font-black text-slate-500">국민내일배움카드</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{trainingCardCount}개 과정</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">국비지원 가능 여부와 수강 절차를 상담합니다.</p>
          </Link>
          <Link href="/inquiry" className="rounded-md border border-slate-950 bg-slate-950 p-5 text-white transition hover:bg-slate-800">
            <p className="text-sm font-black text-teal-300">상담 문의</p>
            <p className="mt-2 text-3xl font-black">063-626-9060</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">과정 선택이 어렵다면 먼저 문의를 남겨주세요.</p>
          </Link>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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
            <div key={title} className="rounded-md border border-slate-200 p-6">
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
