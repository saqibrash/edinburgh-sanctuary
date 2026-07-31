import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { BookingSection, CancellationSection, PageHero } from "@/components/sections";
import { ADDRESS, EMAIL, PHONE, SITE_URL } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/contact`,
  name: "Contact The Restoration Room, Silverknowes, Edinburgh",
  about: { "@id": `${SITE_URL}/#business` },
};

const Contact = () => (
  <>
    <Seo
      title="Contact & Booking | Massage in Silverknowes, Edinburgh"
      description={`Contact The Restoration Room in Silverknowes, Edinburgh. Call ${PHONE}, email ${EMAIL} or book your massage online with Fresha. Free parking.`}
      path="/contact"
      jsonLd={jsonLd}
    />

    <PageHero
      eyebrow="Contact & Booking"
      title="Get in"
      script="touch."
      intro={`Booking, questions or advice on choosing a treatment — we are happy to help. The treatment room is in ${ADDRESS}, with free parking outside.`}
    />

    <BookingSection heading="Ready to take" script="time for you?" />

    <section className="relative py-16 md:py-24 px-6 md:px-10 bg-cream">
      <div className="max-w-[1000px] mx-auto text-center reveal">
        <div className="ornament mb-5"><span className="eyebrow">Finding Us</span></div>
        <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.15] mb-6">
          Massage in <span className="font-script text-rose">Silverknowes, EH4</span>
        </h2>
        <p className="text-taupe text-[17px] leading-[1.8] max-w-2xl mx-auto">
          The Restoration Room is a private treatment room in Silverknowes, north-west Edinburgh — a short drive from Davidsons Mains, Cramond, Blackhall, Barnton, Muirhouse and the city centre. Full address details are sent with your Fresha booking confirmation.
        </p>
        <p className="text-taupe text-[17px] leading-[1.8] max-w-2xl mx-auto mt-4">
          Not sure which treatment to choose? Read more about our{" "}
          <Link to="/swedish-massage" className="text-rose underline underline-offset-4">Swedish massage</Link>,{" "}
          <Link to="/bespoke-massage" className="text-rose underline underline-offset-4">bespoke restorative massage</Link>,{" "}
          <Link to="/foot-ritual" className="text-rose underline underline-offset-4">restorative foot ritual</Link> or{" "}
          <Link to="/indian-head-massage" className="text-rose underline underline-offset-4">Indian head style scalp massage</Link>.
        </p>
      </div>
    </section>

    <CancellationSection />
  </>
);

export default Contact;
