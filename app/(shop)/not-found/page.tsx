import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you tried to access does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}