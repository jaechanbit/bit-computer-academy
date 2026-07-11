import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-sm font-black text-accent">학원소개</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">비트컴퓨터학원</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          전북특별자치도 남원에서 컴퓨터 기초, 사무 실무, 자격증, 그래픽 교육을 안내하는
          지역 밀착형 컴퓨터 교육기관입니다.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["기초부터 실무까지", "처음 배우는 수강생도 따라올 수 있도록 기본 개념부터 실습 중심으로 안내합니다."],
            ["자격증 취득 대비", "ITQ, 컴퓨터활용능력, 워드프로세서 등 자격 시험 흐름에 맞춘 학습을 제공합니다."],
            ["국민내일배움카드 과정", "카드 적용 가능 과정은 상담을 통해 수강 조건과 절차를 안내합니다."],
            ["편한 상담 접수", "온라인 문의는 단순 상담 문의로 접수되며 확인 후 연락드립니다."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-primary-dark p-7 text-white">
          <h2 className="text-2xl font-black">어떤 과정을 들어야 할지 고민된다면</h2>
          <p className="mt-3 text-blue-100">관심 과정과 현재 수준을 남겨주시면 확인 후 상담 안내를 드립니다.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/courses" className="inline-flex h-11 items-center justify-center rounded-md bg-white px-5 font-bold text-primary-dark">
              교육과정 보기
            </Link>
            <Link href="/inquiry" className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 px-5 font-bold text-white">
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
