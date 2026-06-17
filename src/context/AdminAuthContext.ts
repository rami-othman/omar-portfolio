import type { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export interface AdminAuthState {
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  error?: string;
  setupError?: string;
  refreshAdminStatus: () => Promise<void>;
}

export const AdminAuthContext = createContext<AdminAuthState>({
  session: null,
  isAdmin: false,
  isLoading: true,
  refreshAdminStatus: async () => undefined,
});

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
