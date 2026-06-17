import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminLanguage } from "../../admin/i18n/AdminLanguageContext";
import {
  AdminButton,
  AdminInput,
  AdminNotice,
  AdminSelect,
} from "../../components/admin/AdminFormControls";
import { AdminPanel } from "../../components/admin/AdminShell";
import {
  deleteProject,
  listAdminProjects,
  toggleProjectPublished,
} from "../../services/adminService";
import type { SupabaseProjectRow } from "../../types/portfolio";

type StatusFilter = "all" | "published" | "draft";

export function AdminProjectsPage() {
  const { t } = useAdminLanguage();
  const [projects, setProjects] = useState<SupabaseProjectRow[]>([]);
  const [error, setError] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.slug.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && project.is_published) ||
        (statusFilter === "draft" && !project.is_published);

      return matchesQuery && matchesStatus;
    });
  }, [projects, query, statusFilter]);

  const loadProjects = useCallback(async () => {
    try {
      setError(undefined);
      setIsLoading(true);
      setProjects(await listAdminProjects());
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("loadProjectsError"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  async function handleDelete(project: SupabaseProjectRow) {
    const confirmed = window.confirm(
      `${t("deleteProjectConfirm")} "${project.title}"?\n${t("cannotUndo")}`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError(undefined);
      setNotice(undefined);
      await deleteProject(project.id);
      setProjects((items) => items.filter((item) => item.id !== project.id));
      setNotice(t("projectDeleted"));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("deleteProjectError"),
      );
    }
  }

  async function handleToggle(project: SupabaseProjectRow) {
    try {
      setError(undefined);
      setNotice(undefined);
      const updatedProject = await toggleProjectPublished(
        project.id,
        !project.is_published,
      );
      setProjects((items) =>
        items.map((item) => (item.id === project.id ? updatedProject : item)),
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("publishProjectError"),
      );
    }
  }

  return (
    <AdminPanel title={t("projectsTitle")} kicker={t("projectsKicker")}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-black/55">
          {t("projectsIntro")}
        </p>
        <AdminButton to="/admin/projects/new" variant="primary">
          {t("addProject")}
        </AdminButton>
      </div>

      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
      {notice ? <AdminNotice tone="success">{notice}</AdminNotice> : null}
      {isLoading ? <AdminNotice>{t("loadingProjects")}</AdminNotice> : null}

      <div className="mt-6 grid gap-4 border border-black/10 bg-[#f7f7f6] p-4 md:grid-cols-[minmax(0,1fr)_16rem]">
        <AdminInput
          label={t("searchProjects")}
          value={query}
          onChange={setQuery}
        />
        <AdminSelect
          label={t("status")}
          value={statusFilter}
          onChange={(value) => setStatusFilter(value as StatusFilter)}
          options={[
            { label: t("allStatuses"), value: "all" },
            { label: t("publishedOnly"), value: "published" },
            { label: t("unpublishedOnly"), value: "draft" },
          ]}
        />
      </div>

      <div className="mt-6 overflow-x-auto border border-black/10">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-[#f7f7f6] font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/45">
            <tr>
              <th className="border-b border-black/10 px-4 py-3">{t("thumbnail")}</th>
              <th className="border-b border-black/10 px-4 py-3">{t("title")}</th>
              <th className="border-b border-black/10 px-4 py-3">{t("slug")}</th>
              <th className="border-b border-black/10 px-4 py-3">{t("type")}</th>
              <th className="border-b border-black/10 px-4 py-3">{t("year")}</th>
              <th className="border-b border-black/10 px-4 py-3">{t("status")}</th>
              <th className="border-b border-black/10 px-4 py-3">{t("sortOrder")}</th>
              <th className="border-b border-black/10 px-4 py-3">{t("updated")}</th>
              <th className="border-b border-black/10 px-4 py-3">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id} className="border-b border-black/10 last:border-0">
                <td className="px-4 py-4">
                  <div className="h-16 w-20 overflow-hidden border border-black/10 bg-[#f7f7f6]">
                    {project.cover_image_url ? (
                      <img
                        src={project.cover_image_url}
                        alt={project.cover_image_alt ?? project.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-4 font-medium">{project.title}</td>
                <td className="px-4 py-4 font-mono text-xs text-black/55">
                  {project.slug}
                </td>
                <td className="px-4 py-4 text-black/65">{project.type}</td>
                <td className="px-4 py-4 text-black/65">{project.year}</td>
                <td className="px-4 py-4">
                  <span className="block font-medium">
                    {project.is_published ? t("published") : t("draft")}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-black/45">
                    {project.is_published ? t("visiblePublic") : t("hiddenPublic")}
                  </span>
                </td>
                <td className="px-4 py-4">{project.sort_order ?? 0}</td>
                <td className="px-4 py-4 text-black/55">
                  {formatDate(project.updated_at)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/admin/projects/${project.id}/edit`}
                      className="border border-black/15 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/65 transition hover:border-black hover:text-black"
                    >
                      {t("edit")}
                    </Link>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="border border-black/15 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/65 transition hover:border-black hover:text-black"
                    >
                      {t("view")}
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleToggle(project)}
                      className="border border-black/15 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/65 transition hover:border-black hover:text-black"
                    >
                      {project.is_published ? t("unpublish") : t("publish")}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(project)}
                      className="border border-black/15 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/65 transition hover:border-black hover:text-black"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && filteredProjects.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-black/55" colSpan={9}>
                  {t("noProjects")}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AdminPanel>
  );
}

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(value));
}
