import { PageHeader } from '@/components/PageHeader';

export default async function StripeRefresh() {
  return (
    <div>
      <PageHeader>Refresh Account</PageHeader>
      <br />
      <p>Redirecting you to complete your account setup...</p>
    </div>
  );
}