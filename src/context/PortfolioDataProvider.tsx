import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { loadPortfolioContent } from "../services/portfolioService";
import {
  initialPortfolioDataState,
  PortfolioDataContext,
  type PortfolioDataState,
} from "./PortfolioDataContext";

interface PortfolioDataProviderProps {
  children: ReactNode;
}

export function PortfolioDataProvider({
  children,
}: PortfolioDataProviderProps) {
  const [state, setState] = useState<PortfolioDataState>({
    ...initialPortfolioDataState,
    isLoading: isSupabaseConfigured,
  });

  useEffect(() => {
    let isMounted = true;

    loadPortfolioContent().then((result) => {
      if (!isMounted) {
        return;
      }

      setState({
        content: result.content,
        source: result.source,
        isLoading: false,
        error: result.error,
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PortfolioDataContext.Provider value={state}>
      {children}
    </PortfolioDataContext.Provider>
  );
}
