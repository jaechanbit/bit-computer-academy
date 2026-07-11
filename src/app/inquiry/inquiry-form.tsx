"use client";

import { useActionState } from "react";
import { createInquiryAction, InquiryFormState } from "./actions";
import { PublicCourse } from "@/lib/public-courses";

const initialState: InquiryFormState = {
  ok: false,
  message: "",
};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-xs font-bold text-red-600">{errors[0]}</p>;
}

export function InquiryForm({
  courses,
  selectedCourse,
}: {
  courses: PublicCourse[];
  selectedCourse?: string;
}) {
  const [state, formAction, isPending] = useActionState(createInquiryAction, initialState);

  return (
    <form action={formAction} className="rounded-lg border border-slate-200 bg-white p-6">
      {state.message ? (
        <div
          className={`mb-5 rounded-md px-4 py-3 text-sm font-bold ${
            state.ok ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          이름 *
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="name"
            required
          />
          <FieldError errors={state.fieldErrors?.name} />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          연락처 *
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="phone"
            required
          />
          <FieldError errors={state.fieldErrors?.phone} />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          이메일
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="email"
            type="email"
          />
          <FieldError errors={state.fieldErrors?.email} />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          관심 과정
          <select
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="course"
            defaultValue={selectedCourse ?? ""}
          >
            <option value="">선택 안 함</option>
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.title}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold">
          국민내일배움카드 보유 여부
          <select
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="trainingCard"
            defaultValue=""
          >
            <option value="">선택 안 함</option>
            <option value="YES">예</option>
            <option value="NO">아니오</option>
            <option value="UNKNOWN">잘 모르겠음</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold">
          희망 상담 시간
          <input
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
            name="preferredContactTime"
            placeholder="예: 평일 오후"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold">
        문의 내용 *
        <textarea
          className="min-h-36 rounded-md border border-slate-300 p-3 font-normal outline-none focus:border-primary"
          name="message"
          required
        />
        <FieldError errors={state.fieldErrors?.message} />
      </label>

      <label className="mt-4 flex gap-3 text-sm font-bold text-slate-700">
        <input className="mt-1" name="privacyAgreed" type="checkbox" required />
        개인정보 수집 및 이용에 동의합니다.
      </label>
      <FieldError errors={state.fieldErrors?.privacyAgreed} />

      <button
        className="mt-6 h-12 w-full rounded-md bg-primary font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "접수 중..." : "문의 접수"}
      </button>
    </form>
  );
}
