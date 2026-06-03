import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteFrame } from "../components/layout/SiteFrame";
import { Header } from "../components/sections/Header";
import { PortfolioSections } from "../components/sections/PortfolioSections";
import { ProjectDetailPage } from "../pages/ProjectDetailPage";

export function App() {
  return (
    <BrowserRouter>
      <SiteFrame>
        <ScrollManager />
        <Header />
        <Routes>
          <Route path="/" element={<PortfolioSections />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteFrame>
    </BrowserRouter>
  );
}

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView();
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname, location.hash]);

  return null;
}
