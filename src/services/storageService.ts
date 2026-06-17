import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

export const portfolioImagesBucket = "portfolio-images";

function getClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured. Add the Vite environment variables before using admin.");
  }

  return supabase;
}

export async function uploadPortfolioImage(file: File, projectSlug: string) {
  const client = getClient();
  const safeFileName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const path = `projects/${projectSlug}/${Date.now()}-${safeFileName || "image"}`;

  const { error } = await client.storage
    .from(portfolioImagesBucket)
    .upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = client.storage.from(portfolioImagesBucket).getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
  };
}

export async function deletePortfolioImage(imageUrl: string) {
  const path = getPortfolioImagePath(imageUrl);

  if (!path) {
    return false;
  }

  const client = getClient();
  const { error } = await client.storage
    .from(portfolioImagesBucket)
    .remove([path]);

  if (error) {
    throw error;
  }

  return true;
}

export function getPortfolioImagePath(imageUrl: string) {
  try {
    const url = new URL(imageUrl);
    const marker = `/storage/v1/object/public/${portfolioImagesBucket}/`;
    const markerIndex = url.pathname.indexOf(marker);

    if (markerIndex < 0) {
      return null;
    }

    return decodeURIComponent(url.pathname.slice(markerIndex + marker.length));
  } catch {
    return null;
  }
}
