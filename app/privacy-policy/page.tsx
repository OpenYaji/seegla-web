import type { Metadata } from 'next'
import LegalShell, { LegalSection } from '@/components/landing-page/legal-shell'

export const metadata: Metadata = {
  title: 'Privacy Policy | SEEGLA',
  description:
    'How Seegla collects, uses, and protects employee wellness data, and what employers can and cannot see.',
}

const UPDATED = '20 October 2026'

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      updated={UPDATED}
      intro="This policy explains what Seegla collects, why we collect it, and what your employer can and cannot see."
    >
      <LegalSection heading="1. Who we are">
        <p>
          Seegla is a corporate wellness platform operated for companies in the Philippines.
          Employers buy the service, employees use the mobile app, and we provide the
          dashboards, the rewards processing, and the point-in-time support that go with it.
        </p>
        <p>
          We act as a personal information processor for the wellness data that employees
          enter in the app, and as a personal information controller for the business
          information employers give us, such as the contact details submitted through the
          waitlist form on this site.
        </p>
      </LegalSection>

      <LegalSection heading="2. What we collect">
        <p>
          <span className="font-semibold text-navy">From your employer.</span> Company name,
          company size, and the name, work email, and role of the person who enrols the
          company. Employers do not receive employee account details.
        </p>
        <p>
          <span className="font-semibold text-navy">From employees using the app.</span> The
          answers given in the daily check-in, plus optional hydration and sleep logs, and
          activity data where an employee chooses to connect a health platform such as
          Google Fit or Apple Health. No wearable device is required.
        </p>
        <p>
          <span className="font-semibold text-navy">From this website.</span> If you submit
          the waitlist form, we store your full name, work email, company name, company size,
          and role so we can contact you when the program opens.
        </p>
      </LegalSection>

      <LegalSection heading="3. What your employer can and cannot see">
        <p>
          Individual employee responses are private. Employers see aggregated, anonymized
          team and department-level wellness scores, and nothing that identifies a person
          or lets an individual be singled out from a small group.
        </p>
        <p>
          <span className="font-semibold text-navy">Your employer does not see:</span> your
          individual check-in answers, your hydration or sleep entries, your activity data,
          your streak, or any personal profile attached to a single response.
        </p>
        <p>
          <span className="font-semibold text-navy">Your employer does see:</span> how a
          team scores in aggregate, and how engagement changes over time.
        </p>
      </LegalSection>

      <LegalSection heading="4. How we use the data">
        <p>
          We use employee data to produce the aggregated team and department scores that
          make the service work, to operate streaks, challenges, and reminders inside the
          app, and to let employees spend the points their employer funded. We use the
          business information you submit through this site to contact you about the beta
          program.
        </p>
        <p>
          We do not sell personal information, and we do not use employee wellness data for
          advertising.
        </p>
      </LegalSection>

      <LegalSection heading="5. Sharing">
        <p>
          We share information only with the parties that need it to run the service: the
          employer that has contracted with us, processors that host our infrastructure and
          deliver app-store notifications, and the payment and rewards partners needed to
          fulfil a redemption, such as GCash where an employer has set up a GCash rewards
          table. We also disclose information where the law requires it.
        </p>
      </LegalSection>

      <LegalSection heading="6. Retention">
        <p>
          We keep employee wellness data for as long as the employer&apos;s agreement with us
          is in force, and then delete or de-identify it. Waitlist details are kept until
          you ask us to remove them or until the beta program concludes, whichever comes
          first.
        </p>
      </LegalSection>

      <LegalSection heading="7. Your rights">
        <p>
          Under the Philippine Data Privacy Act of 2012, Republic Act No. 10173, you have the
          right to be informed, to access your personal information, to have it corrected,
          to be compensated for damage caused by false or unlawfully obtained information,
          to object to processing, and to have your personal information removed where the
          law allows it. To exercise any of these, contact us and we will act on it.
        </p>
      </LegalSection>

      <LegalSection heading="8. Security">
        <p>
          We use encryption in transit, restrict access to employee data to staff who need
          it for the purposes above, and aggregate data before it reaches an employer
          dashboard. No system is perfectly secure, and we do not claim otherwise.
        </p>
      </LegalSection>

      <LegalSection heading="9. Contact">
        <p>
          For any privacy question, or to exercise a right listed above, contact us through
          the waitlist form on this site and we will route it to the right person.
        </p>
      </LegalSection>

      <LegalSection heading="10. Changes to this policy">
        <p>
          We will update this page when our practices change, and revise the date at the top
          when we do. Material changes affecting employees will be announced in the app
          before they take effect.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
