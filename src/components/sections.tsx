import { useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from "./Lightbox";
import {
  ADDRESS,
  EMAIL,
  FRESHA_URL,
  GALLERY,
  HOURS,
  HOURS_NOTE,
  PHONE,
  PHONE_HREF,
  cancellationPolicy,
  pillars,
  testimonials,
  treatments,
} from "@/data/site";

/* ---------------- Small pieces ---------------- */
export const ContactRow = ({ icon,label,value,href }: { icon: string; label: string; value: string; href?: string }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 shrink-0 rounded-full border border-gold/50 flex items-center justify-center text-gold">{icon}</div>
    <div>
      <div className="text-[10px] tracking-[0.3em] uppercase text-taupe mb-0.5">{label}</div>
      {href ? (
        <a href={href} className="text-ink hover:text-rose transition-colors break-all">{value}</a>
      ) : (
        <p className="text-ink">{value}</p>
      )}
    </div>
  </div>
);

export const PillarIcon = ({ i }: { i: number }) => {
  const paths = [
    "M12 3c4 3 6 6 6 10 0 3-2 6-6 8-4-2-6-5-6-8 0-4 2-7 6-10zm0 4v12",
    "M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9z",
    "M10 3h4v3l2 3v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l2-3V3z",
    "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.5-7 10-7 10z",
    "M5 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2m8 0v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2M4 12l2-5a2 2 0 0 1 2-1h8a2 2 0 0 1 2 1l2 5m-16 0h16m-16 0v5h16v-5M7 15h.01M17 15h.01",
    "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[i]} />
    </svg>
  );
};

export const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_,i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={i < rating ? "text-gold" : "text-gold/30"}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export const TestimonialCard = ({ t }: { t: { name: string; rating: number; quote: string } }) => (
  <div className="h-full bg-cream border border-blush rounded-lg p-8 shadow-[0_12px_40px_-24px_rgba(120,80,60,0.2)] flex flex-col">
    <StarRating rating={t.rating} />
    <blockquote className="mt-5 font-display italic text-lg md:text-xl text-ink leading-[1.45] flex-1">
      “{t.quote}”
    </blockquote>
    <div className="mt-6 pt-5 border-t border-blush">
      <div className="text-xs tracking-[0.28em] uppercase text-rose font-medium">{t.name}</div>
      <div className="text-[10px] tracking-[0.2em] uppercase text-taupe/70 mt-1">Sample review</div>
    </div>
  </div>
);

/* ---------------- Page header for inner pages ---------------- */
export const PageHero = ({
  eyebrow,
  title,
  script,
  intro,
}: {
  eyebrow: string;
  title: string;
  script?: string;
  intro: string;
}) => (
  <section className="relative pt-36 md:pt-44 pb-14 md:pb-20 px-6 md:px-10 bg-brand-radial overflow-hidden">
    <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-blush/60 blur-3xl float-slow pointer-events-none" aria-hidden />
    <div className="relative max-w-[1000px] mx-auto text-center fade-up">
      <div className="ornament mb-5"><span className="eyebrow">{eyebrow}</span></div>
      <h1 className="font-display text-[38px] sm:text-[48px] lg:text-[62px] text-ink leading-[1.05] tracking-tight">
        {title}
        {script && <> <span className="font-script text-rose">{script}</span></>}
      </h1>
      <div className="flex items-center justify-center gap-3 my-7" aria-hidden>
        <span className="h-px w-12 bg-gold" />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold"><path d="M12 2c2 5 5 8 10 10-5 2-8 5-10 10-2-5-5-8-10-10 5-2 8-5 10-10z" fill="currentColor" opacity="0.6" /></svg>
        <span className="h-px w-12 bg-gold" />
      </div>
      <p className="text-taupe text-lg leading-relaxed max-w-2xl mx-auto font-light">{intro}</p>
    </div>
  </section>
);

/* ---------------- Reusable sections ---------------- */
export const PillarsSection = () => (
  <section className="relative py-24 md:py-32 px-6 md:px-10 bg-cream">
    <div className="max-w-[1300px] mx-auto">
      <div className="reveal text-center max-w-2xl mx-auto mb-14">
        <div className="ornament mb-5"><span className="eyebrow">The Experience</span></div>
        <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.1]">
          Every detail,<span className="font-script text-rose">quietly considered.</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map((p,i) => (
          <div
            key={p.title}
            className="reveal text-center bg-blush/30 border border-blush rounded-lg p-8 hover:bg-blush/50 transition-colors duration-500"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-cream border border-gold/50 flex items-center justify-center text-gold">
              <PillarIcon i={i} />
            </div>
            <h3 className="font-display text-xl text-ink uppercase tracking-wide mb-3">{p.title}</h3>
            <p className="text-taupe text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const CancellationSection = () => (
  <section className="relative py-20 md:py-28 px-6 md:px-10 bg-cream border-y border-blush">
    <div className="max-w-[900px] mx-auto text-center">
      <div className="reveal ornament mb-5"><span className="eyebrow">Booking Policy</span></div>
      <h2 className="reveal font-display text-3xl md:text-4xl text-ink leading-[1.1] mb-10">
        Cancellation & <span className="font-script text-rose">Deposit Policy</span>
      </h2>
      <div className="reveal grid md:grid-cols-3 gap-6 text-left">
        {[
          { n: 1,h: "Deposit",p: cancellationPolicy.deposit },
          { n: 2,h: "48-Hour Refund",p: cancellationPolicy.refund },
          { n: 3,h: "Late Cancellation",p: cancellationPolicy.fee },
        ].map((c) => (
          <div key={c.n} className="bg-blush/30 border border-blush rounded-lg p-6 md:p-8">
            <div className="w-10 h-10 rounded-full bg-cream border border-gold/50 flex items-center justify-center text-gold mb-4">{c.n}</div>
            <h3 className="font-display text-lg text-ink uppercase tracking-wide mb-2">{c.h}</h3>
            <p className="text-taupe text-sm leading-relaxed">{c.p}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GallerySection = () => {
  const [lightbox,setLightbox] = useState<number | null>(null);
  return (
    <section className="relative py-24 md:py-36 bg-nude/25">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10">
        <div className="reveal max-w-2xl mb-14 md:mb-16">
          <div className="ornament mb-5"><span className="eyebrow">The Room · Silverknowes,Edinburgh</span></div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.1]">
            A space designed<br />to <span className="font-script text-rose">slow you down.</span>
          </h2>
          <p className="mt-5 text-taupe text-[15px] leading-relaxed">
            Inside the private treatment room in Silverknowes,Edinburgh. Tap any photo to view it in full.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3 md:gap-5">
          {GALLERY.map((g,i) => (
            <button
              type="button"
              key={g.src}
              onClick={() => setLightbox(i)}
              aria-label={`Open larger image: ${g.alt}`}
              className={`reveal lux-image group relative ${g.span} focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream`}
            >
              <img src={g.src} alt={g.alt} className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" aria-hidden />
            </button>
          ))}
        </div>

        <Lightbox items={GALLERY} index={lightbox} onClose={() => setLightbox(null)} onIndex={(i) => setLightbox(i)} />
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  const [activeT,setActiveT] = useState(0);
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10 bg-cream overflow-hidden">
      <div className="max-w-[1300px] mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <div className="ornament mb-5"><span className="eyebrow">Kind Words</span></div>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.1]">Client Testimonials</h2>
        </div>

        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeT * 100}%)` }}>
              {testimonials.map((t,i) => (
                <div key={i} className="w-full shrink-0 px-2">
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActiveT((i) => (i - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-gold/50 text-gold hover:bg-blush/50 flex items-center justify-center transition-colors"
            >
              ←
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((_,i) => (
                <button
                  key={i}
                  onClick={() => setActiveT(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-selected={activeT === i}
                  role="tab"
                  className="min-h-11 min-w-11 flex items-center justify-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-500 ${activeT === i ? "w-8 bg-rose" : "w-1.5 bg-ink/15"}`} />
                </button>
              ))}
            </div>
            <button
              onClick={() => setActiveT((i) => (i + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-gold/50 text-gold hover:bg-blush/50 flex items-center justify-center transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
          {testimonials.map((t,i) => (
            <div key={i} className={`reveal lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""}`} style={{ transitionDelay: `${i * 80}ms` }}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 md:mt-16 text-center">
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-taupe hover:text-ink transition-colors border-b border-gold/40 hover:border-gold pb-1"
          >
            View more reviews on Fresha
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export const BookingSection = ({ heading = "Ready to take",script = "time for you?" }: { heading?: string; script?: string }) => (
  <section id="book" className="relative py-24 md:py-36 px-6 md:px-10 bg-brand-gradient overflow-hidden">
    <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-nude/50 blur-3xl float-slow pointer-events-none" aria-hidden />
    <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-blush/60 blur-3xl float-slow pointer-events-none" aria-hidden />

    <div className="relative max-w-[1300px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="reveal lg:col-span-5">
        <div className="ornament mb-6"><span className="eyebrow">Contact & Booking</span></div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.05] mb-6">
          {heading}<br />
          <span className="font-script text-rose">{script}</span>
        </h2>
        <p className="text-taupe text-lg leading-relaxed max-w-md mb-10">
          Book your appointment today and start your journey towards relaxation and wellbeing.
        </p>
        <div className="space-y-5 border-t border-ink/10 pt-8 text-sm">
          <ContactRow icon="✆" label="Telephone" value={PHONE} href={PHONE_HREF} />
          <ContactRow icon="✉" label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
          <ContactRow icon="◉" label="Location" value={ADDRESS} />
          <ContactRow icon="P" label="Parking" value="Free parking available" />
          <ContactRow icon="✓" label="Trust" value="Qualified since 2008 · Fully insured" />
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-taupe mb-1">Opening Hours</div>
            <div className="text-ink leading-relaxed space-y-0.5">
              {HOURS.map((h) => (
                <div key={h.day} className="flex justify-between gap-6 max-w-xs"><span>{h.day}</span><span className="text-taupe">{h.hours}</span></div>
              ))}
            </div>
            <div className="text-[11px] text-gold mt-2 italic">{HOURS_NOTE}</div>
          </div>
        </div>
      </div>

      <div className="reveal lg:col-span-7">
        <div className="bg-cream text-ink p-8 md:p-12 rounded-lg shadow-[0_30px_80px_-40px_rgba(120,80,60,0.4)] border border-blush">
          <div className="pb-5 mb-6 border-b border-blush">
            <h3 className="font-display text-3xl md:text-4xl text-ink">Book instantly on Fresha</h3>
            <p className="text-sm text-taupe mt-2 leading-relaxed">
              View live availability,choose your treatment and time,and secure your appointment in a few taps ,
              all through our booking partner,Fresha.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-ink/85 mb-8">
            {[
              "Real-time availability,updated instantly",
              "Secure card payment to confirm your booking",
              "Automatic confirmation and appointment reminders",
              "Reschedule or manage your booking any time",
            ].map((li) => (
              <li key={li} className="flex items-start gap-3">
                <span className="mt-0.5 text-gold" aria-hidden>✓</span>
                <span>{li}</span>
              </li>
            ))}
          </ul>

          <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full !py-4 text-center block">
            Book on Fresha →
          </a>
          <p className="text-[11px] text-taupe text-center mt-3">
            Opens Fresha in a new tab. A 50% deposit secures your slot; balance paid on the day.
          </p>

          <div className="relative flex items-center gap-3 mt-8 mb-6">
            <span className="h-px flex-1 bg-blush" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-taupe">Prefer to speak with Camilla?</span>
            <span className="h-px flex-1 bg-blush" />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <a href={PHONE_HREF} className="btn-secondary w-full !py-3.5 text-center block">Call {PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="btn-secondary w-full !py-3.5 text-center block">Email Camilla</a>
          </div>
          <p className="text-[11px] text-taupe/80 text-center mt-4">
            Weekend appointments (Saturday & Sunday) are available on request ,please call or email to arrange.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Internal linking between services ---------------- */
export const OtherTreatments = ({ currentSlug }: { currentSlug?: string }) => (
  <section className="relative py-20 md:py-28 px-6 md:px-10 bg-blush/40">
    <div className="max-w-[1300px] mx-auto">
      <div className="reveal text-center max-w-2xl mx-auto mb-12">
        <div className="ornament mb-5"><span className="eyebrow">Explore Treatments</span></div>
        <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.1]">
          Other massage treatments in <span className="font-script text-rose">Silverknowes</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments
          .filter((t) => t.slug !== currentSlug)
          .map((t) => (
            <Link
              key={t.slug}
              to={t.slug}
              className="reveal group bg-cream rounded-lg overflow-hidden border border-blush shadow-[0_20px_50px_-30px_rgba(120,80,60,0.3)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="lux-image aspect-[4/3] rounded-none">
                <img src={t.image} alt={t.imageAlt} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-display text-lg text-ink uppercase tracking-wide mb-2">{t.navLabel}</h3>
                <div className="w-10 h-px bg-gold mx-auto mb-3" aria-hidden />
                <p className="text-taupe text-sm leading-relaxed mb-4">From {t.prices[0].price} · {t.prices[0].duration}</p>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-rose group-hover:text-rose-deep transition-colors">
                  View treatment <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  </section>
);
