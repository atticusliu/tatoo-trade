import { PageHeader } from '@/components/PageHeader';

export default function ErrorPage() {
  return (
    <div>
      <PageHeader>Something went wrong</PageHeader>
      <br />
      <p>Sorry, something went wrong. Please try again later.</p>
    </div>
  );
}