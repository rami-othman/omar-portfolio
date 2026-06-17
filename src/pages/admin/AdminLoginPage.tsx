import type { FormEvent } from "react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminLanguage } from "../../admin/i18n/AdminLanguageContext";
import {
  AdminButton,
  AdminInput,
  AdminNotice,
} from "../../components/admin/AdminFormControls";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { signInWithEmail } from "../../services/authService";

interface LocationState {
  from?: string;
}

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dir, language, setLanguage, t } = useAdminLanguage();
  const { isAdmin, isLoading, refreshAdminStatus, session, setupError } =
    useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && session && isAdmin) {
    return <Navigate to="/admin/projects" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setIsSubmitting(true);

    try {
      await signInWithEmail(email, password);
      await refreshAdminStatus();
      const state = location.state as LocationState | null;
      navigate(state?.from || "/admin/projects", { replace: true });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not sign in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      dir={dir}
      className="min-h-screen bg-[#f7f7f6] px-4 py-16 text-[#101010]"
    >
      <section className="mx-auto max-w-md border border-black/10 bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-black/45">
              {t("loginKicker")}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">
              {t("loginTitle")}
            </h1>
          </div>
          <div className="flex border border-black/15 bg-white">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${
                language === "en" ? "bg-black text-white" : "text-black/60"
              }`}
            >
              {t("english")}
            </button>
            <button
              type="button"
              onClick={() => setLanguage("ar")}
              className={`px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${
                language === "ar" ? "bg-black text-white" : "text-black/60"
              }`}
            >
              {t("arabic")}
            </button>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-black/55">
          {t("loginHelper")}
        </p>

        {setupError ? <AdminNotice tone="error">{setupError}</AdminNotice> : null}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <AdminInput
            label={t("email")}
            type="email"
            value={email}
            onChange={setEmail}
            required
          />
          <AdminInput
            label={t("password")}
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
          <AdminButton
            type="submit"
            variant="primary"
            disabled={isSubmitting || Boolean(setupError)}
          >
            {isSubmitting ? t("signingIn") : t("signIn")}
          </AdminButton>
        </form>
      </section>
    </main>
  );
}
