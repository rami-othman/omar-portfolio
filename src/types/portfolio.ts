export type ImageOrientation = "landscape" | "portrait" | "square";

export interface ProfileInfo {
  name: string;
  title: string;
  statement: string;
  biography: string[];
  location: string;
  availability: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  city: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface ProjectImageAsset {
  src: string;
  caption: string;
  alt?: string;
  orientation?: ImageOrientation;
  layout?: "full" | "half";
}

export interface Project {
  id: string;
  number: string;
  title: string;
  year: string;
  type: string;
  location: string;
  role: string;
  description: string;
  conceptStatement: string;
  conceptKeywords: string[];
  designProcessSteps: string[];
  coverImage: ProjectImageAsset;
  coverOrientation: "landscape" | "portrait";
  coverObjectPosition?: string;
  conceptImages: ProjectImageAsset[];
  drawings: ProjectImageAsset[];
  renders: ProjectImageAsset[];
  credits?: string;
  notes?: string;
}

export type ProjectGalleryKey = "renders" | "drawings" | "conceptImages";

export interface PortfolioContent {
  profile: ProfileInfo;
  contact: ContactInfo;
  skills: string[];
  software: string[];
  approach: string[];
  projects: Project[];
  heroTitle: string;
  heroKicker: string;
  aboutTitle: string;
  aboutIntro: string;
  contactTitle: string;
  contactIntro: string;
}

export type PortfolioDataSource = "fallback" | "supabase";

export interface PortfolioLoadResult {
  content: PortfolioContent;
  source: PortfolioDataSource;
  error?: string;
}

export interface SupabasePortfolioSettingsRow {
  id: string;
  owner_name: string | null;
  role_title: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  about_title: string | null;
  about_intro: string | null;
  about_body: string | null;
  location: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  behance_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  skills: unknown | null;
  software: unknown | null;
  approach: unknown | null;
  updated_at: string | null;
}

export type SupabaseProjectImageCategory =
  | "render"
  | "drawing"
  | "concept"
  | "process";

export interface SupabaseProjectImageRow {
  id: string;
  project_id: string;
  image_url: string;
  alt: string | null;
  caption: string | null;
  category: SupabaseProjectImageCategory;
  orientation: ImageOrientation | null;
  sort_order: number | null;
  created_at: string | null;
}

export interface SupabaseProjectRow {
  id: string;
  slug: string;
  title: string;
  project_number: string | null;
  type: string | null;
  year: string | null;
  location: string | null;
  role: string | null;
  description: string | null;
  concept_statement: string | null;
  concept_keywords: unknown | null;
  design_process_steps: unknown | null;
  credits: string | null;
  notes: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  cover_image_caption: string | null;
  cover_orientation: "landscape" | "portrait" | null;
  sort_order: number | null;
  is_published: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SupabaseProjectWithImagesRow extends SupabaseProjectRow {
  project_images: SupabaseProjectImageRow[] | null;
}

export interface AdminUserRow {
  user_id: string;
  email: string | null;
  created_at: string | null;
}

export interface AdminProjectPayload {
  slug: string;
  title: string;
  project_number: string | null;
  type: string | null;
  year: string | null;
  location: string | null;
  role: string | null;
  description: string | null;
  concept_statement: string | null;
  concept_keywords: string[];
  design_process_steps: string[];
  credits: string | null;
  notes: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  cover_image_caption: string | null;
  cover_orientation: "landscape" | "portrait";
  sort_order: number;
  is_published: boolean;
}

export interface AdminSettingsPayload {
  owner_name: string | null;
  role_title: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  about_title: string | null;
  about_intro: string | null;
  about_body: string | null;
  location: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  behance_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  skills: string[];
  software: string[];
  approach: string[];
}

export interface AdminProjectImagePayload {
  project_id: string;
  image_url: string;
  alt: string | null;
  caption: string | null;
  category: SupabaseProjectImageCategory;
  orientation: ImageOrientation;
  sort_order: number;
}
