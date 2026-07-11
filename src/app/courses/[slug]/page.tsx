import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { courseCategoryLabels, courseStatusLabels } from "@/data/admin-labels";
import { courses as fallbackCourses } from "@/data/courses";
import { getPublicCourseBySlug } from "@/lib/public-courses";

type CourseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function displayText(value: string | number | Date | null | undefined, fallback = "상담 후 안내") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (value instanceof Date) {
    return value.toLocaleDateString("ko-KR");
  }

  return String(value);
}

export function generateStaticParams() {
  return fallbackCourses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await getPublicCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const curriculum = course.curriculum.length ? course.curriculum : ["상담 후 상세 안내"];

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <Link href="/courses" className="text-sm font-bold text-primary">교육과정 목록</Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-bold text-primary">
              {courseCategoryLabels[course.category]}
            </span>
            <span className="rounded-md bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
              {courseStatusLabels[course.status]}
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-black text-slate-950">{course.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{course.summary}</p>
          <Link
            href={`/inquiry?course=${course.slug}`}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-bold text-white"
          >
            이 과정 문의하기
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-black">핵심 정보</h2>
          <dl className="mt-5 space-y-4 text-sm">
            {[
              ["개강일", displayText(course.startDate, "상담 후 안내")],
              ["교육 기간", displayText(course.duration)],
              ["교육 시간", displayText(course.schedule)],
              ["모집 인원", displayText(course.capacity)],
              ["수강료", course.price === null ? "상담 후 안내" : `${course.price.toLocaleString("ko-KR")}원`],
              ["내일배움카드", course.supportsTrainingCard ? "적용 과정" : "일반 과정"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                <dt className="font-bold text-slate-500">{label}</dt>
                <dd className="text-right font-bold text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="space-y-6">
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black">과정 소개</h2>
            <p className="mt-4 leading-8 text-slate-600">{course.description}</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black">교육 대상</h2>
            <p className="mt-4 leading-8 text-slate-600">{course.target ?? "상담 후 상세 안내"}</p>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black">커리큘럼</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {curriculum.map((item) => (
                <li key={item} className="rounded-md bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black">수료 후 기대 효과</h2>
            <p className="mt-4 leading-8 text-slate-600">{course.outcome ?? "상담 후 상세 안내"}</p>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
