import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { BookingSection, OtherTreatments, PageHero } from "@/components/sections";
import { SITE_URL, Treatment, treatments } from "@/data/site";

const ServicePage = ({ treatment: t }: { treatment: Treatment }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.name,
    serviceType: t.navLabel,
    description: t.metaDescription,
    url: `${SITE_URL}${t.slug}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      { "@type": "Place", name: "Silverknowes, Edinburgh" },
      { "@type": "City", name: "Edinburgh" },
    ],
    offers: t.prices.map((p) => ({
      "@type": "Offer",
      name: `${t.name} — ${p.duration}`,
      price: p.price.replace("£", ""),
      priceCurrency: "GBP",
    })),
  };

  return (
    <>
      <Seo title={t.title} description={t.metaDescription} path={t.slug} jsonLd={jsonLd} />

      <PageHero eyebrow="Treatment · Silverknowes, Edinburgh" title={t.navLabel} intro={t.intro} />

      <section className="relative py-16 md:py-24 px-6 md:px-10 bg-cream">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="reveal lg:col-span-7">
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.15] mb-7">
              About this <span className="font-script text-rose">treatment</span>
            </h2>
            <div className="space-y-5 text-taupe text-[17px] leading-[1.8]">
              {t.detail.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h2 className="font-display text-2xl md:text-3xl text-ink leading-[1.15] mt-12 mb-5">
              How it can <span className="font-script text-rose">help</span>
            </h2>
            <ul className="space-y-3 text-[16px] text-ink/85">
              {t.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 text-gold" aria-hidden>✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 bg-blush/30 border border-blush rounded-lg p-6 md:p-8">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Is it right for me?</div>
              <p className="text-taupe leading-relaxed">{t.goodFor}</p>
            </div>

            <div className="mt-10 text-taupe leading-relaxed">
              <p>
                Not quite what you are looking for? You can also read about our{" "}
                {treatments
                  .filter((o) => o.slug !== t.slug)
                  .map((o, i, arr) => (
                    <span key={o.slug}>
                      <Link to={o.slug} className="text-rose underline underline-offset-4">
                        {o.linkText}
                      </Link>
                      {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " or " : ""}
                    </span>
                  ))}
                , or{" "}
                <Link to="/contact" className="text-rose underline underline-offset-4">get in touch</Link> and we will help you choose.
              </p>
            </div>

          </div>

          <aside className="reveal lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="lux-image rounded-lg overflow-hidden border border-blush">
              <img src={t.image} alt={t.imageAlt} className="w-full h-auto object-cover" loading="lazy" />
            </div>

            <div className="bg-cream border border-blush rounded-lg p-7 shadow-[0_20px_60px_-40px_rgba(120,80,60,0.5)]">
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Pricing</div>
              <ul className="space-y-3 text-sm">
                {t.prices.map((p) => (
                  <li key={p.key} className="flex items-center justify-between gap-8 pb-2 border-b border-blush last:border-0">
                    <span className="text-taupe">{p.duration}</span>
                    <span className="font-display text-rose text-lg">{p.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-md border border-gold/40 bg-blush/30 px-4 py-3 text-[12px] leading-relaxed text-ink/80">
                Booking is unavailable — this website is on hold by SR Innovations pending client payment.
              </p>
              <Link to="/contact" className="btn-secondary w-full !py-3.5 text-center block mt-3">Booking Information</Link>
            </div>

            <div className="bg-blush/30 border border-blush rounded-lg p-6 text-sm text-taupe leading-relaxed">
              <p><span className="text-ink">Where:</span> Private treatment room, Silverknowes, EH4, Edinburgh.</p>
              <p className="mt-2"><span className="text-ink">Parking:</span> Free on-street parking outside.</p>
              <p className="mt-2"><span className="text-ink">Trust:</span> Qualified since 2008 · Fully insured.</p>
            </div>
          </aside>
        </div>
      </section>

      <OtherTreatments currentSlug={t.slug} />
      <BookingSection heading="Book your" script={t.navLabel.toLowerCase()} />
    </>
  );
};

export default ServicePage;
