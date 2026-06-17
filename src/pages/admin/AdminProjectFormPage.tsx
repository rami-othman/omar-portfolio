import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdminLanguage } from "../../admin/i18n/AdminLanguageContext";
import {
  AdminButton,
  AdminFieldSection,
  AdminImagePreview,
  AdminInput,
  AdminNotice,
  AdminSelect,
  AdminTextarea,
  AdminToggle,
} from "../../components/admin/AdminFormControls";
import { AdminPanel } from "../../components/admin/AdminShell";
import { ProjectImageManager } from "../../components/admin/ProjectImageManager";
import {
  createProject,
  getAdminProjectById,
  updateProject,
} from "../../services/adminService";
import { uploadPortfolioImage } from "../../services/storageService";
import type {
  AdminProjectPayload,
  SupabaseProjectImageRow,
  SupabaseProjectRow,
} from "../../types/portfolio";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const maxImageSize = 8 * 1024 * 1024;
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

const emptyProjectForm = {
  slug: "",
  title: "",
  project_number: "",
  type: "",
  year: "",
  location: "",
  role: "",
  description: "",
  concept_statement: "",
  concept_keywords: "",
  design_process_steps: "",
  credits: "",
  notes: "",
  cover_image_url: "",
  cover_image_alt: "",
  cover_image_caption: "",
  cover_orientation: "landscape" as "landscape" | "portrait",
  sort_order: "0",
  is_published: true,
};

type ProjectForm = typeof emptyProjectForm;
type SubmitIntent = "save" | "view";

