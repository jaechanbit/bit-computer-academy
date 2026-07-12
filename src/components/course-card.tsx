import Link from "next/link";
import { courseCategoryLabels, courseStatusLabels } from "@/data/admin-labels";
import { PublicCourse } from "@/lib/public-courses";

function displayText(value: string | number | null | undefined, fallback = "상담 후 안내") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
}

export function CourseCard({ course }: { course: PublicCourse }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-slate-200 bg-white p-5 transition hover:border-slate-400">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
          {courseCategoryLabels[course.category]}
        </span>
        <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
          {courseStatusLabels[course.status]}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-black text-slate-950">{course.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{course.summary}</p>
      <div className="mt-5 grid gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <p>기간: {displayText(course.duration)}</p>
        <p>시간: {displayText(course.schedule)}</p>
      </div>
      <div className="mt-5 flex gap-2">
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white"
        >
          자세히 보기
        </Link>
        <Link
          href={`/inquiry?course=${course.slug}`}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-900"
        >
          문의하기
        </Link>
      </div>
    </article>
  );
}
