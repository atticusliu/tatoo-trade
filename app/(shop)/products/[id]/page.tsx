import { PageHeader } from '@/components/PageHeader';
import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params } : ProductPageProps) {
  const { id } = params;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Product")
    .select()
    .eq("id", id);

  if (error) {
    console.error(error);
    return <div>Error loading product</div>;
  }

  // TODO: get the seller name or username and display it here

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-6">
        <div className="md:w-1/2 w-full">
          <Image
            src={data[0].imagePath}
            alt={data[0].title}
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full mt-6 md:mt-0">
          <p className="text-xl">{data[0].title}</p>
          <p className="text-xl">${data[0].priceInCents / 100}</p>
          <p>{data[0].description}</p>
          <p>{data[0].condition}</p>
          <br />
          <p>Seller: {data[0].sellerId}</p>
          <br />
          <div className="mt-8">
            <Button
              className="w-full"
              asChild>
              <Link href={`/products/${id}/purchase`}>Purchase</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}