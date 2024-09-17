import { PageHeader } from '@/components/PageHeader';
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div>
      <PageHeader>Page Not Found</PageHeader>
      <br />
      <p>Sorry, the page you tried to access does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}