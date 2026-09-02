import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyComponent,
  head: () => ({
    meta: [{ title: "Privacy Policy — Cropwise" }],
  }),
});

function PrivacyPolicyComponent() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <PageHeader
          kicker="Legal"
          title="Privacy Policy"
          description="We take your privacy seriously. Here’s how Cropwise handles your data."
        />

        <div className="reveal mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-xl text-foreground">1. Information we collect</h2>
            <p className="mt-2">
              We collect information you provide directly, such as your name, email address, garden location, and content you create in the app. We also collect usage data, including pages visited, features used, and device information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">2. How we use your information</h2>
            <p className="mt-2">
              We use your data to provide and improve Cropwise, personalize your experience, send updates you request, and ensure the security of our services. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">3. Data sharing and disclosure</h2>
            <p className="mt-2">
              We may share data with trusted service providers who assist in operating the app, conducting business, or serving users. We may also disclose information when required by law or to protect rights, property, or safety.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">4. Cookies and tracking</h2>
            <p className="mt-2">
              Cropwise uses essential cookies and local storage to maintain your session and preferences. We may use analytics tools to understand usage patterns. You can disable cookies in your browser, but some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">5. Data security</h2>
            <p className="mt-2">
              We implement appropriate technical and organizational measures to protect your data. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">6. Your rights</h2>
            <p className="mt-2">
              You have the right to access, correct, or delete your personal data. You may also object to processing or request data portability. To exercise these rights, contact us at privacy@cropwise.example.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">7. Children’s privacy</h2>
            <p className="mt-2">
              Cropwise is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">8. Changes to this policy</h2>
            <p className="mt-2">
              We may update this privacy policy from time to time. We will notify users of significant changes via email or an in-app notice. Continued use of Cropwise after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">9. Contact us</h2>
            <p className="mt-2">
              If you have questions about this privacy policy, please contact us at privacy@cropwise.example or through our contact page.
            </p>
          </section>

          <p className="mt-10 text-xs text-muted-foreground">
            Last updated: September 2026
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
