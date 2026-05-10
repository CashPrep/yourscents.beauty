import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Your Scents',
  description: 'How Your Scents collects, uses, and protects your personal data.',
}

const UPDATED = 'May 10, 2026'

export default function PrivacyPage() {
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

          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3" style={{ color: 'hsl(8 48% 72%)' }}>Legal</p>
          <h1 className="text-4xl font-normal serif mb-3">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: {UPDATED}</p>

          <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Who We Are</h2>
              <p>
                Your Scents (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website{' '}
                <a href="https://yourscents.beauty" className="underline hover:text-foreground">yourscents.beauty</a>.
                We provide a fragrance wardrobe and scent-layering platform. This Privacy Policy explains
                what personal data we collect, how we use it, and your rights regarding that data.
              </p>
              <p className="mt-3">
                For any privacy questions, please use the{' '}
                <Link href="/contact" className="underline hover:text-foreground">contact page</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. Data We Collect</h2>
              <p className="mb-3">We collect the following categories of personal data:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-foreground">Account data:</strong> Your name, email address, and password (hashed) when you create an account.</li>
                <li><strong className="text-foreground">Profile data:</strong> Your subscription plan and fragrance wardrobe contents.</li>
                <li><strong className="text-foreground">Payment data:</strong> Billing is handled by Stripe. We store only a Stripe Customer ID and Subscription ID — never your raw card details.</li>
                <li><strong className="text-foreground">Email signups:</strong> If you submit your email for a free scent profile, we store that email address.</li>
                <li><strong className="text-foreground">Usage data:</strong> Pages visited, features used, and session duration — collected via Google Analytics (anonymised IP).</li>
                <li><strong className="text-foreground">Technical data:</strong> Browser type, device type, operating system, and IP address.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Use Your Data</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To create and manage your account and subscription.</li>
                <li>To provide fragrance wardrobe and stack-builder features.</li>
                <li>To process payments and manage billing via Stripe.</li>
                <li>To send transactional emails (account confirmation, billing receipts).</li>
                <li>To send marketing emails <strong className="text-foreground">only if you have opted in</strong>.</li>
                <li>To improve the product through anonymised usage analytics.</li>
                <li>To comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Legal Basis (GDPR)</h2>
              <p>
                For users in the European Economic Area (EEA), we process your personal data under the following lawful bases:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li><strong className="text-foreground">Contract performance:</strong> Account creation, feature delivery, billing.</li>
                <li><strong className="text-foreground">Legitimate interests:</strong> Security, fraud prevention, product analytics.</li>
                <li><strong className="text-foreground">Consent:</strong> Marketing emails and optional cookies.</li>
                <li><strong className="text-foreground">Legal obligation:</strong> Tax records and regulatory compliance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Third-Party Services</h2>
              <p className="mb-3">We share data with the following trusted third parties only as necessary:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-foreground">Supabase</strong> — database and authentication hosting (data stored in the EU/US per their DPA).</li>
                <li><strong className="text-foreground">Stripe</strong> — payment processing. Governed by{' '}<a href="https://stripe.com/privacy" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>.</li>
                <li><strong className="text-foreground">Google Analytics</strong> — anonymised usage analytics. IP addresses are anonymised.</li>
                <li><strong className="text-foreground">Vercel</strong> — website hosting and edge delivery.</li>
              </ul>
              <p className="mt-3">We do not sell your personal data to any third party.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Cookies</h2>
              <p>
                We use essential cookies to keep you logged in and maintain session state. We also use Google Analytics
                cookies for anonymised traffic analysis. You can disable non-essential cookies in your browser settings
                at any time without affecting core functionality.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Data Retention</h2>
              <p>
                We retain your account data for as long as your account is active. If you delete your account,
                we remove your personal data within 30 days, except where retention is required by law
                (e.g., billing records retained for 7 years for tax purposes).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Your Rights</h2>
              <p className="mb-3">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-foreground">Access</strong> the personal data we hold about you.</li>
                <li><strong className="text-foreground">Correct</strong> inaccurate data.</li>
                <li><strong className="text-foreground">Delete</strong> your account and associated data.</li>
                <li><strong className="text-foreground">Restrict or object</strong> to certain processing activities.</li>
                <li><strong className="text-foreground">Data portability</strong> — receive your data in a machine-readable format.</li>
                <li><strong className="text-foreground">Withdraw consent</strong> for marketing emails at any time via the unsubscribe link.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please use the{' '}
                <Link href="/contact" className="underline hover:text-foreground">contact page</Link>.
                We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. Data Security</h2>
              <p>
                We use industry-standard security measures including TLS encryption in transit, encrypted
                storage at rest via Supabase, and Row Level Security (RLS) policies ensuring each user
                can only access their own data. Passwords are never stored in plaintext.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">10. Children&apos;s Privacy</h2>
              <p>
                Your Scents is not directed at children under the age of 13. We do not knowingly collect
                personal data from children under 13. If you believe we have inadvertently collected such
                data, please contact us immediately via the{' '}
                <Link href="/contact" className="underline hover:text-foreground">contact page</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify registered users of
                material changes by email or an in-app notice. Continued use of the service after changes
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">12. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please
                reach out via the{' '}
                <Link href="/contact" className="underline hover:text-foreground">contact page</Link>.
              </p>
            </section>

          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/terms"   className="hover:text-foreground transition-colors">Terms of Service</Link>
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
