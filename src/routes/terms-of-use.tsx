import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/terms-of-use")({
  component: TermsOfUseComponent,
  head: () => ({
    meta: [{ title: "Terms of Use — Cropwise" }],
  }),
});

function TermsOfUseComponent() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <PageHeader
          kicker="Legal"
          title="Terms of Use"
          description="These terms govern your use of Cropwise. Please read them carefully."
        />

        <div className="reveal mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-xl text-foreground">1. Acceptance of terms</h2>
            <p className="mt-2">
              By accessing or using Cropwise, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services. We may update these terms from time to time, and continued use of the platform constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">2. Description of service</h2>
            <p className="mt-2">
              Cropwise provides tools for urban gardeners to plan garden plots, track plant growth, manage care calendars, shop for gardening supplies, and connect with a community of growers. The service is provided “as is” and may be modified, updated, or discontinued at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">3. User accounts</h2>
            <p className="mt-2">
              You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You agree to provide accurate information when creating an account and to update it as needed. We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">4. Acceptable use</h2>
            <p className="mt-2">
              You agree not to use Cropwise for any unlawful, harmful, or abusive purpose. This includes posting offensive content, harassing other users, attempting to gain unauthorized access to our systems, or using the service to distribute spam or malware. We may remove content or restrict access for violations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">5. Intellectual property</h2>
            <p className="mt-2">
              All content, features, and functionality of Cropwise, including text, graphics, logos, and software, are the property of Cropwise or its licensors and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">6. Third-party services</h2>
            <p className="mt-2">
              Cropwise may integrate with third-party services, such as image providers, payment processors, or analytics tools. We are not responsible for the practices or content of third-party services, and your use of them is governed by their own terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">7. Disclaimer of warranties</h2>
            <p className="mt-2">
              The service is provided without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free. Gardening results vary based on many factors beyond our control, and Cropwise is not responsible for plant outcomes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">8. Limitation of liability</h2>
            <p className="mt-2">
              To the fullest extent permitted by law, Cropwise shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service. Our total liability to you for any claim shall not exceed the amount you paid us, if any, for access to the service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">9. Termination</h2>
            <p className="mt-2">
              We reserve the right to suspend or terminate your access to Cropwise at any time, with or without cause, and with or without notice. Upon termination, your right to use the service will cease, and any data associated with your account may be deleted in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">10. Governing law</h2>
            <p className="mt-2">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Cropwise operates, without regard to conflict of law principles. Any disputes shall be resolved in the courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">11. Contact</h2>
            <p className="mt-2">
              If you have questions about these Terms of Use, please contact us at legal@cropwise.example or through our contact page.
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
