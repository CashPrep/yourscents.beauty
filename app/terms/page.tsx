import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Your Scents',
  description: 'Terms and conditions for using Your Scents.',
}

const UPDATED = 'May 9, 2026'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0">
            <Image src="/logo.png" alt="Your Scents Logo" width={120} height={48} className="h-12 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to home</Link>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'hsl(8 48% 72%)' }}>Legal</p>
          <h1 className="text-4xl font-normal serif mb-3">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: {UPDATED}</p>

          <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By creating an account or using any part of the Your Scents service at{' '}
                <a href="https://yourscents.beauty" className="underline hover:text-foreground">yourscents.beauty</a>
                {' '}(&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;).
                If you do not agree, do not use the Service.
              </p>
              <p className="mt-3">
                These Terms constitute a legally binding agreement between you and Your Scents
                (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). We may update these Terms at any time.
                Material changes will be communicated via email or in-app notice. Continued use after
                changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. Eligibility</h2>
              <p>
                You must be at least 13 years old to use the Service. By using the Service, you represent
                that you meet this requirement and that all information you provide is accurate and complete.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. Your Account</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and
                for all activity that occurs under your account. Notify us immediately at{' '}
                <a href="mailto:support@yourscents.beauty" className="underline hover:text-foreground">support@yourscents.beauty</a>
                {' '}if you suspect unauthorised access.
              </p>
              <p className="mt-3">
                We reserve the right to suspend or terminate accounts that violate these Terms, engage
                in fraudulent activity, or are inactive for an extended period.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Subscription Plans &amp; Billing</h2>
              <p className="mb-3">
                Your Scents offers the following plans:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-foreground">Free:</strong> Access to core features at no cost, subject to usage limits.</li>
                <li><strong className="text-foreground">Pro ($7.99/month):</strong> Unlimited wardrobe, unlimited layering combinations, full occasion planner, and more.</li>
                <li><strong className="text-foreground">Collector ($14.99/month):</strong> Everything in Pro, plus public profile, wishlist tracking, bottle levels, and priority support.</li>
              </ul>
              <p className="mt-4">
                Paid subscriptions are billed monthly in advance. Billing is processed securely by Stripe.
                By subscribing, you authorise us to charge your payment method on a recurring monthly basis
                until you cancel.
              </p>
              <p className="mt-3">
                Prices may change with 30 days&apos; notice. Continued use after a price change constitutes
                acceptance of the new pricing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Cancellation &amp; Refunds</h2>
              <p>
                You may cancel your subscription at any time from your account settings or by contacting
                support. Cancellation takes effect at the end of the current billing period — you retain
                full access to your paid plan until that date.
              </p>
              <p className="mt-3">
                We do not offer prorated refunds for partial billing periods. If you believe you were
                charged in error, contact us within 14 days at{' '}
                <a href="mailto:support@yourscents.beauty" className="underline hover:text-foreground">support@yourscents.beauty</a>
                {' '}and we will review your case.
              </p>
              <p className="mt-3">
                After cancellation, your account downgrades to the Free plan. Your fragrance wardrobe
                data is retained and accessible on the Free tier.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Acceptable Use</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the Service for any unlawful purpose or in violation of any applicable law.</li>
                <li>Attempt to reverse-engineer, scrape, or extract data from the Service at scale.</li>
                <li>Use automated bots or scripts to interact with the Service without prior written consent.</li>
                <li>Impersonate another person or misrepresent your affiliation with any entity.</li>
                <li>Introduce malware, viruses, or any code designed to disrupt or damage the Service.</li>
                <li>Attempt to gain unauthorised access to any part of the Service or its infrastructure.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Service — including the codebase, design,
                fragrance compatibility algorithms, text, and graphics — are owned by Your Scents and
                protected by applicable intellectual property laws.
              </p>
              <p className="mt-3">
                You retain ownership of any personal data you add to the Service (e.g., your wardrobe,
                personal notes). By submitting content, you grant us a limited, non-exclusive licence
                to use it solely to provide the Service to you.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Third-Party Fragrance Data</h2>
              <p>
                Fragrance note data, brand names, and product names displayed on the Service are the
                intellectual property of their respective owners. Your Scents displays this information
                for informational and personal organisational purposes only. We are not affiliated with,
                endorsed by, or sponsored by any fragrance brand referenced on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. Disclaimer of Warranties</h2>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
                express or implied, including but not limited to warranties of merchantability, fitness
                for a particular purpose, or non-infringement.
              </p>
              <p className="mt-3">
                We do not warrant that the Service will be uninterrupted, error-free, or that fragrance
                compatibility scores will produce any particular real-world result. Scent layering
                suggestions are informational and based on algorithmic analysis — individual results vary.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Your Scents shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages arising from your use of or
                inability to use the Service, including loss of data, revenue, or profits, even if we
                have been advised of the possibility of such damages.
              </p>
              <p className="mt-3">
                Our total liability to you for any claim arising out of or relating to these Terms or
                the Service shall not exceed the amount you paid us in the 3 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">11. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Your Scents and its officers, employees, and
                agents from any claims, damages, losses, or expenses (including legal fees) arising out
                of your use of the Service, your violation of these Terms, or your violation of any
                third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">12. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to the Service at our discretion,
                with or without notice, if we determine you have violated these Terms. Upon termination,
                your right to use the Service ceases immediately.
              </p>
              <p className="mt-3">
                You may delete your account at any time. Upon deletion, your personal data will be
                removed within 30 days in accordance with our{' '}
                <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">13. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the Commonwealth of Massachusetts, United States,
                without regard to its conflict of law provisions. Any disputes shall be resolved in the
                courts of Massachusetts.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">14. Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <p className="mt-3">
                <strong className="text-foreground">Your Scents</strong><br />
                <a href="mailto:support@yourscents.beauty" className="underline hover:text-foreground">support@yourscents.beauty</a>
              </p>
            </section>

          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link href="/"        className="hover:text-foreground transition-colors">← Back to home</Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6" style={{ background: 'hsl(10 45% 95%)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Your Scents. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