export function AdminProjectFormPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { t } = useAdminLanguage();
  const isEditing = Boolean(projectId);
  const [form, setForm] = useState<ProjectForm>(emptyProjectForm);
  const [project, setProject] = useState<SupabaseProjectRow | null>(null);
  const [images, setImages] = useState<SupabaseProjectImageRow[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [isCoverUploading, setIsCoverUploading] = useState(false);
  const [slugEdited, setSlugEdited] = useState(isEditing);
  const [submitIntent, setSubmitIntent] = useState<SubmitIntent>("save");

  const publishHelper = form.is_published ? t("visiblePublic") : t("hiddenPublic");
  const coverOrientationOptions = useMemo(
    () => [
      { label: t("landscape"), value: "landscape" },
      { label: t("portrait"), value: "portrait" },
    ],
    [t],
  );

  useEffect(() => {
    if (!projectId) {
      return;
    }

    const activeProjectId = projectId;

    async function loadProject() {
      try {
        setError(undefined);
        setIsLoading(true);
        const loadedProject = await getAdminProjectById(activeProjectId);

        if (!loadedProject) {
          setError(t("projectNotFound"));
          return;
        }

        setProject(loadedProject);
        setImages(loadedProject.project_images ?? []);
        setForm(fromProjectRow(loadedProject));
      } catch (caughtError) {
        setError(
          caughtError instanceof Error ? caughtError.message : t("loadingProject"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadProject();
  }, [projectId, t]);

  function updateTitle(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: !isEditing && !slugEdited ? toSlug(value) : current.slug,
    }));
  }

  function updateSlug(value: string) {
    setSlugEdited(true);
    setForm((current) => ({ ...current, slug: value.toLowerCase() }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextFieldErrors = validateProjectForm(form, t);
    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      setError(Object.values(nextFieldErrors)[0]);
      return;
    }

    try {
      setError(undefined);
      setNotice(undefined);
      setIsSaving(true);
      const payload = toProjectPayload(form);

      if (projectId) {
        const updatedProject = await updateProject(projectId, payload);
        setProject(updatedProject);
        setNotice(t("projectSaved"));
        setForm(fromProjectRow(updatedProject));

        if (submitIntent === "view") {
          navigate(`/projects/${updatedProject.slug}`);
        }

        return;
      }

      const createdProject = await createProject(payload);
      navigate(`/admin/projects/${createdProject.id}/edit`, { replace: true });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("saveProjectError"),
      );
    } finally {
      setIsSaving(false);
      setSubmitIntent("save");
    }
  }

  async function handleCoverUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!slugPattern.test(form.slug.trim())) {
      setError(t("coverUploadSlug"));
      event.target.value = "";
      return;
    }

    const validationError = validateImageFile(file, t);

    if (validationError) {
      setError(validationError);
      event.target.value = "";
      return;
    }

    try {
      setError(undefined);
      setNotice(undefined);
      setIsCoverUploading(true);
      const upload = await uploadPortfolioImage(file, form.slug.trim());
      setForm((current) => ({
        ...current,
        cover_image_url: upload.publicUrl,
      }));
      setNotice(t("coverUploaded"));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("coverUploadError"),
      );
    } finally {
      setIsCoverUploading(false);
      event.target.value = "";
    }
  }

  return (
    <AdminPanel
      title={isEditing ? t("editProject") : t("newProject")}
      kicker={t("projectArchive")}
    >
      <div className="mb-6">
        <Link
          to="/admin/projects"
          className="inline-flex border-b border-black/20 pb-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-black/55 transition hover:border-black hover:text-black"
        >
          {t("backToProjects")}
        </Link>
      </div>

      {isLoading ? <AdminNotice>{t("loadingProject")}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
      {notice ? <AdminNotice tone="success">{notice}</AdminNotice> : null}

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <AdminFieldSection title={t("basicInfo")} helper={t("basicInfoHelp")}>
          <div className="grid gap-5 md:grid-cols-2">
            <AdminInput
              label={t("title")}
              value={form.title}
              onChange={updateTitle}
              helper={t("titleHelp")}
              error={fieldErrors.title}
              required
            />
            <AdminInput
              label={t("slug")}
              value={form.slug}
              onChange={updateSlug}
              helper={t("slugHelp")}
              error={fieldErrors.slug}
              required
            />
            <AdminInput
              label={t("projectNumber")}
              value={form.project_number}
              onChange={(value) => setForm({ ...form, project_number: value })}
            />
            <AdminInput
              label={t("type")}
              value={form.type}
              onChange={(value) => setForm({ ...form, type: value })}
            />
            <AdminInput
              label={t("year")}
              value={form.year}
              onChange={(value) => setForm({ ...form, year: value })}
            />
            <AdminInput
              label={t("location")}
              value={form.location}
              onChange={(value) => setForm({ ...form, location: value })}
            />
            <AdminInput
              label={t("role")}
              value={form.role}
              onChange={(value) => setForm({ ...form, role: value })}
            />
            <AdminInput
              label={t("sortOrder")}
              type="number"
              value={form.sort_order}
              onChange={(value) => setForm({ ...form, sort_order: value })}
              error={fieldErrors.sort_order}
            />
            <div className="md:col-span-2">
              <AdminToggle
                label={t("publishedToggle")}
                checked={form.is_published}
                onChange={(checked) =>
                  setForm({ ...form, is_published: checked })
                }
                helper={publishHelper}
              />
            </div>
          </div>
        </AdminFieldSection>

        <AdminFieldSection title={t("projectText")} helper={t("projectTextHelp")}>
          <div className="grid gap-5">
            <AdminTextarea
              label={t("description")}
              value={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
              helper={t("descriptionHelp")}
            />
            <AdminTextarea
              label={t("conceptStatement")}
              value={form.concept_statement}
              onChange={(value) =>
                setForm({ ...form, concept_statement: value })
              }
              helper={t("conceptStatementHelp")}
            />
            <AdminTextarea
              label={t("conceptKeywords")}
              value={form.concept_keywords}
              onChange={(value) => setForm({ ...form, concept_keywords: value })}
              helper={t("conceptKeywordsHelp")}
            />
            <AdminTextarea
              label={t("designProcessSteps")}
              value={form.design_process_steps}
              onChange={(value) =>
                setForm({ ...form, design_process_steps: value })
              }
              helper={t("designProcessStepsHelp")}
            />
            <AdminTextarea
              label={t("credits")}
              value={form.credits}
              onChange={(value) => setForm({ ...form, credits: value })}
            />
            <AdminTextarea
              label={t("notes")}
              value={form.notes}
              onChange={(value) => setForm({ ...form, notes: value })}
            />
          </div>
        </AdminFieldSection>

        <AdminFieldSection title={t("coverImage")} helper={t("coverImageHelp")}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/45">
                {t("uploadCover")}
              </span>
              <input
                className="mt-2 w-full border border-black/15 bg-white px-3 py-3 text-sm"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => void handleCoverUpload(event)}
              />
              <span className="mt-2 block text-xs leading-5 text-black/45">
                {isCoverUploading ? t("uploadingImage") : t("uploadCoverHelp")}
              </span>
            </label>
            <AdminSelect
              label={t("coverOrientation")}
              value={form.cover_orientation}
              onChange={(value) =>
                setForm({
                  ...form,
                  cover_orientation: value as "landscape" | "portrait",
                })
              }
              options={coverOrientationOptions}
            />
            <AdminInput
              label={t("coverUrl")}
              value={form.cover_image_url}
              onChange={(value) => setForm({ ...form, cover_image_url: value })}
            />
            <AdminInput
              label={t("coverAlt")}
              value={form.cover_image_alt}
              onChange={(value) => setForm({ ...form, cover_image_alt: value })}
            />
            <AdminInput
              label={t("coverCaption")}
              value={form.cover_image_caption}
              onChange={(value) =>
                setForm({ ...form, cover_image_caption: value })
              }
            />
            {form.cover_image_url ? (
              <div className="md:col-span-2">
                <AdminImagePreview
                  src={form.cover_image_url}
                  alt={form.cover_image_alt || form.title || t("coverImage")}
                />
              </div>
            ) : null}
          </div>
        </AdminFieldSection>

        <div className="flex flex-wrap gap-3">
          <AdminButton
            type="submit"
            variant="primary"
            disabled={isSaving}
            onClick={() => setSubmitIntent("save")}
          >
            {isSaving ? t("saving") : isEditing ? t("saveChanges") : t("saveProject")}
          </AdminButton>
          {isEditing ? (
            <AdminButton
              type="submit"
              disabled={isSaving}
              onClick={() => setSubmitIntent("view")}
            >
              {t("saveAndView")}
            </AdminButton>
          ) : null}
        </div>
      </form>

      {project ? (
        <ProjectImageManager
          images={images}
          onImagesChange={setImages}
          project={project}
        />
      ) : (
        <AdminNotice>{t("saveBeforeImages")}</AdminNotice>
      )}
    </AdminPanel>
  );
}

