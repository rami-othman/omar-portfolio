import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { getCurrentSession, onAuthStateChange } from "../services/authService";
import { getAdminStatus } from "../services/adminService";
import { AdminAuthContext } from "./AdminAuthContext";

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string>();

  const setupError = isSupabaseConfigured
    ? undefined
    : "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before using admin.";

  const checkAdmin = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession);

    if (!nextSession) {
      setIsAdmin(false);
      return;
    }

    const nextIsAdmin = await getAdminStatus(nextSession);
    setIsAdmin(nextIsAdmin);
  }, []);

  const refreshAdminStatus = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      setError(undefined);
      return;
    }

    try {
      setError(undefined);
      setIsLoading(true);
      await checkAdmin(await getCurrentSession());
    } catch (caughtError) {
      setIsAdmin(false);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not verify admin access.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [checkAdmin]);

  useEffect(() => {
    void refreshAdminStatus();

    if (!isSupabaseConfigured) {
      return undefined;
    }

    return onAuthStateChange((_event, nextSession) => {
      setIsLoading(true);
      checkAdmin(nextSession)
        .catch((caughtError) => {
          setIsAdmin(false);
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Could not verify admin access.",
          );
        })
        .finally(() => setIsLoading(false));
    });
  }, [checkAdmin, refreshAdminStatus]);

  return (
    <AdminAuthContext.Provider
      value={{
        session,
        isAdmin,
        isLoading,
        error,
        setupError,
        refreshAdminStatus,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
