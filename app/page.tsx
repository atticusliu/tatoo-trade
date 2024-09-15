import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {/* {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
        </main>
      </div>

      <Button asChild>
        <Link href="/profile">Profile</Link>
      </Button>

      <Button asChild>
        <Link href="/products">Products</Link>
      </Button>

      <Button asChild>
        <Link href="/products/create">Sell Item</Link>
      </Button>
    </div>
  );
}
