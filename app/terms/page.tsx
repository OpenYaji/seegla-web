import type { Metadata } from 'next'
import LegalShell, { LegalSection } from '@/components/landing-page/legal-shell'

export const metadata: Metadata = {
  title: 'Terms of Service | SEEGLA',
  description: 'The terms that govern use of the Seegla corporate wellness platform.',
}

const UPDATED = '20 October 2026'

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      updated={UPDATED}
      intro="These terms govern the use of the Seegla platform by employer accounts and by the employees those employers enrol."
    >
      <LegalSection heading="1. Acceptance of these terms">
        <p>
          An employer accepts these terms when it signs up for Seegla. An employee who joins
          a company on Seegla accepts them by creating an account and using the app. If you
          do not accept these terms, do not use the service.
        </p>
      </LegalSection>

      <LegalSection heading="2. Who may use Seegla">
        <p>
          Seegla is a business-to-business service. An employer enrols its company, and
          employees join using a company code issued by their employer. We do not sell
          Seegla directly to individuals.
        </p>
      </LegalSection>

      <LegalSection heading="3. Accounts and company codes">
        <p>
          The employer receives a unique company code when it enrols. Employees enter that
          code in the app to join. Company codes are not passwords and should be treated as
          confidential by the employer. An employer is responsible for the activity of the
          accounts issued under its code.
        </p>
      </LegalSection>

      <LegalSection heading="4. Use of the service">
        <p>
          Seegla is available on iOS and Android, and no wearable device is required. You may
          use the app only for your own wellness and for participating in your employer&apos;s
          programme. You may not reverse engineer, scrape, resell, or misuse the service or
          its data, and you may not attempt to identify the individuals behind aggregated
          team scores.
        </p>
      </LegalSection>

      <LegalSection heading="5. Rewards">
        <p>
          Employers fund their own rewards budget and set their own rewards table, for
          example 1,000 points exchanged for ₱50 through GCash. Seegla operates the points
          balance and processes redemptions against the table the employer has set. Rewards
          are a benefit the employer provides, not a contractual promise of Seegla, and they
          are subject to the availability and terms of the payment partner handling the
          redemption.
        </p>
      </LegalSection>

      <LegalSection heading="6. Beta programme">
        <p>
          Seegla is currently in beta and is free for partner companies. The beta programme
          is closed to new applicants, and we may change, suspend, or withdraw any part of
          the service during the beta. Public pricing will be communicated before it takes
          effect.
        </p>
      </LegalSection>

      <LegalSection heading="7. Seegla is not a healthcare provider">
        <p>
          Seegla is a wellness and engagement tool. Check-ins, hydration and sleep logs,
          activity data, scores, and streaks are not medical advice, not a diagnosis, and
          not a substitute for professional care. Nothing in the service should be used to
          make a clinical decision about a person. If you have a health concern, speak to a
          qualified professional.
        </p>
      </LegalSection>

      <LegalSection heading="8. Your content and our rights">
        <p>
          You keep ownership of the information you enter. You grant Seegla the limited
          licence needed to host, process, and display that information to you, to your
          employer in aggregate, and to operate the service, as described in the Privacy
          Policy. We own the service itself, including its software, design, and the
          Seegla name and marks.
        </p>
      </LegalSection>

      <LegalSection heading="9. Availability and liability">
        <p>
          We work to keep Seegla available, but we do not guarantee that it will be
          uninterrupted or error-free. To the fullest extent the law allows, Seegla is
          provided as is, and our total liability arising out of or relating to the service
          is limited to the fees paid for the service in the twelve months before the claim
          arose. We are not liable for indirect or consequential loss, or for loss of
          profits, wages, or employment.
        </p>
      </LegalSection>

      <LegalSection heading="10. Suspension and termination">
        <p>
          An employer may stop using Seegla at any time, and an employee may leave their
          company programme at any time. We may suspend or terminate access where a party
          breaches these terms, or where required by law.
        </p>
      </LegalSection>

      <LegalSection heading="11. Governing law">
        <p>
          These terms are governed by the laws of the Republic of the Philippines, and the
          courts of the Philippines have exclusive jurisdiction over any dispute arising
          from them.
        </p>
      </LegalSection>

      <LegalSection heading="12. Changes to these terms">
        <p>
          We may update these terms. We will revise the date at the top when we do, and
          material changes will be announced in the app or to the employer before they take
          effect. Continuing to use Seegla after that means accepting the updated terms.
        </p>
      </LegalSection>

      <LegalSection heading="13. Contact">
        <p>
          For any question about these terms, contact us through the waitlist form on this
          site.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
