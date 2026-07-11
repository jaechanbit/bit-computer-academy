import { PageShell } from "@/components/page-shell";

const sections = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: "비트컴퓨터학원은 상담 문의 접수를 위해 이름, 연락처, 이메일, 관심 과정, 문의 내용, 국민내일배움카드 보유 여부, 희망 상담 시간을 수집할 수 있습니다.",
  },
  {
    title: "2. 개인정보 수집 및 이용 목적",
    body: "수집한 개인정보는 교육과정 상담, 문의 확인, 수강 안내, 후속 연락을 위해 사용합니다.",
  },
  {
    title: "3. 개인정보 보유 및 이용 기간",
    body: "상담 목적 달성 후 내부 관리 기준에 따라 보관하며, 관계 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관할 수 있습니다. 실제 운영 전 정확한 보관 기간을 확정해야 합니다.",
  },
  {
    title: "4. 개인정보 제3자 제공",
    body: "비트컴퓨터학원은 법령에 근거가 있거나 정보주체의 동의가 있는 경우를 제외하고 개인정보를 외부에 제공하지 않습니다.",
  },
  {
    title: "5. 개인정보 처리 위탁",
    body: "홈페이지 호스팅, 데이터베이스 운영, 문자 또는 알림 서비스 등 외부 서비스를 사용하는 경우 위탁 업체와 위탁 내용을 본 방침에 반영해야 합니다.",
  },
  {
    title: "6. 정보주체의 권리",
    body: "정보주체는 본인의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다. 요청은 대표전화 063-626-9060으로 접수할 수 있습니다.",
  },
  {
    title: "7. 개인정보 보호책임자",
    body: "개인정보 보호책임자는 실제 운영 전 학원 담당자로 확정해야 합니다. 확정 전까지 대표전화 063-626-9060을 문의 창구로 사용합니다.",
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-5 py-14">
        <p className="text-sm font-black text-accent">개인정보처리방침</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">개인정보처리방침</h1>
        <p className="mt-5 leading-8 text-slate-600">
          본 문서는 비트컴퓨터학원 홈페이지의 상담 문의 기능 운영을 위한 개인정보 처리 기준 초안입니다.
          실제 배포 전 운영자 정보, 보관 기간, 위탁 업체 정보를 확정해 보완해야 합니다.
        </p>

        <div className="mt-8 space-y-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-slate-950">{section.title}</h2>
              <p className="mt-3 leading-8 text-slate-600">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
