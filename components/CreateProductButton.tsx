import Link from "next/link";

export default function CreateProductButton() {
  return (
    <Link href="/products/create" className="hover:text-gray-300">
      Sell
    </Link>
  );
}