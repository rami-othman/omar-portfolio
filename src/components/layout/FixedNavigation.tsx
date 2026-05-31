const navigation = [
  { label: "Cover", href: "#cover" },
  { label: "Contents", href: "#contents" },
  { label: "Profile", href: "#profile" },
  { label: "CV", href: "#cv" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export function FixedNavigation() {
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
              className="group flex items-center gap-3 text-[0.58rem] uppercase tracking-editorial text-graphite transition-colors hover:text-ink focus-visible:text-ink"
              href={item.href}
            >
              <span className="font-mono text-ink/45 transition-colors group-hover:text-ink">
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
