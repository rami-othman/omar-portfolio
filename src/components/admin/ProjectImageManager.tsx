import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { useAdminLanguage } from "../../admin/i18n/AdminLanguageContext";
import {
  AdminButton,
  AdminInput,
  AdminNotice,
  AdminSelect,
} from "./AdminFormControls";
import {
  createProjectImage,
  deleteProjectImage,
  updateProjectImage,
} from "../../services/adminService";
import {
  deletePortfolioImage,
  uploadPortfolioImage,
} from "../../services/storageService";
import type {
  AdminProjectImagePayload,
  ImageOrientation,
  SupabaseProjectImageCategory,
  SupabaseProjectImageRow,
  SupabaseProjectRow,
} from "../../types/portfolio";

interface ProjectImageManagerProps {
  images: SupabaseProjectImageRow[];
  project: SupabaseProjectRow;
  onImagesChange: (images: SupabaseProjectImageRow[]) => void;
}

interface ImageForm {
  image_url: string;
  alt: string;
  caption: string;
  category: SupabaseProjectImageCategory;
  orientation: ImageOrientation;
  sort_order: string;
}

const maxImageSize = 8 * 1024 * 1024;
const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

const emptyImageForm: ImageForm = {
  image_url: "",
  alt: "",
  caption: "",
  category: "render",
  orientation: "landscape",
  sort_order: "0",
};

const imageGroups: Array<{
  categories: SupabaseProjectImageCategory[];
  titleKey: "renders" | "drawings" | "conceptProcess";
}> = [
  { titleKey: "renders", categories: ["render"] },
  { titleKey: "drawings", categories: ["drawing"] },
  { titleKey: "conceptProcess", categories: ["concept", "process"] },
];

