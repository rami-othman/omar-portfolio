import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useAdminLanguage } from "../../admin/i18n/AdminLanguageContext";
import {
  AdminButton,
  AdminFieldSection,
  AdminInput,
  AdminNotice,
  AdminTextarea,
} from "../../components/admin/AdminFormControls";
import { AdminPanel } from "../../components/admin/AdminShell";
import { getSettings, updateSettings } from "../../services/adminService";
import type {
  AdminSettingsPayload,
  SupabasePortfolioSettingsRow,
} from "../../types/portfolio";

const emptySettingsForm = {
  owner_name: "",
  role_title: "",
  hero_title: "",
  hero_subtitle: "",
  about_title: "",
  about_intro: "",
  about_body: "",
  location: "",
  contact_email: "",
  contact_phone: "",
  behance_url: "",
  linkedin_url: "",
  instagram_url: "",
  skills: "",
  software: "",
  approach: "",
};

export function AdminSettingsPage() {
  const { t } = useAdminLanguage();
  const [settingsId, setSettingsId] = useState<string>();
  const [form, setForm] = useState(emptySettingsForm);
  const [error, setError] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        setError(undefined);
        setIsLoading(true);
        const settings = await getSettings();

        if (settings) {
          setSettingsId(settings.id);
          setForm(fromSettingsRow(settings));
        }
      } catch (caughtError) {
        setError(
          caughtError instanceof Error ? caughtError.message : t("loadSettingsError"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadSettings();
  }, [t]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError(undefined);
      setNotice(undefined);
      setIsSaving(true);
      const savedSettings = await updateSettings(settingsId, toPayload(form));
      setSettingsId(savedSettings.id);
      setForm(fromSettingsRow(savedSettings));
      setNotice(t("settingsSaved"));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : t("saveSettingsError"),
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AdminPanel title={t("settingsTitle")} kicker={t("settingsKicker")}>
      {isLoading ? <AdminNotice>{t("loadingSettings")}</AdminNotice> : null}
      {error ? <AdminNotice tone="error">{error}</AdminNotice> : null}
      {notice ? <AdminNotice tone="success">{notice}</AdminNotice> : null}

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <AdminFieldSection title={t("identity")} helper={t("identityHelp")}>
          <div className="grid gap-5 md:grid-cols-2">
            <AdminInput
              label={t("ownerName")}
              value={form.owner_name}
              onChange={(value) => setForm({ ...form, owner_name: value })}
            />
            <AdminInput
              label={t("roleTitle")}
              value={form.role_title}
              onChange={(value) => setForm({ ...form, role_title: value })}
            />
            <AdminInput
              label={t("heroTitle")}
              value={form.hero_title}
              onChange={(value) => setForm({ ...form, hero_title: value })}
            />
            <div className="md:col-span-2">
              <AdminTextarea
                label={t("heroSubtitle")}
                value={form.hero_subtitle}
                onChange={(value) => setForm({ ...form, hero_subtitle: value })}
              />
            </div>
          </div>
        </AdminFieldSection>

        <AdminFieldSection title={t("about")} helper={t("aboutHelp")}>
          <div className="grid gap-5">
            <AdminInput
              label={t("aboutTitle")}
              value={form.about_title}
              onChange={(value) => setForm({ ...form, about_title: value })}
            />
            <AdminTextarea
              label={t("aboutIntro")}
              value={form.about_intro}
              onChange={(value) => setForm({ ...form, about_intro: value })}
            />
            <AdminTextarea
              label={t("aboutBody")}
              value={form.about_body}
              onChange={(value) => setForm({ ...form, about_body: value })}
              helper={t("aboutBodyHelp")}
            />
            <AdminInput
              label={t("location")}
              value={form.location}
              onChange={(value) => setForm({ ...form, location: value })}
            />
          </div>
        </AdminFieldSection>

        <AdminFieldSection title={t("contact")} helper={t("contactHelp")}>
          <div className="grid gap-5 md:grid-cols-2">
            <AdminInput
              label={t("contactEmail")}
              type="email"
              value={form.contact_email}
              onChange={(value) => setForm({ ...form, contact_email: value })}
            />
            <AdminInput
              label={t("contactPhone")}
              value={form.contact_phone}
              onChange={(value) => setForm({ ...form, contact_phone: value })}
            />
            <AdminInput
              label={t("behance")}
              value={form.behance_url}
              onChange={(value) => setForm({ ...form, behance_url: value })}
            />
            <AdminInput
              label={t("linkedin")}
              value={form.linkedin_url}
              onChange={(value) => setForm({ ...form, linkedin_url: value })}
            />
            <AdminInput
              label={t("instagram")}
              value={form.instagram_url}
              onChange={(value) => setForm({ ...form, instagram_url: value })}
            />
          </div>
        </AdminFieldSection>

        <AdminFieldSection title={t("lists")} helper={t("listsHelp")}>
          <div className="grid gap-5">
            <ListField
              label={t("skills")}
              value={form.skills}
              onChange={(value) => setForm({ ...form, skills: value })}
            />
            <ListField
              label={t("software")}
              value={form.software}
              onChange={(value) => setForm({ ...form, software: value })}
            />
            <ListField
              label={t("approach")}
              value={form.approach}
              onChange={(value) => setForm({ ...form, approach: value })}
            />
          </div>
        </AdminFieldSection>

        <AdminButton type="submit" variant="primary" disabled={isSaving}>
          {isSaving ? t("saving") : t("saveSettings")}
        </AdminButton>
      </form>
    </AdminPanel>
  );
}

