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
  <Card className="flex overflow-hidden flex-col">
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