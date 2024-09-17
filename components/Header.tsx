
import Image from "next/image";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { createClient } from "@/utils/supabase/client";

export default async function Header() {
  // if the user is logged in, display the profile link. otherwise, do nothing
  const supabase = createClient();
  // const user = await supabase.auth.getUser();

  // TODO: this is not working - investigate
  const session = await supabase.auth.getSession();

  return (
    <header className="pb-4 top-0 z-50">
      <div className="px-4 flex justify-between">
        <Link href="/" className="hover:text-gray-300">
          <Image src='/tatttootrade_logo-01.png' width={125} height={25} alt='Go to the homepage' />
        </Link>
        <nav className="flex items-center">
          <ul className="flex items-center gap-4">
            <li>
              {session ? (
                <Link href="/profile" className="hover:text-gray-300">
                  Profile
                  </Link>
                  ) : null}
            </li>
            <li>
              <AuthButton />
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-grow border-t border-gray-200"></div>
    </header>
  );
}
