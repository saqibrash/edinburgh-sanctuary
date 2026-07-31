import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { BookingSection, CancellationSection, PageHero } from "@/components/sections";
import { SITE_URL } from "@/data/site";

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
      description="The Restoration Room website is currently on hold by SR Innovations pending client payment. Contact details and booking are unavailable."
      path="/contact"
      jsonLd={jsonLd}
    />

    <PageHero
      eyebrow="Contact & Booking"
      title="Get in"
      script="touch."
      intro="Contact details and booking for this business are currently unavailable. This website has been placed on hold by SR Innovations because the client has not paid the agreed amount, and the matter is under dispute."
    />

    <BookingSection heading="Ready to take" script="time for you?" />

    <section className="relative py-16 md:py-24 px-6 md:px-10 bg-cream">
      <div className="max-w-[1000px] mx-auto text-center reveal">
        <div className="ornament mb-5"><span className="eyebrow">Finding Us</span></div>
        <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.15] mb-6">
          Massage in <span className="font-script text-rose">Silverknowes, EH4</span>
        </h2>
        <p className="text-taupe text-[17px] leading-[1.8] max-w-2xl mx-auto">
          The Restoration Room is a private treatment room in Silverknowes, north-west Edinburgh — a short drive from Davidsons Mains, Cramond, Blackhall, Barnton, Muirhouse and the city centre. Address and contact information have been withheld while the website is on hold.
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
