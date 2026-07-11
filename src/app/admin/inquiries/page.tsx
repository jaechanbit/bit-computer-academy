import Link from "next/link";
import { InquiryStatus } from "@prisma/client";
import { AdminShell } from "@/components/admin-shell";
import { inquiryStatusLabels } from "@/data/admin-labels";
import { requireAdminSession } from "@/lib/auth";
import { getPrisma } from "@/lib/db";

type AdminInquiriesPageProps = {
  searchParams: Promise<{
    status?: InquiryStatus;
    error?: string;
  }>;
};

type InquiryListItem = {
  id: string;
  name: string;
  phone: string;
  status: InquiryStatus;
  createdAt: Date;
  course: {
    title: string;
  } | null;
};

async function getInquiries(status?: InquiryStatus) {
  const prisma = getPrisma();

  return prisma.inquiry.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      course: {
        select: {
          title: true,
        },
      },
    },
    take: 100,
  });
}

export default async function AdminInquiriesPage({ searchParams }: AdminInquiriesPageProps) {
  const session = await requireAdminSession();
  const params = await searchParams;
  const selectedStatus = params.status;
  let inquiries: InquiryListItem[] = [];
  let dbUnavailable = false;

  try {
    inquiries = await getInquiries(selectedStatus);
  } catch (error) {
    console.error(error);
    dbUnavailable = true;
  }

  return (
    <AdminShell session={session}>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black text-primary">문의 관리</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">상담 문의 목록</h2>
          <p className="mt-3 text-sm text-slate-600">최근 접수된 문의를 확인하고 처리 상태를 관리합니다.</p>
        </div>
        <form className="flex gap-2">
          <select
            className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm"
            name="status"
            defaultValue={selectedStatus ?? ""}
          >
            <option value="">전체 상태</option>
            {Object.entries(inquiryStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button className="h-11 rounded-md bg-slate-950 px-4 text-sm font-bold text-white" type="submit">
            필터
          </button>
        </form>
      </div>

      {dbUnavailable ? (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-black text-amber-950">데이터베이스 연결이 필요합니다</h2>
          <p className="mt-3 leading-7 text-amber-800">
            문의 목록을 보려면 PostgreSQL 연결 후 `.env`의 `DATABASE_URL`을 설정하고
            `npm run db:push`, `npm run db:seed`를 실행해주세요.
          </p>
        </div>
      ) : (
        <>
          {params.error ? (
            <div className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              요청을 처리하지 못했습니다. 다시 시도해주세요.
            </div>
          ) : null}

          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3">접수일</th>
                    <th className="px-4 py-3">이름</th>
                    <th className="px-4 py-3">연락처</th>
                    <th className="px-4 py-3">관심 과정</th>
                    <th className="px-4 py-3">상태</th>
                    <th className="px-4 py-3">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td className="px-4 py-3 text-slate-600">
                        {inquiry.createdAt.toLocaleDateString("ko-KR")}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-950">{inquiry.name}</td>
                      <td className="px-4 py-3 text-slate-600">{inquiry.phone}</td>
                      <td className="px-4 py-3 text-slate-600">{inquiry.course?.title ?? "선택 안 함"}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-primary">
                          {inquiryStatusLabels[inquiry.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link className="font-bold text-primary" href={`/admin/inquiries/${inquiry.id}`}>
                          상세
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {inquiries.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-slate-500">접수된 문의가 없습니다.</div>
            ) : null}
          </div>
        </>
      )}
    </AdminShell>
  );
}
