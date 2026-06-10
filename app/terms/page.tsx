import LegalLayout from '@/app/components/common/LegalLayout';
import Link from 'next/link';

// ⚠️ INTERNAL NOTE (not shown to visitors): This is a good-faith draft tailored for
// Toshi Consulting Services Private Limited under Indian law (IT Act 2000, IT Rules 2021,
// Indian Contract Act 1872). Have a qualified lawyer review it before production launch.

const UPDATED = '10 June 2026';
const COMPANY = 'Toshi Consulting Services Private Limited';
const EMAIL = 'info@toshiconsulting.com';
const GRIEVANCE_OFFICER = 'Prashant Trivedi';
const JURISDICTION = 'the courts at Panchkula, Haryana, India';
const ADDRESS =
  'Plot 7, Twin Tower, Office 6, 4th Floor, IT Park, Panchkula, Haryana 134116, India';

export const metadata = {
  title: 'Terms & Conditions — Toshi Consulting',
  description:
    'The terms governing your use of the Toshi Consulting Services Private Limited website, including intellectual property, disclaimers, limitation of liability, and governing law.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalLayout
      badge="Legal"
      title="Terms & Conditions"
      intro="These terms govern your use of our website. Please read them carefully before using the site."
      updated={UPDATED}
    >
      <p>{`Welcome to the website of ${COMPANY} ("Toshi Consulting", "we", "us", or "our"). These Terms & Conditions ("Terms") govern your access to and use of toshiconsulting.com (the "Website"). By accessing or using the Website, you agree to be bound by these Terms. If you do not agree, please do not use the Website.`}</p>

      <h2>1. Definitions</h2>
      <p>{`"Content" means all text, graphics, logos, designs, images, software, and other material made available on the Website. "You" or "User" means any person who accesses or uses the Website.`}</p>

      <h2>2. About us and our services</h2>
      <p>{`We are an information-technology consulting company providing services including AI integration, blockchain consulting, QA testing and automation, DevOps and CI/CD, cybersecurity, cloud deployment and support, and digital media marketing and branding. The Website provides general information about us and our services. Any engagement for services is governed by a separate written agreement between you and us, which prevails over these Terms in the event of conflict.`}</p>

      <h2>3. Use of the Website</h2>
      <p>{`You agree to use the Website only for lawful purposes. You must not:`}</p>
      <ul>
        <li>{`use the Website in any way that breaches any applicable law or regulation;`}</li>
        <li>{`attempt to gain unauthorised access to the Website, its servers, or any connected system;`}</li>
        <li>{`introduce any virus, malware, or other harmful code, or otherwise interfere with the Website's operation;`}</li>
        <li>{`copy, reproduce, scrape, or exploit any part of the Website except as expressly permitted; or`}</li>
        <li>{`submit false, misleading, or unlawful information through our forms.`}</li>
      </ul>

      <h2>4. Intellectual property</h2>
      <p>{`All Content on the Website, including the "Toshi Consulting" name, logo, and branding, is owned by or licensed to us and is protected by applicable intellectual-property laws. We grant you a limited, non-exclusive, non-transferable, revocable licence to access and view the Content for your personal or internal business use only. You may not reproduce, distribute, modify, or create derivative works from the Content without our prior written consent.`}</p>

      <h2>5. No professional advice</h2>
      <p>{`The information on the Website is provided for general informational purposes only and does not constitute professional, technical, legal, financial, or other advice. You should not act or rely on any information on the Website without seeking appropriate professional advice tailored to your circumstances. Engaging us under a separate written agreement is the only way to obtain advice you may rely upon.`}</p>

      <h2>6. Third-party links and content</h2>
      <p>{`The Website may contain links to third-party websites or resources. We provide these for convenience only and are not responsible for the content, accuracy, or practices of any third-party site. Accessing third-party sites is at your own risk and subject to their terms.`}</p>

      <h2>7. Disclaimer of warranties</h2>
      <p>{`The Website and its Content are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We do not warrant that the Website will be uninterrupted, timely, secure, or error-free, or that any information on it is complete, accurate, or current. To the fullest extent permitted by law, we disclaim all implied warranties.`}</p>

      <h2>8. Limitation of liability</h2>
      <p>{`To the maximum extent permitted by law, ${COMPANY}, its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, or goodwill, arising out of or in connection with your use of (or inability to use) the Website. Our total aggregate liability arising from or relating to the Website shall not exceed the amount, if any, paid by you to us for the specific service giving rise to the claim in the three (3) months preceding the event.`}</p>

      <h2>9. Indemnification</h2>
      <p>{`You agree to indemnify and hold harmless ${COMPANY} and its directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising out of your use of the Website or your breach of these Terms.`}</p>

      <h2>10. Privacy</h2>
      <p>
        {`Your use of the Website is also governed by our `}
        <Link href="/privacy">Privacy Policy</Link>
        {`, which explains how we handle your personal data. By using the Website, you consent to that processing.`}
      </p>

      <h2>11. Governing law and jurisdiction</h2>
      <p>{`These Terms are governed by and construed in accordance with the laws of India. You agree that ${JURISDICTION} shall have exclusive jurisdiction over any dispute arising out of or in connection with these Terms or the Website.`}</p>

      <h2>12. Grievance Officer</h2>
      <p>{`In accordance with the Information Technology Act, 2000 and the rules made thereunder, the contact details of our Grievance Officer are:`}</p>
      <ul>
        <li>{`Grievance Officer: ${GRIEVANCE_OFFICER}`}</li>
        <li>
          {'Email: '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </li>
        <li>{`Address: ${COMPANY}, ${ADDRESS}`}</li>
      </ul>

      <h2>13. Changes to these Terms</h2>
      <p>{`We may revise these Terms at any time by updating this page. Changes take effect when posted, and the "Last updated" date reflects the latest revision. Your continued use of the Website after changes are posted constitutes acceptance of the revised Terms.`}</p>

      <h2>14. General</h2>
      <p>{`If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision is not a waiver of it. These Terms, together with any separate written agreement for services, constitute the entire agreement between you and us regarding the Website.`}</p>

      <h2>15. Contact us</h2>
      <p>
        {`For any questions about these Terms, contact us at `}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        {' or via our '}
        <Link href="/contact">contact page</Link>
        {'.'}
      </p>
    </LegalLayout>
  );
}
