import LegalLayout from "@/components/LegalLayout";
import Seo from "@/components/Seo";

const EMAIL = "therestorationroom85@gmail.com";
const PHONE = "07570 161699";

const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy" updated="July 2026">
    <Seo
      title="Privacy Policy | The Restoration Room, Edinburgh"
      description="How The Restoration Room by Camilla in Silverknowes, Edinburgh handles your information, including bookings made through Fresha and basic website data."
      path="/privacy-policy"
    />

    <p>
      This privacy policy explains how The Restoration Room by Camilla handles information in
      connection with this website. We keep things simple: this site is an information and
      shop-window website, and it does not take bookings or payments directly.
    </p>

    <section>
      <h2>Who we are</h2>
      <p>
        The Restoration Room by Camilla, a massage therapy practice based in Silverknowes, EH4,
        Edinburgh. You can contact us on{" "}
        <a href="tel:+447570161699">{PHONE}</a> or by email at{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. These are the business contact details displayed on
        this website.
      </p>
    </section>

    <section>
      <h2>Bookings and payments</h2>
      <p>
        All appointments are booked through our Fresha booking page. When you click a booking button
        on this website you are taken to an external Fresha page, and any details you enter there —
        including your name, contact details and payment information — are collected and processed by
        Fresha under their own privacy policy and terms.
      </p>
      <p>
        This website does not collect or store any card or payment details. Deposits and payments are
        handled entirely by Fresha and their payment providers.
      </p>
    </section>

    <section>
      <h2>Contacting us directly</h2>
      <p>
        If you call, text or email us, we will hold the details you give us (such as your name,
        contact details and any information you choose to share about your treatment needs) only for
        as long as needed to answer your enquiry and to provide your treatment safely.
      </p>
    </section>

    <section>
      <h2>Website and analytics data</h2>
      <p>
        Basic technical information may be collected automatically when you visit this website, such
        as your browser type, device type, approximate location and the pages you view. Where
        analytics are used, this data is aggregated and used only to understand how the site is
        performing and to improve it. It is not used to identify you personally.
      </p>
    </section>

    <section>
      <h2>External links</h2>
      <p>
        This website links to Fresha and may link to other external sites. We are not responsible for
        the content or privacy practices of those websites, so please read their own policies.
      </p>
    </section>

    <section>
      <h2>Your rights and how to contact us</h2>
      <p>
        Under UK data protection law you can ask us what information we hold about you, ask us to
        correct it, or ask us to delete it. To make a request, or if you have any question about your
        data, please email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{" "}
        <a href="tel:+447570161699">{PHONE}</a>. For information held by Fresha, please contact
        Fresha directly.
      </p>
    </section>
  </LegalLayout>
);

export default PrivacyPolicy;