function fromProjectRow(project: SupabaseProjectRow): ProjectForm {
  return {
    slug: project.slug,
    title: project.title,
    project_number: project.project_number ?? "",
    type: project.type ?? "",
    year: project.year ?? "",
    location: project.location ?? "",
    role: project.role ?? "",
    description: project.description ?? "",
    concept_statement: project.concept_statement ?? "",
    concept_keywords: arrayToText(project.concept_keywords),
    design_process_steps: arrayToText(project.design_process_steps),
    credits: project.credits ?? "",
    notes: project.notes ?? "",
    cover_image_url: project.cover_image_url ?? "",
    cover_image_alt: project.cover_image_alt ?? "",
    cover_image_caption: project.cover_image_caption ?? "",
    cover_orientation: project.cover_orientation ?? "landscape",
    sort_order: String(project.sort_order ?? 0),
    is_published: project.is_published ?? true,
  };
}

function toProjectPayload(form: ProjectForm): AdminProjectPayload {
  return {
    slug: form.slug.trim(),
    title: form.title.trim(),
    project_number: nullable(form.project_number),
    type: nullable(form.type),
    year: nullable(form.year),
    location: nullable(form.location),
    role: nullable(form.role),
    description: nullable(form.description),
    concept_statement: nullable(form.concept_statement),
    concept_keywords: textToArray(form.concept_keywords),
    design_process_steps: textToArray(form.design_process_steps),
    credits: nullable(form.credits),
    notes: nullable(form.notes),
    cover_image_url: nullable(form.cover_image_url),
    cover_image_alt: nullable(form.cover_image_alt),
    cover_image_caption: nullable(form.cover_image_caption),
    cover_orientation: form.cover_orientation,
    sort_order: Number.parseInt(form.sort_order, 10) || 0,
    is_published: form.is_published,
  };
}

function validateProjectForm(
  form: ProjectForm,
  t: (
    key:
      | "titleRequired"
      | "slugRequired"
      | "slugInvalid"
      | "sortOrderInvalid",
  ) => string,
) {
  const errors: Record<string, string> = {};

  if (!form.title.trim()) {
    errors.title = t("titleRequired");
  }

  if (!form.slug.trim()) {
    errors.slug = t("slugRequired");
  } else if (!slugPattern.test(form.slug.trim())) {
    errors.slug = t("slugInvalid");
  }

  if (Number.isNaN(Number(form.sort_order))) {
    errors.sort_order = t("sortOrderInvalid");
  }

  return errors;
}

function validateImageFile(
  file: File,
  t: (key: "invalidImageType" | "invalidImageSize") => string,
) {
  if (!allowedImageTypes.includes(file.type)) {
    return t("invalidImageType");
  }

  if (file.size > maxImageSize) {
    return t("invalidImageSize");
  }

  return undefined;
}

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function arrayToText(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string").join("\n")
    : "";
}

function textToArray(value: string) {
  return value
    .split(value.includes("\n") ? "\n" : ",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function nullable(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