export function ProjectImageManager({
  images,
  onImagesChange,
  project,
}: ProjectImageManagerProps) {
  const { t } = useAdminLanguage();
  const [form, setForm] = useState<ImageForm>(emptyImageForm);
  const [error, setError] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);
  const sortedImages = useMemo(
    () => [...images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    [images],
  );

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
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
      setIsUploading(true);
      const upload = await uploadPortfolioImage(file, project.slug);
      setForm((current) => ({ ...current, image_url: upload.publicUrl }));
      setNotice(t("imageUploaded"));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("imageUploadError"),
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateImageForm(form, t);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError(undefined);
      setNotice(undefined);
      const createdImage = await createProjectImage(toPayload(form, project.id));
      onImagesChange([...images, createdImage]);
      setForm(emptyImageForm);
      setNotice(t("imageRecordSaved"));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("imageSaveError"),
      );
    }
  }

  async function handleDelete(image: SupabaseProjectImageRow) {
    if (!window.confirm(t("deleteImageConfirm"))) {
      return;
    }

    try {
      setError(undefined);
      setNotice(undefined);
      await deleteProjectImage(image.id);

      try {
        await deletePortfolioImage(image.image_url);
        setNotice(t("imageRecordDeleted"));
      } catch (storageError) {
        setNotice(
          storageError instanceof Error
            ? `${t("imageDeleteSkipped")} ${storageError.message}`
            : t("imageRecordDeleted"),
        );
      }

      onImagesChange(images.filter((item) => item.id !== image.id));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("imageDeleteError"),
      );
    }
  }

  function handleUpdatedImage(updatedImage: SupabaseProjectImageRow) {
    onImagesChange(
      images.map((image) =>
        image.id === updatedImage.id ? updatedImage : image,
      ),
    );
    setNotice(t("imageUpdated"));
  }

  return (
    <section className="mt-8 border border-black/10 bg-[#f7f7f6] p-4 sm:p-5">
      <div className="flex flex-col gap-2 border-b border-black/10 pb-4">
        <h3 className="text-xl font-semibold leading-tight">
          {t("galleryImages")}
        </h3>
        <p className="text-sm leading-6 text-black/55">
          {t("imageUploadHelper")}
        </p>
      </div>

      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
      {notice ? <AdminNotice tone="success">{notice}</AdminNotice> : null}

      <form className="mt-5 grid gap-4 border border-black/10 bg-white p-4" onSubmit={handleCreate}>
        <label className="block">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/45">
            {t("uploadImage")}
          </span>
          <input
            className="mt-2 w-full border border-black/15 bg-white px-3 py-3 text-sm"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => void handleUpload(event)}
          />
          <span className="mt-2 block text-xs leading-5 text-black/45">
            {isUploading ? t("uploadingImage") : t("imageUploadHelper")}
          </span>
        </label>
        <ImageFields form={form} onChange={setForm} />
        <AdminButton type="submit" variant="primary" disabled={isUploading}>
          {t("addImage")}
        </AdminButton>
      </form>

      <div className="mt-8 grid gap-6">
        {imageGroups.map((group) => {
          const groupImages = sortedImages.filter((image) =>
            group.categories.includes(image.category),
          );

          return (
            <section key={group.titleKey} className="border border-black/10 bg-white p-4">
              <div className="flex items-baseline justify-between gap-4 border-b border-black/10 pb-3">
                <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-black/55">
                  {t(group.titleKey)}
                </h4>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/35">
                  {String(groupImages.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 grid gap-4">
                {groupImages.length > 0 ? (
                  groupImages.map((image) => (
                    <ImageEditorRow
                      key={image.id}
                      image={image}
                      projectId={project.id}
                      onDelete={() => void handleDelete(image)}
                      onSave={handleUpdatedImage}
                    />
                  ))
                ) : (
                  <p className="text-sm leading-6 text-black/45">
                    {t("noImagesInGroup")}
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function ImageEditorRow({
  image,
  onDelete,
  onSave,
  projectId,
}: {
  image: SupabaseProjectImageRow;
  onDelete: () => void;
  onSave: (image: SupabaseProjectImageRow) => void;
  projectId: string;
}) {
  const { t } = useAdminLanguage();
  const [form, setForm] = useState<ImageForm>({
    image_url: image.image_url,
    alt: image.alt ?? "",
    caption: image.caption ?? "",
    category: image.category,
    orientation: image.orientation ?? "landscape",
    sort_order: String(image.sort_order ?? 0),
  });
  const [error, setError] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateImageForm(form, t);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError(undefined);
      setIsSaving(true);
      onSave(await updateProjectImage(image.id, toPayload(form, projectId)));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("imageUpdateError"),
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      className="grid gap-4 border border-black/10 bg-[#f7f7f6] p-4 lg:grid-cols-[9rem_minmax(0,1fr)]"
      onSubmit={handleSave}
    >
      <div className="aspect-square overflow-hidden border border-black/10 bg-white">
        <img
          src={image.image_url}
          alt={image.alt ?? image.caption ?? t("galleryImages")}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="grid gap-4">
        <ImageFields form={form} onChange={setForm} />
        {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
        <div className="flex flex-wrap gap-2">
          <AdminButton type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? t("saving") : t("saveImage")}
          </AdminButton>
          <AdminButton onClick={onDelete} variant="danger">
            {t("delete")}
          </AdminButton>
        </div>
      </div>
    </form>
  );
}

function ImageFields({
  form,
  onChange,
}: {
  form: ImageForm;
  onChange: (form: ImageForm) => void;
}) {
  const { t } = useAdminLanguage();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <AdminInput
          label={t("imageUrl")}
          value={form.image_url}
          onChange={(value) => onChange({ ...form, image_url: value })}
          required
        />
      </div>
      <AdminInput
        label={t("caption")}
        value={form.caption}
        onChange={(value) => onChange({ ...form, caption: value })}
      />
      <AdminInput
        label={t("altText")}
        value={form.alt}
        onChange={(value) => onChange({ ...form, alt: value })}
      />
      <AdminSelect
        label={t("category")}
        value={form.category}
        onChange={(value) =>
          onChange({
            ...form,
            category: value as SupabaseProjectImageCategory,
          })
        }
        options={[
          { label: t("renders"), value: "render" },
          { label: t("drawings"), value: "drawing" },
          { label: t("concept"), value: "concept" },
          { label: t("process"), value: "process" },
        ]}
      />
      <AdminSelect
        label={t("orientation")}
        value={form.orientation}
        onChange={(value) =>
          onChange({ ...form, orientation: value as ImageOrientation })
        }
        options={[
          { label: t("landscape"), value: "landscape" },
          { label: t("portrait"), value: "portrait" },
          { label: t("square"), value: "square" },
        ]}
      />
      <AdminInput
        label={t("sortOrder")}
        type="number"
        value={form.sort_order}
        onChange={(value) => onChange({ ...form, sort_order: value })}
      />
    </div>
  );
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

function validateImageForm(
  form: ImageForm,
  t: (key: "imageUrlRequired" | "sortOrderInvalid") => string,
) {
  if (!form.image_url.trim()) {
    return t("imageUrlRequired");
  }

  if (Number.isNaN(Number(form.sort_order))) {
    return t("sortOrderInvalid");
  }

  return undefined;
}

function toPayload(
  form: ImageForm,
  projectId: string,
): AdminProjectImagePayload {
  return {
    project_id: projectId,
    image_url: form.image_url.trim(),
    alt: nullable(form.alt),
    caption: nullable(form.caption),
    category: form.category,
    orientation: form.orientation,
    sort_order: Number.parseInt(form.sort_order, 10) || 0,
  };
}

function nullable(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
