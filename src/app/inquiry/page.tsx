import { PageShell } from "@/components/page-shell";
import { getPublicCourses } from "@/lib/public-courses";
import { InquiryForm } from "./inquiry-form";

type InquiryPageProps = {
  searchParams: Promise<{ course?: string }>;
};

export default async function InquiryPage({ searchParams }: InquiryPageProps) {
  const params = await searchParams;
  const courses = await getPublicCourses();

  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-black text-accent">상담 문의</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">궁금한 과정을 남겨주세요.</h1>
          <p className="mt-5 leading-8 text-slate-600">
            온라인 신청은 정식 수강 신청이 아니라 단순 상담 문의로 접수됩니다.
            확인 후 대표전화 또는 입력하신 연락처로 안내드립니다.
          </p>
          <div className="mt-8 rounded-lg bg-white p-5 text-sm leading-7 text-slate-600">
            <p className="font-black text-slate-950">전화 상담</p>
            <p className="mt-2">063-626-9060</p>
            <p className="mt-4">카카오톡 상담은 추후 채널 연결 후 제공 예정입니다.</p>
          </div>
        </div>

        <InquiryForm courses={courses} selectedCourse={params.course} />
      </section>
    </PageShell>
  );
}
