import { Link } from "react-router-dom";
import { BrandImage } from "../ui/BrandImage";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/12 bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          aria-label="Omar architecture portfolio home"
        >
          <BrandImage
            sources={["/brand/logo_deflated.png", "/brand/omar-logo.png"]}
            alt="Omar architecture mark"
            fallback="Omar"
            className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
          />
          <span className="hidden min-w-0 sm:block">
            <span className="block font-display text-2xl font-semibold leading-none tracking-normal text-ink">
              Omar
            </span>
            <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-editorial text-ink/52">
              Architecture Engineer
            </span>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-3 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink sm:text-[0.64rem] sm:tracking-editorial"
                  to={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
