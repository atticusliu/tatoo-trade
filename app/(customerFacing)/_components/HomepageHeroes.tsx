import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HomepageHeroes() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col lg:flex-row w-full gap-4 mb-8">
        <div className="relative w-full lg:w-1/2 aspect-[16/9]">
          <Image
            src='/tattoo-gun-cover.jpg'
            layout="fill"
            objectFit="cover"
            className="transition-transform transform-gpu md:scale-110"
            alt="Shop tattoo machines"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl text-white pb-4">Tattoo Machines</p>
            <Button asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
        <div className="relative w-full lg:w-1/2 aspect-[16/9]">
          <Image
            src='/ink-cover.jpg'
            layout="fill"
            objectFit="cover"
            className="transition-transform transform-gpu md:scale-110"
            alt="Shop tattoo inks"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl text-white pb-4">Ink</p>
            <Button asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-2xl pb-4">Sell tattoo equipment, reference material, and more</p>
        <Button asChild>
          <Link href="/products/create">Sell Now</Link>
        </Button>
      </div>
    </div>
  );
}
