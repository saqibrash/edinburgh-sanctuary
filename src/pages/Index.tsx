import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import {
  BookingSection,
  CancellationSection,
  GallerySection,
  PillarsSection,
  TestimonialsSection,
} from "@/components/sections";
import { FRESHA_URL, PHONE, PHONE_HREF, SITE_URL, camilla, treatments } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Massage in Silverknowes, Edinburgh | The Restoration Room",
  url: `${SITE_URL}/`,
  about: { "@id": `${SITE_URL}/#business` },
};

const Index = () => (
  <>
    <Seo
      title="Massage in Silverknowes, Edinburgh | The Restoration Room"
      description="Massage therapist in Silverknowes, Edinburgh. Swedish and bespoke restorative massage with Camilla in a calm, private treatment room. Free parking. Book online."
      path="/"
      jsonLd={jsonLd}
    />

    {/* HERO */}
    <section className="relative min-h-dvh w-full overflow-hidden pt-28 lg:pt-0 bg-brand-radial">
      <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-blush/60 blur-3xl float-slow pointer-events-none" aria-hidden />
      <div className="absolute bottom-10 right-0 w-72 h-72 rounded-full bg-nude/50 blur-3xl float-slow pointer-events-none" aria-hidden />

      <div className="relative lg:grid lg:grid-cols-12 lg:min-h-dvh max-w-[1500px] mx-auto">
        <div className="lg:col-span-6 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-14 lg:py-28 z-10">
          <div className="fade-up max-w-xl">
            <div className="ornament mb-6">
              <span className="eyebrow">Silverknowes, Edinburgh · Est. 2008</span>
            </div>
            <h1 className="font-display text-ink text-[46px] sm:text-[58px] lg:text-[76px] leading-[1.02] tracking-tight">
              Restore.<br />
              Relax.<br />
              <span className="font-script text-rose">Rebalance.</span>
            </h1>
            <div className="flex items-center gap-3 my-8" aria-hidden>
              <span className="h-px w-14 bg-gold" />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold"><path d="M12 2c2 5 5 8 10 10-5 2-8 5-10 10-2-5-5-8-10-10 5-2 8-5 10-10z" fill="currentColor" opacity="0.6" /></svg>
              <span className="h-px w-14 bg-gold" />
            </div>
            <p className="text-taupe text-lg lg:text-xl leading-relaxed max-w-md mb-4 font-light">
              Personalised massage therapy in a calm, cosy treatment room in Silverknowes, Edinburgh , Swedish and bespoke restorative massage tailored to you.
            </p>
            <p className="sr-only">
              The Restoration Room by Camilla is a massage therapist in Silverknowes, Edinburgh, offering Swedish massage, bespoke restorative massage, deep tissue and acupressure treatments for clients across Edinburgh and nearby areas including Davidsons Mains, Cramond, Blackhall and Barnton.
            </p>
            <div className="mb-8" aria-hidden />

            <div className="flex flex-wrap gap-3">
              <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Book on Fresha</a>
              <Link to="/contact" className="btn-secondary">Booking Information</Link>
              <a href="#treatments" className="text-[11px] tracking-[0.28em] uppercase text-rose hover:text-rose-deep transition-colors self-center">Discover Treatments →</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-taupe">
              <span className="inline-flex items-center gap-2"><span className="text-gold">P</span> Free Parking</span>
              <span className="inline-flex items-center gap-2"><span className="text-gold">✓</span> Fully Insured</span>
              <span className="inline-flex items-center gap-2"><span className="text-gold">★</span> Qualified Since 2008</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative min-h-[60vh] lg:min-h-dvh flex items-center justify-center p-6 md:p-10 lg:p-14">
          <div className="relative w-full max-w-[640px]">
            <div className="lux-image relative rounded-lg overflow-hidden border border-blush shadow-[0_30px_80px_-40px_rgba(120,80,60,0.5)] bg-blush/20">
              <img
                src="/assets/hero-brand.jpeg"
                alt="The Restoration Room by Camilla , brand mark with candle, pampas grass and stacked massage stones"
                className="block w-full h-auto object-contain"
                loading="eager"
                {...{ fetchpriority: "high" }}
              />
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gold/70" aria-hidden />
          </div>
        </div>
      </div>
    </section>

    {/* WELCOME */}
    <section className="relative py-24 md:py-36 px-6 md:px-10 bg-cream">
      <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        <div className="reveal order-2 lg:order-1">
          <div className="ornament mb-6"><span className="eyebrow">Welcome</span></div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.1] mb-8">
            Your massage therapist in<br />
            <span className="font-script text-rose">Silverknowes, Edinburgh.</span>
          </h2>
          <div className="space-y-5 text-taupe text-[17px] leading-[1.8] max-w-xl">
            <p>
              My journey began with a passion for helping others improve their wellbeing through the power of therapeutic touch and holistic care.
            </p>
            <p>
              I qualified in Level 3 Swedish Massage in 2008 and have since completed advanced training in deep tissue massage, acupressure and trigger point release , allowing me to offer both deeply relaxing therapies and more targeted work for muscular tension.
            </p>
            <p>
              I work from a peaceful, cosy treatment room within my home in Silverknowes, EH4, carefully designed to provide a calm and restorative experience, with free parking right outside.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/about" className="btn-primary">More about Camilla</Link>
            <a href={PHONE_HREF} className="btn-secondary">{PHONE}</a>
          </div>
        </div>

        <div className="reveal order-1 lg:order-2 relative">
          <div className="relative w-full max-w-[520px] mx-auto aspect-[4/5]">
            <div className="absolute inset-0 border border-gold/50 rounded-md translate-x-4 translate-y-4" aria-hidden />
            <div className="lux-image absolute inset-0">
              <img src={camilla} alt="Camilla, therapist and founder of The Restoration Room" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-cream border border-blush rounded-md p-4 shadow-lg">
              <div className="font-script text-rose text-2xl leading-none">Camilla</div>
              <div className="text-[10px] tracking-[0.32em] uppercase text-taupe mt-1">Qualified since 2008</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* TREATMENTS OVERVIEW */}
    <section id="treatments" className="relative py-24 md:py-36 px-6 md:px-10 bg-blush/40">
      <div className="max-w-[1300px] mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="ornament mb-5"><span className="eyebrow">Treatments</span></div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.1] mb-5">
            Massage treatments in Silverknowes to help you<br />
            <span className="font-script text-rose">relax, restore</span> and feel your best.
          </h2>
          <p className="text-taupe text-[15px] leading-relaxed">
            Swedish massage, bespoke restorative massage and shorter rituals , all delivered from a private treatment room in Silverknowes, Edinburgh, with free parking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {treatments.map((t, i) => (
            <div
              key={t.slug}
              className="reveal group bg-cream rounded-lg overflow-hidden shadow-[0_20px_50px_-30px_rgba(120,80,60,0.3)] hover:shadow-[0_30px_60px_-30px_rgba(120,80,60,0.45)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Link to={t.slug} className="lux-image aspect-[4/3] rounded-none block">
                <img src={t.image} alt={t.imageAlt} className="w-full h-full object-cover" loading="lazy" />
              </Link>
              <div className="p-8 md:p-10 text-center flex flex-col flex-1">
                <h3 className="font-display text-[22px] md:text-2xl text-ink leading-tight uppercase tracking-wide mb-4">
                  <Link to={t.slug} className="hover:text-rose transition-colors">{t.name}</Link>
                </h3>
                <div className="w-10 h-px bg-gold mx-auto mb-5" aria-hidden />
                <p className="text-taupe text-[15px] leading-[1.75] mb-6 max-w-md mx-auto text-left flex-1">{t.intro}</p>
                <div className="inline-block bg-blush/40 rounded-md border border-blush px-6 py-4 mb-6 mx-auto">
                  <div className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3">Pricing</div>
                  <ul className="space-y-2 text-sm text-ink">
                    {t.prices.map((p) => (
                      <li key={p.duration} className="flex items-center justify-between gap-8">
                        <span className="text-taupe">{p.duration}</span>
                        <span className="font-display text-rose">{p.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link to={t.slug} className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-rose hover:text-rose-deep transition-colors">
                    Read more <span aria-hidden>→</span>
                  </Link>
                  <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-taupe hover:text-ink transition-colors">
                    Book on Fresha ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CancellationSection />
    <PillarsSection />
    <GallerySection />
    <TestimonialsSection />
    <BookingSection />
  </>
);

export default Index;
