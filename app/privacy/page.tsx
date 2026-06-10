import LegalLayout from '@/app/components/common/LegalLayout';
import Link from 'next/link';

// ⚠️ INTERNAL NOTE (not shown to visitors): This policy is a good-faith draft tailored
// for Toshi Consulting Services Private Limited under India's DPDP Act 2023 + IT Act 2000.
// Have a qualified lawyer review it before it is relied upon for a production launch.

const UPDATED = '10 June 2026';
const COMPANY = 'Toshi Consulting Services Private Limited';
const EMAIL = 'info@toshiconsulting.com';
const GRIEVANCE_OFFICER = 'Prashant Trivedi';
const ADDRESS =
  'Plot 7, Twin Tower, Office 6, 4th Floor, IT Park, Panchkula, Haryana 134116, India';

export const metadata = {
  title: 'Privacy Policy — Toshi Consulting',
  description:
    'How Toshi Consulting Services Private Limited collects, uses, shares, and protects your personal data, and the rights you have under India\'s Digital Personal Data Protection Act, 2023.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      badge="Privacy"
      title="Privacy Policy"
      intro="Your privacy matters to us. This policy explains what personal data we collect, why, and the rights you hold over it."
      updated={UPDATED}
    >
      <p>{`${COMPANY} ("Toshi Consulting", "we", "us", or "our") operates the website toshiconsulting.com (the "Website"). We are the "Data Fiduciary" responsible for the personal data we process about you under the Digital Personal Data Protection Act, 2023 ("DPDP Act") and the Information Technology Act, 2000 and rules made thereunder. This Privacy Policy describes how we collect, use, share, retain, and protect your personal data, and the rights available to you as a "Data Principal".`}</p>
      <p>{`By using the Website, contacting us, or submitting any form, you acknowledge that you have read and understood this Privacy Policy.`}</p>

      <h2>1. Personal data we collect</h2>
      <p>{`We collect the following categories of personal data:`}</p>
      <ul>
        <li>{`Information you provide directly — when you fill in our contact or enquiry form, we collect your name, email address, phone number (if provided), and the contents of your message.`}</li>
        <li>{`Information collected automatically — when you visit the Website, we and our analytics providers may collect your IP address, device and browser type, pages viewed, referring page, and similar usage data through cookies and comparable technologies.`}</li>
        <li>{`Information from your communications — if you email, call, or message us, we keep a record of that correspondence.`}</li>
      </ul>
      <p>{`We do not knowingly collect sensitive personal data through the Website unless you choose to share it with us in your message.`}</p>

      <h2>2. How we use your personal data</h2>
      <p>{`We use your personal data only for clear, specified purposes, including to:`}</p>
      <ul>
        <li>{`respond to your enquiries and provide the information, quotes, or consultation you request;`}</li>
        <li>{`deliver, manage, and improve our services and our relationship with you;`}</li>
        <li>{`operate, maintain, secure, and improve the Website, including analytics and troubleshooting;`}</li>
        <li>{`send you service communications and, where you have consented, relevant updates; and`}</li>
        <li>{`comply with applicable law and protect our legal rights.`}</li>
      </ul>

      <h2>3. Legal basis and consent</h2>
      <p>{`We process your personal data on the basis of your consent and, where applicable, for certain legitimate uses permitted under the DPDP Act. When we rely on consent, that consent is free, specific, informed, unconditional, and given through a clear affirmative action — for example, by submitting our contact form or accepting cookies. You may withdraw your consent at any time as described in Section 8.`}</p>

      <h2>4. Cookies and analytics</h2>
      <p>{`The Website uses cookies and similar technologies to function correctly and to understand how visitors use it. We use Google Analytics for aggregate usage statistics. Analytics and advertising storage are set to "denied" by default and are only enabled if and when you grant consent. You can control or delete cookies through your browser settings; disabling some cookies may affect how the Website works.`}</p>

      <h2>5. How we share your personal data</h2>
      <p>{`We do not sell your personal data. We share it only as needed and with appropriate safeguards, with:`}</p>
      <ul>
        <li>{`Service providers (Data Processors) who act on our behalf — for example, our website hosting provider, our transactional email provider, and our workflow-automation tools — strictly to provide the services we engage them for;`}</li>
        <li>{`professional advisers, where reasonably necessary; and`}</li>
        <li>{`authorities or other parties where required to comply with law, enforce our terms, or protect the rights, safety, and property of any person.`}</li>
      </ul>

      <h2>6. Cross-border transfers</h2>
      <p>{`Some of our service providers may process or store data on servers located outside India. Where personal data is transferred outside India, we do so in accordance with the DPDP Act and take reasonable steps to ensure it remains protected.`}</p>

      <h2>7. Data retention</h2>
      <p>{`We retain your personal data only for as long as is necessary to fulfil the purposes for which it was collected, to maintain our business records, and to comply with legal obligations. When personal data is no longer required, we delete or anonymise it.`}</p>

      <h2>8. Your rights as a Data Principal</h2>
      <p>{`Subject to the DPDP Act, you have the right to:`}</p>
      <ul>
        <li>{`access a summary of the personal data we hold about you and how we process it;`}</li>
        <li>{`request correction, completion, or updating of inaccurate or incomplete data;`}</li>
        <li>{`request erasure of your personal data where it is no longer required;`}</li>
        <li>{`withdraw your consent at any time, as easily as it was given;`}</li>
        <li>{`nominate another individual to exercise your rights in the event of death or incapacity; and`}</li>
        <li>{`raise a grievance with us about how we handle your personal data.`}</li>
      </ul>
      <p>{`To exercise any of these rights, or to withdraw consent, email us at ${EMAIL}. Withdrawing consent does not affect the lawfulness of processing carried out before withdrawal, and we may continue processing where another lawful ground applies.`}</p>

      <h2>9. Children</h2>
      <p>{`The Website is intended for a business audience and is not directed at children. We do not knowingly process the personal data of any individual under the age of 18 without verifiable consent from a parent or lawful guardian, as required by the DPDP Act.`}</p>

      <h2>10. Data security</h2>
      <p>{`We implement reasonable technical and organisational security safeguards to protect your personal data against unauthorised access, disclosure, alteration, and loss. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.`}</p>

      <h2>11. Grievance Officer</h2>
      <p>{`In accordance with the DPDP Act and the Information Technology Act and rules, you may contact our Grievance Officer with any complaint or request regarding your personal data:`}</p>
      <ul>
        <li>{`Grievance Officer: ${GRIEVANCE_OFFICER}`}</li>
        <li>
          {'Email: '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </li>
        <li>{`Address: ${COMPANY}, ${ADDRESS}`}</li>
      </ul>
      <p>{`We will acknowledge and respond to your grievance within the timelines prescribed under applicable law. If you are not satisfied with our response, you may also lodge a complaint with the Data Protection Board of India.`}</p>

      <h2>12. Changes to this policy</h2>
      <p>{`We may update this Privacy Policy from time to time to reflect changes in our practices or the law. The "Last updated" date at the top of this page indicates when it was last revised. We encourage you to review it periodically.`}</p>

      <h2>13. Contact us</h2>
      <p>
        {`If you have any questions about this Privacy Policy or our data practices, please contact us at `}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        {' or via our '}
        <Link href="/contact">contact page</Link>
        {'.'}
      </p>
    </LegalLayout>
  );
}
