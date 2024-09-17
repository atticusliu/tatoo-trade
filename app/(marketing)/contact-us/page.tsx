import { PageHeader } from '@/components/PageHeader';

export default function ContactUs() {
  return (
    <div>
      <PageHeader>Contact Us</PageHeader>
      <br />
      <p>For support and/or feedback, please email us at <a href="mailto:hello@tattoo-trade.com" className="text-blue-500">hello@tattoo-trade.com</a></p>
    </div>
  );
}