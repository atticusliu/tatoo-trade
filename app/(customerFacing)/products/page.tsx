import { createClient } from "@/utils/supabase/server"
import { Suspense } from 'react';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { cache } from "@/lib/cache";

/* TODO: figure out this caching issue later
   At the moment I'm seeing this error:
   Error: Route /products used "cookies" inside a function cached with "unstable_cache(...)".
   Accessing Dynamic data sources inside a cache scope is not supported.
   If you need this data inside a cached function use "cookies" outside of the cached function
   and pass the required dynamic data in as an argument.
   See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache
*/
async function getProducts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Product")
    .select("*")
    .eq("isAvailableForPurchase", true);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
          }>
          <ProductsSuspense />
        </Suspense>
      </div>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();
  return products.map(product => {
    return <ProductCard key={product.id} {...product} />
  })
}