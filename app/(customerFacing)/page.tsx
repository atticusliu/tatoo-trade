import { createClient } from "@/utils/supabase/server"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";

async function getNewestProducts() {
  const supabase = createClient();
  // fetch newest products where isAvailableForPurchase is true
  // but just get six of them
  const { data, error } = await supabase
    .from("Product")
    .select("*")
    .eq("isAvailableForPurchase", true)
    .limit(6)
    .order("createdAt", { ascending: false });

  if (error) {
    console.log("ERROR", error);
    console.error(error);
    return [];
  }

  return data;
}

export default function HomePage() {
  return (
  <main className="space-y-12">
    <ProductGridSection
      title="Newest Products"
      productsFetcher={getNewestProducts}
    />
    {/* these are just here for debugging and shit */}
    <div className="flex-1 w-full flex flex-row gap-20 items-center min-h-screen">
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
  </main>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
}

async function ProductGridSection({
  productsFetcher, title
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4"/>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(await productsFetcher()).map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}