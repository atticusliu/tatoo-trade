import { createClient } from "@/utils/supabase/server";

export async function getCurrentUserID() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    return null;
  }

  return data.session?.user.id;
}