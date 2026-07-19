import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { HeroTrainingSlider } from "@/components/hero-training-slider";
import { PageShell } from "@/components/page-shell";
import { getPublicCourses, PublicCourse } from "@/lib/public-courses";

function FeaturedCourseGroup({
  title,
  description,
  href,
  courses,
}: {
  title: string;
  description: string;
  href: string;
  courses: PublicCourse[];
}) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black text-primary">{title}</p>
          <h3 className="mt-2 text-2xl font-black text-slate-950">{description}</h3>
        </div>
        <Link href={href} className="text-sm font-bold text-primary">
          더 보기
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const courses = await getPublicCourses();
  const generalCourses = courses.filter((course) => course.category === "GENERAL");
  const trainingCardCourses = courses.filter((course) => course.category === "TRAINING_CARD");

  return (
    <PageShell>
      <section className="bg-[#07111f] text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16 lg:py-20">
          <HeroTrainingSlider courses={trainingCardCourses} />
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
            <p className="mt-2 text-3xl font-black text-slate-950">{generalCourses.length}개 과정</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">자격증과 실무 활용을 목적에 맞게 선택합니다.</p>
          </Link>
          <Link href="/courses?category=TRAINING_CARD" className="rounded-md border border-slate-200 bg-white p-5 transition hover:border-primary">
            <p className="text-sm font-black text-slate-500">국비교육과정</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{trainingCardCourses.length}개 과정</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">국민내일배움카드 과정과 상담 절차를 확인합니다.</p>
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
            <h2 className="mt-2 text-3xl font-black text-slate-950">카테고리별 주요 교육과정</h2>
          </div>
          <Link href="/courses" className="text-sm font-bold text-primary">
            전체 보기
          </Link>
        </div>

        <FeaturedCourseGroup
          title="국비교육과정"
          description="국민내일배움카드로 준비하는 과정"
          href="/courses?category=TRAINING_CARD"
          courses={trainingCardCourses.slice(0, 3)}
        />
        <FeaturedCourseGroup
          title="일반과정"
          description="자격증과 실무 활용을 위한 과정"
          href="/courses?category=GENERAL"
          courses={generalCourses.slice(0, 3)}
        />
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
