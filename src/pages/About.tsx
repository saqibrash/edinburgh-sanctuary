import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { BookingSection, GallerySection, PageHero, PillarsSection } from "@/components/sections";
import { PHONE, PHONE_HREF, SITE_URL, camilla, gDoor } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/about`,
  name: "About Camilla — Massage Therapist in Silverknowes, Edinburgh",
  about: { "@id": `${SITE_URL}/#business` },
};

const About = () => (
  <>
    <Seo
      title="About Camilla | Massage Therapist in Silverknowes, Edinburgh"
      description="Meet Camilla, a massage therapist qualified since 2008 working from a private treatment room in Silverknowes, Edinburgh. Holistic, personalised care and free parking."
      path="/about"
      jsonLd={jsonLd}
    />

    <PageHero
      eyebrow="About · Silverknowes, Edinburgh"
      title="Meet"
      script="Camilla."
      intro="A qualified massage therapist since 2008, offering holistic, personalised treatments from a calm private room in Silverknowes, EH4."
    />

    <section className="relative py-16 md:py-24 px-6 md:px-10 bg-cream">
      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
        <div className="reveal">
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.15] mb-8">
            My approach to <span className="font-script text-rose">massage therapy</span>
          </h2>
          <div className="space-y-5 text-taupe text-[17px] leading-[1.8]">
            <p>
              My journey began with a passion for helping others improve their wellbeing through the power of therapeutic touch and holistic care.
            </p>
            <p>
              I qualified in Level 3 Swedish Massage in 2008. More recently, I completed an advanced massage course, training in techniques that enable me to incorporate deep tissue massage, acupressure, and trigger point release into my treatments. This allows me to offer both deeply relaxing therapies and more targeted work to address muscular tension, discomfort, and areas of chronic stress within the body.
            </p>
            <p>
              My approach is holistic, recognising the connection between physical wellbeing, emotional balance, and overall health. Whether you are seeking relief from aches and pains, support with stress management, or simply time to rest and recharge, each treatment is tailored to your individual needs and goals.
            </p>
            <p>
              I work from a peaceful, cosy treatment room within my home, carefully designed to provide a calm and restorative experience. Soft lighting, candlelight, a heated massage couch, carefully selected essential oils, and a tranquil atmosphere create a warm and welcoming space where you can relax, unwind, and focus entirely on your wellbeing.
            </p>
            <p>
              I am passionate about helping my clients feel their best and take pride in providing professional, personalised treatments that deliver meaningful results. My aim is for every client to leave feeling more comfortable, balanced, and refreshed than when they arrived.
            </p>
            <p>
              I look forward to welcoming you to The Restoration Room and supporting you on your journey towards greater relaxation, wellbeing and self-care in a peaceful and nurturing environment.
            </p>
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.15] mt-14 mb-6">
            Where you'll <span className="font-script text-rose">find me</span>
          </h2>
          <p className="text-taupe text-[17px] leading-[1.8]">
            The treatment room is based in Silverknowes, EH4, in the north-west of Edinburgh — an easy journey from Davidsons Mains, Cramond, Blackhall, Barnton, Muirhouse and the city centre. Free on-street parking is available right outside, so you can arrive calmly and unhurried.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">Booking Information</Link>
            <a href={PHONE_HREF} className="btn-secondary">{PHONE}</a>
          </div>
        </div>

        <div className="reveal space-y-6 lg:sticky lg:top-32">
          <div className="lux-image rounded-lg overflow-hidden border border-blush">
            <img src={camilla} alt="Camilla, qualified massage therapist in Silverknowes, Edinburgh" className="w-full h-auto object-cover" loading="lazy" />
          </div>
          <div className="lux-image rounded-lg overflow-hidden border border-blush">
            <img src={gDoor} alt="Camilla's framed massage therapy qualifications in the treatment room" className="w-full h-auto object-cover" loading="lazy" />
          </div>
          <div className="bg-blush/30 border border-blush rounded-lg p-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Qualifications & Training</div>
            <ul className="space-y-2 text-sm text-taupe leading-relaxed">
              <li>Level 3 Swedish Massage — qualified 2008</li>
              <li>Advanced massage training: deep tissue, acupressure and trigger point release</li>
              <li>Fully insured</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <PillarsSection />
    <GallerySection />
    <BookingSection heading="Come and meet" script="Camilla." />
  </>
);

export default About;
