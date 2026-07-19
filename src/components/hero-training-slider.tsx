"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PublicCourse } from "@/lib/public-courses";

type HeroTrainingSliderProps = {
  courses: PublicCourse[];
};

type HeroSlide = {
  eyebrow: string;
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  meta?: string;
};

const introSlide: HeroSlide = {
  eyebrow: "비트컴퓨터학원 · 남원 IT 교육",
  title: "자격증부터 실무까지, 필요한 컴퓨터 교육을 한곳에서 안내합니다.",
  body: "ITQ, 컴퓨터활용능력, 워드프로세서, 엑셀실무, 포토샵, 일러스트 과정과 국비교육과정을 확인하고 간단한 상담 문의를 남겨보세요.",
  primaryHref: "/courses",
  primaryLabel: "교육과정 보기",
  secondaryHref: "/inquiry",
  secondaryLabel: "상담 문의하기",
};

function displayText(value: string | number | null | undefined, fallback = "상담 후 안내") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
}

export function HeroTrainingSlider({ courses }: HeroTrainingSliderProps) {
  const slides = useMemo<HeroSlide[]>(() => {
    const trainingSlides = courses.map((course) => ({
      eyebrow: "국비교육과정 · 국민내일배움카드",
      title: course.title,
      body: course.summary,
      primaryHref: `/courses/${course.slug}`,
      primaryLabel: "과정 자세히 보기",
      secondaryHref: `/inquiry?course=${course.slug}`,
      secondaryLabel: "상담 문의하기",
      meta: `기간 ${displayText(course.duration)} · 시간 ${displayText(course.schedule)}`,
    }));

    return [introSlide, ...trainingSlides];
  }, [courses]);
  const loopSlides = [...slides, slides[0]];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIsTransitioning(true);
      setActiveIndex((current) => {
        if (current >= slides.length) {
          return 1;
        }

        return current + 1;
      });
    }, 5200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (activeIndex !== slides.length) {
      return;
    }

    const resetTimer = window.setTimeout(() => {
      setIsTransitioning(false);
      setActiveIndex(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsTransitioning(true));
      });
    }, 760);

    return () => window.clearTimeout(resetTimer);
  }, [activeIndex, slides.length]);

  const visibleIndex = activeIndex % slides.length;
  const safeActiveIndex = Math.min(activeIndex, slides.length);

  return (
    <div className="overflow-hidden" aria-roledescription="carousel" aria-label="비트컴퓨터학원 주요 교육과정">
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
        style={{ transform: `translateX(-${safeActiveIndex * 100}%)` }}
      >
        {loopSlides.map((slide, index) => (
          <div key={`${slide.title}-${index}`} className="min-w-full">
            <p className="text-sm font-black text-teal-300">{slide.eyebrow}</p>
            <h1 className="mt-5 max-w-[1120px] text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-5xl text-lg leading-8 text-slate-200">{slide.body}</p>
            {slide.meta ? <p className="mt-3 text-sm font-bold text-teal-200">{slide.meta}</p> : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md bg-teal-300 px-6 font-black text-slate-950"
                href={slide.primaryHref}
              >
                {slide.primaryLabel}
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/25 px-6 font-black text-white"
                href={slide.secondaryHref}
              >
                {slide.secondaryLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-9 flex gap-2" aria-label="히어로 슬라이드 위치">
        {slides.map((slide, index) => (
          <span
            key={slide.title}
            className={`h-1.5 rounded-full transition-all ${
              visibleIndex === index ? "w-10 bg-teal-300" : "w-3 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
