import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminLanguage } from "../../admin/i18n/AdminLanguageContext";
import { useAdminAuth } from "../../context/AdminAuthContext";

interface GuardProps {
  children: ReactNode;
}

export function AdminProtectedRoute({ children }: GuardProps) {
  const location = useLocation();
  const { t } = useAdminLanguage();
  const { error, isAdmin, isLoading, session, setupError } = useAdminAuth();

  if (setupError) {
    return <AdminMessage title={t("setupRequired")} body={setupError} />;
  }

  if (isLoading) {
    return (
      <AdminMessage
        title={t("checkingAccess")}
        body={t("checkingAccessBody")}
      />
    );
  }

  if (!session) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!isAdmin) {
    return (
      <AdminMessage
        title={t("notAuthorized")}
        body={error || t("notAuthorizedBody")}
      />
    );
  }

  return children;
}

export function AdminMessage({
  body,
  title,
}: {
  body: string;
  title: string;
}) {
  const { dir, t } = useAdminLanguage();

  return (
    <main
      dir={dir}
      className="min-h-screen bg-[#f7f7f6] px-4 py-16 text-[#101010]"
    >
      <section className="mx-auto max-w-xl border border-black/10 bg-white p-6 sm:p-8">
        <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-black/45">
          {t("appTitle")}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-black/60">{body}</p>
      </section>
    </main>
  );
}
