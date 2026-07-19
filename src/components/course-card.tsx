import Link from "next/link";
import { courseCategoryLabels, courseStatusLabels } from "@/data/admin-labels";
import { PublicCourse } from "@/lib/public-courses";

const thumbnailStyles = [
  {
    bg: "from-slate-950 via-blue-950 to-cyan-500",
    glow: "bg-cyan-300/30",
    chip: "bg-cyan-300 text-slate-950",
  },
  {
    bg: "from-slate-950 via-indigo-950 to-violet-500",
    glow: "bg-violet-300/30",
    chip: "bg-violet-300 text-slate-950",
  },
  {
    bg: "from-slate-950 via-emerald-950 to-teal-400",
    glow: "bg-emerald-300/30",
    chip: "bg-emerald-300 text-slate-950",
  },
  {
    bg: "from-slate-950 via-rose-950 to-orange-400",
    glow: "bg-orange-300/30",
    chip: "bg-orange-300 text-slate-950",
  },
];

function displayText(value: string | number | null | undefined, fallback = "상담 후 안내") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
}

function getThumbnailStyle(slug: string) {
  const index = slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0) % thumbnailStyles.length;
  return thumbnailStyles[index];
}

function CourseThumbnail({ course }: { course: PublicCourse }) {
  const style = getThumbnailStyle(course.slug);
  const categoryLabel = course.category === "TRAINING_CARD" ? "국비" : "일반";

  return (
    <div className={`relative aspect-[16/9] overflow-hidden rounded-md bg-gradient-to-br ${style.bg} p-5 text-white`}>
      <div className={`absolute -right-8 -top-8 size-28 rounded-full blur-2xl ${style.glow}`} />
      <div className="absolute bottom-4 right-4 grid size-20 place-items-center rounded-md border border-white/15 bg-white/10 text-3xl font-black backdrop-blur">
        {course.title.slice(0, 2)}
      </div>
      <div className="relative z-10 flex h-full flex-col justify-between">
        <span className={`w-fit rounded-md px-2.5 py-1 text-xs font-black ${style.chip}`}>{categoryLabel}</span>
        <div>
          <p className="text-xs font-bold text-white/70">BIT COMPUTER ACADEMY</p>
          <p className="mt-2 max-w-[72%] text-2xl font-black leading-tight">{course.title}</p>
        </div>
      </div>
    </div>
  );
}

export function CourseCard({ course }: { course: PublicCourse }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-200/70">
      <CourseThumbnail course={course} />
      <div className="flex flex-1 flex-col p-5">
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
      </div>
    </article>
  );
}
