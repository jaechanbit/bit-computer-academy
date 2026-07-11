import { CourseCategory, CourseStatus } from "@prisma/client";
import { courseCategoryLabels, courseStatusLabels } from "@/data/admin-labels";
import { saveCourseAction } from "./actions";

type CourseFormValue = {
  id?: string;
  title?: string;
  slug?: string;
  category?: CourseCategory;
  summary?: string;
  description?: string;
  target?: string | null;
  curriculum?: string | null;
  outcome?: string | null;
  startDate?: Date | null;
  duration?: string | null;
  schedule?: string | null;
  capacity?: number | null;
  price?: number | null;
  supportsTrainingCard?: boolean;
  status?: CourseStatus;
  isPublished?: boolean;
  displayOrder?: number;
};

function formatDateInput(date?: Date | null) {
  if (!date) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

export function CourseForm({ course }: { course?: CourseFormValue }) {
  return (
    <form action={saveCourseAction} className="space-y-5 rounded-lg border border-slate-200 bg-white p-6">
      <input name="id" type="hidden" value={course?.id ?? ""} />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          과정명 *
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="title"
            required
            defaultValue={course?.title ?? ""}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          URL 슬러그 *
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="slug"
            required
            placeholder="example-course"
            defaultValue={course?.slug ?? ""}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          과정 분류 *
          <select
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="category"
            defaultValue={course?.category ?? "GENERAL"}
          >
            {Object.entries(courseCategoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          모집 상태 *
          <select
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="status"
            defaultValue={course?.status ?? "RECRUITING"}
          >
            {Object.entries(courseStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold">
          개강일
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="startDate"
            type="date"
            defaultValue={formatDateInput(course?.startDate)}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          노출 순서
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="displayOrder"
            type="number"
            defaultValue={course?.displayOrder ?? 0}
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold">
        짧은 소개 *
        <input
          className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
          name="summary"
          required
          defaultValue={course?.summary ?? ""}
        />
      </label>

      <label className="grid gap-2 text-sm font-bold">
        상세 소개 *
        <textarea
          className="min-h-28 rounded-md border border-slate-300 p-3 font-normal outline-none focus:border-primary"
          name="description"
          required
          defaultValue={course?.description ?? ""}
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-bold">
          교육 기간
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="duration"
            defaultValue={course?.duration ?? ""}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          교육 시간
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="schedule"
            defaultValue={course?.schedule ?? ""}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          모집 인원
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="capacity"
            type="number"
            defaultValue={course?.capacity ?? ""}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          수강료
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="price"
            type="number"
            defaultValue={course?.price ?? ""}
          />
        </label>
        <div className="flex items-end gap-6">
          <label className="flex gap-2 text-sm font-bold">
            <input name="supportsTrainingCard" type="checkbox" defaultChecked={course?.supportsTrainingCard ?? false} />
            국민내일배움카드 적용
          </label>
          <label className="flex gap-2 text-sm font-bold">
            <input name="isPublished" type="checkbox" defaultChecked={course?.isPublished ?? true} />
            공개
          </label>
        </div>
      </div>

      <label className="grid gap-2 text-sm font-bold">
        교육 대상
        <textarea
          className="min-h-24 rounded-md border border-slate-300 p-3 font-normal outline-none focus:border-primary"
          name="target"
          defaultValue={course?.target ?? ""}
        />
      </label>

      <label className="grid gap-2 text-sm font-bold">
        커리큘럼
        <textarea
          className="min-h-28 rounded-md border border-slate-300 p-3 font-normal outline-none focus:border-primary"
          name="curriculum"
          placeholder="줄바꿈 또는 문장으로 입력"
          defaultValue={course?.curriculum ?? ""}
        />
      </label>

      <label className="grid gap-2 text-sm font-bold">
        수료 후 기대 효과
        <textarea
          className="min-h-24 rounded-md border border-slate-300 p-3 font-normal outline-none focus:border-primary"
          name="outcome"
          defaultValue={course?.outcome ?? ""}
        />
      </label>

      <button className="h-12 rounded-md bg-primary px-6 font-bold text-white" type="submit">
        저장
      </button>
    </form>
  );
}
