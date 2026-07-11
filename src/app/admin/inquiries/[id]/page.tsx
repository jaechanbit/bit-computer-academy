import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryStatus, TrainingCardOwnership } from "@prisma/client";
import { AdminShell } from "@/components/admin-shell";
import { inquiryStatusLabels, trainingCardOwnershipLabels } from "@/data/admin-labels";
import { requireAdminSession } from "@/lib/auth";
import { getPrisma } from "@/lib/db";
import { updateInquiryAction } from "../actions";

type InquiryDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

type InquiryDetail = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  trainingCardOwnership: TrainingCardOwnership | null;
  preferredContactTime: string | null;
  message: string;
  status: InquiryStatus;
  adminMemo: string | null;
  createdAt: Date;
  course: {
    title: string;
    slug: string;
  } | null;
  logs: {
    id: string;
    previousStatus: InquiryStatus | null;
    nextStatus: InquiryStatus;
    memo: string | null;
    createdAt: Date;
    admin: {
      name: string;
    } | null;
  }[];
};

async function getInquiry(id: string) {
  const prisma = getPrisma();

  return prisma.inquiry.findUnique({
    where: { id },
    include: {
      course: {
        select: {
          title: true,
          slug: true,
        },
      },
      logs: {
        orderBy: { createdAt: "desc" },
        include: {
          admin: {
            select: { name: true },
          },
        },
      },
    },
  });
}

export default async function InquiryDetailPage({ params, searchParams }: InquiryDetailPageProps) {
  const session = await requireAdminSession();
  const { id } = await params;
  const query = await searchParams;
  let inquiry: InquiryDetail | null = null;
  let dbUnavailable = false;

  try {
    inquiry = await getInquiry(id);
  } catch (error) {
    console.error(error);
    dbUnavailable = true;
  }

  if (!dbUnavailable && !inquiry) {
    notFound();
  }

  return (
    <AdminShell session={session}>
      {dbUnavailable || !inquiry ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-black text-amber-950">데이터베이스 연결이 필요합니다</h2>
          <p className="mt-3 leading-7 text-amber-800">
            문의 상세를 보려면 PostgreSQL 연결 후 `.env`의 `DATABASE_URL`을 설정해주세요.
          </p>
        </div>
      ) : (
        <>
          <Link href="/admin/inquiries" className="text-sm font-bold text-primary">
            문의 목록
          </Link>

          {query.saved ? (
            <div className="mt-5 rounded-md bg-teal-50 px-4 py-3 text-sm font-bold text-teal-700">
              문의 처리 내용이 저장되었습니다.
            </div>
          ) : null}

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <section className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black text-slate-950">문의자 정보</h2>
              <dl className="mt-5 space-y-4 text-sm">
                {[
                  ["접수일", inquiry.createdAt.toLocaleString("ko-KR")],
                  ["이름", inquiry.name],
                  ["연락처", inquiry.phone],
                  ["이메일", inquiry.email ?? "입력 안 함"],
                  ["관심 과정", inquiry.course?.title ?? "선택 안 함"],
                  [
                    "내일배움카드",
                    inquiry.trainingCardOwnership
                      ? trainingCardOwnershipLabels[inquiry.trainingCardOwnership]
                      : "선택 안 함",
                  ],
                  ["희망 상담 시간", inquiry.preferredContactTime ?? "입력 안 함"],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-slate-100 pb-3">
                    <dt className="font-bold text-slate-500">{label}</dt>
                    <dd className="mt-1 font-bold text-slate-950">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black text-slate-950">문의 내용</h2>
              <p className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 leading-7 text-slate-700">
                {inquiry.message}
              </p>

              <form action={updateInquiryAction} className="mt-6 space-y-4">
                <input name="inquiryId" type="hidden" value={inquiry.id} />
                <label className="grid gap-2 text-sm font-bold">
                  처리 상태
                  <select
                    className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-primary"
                    name="status"
                    defaultValue={inquiry.status}
                  >
                    {Object.entries(inquiryStatusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-bold">
                  관리자 메모
                  <textarea
                    className="min-h-32 rounded-md border border-slate-300 p-3 font-normal outline-none focus:border-primary"
                    name="adminMemo"
                    defaultValue={inquiry.adminMemo ?? ""}
                  />
                </label>

                <button className="h-11 rounded-md bg-primary px-5 font-bold text-white" type="submit">
                  저장
                </button>
              </form>
            </section>
          </div>

          <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-950">처리 이력</h2>
            <div className="mt-4 space-y-3">
              {inquiry.logs.length ? (
                inquiry.logs.map((log) => (
                  <div key={log.id} className="rounded-md bg-slate-50 p-4 text-sm">
                    <p className="font-bold text-slate-950">
                      {log.previousStatus ? inquiryStatusLabels[log.previousStatus] : "없음"} →{" "}
                      {inquiryStatusLabels[log.nextStatus]}
                    </p>
                    <p className="mt-1 text-slate-600">
                      {log.admin?.name ?? "관리자"} · {log.createdAt.toLocaleString("ko-KR")}
                    </p>
                    {log.memo ? <p className="mt-2 whitespace-pre-wrap text-slate-600">{log.memo}</p> : null}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">아직 처리 이력이 없습니다.</p>
              )}
            </div>
          </section>
        </>
      )}
    </AdminShell>
  );
}