function ListField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const { t } = useAdminLanguage();
  const items = textToLines(value);

  return (
    <div className="grid gap-3">
      <AdminTextarea
        label={label}
        value={value}
        onChange={onChange}
        helper={t("onePerLine")}
      />
      {items.length > 0 ? (
        <div className="border border-black/10 bg-white p-3">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-black/40">
            {t("listPreview")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className="border border-black/10 px-3 py-2 text-xs text-black/60"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function fromSettingsRow(settings: SupabasePortfolioSettingsRow) {
  return {
    owner_name: settings.owner_name ?? "",
    role_title: settings.role_title ?? "",
    hero_title: settings.hero_title ?? "",
    hero_subtitle: settings.hero_subtitle ?? "",
    about_title: settings.about_title ?? "",
    about_intro: settings.about_intro ?? "",
    about_body: settings.about_body ?? "",
    location: settings.location ?? "",
    contact_email: settings.contact_email ?? "",
    contact_phone: settings.contact_phone ?? "",
    behance_url: settings.behance_url ?? "",
    linkedin_url: settings.linkedin_url ?? "",
    instagram_url: settings.instagram_url ?? "",
    skills: arrayToText(settings.skills),
    software: arrayToText(settings.software),
    approach: arrayToText(settings.approach),
  };
}

function toPayload(form: typeof emptySettingsForm): AdminSettingsPayload {
  return {
    owner_name: nullable(form.owner_name),
    role_title: nullable(form.role_title),
    hero_title: nullable(form.hero_title),
    hero_subtitle: nullable(form.hero_subtitle),
    about_title: nullable(form.about_title),
    about_intro: nullable(form.about_intro),
    about_body: nullable(form.about_body),
    location: nullable(form.location),
    contact_email: nullable(form.contact_email),
    contact_phone: nullable(form.contact_phone),
    behance_url: nullable(form.behance_url),
    linkedin_url: nullable(form.linkedin_url),
    instagram_url: nullable(form.instagram_url),
    skills: textToLines(form.skills),
    software: textToLines(form.software),
    approach: textToLines(form.approach),
  };
}

function arrayToText(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string").join("\n")
    : "";
}

function textToLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function nullable(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
