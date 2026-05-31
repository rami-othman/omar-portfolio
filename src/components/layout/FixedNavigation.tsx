import type { NavigationId } from "./useActiveNavigation";
import { useActiveNavigation } from "./useActiveNavigation";

const navigation = [
  { id: "cover", label: "Cover", href: "#cover" },
  { id: "contents", label: "Contents", href: "#contents" },
  { id: "profile", label: "Profile", href: "#profile" },
  { id: "cv", label: "CV", href: "#cv" },
  { id: "works", label: "Works", href: "#works" },
  { id: "projects", label: "Projects", href: "#project-courtyard-house" },
  { id: "contact", label: "Contact", href: "#contact" },
] satisfies Array<{
  id: NavigationId;
  label: string;
  href: string;
}>;

export function FixedNavigation() {
  const activeId = useActiveNavigation();

  return (
    <nav
      aria-label="Portfolio navigation"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <p className="mb-5 font-mono text-[0.52rem] uppercase tracking-editorial text-graphite">
        Index
      </p>
      <ul className="space-y-3 border-l border-ink/20 pl-4">
        {navigation.map((item, index) => (
          <li key={item.href}>
            <a
              aria-current={activeId === item.id ? "page" : undefined}
              className={`group relative flex items-center gap-3 text-[0.58rem] uppercase tracking-editorial transition-colors hover:text-ink focus-visible:text-ink ${
                activeId === item.id ? "text-ink" : "text-graphite"
              }`}
              href={item.href}
            >
              <span
                className={`absolute -left-4 h-px bg-ink transition-all duration-300 ${
                  activeId === item.id ? "w-5" : "w-0"
                }`}
                aria-hidden="true"
              />
              <span
                className={`font-mono transition-colors group-hover:text-ink ${
                  activeId === item.id ? "text-ink" : "text-ink/45"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
