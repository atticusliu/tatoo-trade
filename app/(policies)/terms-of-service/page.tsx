import { PageHeader } from '@/components/PageHeader';

export default function TermsOfService() {
  return (
    <div>
      <PageHeader>Terms of Service</PageHeader>
      <br />
      <p className="text-xl">Last updated: September 16, 2024</p>
      <br />
      <p>
        Welcome to Tattoo Trade, a platform for buying and selling tattoo equipment. By using our Services, you agree to be bound by the following Terms of Service ("Terms"). Please read them carefully.
      </p>
      <br />
      <p className="text-xl">1. Eligibility</p>
      <p>To use the Services, you must:</p>
      <ul className="list-disc ml-5">
        <li>Be at least 18 years of age.</li>
        <li>Have the authority to agree to these Terms on behalf of a company or entity if applicable.</li>
      </ul>
      <br />
      <p className="text-xl">2. Account Registration</p>
      <p>
        You must create an account to use certain features of our Services. You agree to provide accurate, current, and complete information during the registration process and to keep your account information updated.
      </p>
      <br />
      <p className="text-xl">3. Buying and Selling</p>
      <ul className="list-disc ml-5">
        <li>
          <strong>Buyers:</strong> Buyers are responsible for reading the full listing before making a purchase. All purchases are final unless otherwise specified by the seller.
        </li>
        <li>
          <strong>Sellers:</strong> Sellers must accurately describe the items they list. You are responsible for fulfilling all transactions and shipping items in a timely manner.
        </li>
      </ul>
      <br />
      <p className="text-xl">4. Prohibited Conduct</p>
      <p>You agree not to engage in the following prohibited activities:</p>
      <ul className="list-disc ml-5">
        <li>Listing or selling counterfeit or prohibited items.</li>
        <li>Using the Services for any illegal purpose or violating any laws in your jurisdiction.</li>
        <li>Interfering with other users' listings or transactions.</li>
        <li>Impersonating another person or entity.</li>
      </ul>
      <br />
      <p className="text-xl">5. Payments and Fees</p>
      <p>
        We use third-party payment processors to facilitate transactions. You agree to pay all fees and applicable taxes associated with your purchases and sales on the platform.
      </p>
      <br />
      <p className="text-xl">6. Intellectual Property</p>
      <p>
        All content on the Services, including but not limited to text, graphics, logos, and software, is the property of Tattoo Trade or its licensors. You may not use, reproduce, or distribute any content without our express written permission.
      </p>
      <br />
      <p className="text-xl">7. Limitation of Liability</p>
      <p>
        To the maximum extent permitted by law, [Marketplace Name] and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Services. This includes but is not limited to any loss of profits, data, or goodwill.
      </p>
      <br />
      <p className="text-xl">8. Dispute Resolution</p>
      <p>
        Any disputes arising from these Terms will be resolved through binding arbitration in [Location], unless otherwise required by law. You waive the right to participate in class actions.
      </p>
      <br />
      <p className="text-xl">9. Termination</p>
      <p>
        We reserve the right to suspend or terminate your account if you violate these Terms or engage in activities that we deem harmful to the platform.
      </p>
      <br />
      <p className="text-xl">10. Changes to the Terms</p>
      <p>
        We may update these Terms from time to time. If we make significant changes, we will notify you by email or through a notice on our website.
      </p>
      <br />
      <p className="text-xl">11. Contact Us</p>
      <p>
        If you have any questions about these Terms, please contact us at <a href="mailto:hello@tattoo-trade.com" className="text-blue-500">hello@tattoo-trade.com</a>.
      </p>
    </div>
  );
}