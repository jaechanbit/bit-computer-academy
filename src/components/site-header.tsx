import Link from "next/link";

const navItems = [
  { href: "/about", label: "학원소개" },
  { href: "/courses", label: "교육과정" },
  { href: "/inquiry", label: "문의/신청" },
  { href: "/location", label: "오시는 길" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-sm font-black text-white">
            B
          </span>
          <span className="text-lg font-black text-primary-dark">비트컴퓨터학원</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          className="hidden rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white md:inline-flex"
          href="tel:063-626-9060"
        >
          063-626-9060
        </a>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 text-sm font-bold text-slate-700 md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-md px-3 py-2 hover:bg-slate-100">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
