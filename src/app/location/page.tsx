import Link from "next/link";
import { PageShell } from "@/components/page-shell";

const address = "전북특별자치도 남원시 의총로 81-10";
const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(address)}`;
const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;

export default function LocationPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-sm font-black text-accent">오시는 길</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">비트컴퓨터학원 위치 안내</h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black">학원 정보</h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <p><span className="font-bold text-slate-950">주소</span><br />{address}</p>
              <p><span className="font-bold text-slate-950">대표전화</span><br />063-626-9060</p>
              <p><span className="font-bold text-slate-950">상담 방식</span><br />전화 상담 우선, 카카오톡 상담 추후 연결</p>
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
              <Link className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 font-bold text-slate-900" href="/inquiry">
                상담 문의
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="flex aspect-[4/3] items-center justify-center bg-slate-100 p-6 text-center">
              <div>
                <p className="text-lg font-black text-slate-950">지도 연결 준비 완료</p>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                  현재는 지도 검색 링크로 연결됩니다. 추후 네이버 지도 또는 카카오맵 API 키를 발급하면
                  이 영역에 지도를 직접 임베드할 수 있습니다.
                </p>
                <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                  <a className="inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white" href={naverMapUrl} target="_blank" rel="noreferrer">
                    네이버 지도
                  </a>
                  <a className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-bold text-white" href={kakaoMapUrl} target="_blank" rel="noreferrer">
                    카카오맵
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
