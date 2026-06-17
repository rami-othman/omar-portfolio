import type { ReactNode } from "react";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AdminLanguageProvider } from "../admin/i18n/AdminLanguageProvider";
import { AdminProtectedRoute } from "../components/admin/AdminRouteGuards";
import { AdminShell } from "../components/admin/AdminShell";
import { SiteFrame } from "../components/layout/SiteFrame";
import { Header } from "../components/sections/Header";
import { PortfolioSections } from "../components/sections/PortfolioSections";
import { AdminAuthProvider } from "../context/AdminAuthProvider";
import { PortfolioDataProvider } from "../context/PortfolioDataProvider";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { AdminProjectFormPage } from "../pages/admin/AdminProjectFormPage";
import { AdminProjectsPage } from "../pages/admin/AdminProjectsPage";
import { AdminSettingsPage } from "../pages/admin/AdminSettingsPage";
import { ProjectDetailPage } from "../pages/ProjectDetailPage";

export function App() {
  return (
    <BrowserRouter>
      <AdminLanguageProvider>
        <AdminAuthProvider>
          <ScrollManager />
          <Routes>
            <Route
              path="/"
              element={
                <PublicShell>
                  <PortfolioSections />
                </PublicShell>
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <PublicShell>
                  <ProjectDetailPage />
                </PublicShell>
              }
            />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminShell />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/projects" replace />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="projects/new" element={<AdminProjectFormPage />} />
              <Route
                path="projects/:projectId/edit"
                element={<AdminProjectFormPage />}
              />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AdminAuthProvider>
      </AdminLanguageProvider>
    </BrowserRouter>
  );
}

function PublicShell({ children }: { children: ReactNode }) {
  return (
    <PortfolioDataProvider>
      <SiteFrame>
        <Header />
        {children}
      </SiteFrame>
    </PortfolioDataProvider>
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
