import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

type ProductCardProps = {
  id: string;
  title: string;
  priceInCents: number;
  description: string;
  imagePath: string;
}

export function ProductCard( { id, title, priceInCents, description, imagePath }
  : ProductCardProps) {
  return (
  <Card className="flex flex-col overflow-hidden">
    <div className="relative w-full h-auto aspect-video">
      <Image src={imagePath} alt={title} fill />
    </div>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="line-clamp-4">{description}</p>
    </CardContent>
    <CardFooter>
      <Button asChild size="lg" className="w-full">
        <Link href={`/products/${id}/purchase`}>
          Purchase
        </Link>
      </Button>
    </CardFooter>
  </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}