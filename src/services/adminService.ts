import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import type {
  AdminProjectImagePayload,
  AdminProjectPayload,
  AdminSettingsPayload,
  SupabasePortfolioSettingsRow,
  SupabaseProjectImageRow,
  SupabaseProjectRow,
  SupabaseProjectWithImagesRow,
} from "../types/portfolio";

function getClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured. Add the Vite environment variables before using admin.");
  }

  return supabase;
}

function throwIfError(error: unknown) {
  if (error instanceof Error) {
    throw error;
  }
}

export async function getAdminStatus(session: Session | null) {
  if (!session) {
    return false;
  }

  const client = getClient();
  const { data, error } = await client.rpc("is_admin");

  if (error) {
    throw error;
  }

  return data === true;
}

export async function listAdminProjects() {
  const client = getClient();
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as SupabaseProjectRow[];
}

export async function getAdminProjectById(projectId: string) {
  const client = getClient();
  const { data, error } = await client
    .from("projects")
    .select("*, project_images(*)")
    .eq("id", projectId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as SupabaseProjectWithImagesRow | null;
}

export async function createProject(payload: AdminProjectPayload) {
  const client = getClient();
  const { data, error } = await client
    .from("projects")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as SupabaseProjectRow;
}

export async function updateProject(
  projectId: string,
  payload: AdminProjectPayload,
) {
  const client = getClient();
  const { data, error } = await client
    .from("projects")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", projectId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as SupabaseProjectRow;
}

export async function deleteProject(projectId: string) {
  const client = getClient();
  const { error } = await client.from("projects").delete().eq("id", projectId);

  throwIfError(error);
}

export async function toggleProjectPublished(
  projectId: string,
  isPublished: boolean,
) {
  const client = getClient();
  const { data, error } = await client
    .from("projects")
    .update({
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as SupabaseProjectRow;
}

export async function getSettings() {
  const client = getClient();
  const { data, error } = await client
    .from("portfolio_settings")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as SupabasePortfolioSettingsRow | null;
}

export async function updateSettings(
  settingsId: string | undefined,
  payload: AdminSettingsPayload,
) {
  const client = getClient();
  const updatedPayload = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  if (settingsId) {
    const { data, error } = await client
      .from("portfolio_settings")
      .update(updatedPayload)
      .eq("id", settingsId)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return data as SupabasePortfolioSettingsRow;
  }

  const { data, error } = await client
    .from("portfolio_settings")
    .insert(updatedPayload)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as SupabasePortfolioSettingsRow;
}

export async function createProjectImage(payload: AdminProjectImagePayload) {
  const client = getClient();
  const { data, error } = await client
    .from("project_images")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as SupabaseProjectImageRow;
}

export async function updateProjectImage(
  imageId: string,
  payload: AdminProjectImagePayload,
) {
  const client = getClient();
  const { data, error } = await client
    .from("project_images")
    .update(payload)
    .eq("id", imageId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as SupabaseProjectImageRow;
}

export async function deleteProjectImage(imageId: string) {
  const client = getClient();
  const { error } = await client
    .from("project_images")
    .delete()
    .eq("id", imageId);

  throwIfError(error);
}
