import type { ReactNode } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminLanguage } from "../../admin/i18n/AdminLanguageContext";
import { signOut } from "../../services/authService";
import { useAdminAuth } from "../../context/AdminAuthContext";

interface AdminShellProps {
  children?: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const navigate = useNavigate();
  const { dir, language, setLanguage, t } = useAdminLanguage();
  const { session } = useAdminAuth();
  const navItems = [
    { label: t("projects"), to: "/admin/projects" },
    { label: t("addProject"), to: "/admin/projects/new" },
    { label: t("settings"), to: "/admin/settings" },
    { label: t("publicSite"), to: "/" },
  ];

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div dir={dir} className="min-h-screen bg-[#f7f7f6] text-[#101010]">
      <div className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[16rem_minmax(0,1fr)_auto] lg:items-center lg:px-8">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-black/45">
              {t("appKicker")}
            </p>
            <h1 className="mt-1 text-2xl font-semibold leading-tight">
              {t("appTitle")}
            </h1>
          </div>

          <nav aria-label="Admin navigation" className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-black/15 bg-white text-black/65 hover:border-black hover:text-black"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <div className="flex border border-black/15 bg-white">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${
                  language === "en"
                    ? "bg-black text-white"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {t("english")}
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ar")}
                className={`px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${
                  language === "ar"
                    ? "bg-black text-white"
                    : "text-black/60 hover:text-black"
                }`}
              >
                {t("arabic")}
              </button>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="border border-black/15 bg-white px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-black/65 transition hover:border-black hover:text-black"
            >
              {t("signOut")}
            </button>
          </div>

          {session?.user.email ? (
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/40 lg:col-span-3">
              {t("signedInAs")}: {session.user.email}
            </p>
          ) : null}
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}

export function AdminPanel({
  children,
  kicker,
  title,
}: AdminShellProps & {
  title: string;
  kicker?: string;
}) {
  return (
    <section className="border border-black/10 bg-white p-5 sm:p-7">
      <div className="border-b border-black/10 pb-5">
        {kicker ? (
          <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-black/45">
            {kicker}
          </p>
        ) : null}
        <h2 className="mt-2 text-3xl font-semibold leading-tight">{title}</h2>
      </div>
      <div className="pt-6">{children}</div>
    </section>
  );
}
