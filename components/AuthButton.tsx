"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default async function AuthButton() {
  const supabase = createClient();
  const router = useRouter();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <button
        onClick={signOut}
        className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="hover:text-gray-300"
    >
      Login
    </Link>
  );
}