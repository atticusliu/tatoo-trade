import { PageHeader } from '@/components/PageHeader';
import { ProductForm } from '@/app/(shop)/products/_components/ProductForm';
import { createClient } from "@/utils/supabase/server";
import { Product } from '@prisma/client';

export default async function EditProductPage({
  params: { id }
} : {
  params: { id: string }
}) {
  const supabase = createClient();
  const { data, error } = await supabase.from("Product").select().match({ id });

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  const product = data[0];

  return (
    <div>
      <PageHeader>Edit Product Page</PageHeader>
      <ProductForm product={product} />
    </div>
  );
}