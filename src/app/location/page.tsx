import Link from "next/link";
import { PageShell } from "@/components/page-shell";

const academyName = "비트컴퓨터학원";
const address = "전북특별자치도 남원시 의총로 81-10";
const mapQuery = `${address} ${academyName}`;
const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(mapQuery)}`;
const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(mapQuery)}`;
const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=ko&z=16&output=embed`;

export default function LocationPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-sm font-black text-accent">오시는 길</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">비트컴퓨터학원 위치 안내</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          방문 전 위치를 확인하고, 필요하시면 전화로 상담 가능 시간을 먼저 문의해주세요.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-md border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black">학원 정보</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <p>
                <span className="font-bold text-slate-950">주소</span>
                <br />
                {address}
              </p>
              <p>
                <span className="font-bold text-slate-950">대표전화</span>
                <br />
                063-626-9060
              </p>
              <p>
                <span className="font-bold text-slate-950">상담 방식</span>
                <br />
                전화 상담 우선, 카카오톡 상담은 추후 연결 예정입니다.
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              <a className="inline-flex h-11 items-center justify-center rounded-md bg-primary font-bold text-white" href="tel:063-626-9060">
                전화하기
              </a>
              <a className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 font-bold text-slate-900" href={naverMapUrl} target="_blank" rel="noreferrer">
                네이버 지도에서 보기
              </a>
              <a className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 font-bold text-slate-900" href={kakaoMapUrl} target="_blank" rel="noreferrer">
                카카오맵에서 보기
              </a>
              <a className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 font-bold text-slate-900" href={googleMapUrl} target="_blank" rel="noreferrer">
                구글 지도에서 보기
              </a>
              <Link className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 font-bold text-slate-900" href="/inquiry">
                상담 문의
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
            <iframe
              title="비트컴퓨터학원 지도"
              src={googleMapEmbedUrl}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
