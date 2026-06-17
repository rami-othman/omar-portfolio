import { createContext, useContext } from "react";
import { fallbackPortfolioContent } from "../data/portfolioData";
import type {
  PortfolioContent,
  PortfolioDataSource,
} from "../types/portfolio";

export interface PortfolioDataState {
  content: PortfolioContent;
  source: PortfolioDataSource;
  isLoading: boolean;
  error?: string;
}

export const initialPortfolioDataState: PortfolioDataState = {
  content: fallbackPortfolioContent,
  source: "fallback",
  isLoading: false,
};

export const PortfolioDataContext = createContext<PortfolioDataState>(
  initialPortfolioDataState,
);

export function usePortfolioData() {
  return useContext(PortfolioDataContext);
}
