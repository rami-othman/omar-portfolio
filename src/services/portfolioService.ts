import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import { fallbackPortfolioContent } from "../data/portfolioData";
import type {
  ContactInfo,
  ImageOrientation,
  PortfolioContent,
  PortfolioLoadResult,
  Project,
  ProjectImageAsset,
  SupabasePortfolioSettingsRow,
  SupabaseProjectImageRow,
  SupabaseProjectWithImagesRow,
} from "../types/portfolio";

export async function loadPortfolioContent(): Promise<PortfolioLoadResult> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      content: fallbackPortfolioContent,
      source: "fallback",
    };
  }

  try {
    const [settingsResponse, projectsResponse] = await Promise.all([
      supabase
        .from("portfolio_settings")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("projects")
        .select("*, project_images(*)")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
    ]);

    if (settingsResponse.error) {
      throw settingsResponse.error;
    }

    if (projectsResponse.error) {
      throw projectsResponse.error;
    }

    return {
      content: mapSupabaseContent(
        settingsResponse.data as SupabasePortfolioSettingsRow | null,
        (projectsResponse.data ?? []) as SupabaseProjectWithImagesRow[],
      ),
      source: "supabase",
    };
  } catch (error) {
    return {
      content: fallbackPortfolioContent,
      source: "fallback",
      error:
        error instanceof Error
          ? error.message
          : "Supabase content could not be loaded.",
    };
  }
}

export function getProjectBySlug(
  projects: Project[],
  slug: string | undefined,
) {
  return projects.find((project) => project.id === slug);
}

export function getAdjacentProjects(projects: Project[], projectId: string) {
  const currentIndex = projects.findIndex((project) => project.id === projectId);

  if (currentIndex < 0) {
    return { previousProject: undefined, nextProject: undefined };
  }

  return {
    previousProject:
      projects[(currentIndex - 1 + projects.length) % projects.length],
    nextProject: projects[(currentIndex + 1) % projects.length],
  };
}

function mapSupabaseContent(
  settingsRow: SupabasePortfolioSettingsRow | null,
  projectRows: SupabaseProjectWithImagesRow[],
): PortfolioContent {
  const fallback = fallbackPortfolioContent;

  return {
    profile: {
      name: settingsRow?.owner_name || fallback.profile.name,
      title: settingsRow?.role_title || fallback.profile.title,
      statement: settingsRow?.hero_subtitle || fallback.profile.statement,
      biography: getBiography(settingsRow),
      location: settingsRow?.location || fallback.profile.location,
      availability: fallback.profile.availability,
    },
    contact: getContact(settingsRow, fallback.contact),
    skills: getStringArray(settingsRow?.skills, fallback.skills),
    software: getStringArray(settingsRow?.software, fallback.software),
    approach: getStringArray(settingsRow?.approach, fallback.approach),
    projects: projectRows.map(mapProject),
    heroTitle: settingsRow?.hero_title || fallback.heroTitle,
    heroKicker: fallback.heroKicker,
    aboutTitle: settingsRow?.about_title || fallback.aboutTitle,
    aboutIntro: settingsRow?.about_intro || fallback.aboutIntro,
    contactTitle: fallback.contactTitle,
    contactIntro: fallback.contactIntro,
  };
}

function getBiography(settingsRow: SupabasePortfolioSettingsRow | null) {
  const aboutBody = settingsRow?.about_body?.trim();

  if (!aboutBody) {
    return fallbackPortfolioContent.profile.biography;
  }

  return aboutBody
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function getContact(
  settingsRow: SupabasePortfolioSettingsRow | null,
  fallback: ContactInfo,
): ContactInfo {
  const links = [
    { label: "Behance", href: settingsRow?.behance_url },
    { label: "LinkedIn", href: settingsRow?.linkedin_url },
    { label: "Instagram", href: settingsRow?.instagram_url },
  ].filter(
    (link): link is { label: string; href: string } => Boolean(link.href),
  );

  return {
    email: settingsRow?.contact_email || fallback.email,
    phone: settingsRow?.contact_phone || fallback.phone,
    city: settingsRow?.location || fallback.city,
    links: links.length > 0 ? links : fallback.links,
  };
}

function mapProject(row: SupabaseProjectWithImagesRow): Project {
  const sortedImages = [...(row.project_images ?? [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );

  return {
    id: row.slug,
    number: row.project_number || "",
    title: row.title,
    year: row.year || "",
    type: row.type || "",
    location: row.location || "",
    role: row.role || "",
    description: row.description || "",
    conceptStatement: row.concept_statement || "",
    conceptKeywords: getStringArray(row.concept_keywords, []),
    designProcessSteps: getStringArray(row.design_process_steps, []),
    coverImage: {
      src: row.cover_image_url || "",
      caption: row.cover_image_caption || row.title,
      alt: row.cover_image_alt || row.title,
      orientation: getOrientation(row.cover_orientation, "landscape"),
      layout: "full",
    },
    coverOrientation: getCoverOrientation(row.cover_orientation),
    conceptImages: sortedImages
      .filter((image) => image.category === "concept" || image.category === "process")
      .map(mapProjectImage),
    drawings: sortedImages
      .filter((image) => image.category === "drawing")
      .map(mapProjectImage),
    renders: sortedImages
      .filter((image) => image.category === "render")
      .map(mapProjectImage),
    credits: row.credits || undefined,
    notes: row.notes || undefined,
  };
}

function mapProjectImage(row: SupabaseProjectImageRow): ProjectImageAsset {
  return {
    src: row.image_url,
    caption: row.caption || "",
    alt: row.alt || row.caption || undefined,
    orientation: getOrientation(row.orientation, "landscape"),
    layout: "full",
  };
}

function getStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const strings = value.filter(
    (item): item is string => typeof item === "string" && item.length > 0,
  );

  return strings.length > 0 ? strings : fallback;
}

function getCoverOrientation(value: unknown): "landscape" | "portrait" {
  return value === "portrait" ? "portrait" : "landscape";
}

function getOrientation(
  value: unknown,
  fallback: ImageOrientation,
): ImageOrientation {
  return value === "portrait" || value === "square" || value === "landscape"
    ? value
    : fallback;
}
