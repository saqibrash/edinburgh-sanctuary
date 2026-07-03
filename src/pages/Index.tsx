import { useEffect, useMemo, useState } from "react";

const logo = "/assets/logo.png";
const logoMark = "/assets/logo-mark.png";
const camilla = "/assets/camilla.jpeg";
const room1 = "/assets/room-1.jpeg";
const room2 = "/assets/room-2.jpeg";
const room3 = "/assets/room-3.jpeg";
const treatment = "/assets/treatment.jpeg";
const shelves = "/assets/shelves.jpeg";
const entrance = "/assets/entrance.jpeg";

const PHONE = "07XXX XXXXXX";
const PHONE_HREF = "tel:+447000000000";
const EMAIL = "hello@restorativesanctuary.co.uk";

const trust = [
  { k: "2008", v: "Qualified" },
  { k: "Advanced", v: "Therapeutic training" },
  { k: "Bespoke", v: "Personalised treatments" },
  { k: "Edinburgh", v: "Private studio" },
];

const featured = [
  { name: "Swedish Relaxation", duration: "60 · 90 min", price: "from £60", image: room2, desc: "Long, flowing strokes that quiet the nervous system." },
  { name: "Bespoke Restorative", duration: "90 min", price: "£85", image: treatment, desc: "A personalised blend of techniques, shaped entirely around you.", featured: true },
  { name: "Deep Tissue", duration: "60 · 90 min", price: "from £65", image: room3, desc: "Focused pressure to release stubborn tension and knots." },
];

const testimonials = [
  { quote: "The most restorative hour I've spent in years. Camilla is quietly gifted — I left feeling completely renewed.", name: "Sarah M." },
  { quote: "A world away from any spa I've visited. Every detail considered, every technique precise. Simply exceptional.", name: "Louise K." },
  { quote: "I came for deep tissue relief and left with a sense of calm I didn't know I needed. Truly a sanctuary.", name: "James R." },
];

const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];
const allTreatments = ["Swedish Relaxation", "Bespoke Restorative", "Deep Tissue", "Holistic Aromatherapy", "Sports & Remedial", "Pregnancy Massage", "Gift voucher", "Not sure yet"];

const nav = [
  { href: "#treatments", label: "Treatments" },
  { href: "#about", label: "About" },
  { href: "#sanctuary", label: "The Sanctuary" },
  { href: "#book", label: "Book" },
];

/* Reveal on scroll */
const useReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const Index = () => {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeT, setActiveT] = useState(0);
  const [bookingSent, setBookingSent] = useState(false);
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveT((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("Booking request:", Object.fromEntries(data.entries()));
    setBookingSent(true);
    e.currentTarget.reset();
    setTimeout(() => setBookingSent(false), 10000);
  };

  return (
    <div className="min-h-dvh bg-ivory text-ink overflow-x-hidden">
      {/* =============== NAV =============== */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-ivory/90 backdrop-blur-xl border-b border-ink/5 py-3" : "py-5 bg-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-ink/10">
              <img src={logo} alt="The Restorative Sanctuary logo" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg md:text-xl text-ink tracking-tight">The Restorative Sanctuary</div>
              <div className="text-[11px] text-ink-soft tracking-wide hidden sm:block">Edinburgh</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-ink hover:text-sage-deep transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a href="#book" className="btn-primary !py-3 !px-6 text-[13px]">Book Now</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-3 -mr-3 min-h-11 min-w-11 text-ink" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <div className={`w-6 h-px bg-current my-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-ivory border-t border-ink/5 mt-3 fade-up">
            <div className="px-6 py-8 flex flex-col gap-1">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-4 border-b border-ink/10 font-display text-2xl text-ink">{n.label}</a>
              ))}
              <a href="#book" onClick={() => setMenuOpen(false)} className="btn-primary mt-6 w-full">Book Now</a>
              <a href={PHONE_HREF} className="mt-4 text-center text-sage-deep">{PHONE}</a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* =============== HERO — minimal =============== */}
        <section className="relative min-h-dvh w-full overflow-hidden">
          <div className="absolute inset-0">
            <img src={treatment} alt="Candlelit treatment room at The Restorative Sanctuary in Edinburgh" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-ink/70" />
          </div>

          <div className="relative z-10 min-h-dvh flex flex-col justify-center px-6 md:px-16 pt-24 pb-20">
            <div className="max-w-4xl fade-up">
              <div className="text-ivory/80 text-xs tracking-[0.32em] uppercase mb-8 font-medium">
                Edinburgh · Est. 2008
              </div>
              <h1 className="font-display text-ivory text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] mb-8">
                Massage therapy<br/>designed <em className="not-italic font-normal" style={{ fontStyle: "italic" }}>around you.</em>
              </h1>
              <p className="text-ivory/85 text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-light">
                A private wellness sanctuary in the heart of Edinburgh.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#book" className="btn-light">Book Your Treatment</a>
                <a href="#treatments" className="btn-outline-light">Explore Treatments</a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/60 text-[10px] tracking-[0.4em] uppercase flex flex-col items-center gap-2">
            <span>Scroll</span>
            <span className="w-px h-8 bg-ivory/40" />
          </div>
        </section>

        {/* =============== TRUST =============== */}
        <section className="relative py-20 md:py-28 px-6 md:px-10 bg-ivory">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
              {trust.map((t, i) => (
                <div key={t.k} className="reveal text-center md:border-r md:border-ink/10 md:last:border-r-0 px-4" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="font-display text-3xl md:text-4xl text-sage-deep mb-3">{t.k}</div>
                  <div className="text-sm text-ink-soft tracking-wide">{t.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =============== FEATURED TREATMENTS =============== */}
        <section id="treatments" className="relative py-24 md:py-36 px-6 md:px-10 bg-sand/50">
          <div className="max-w-[1400px] mx-auto">
            <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20">
              <div className="eyebrow mb-5">Featured Treatments</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] mb-6">
                Considered treatments,<br/>tailored to you.
              </h2>
              <p className="text-ink-soft text-lg leading-relaxed">
                Each session begins with a quiet consultation and unfolds around what your body needs today.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {featured.map((t, i) => (
                <a href="#book" key={t.name} className="reveal group block" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="lux-image aspect-[4/5] mb-6 bg-sand">
                    <img src={t.image} alt={`${t.name} treatment`} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-1">
                    <div className="flex items-baseline justify-between mb-3">
                      <h3 className="font-display text-2xl md:text-3xl text-ink group-hover:text-sage-deep transition-colors">{t.name}</h3>
                      <span className="font-display text-xl text-sage-deep whitespace-nowrap ml-3">{t.price}</span>
                    </div>
                    <div className="text-xs tracking-widest uppercase text-ink-soft mb-4">{t.duration}</div>
                    <p className="text-ink-soft leading-relaxed">{t.desc}</p>
                    <div className="mt-6 text-sm font-medium text-sage-deep inline-flex items-center gap-2 border-b border-sage-deep/30 pb-0.5 group-hover:border-sage-deep transition-colors">
                      Book this treatment <span aria-hidden>→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="reveal text-center mt-16">
              <a href="#book" className="btn-secondary">View All Treatments</a>
            </div>
          </div>
        </section>

        {/* =============== MEET CAMILLA =============== */}
        <section id="about" className="relative py-24 md:py-36 px-6 md:px-10 bg-ivory">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal lux-image aspect-[4/5] max-w-lg mx-auto lg:mx-0 w-full">
              <img src={camilla} alt="Camilla, founder and therapist at The Restorative Sanctuary" className="w-full h-full object-cover" />
            </div>
            <div className="reveal">
              <div className="eyebrow mb-5">Meet Camilla</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] mb-8">
                Fifteen years of quiet devotion to the craft.
              </h2>
              <div className="space-y-5 text-ink-soft text-lg leading-[1.7] max-w-xl">
                <p>
                  I founded The Restorative Sanctuary to offer something different — treatments that feel less like a clinic and more like a genuine moment of escape.
                </p>
                <p>
                  Every session is personal, unhurried and shaped around exactly what your body and mind need that day.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#book" className="btn-primary">Book with Camilla</a>
                <a href={PHONE_HREF} className="btn-secondary">{PHONE}</a>
              </div>
            </div>
          </div>
        </section>

        {/* =============== SANCTUARY PREVIEW =============== */}
        <section id="sanctuary" className="relative py-24 md:py-36 bg-sand/40">
          <div className="max-w-[1500px] mx-auto px-6 md:px-10">
            <div className="reveal max-w-3xl mb-14 md:mb-20">
              <div className="eyebrow mb-5">The Sanctuary</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
                A space designed<br/>to slow you down.
              </h2>
            </div>

            <div className="grid grid-cols-12 gap-3 md:gap-5">
              <div className="reveal lux-image col-span-12 md:col-span-8 aspect-[16/10] md:aspect-[16/11]">
                <img src={room1} alt="Warmly lit main treatment room" className="w-full h-full object-cover" />
              </div>
              <div className="reveal lux-image col-span-6 md:col-span-4 aspect-square md:aspect-auto">
                <img src={shelves} alt="Curated shelves with candles and oils" className="w-full h-full object-cover" />
              </div>
              <div className="reveal lux-image col-span-6 md:col-span-4 aspect-square">
                <img src={entrance} alt="Warm entrance to the sanctuary" className="w-full h-full object-cover" />
              </div>
              <div className="reveal lux-image col-span-6 md:col-span-4 aspect-square">
                <img src={room2} alt="Candlelit massage room" className="w-full h-full object-cover" />
              </div>
              <div className="reveal lux-image col-span-6 md:col-span-4 aspect-square">
                <img src={room3} alt="Massage table prepared for treatment" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* =============== TESTIMONIALS =============== */}
        <section className="relative py-24 md:py-36 px-6 md:px-10 bg-ivory" aria-label="Client testimonials">
          <div className="max-w-4xl mx-auto text-center">
            <div className="reveal eyebrow mb-8">Kind Words</div>
            <div className="relative min-h-[280px] md:min-h-[240px]">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  aria-hidden={activeT !== i}
                  className={`absolute inset-0 transition-all duration-1000 ${activeT === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                >
                  <p className="font-display text-2xl md:text-4xl lg:text-5xl text-ink leading-[1.25] max-w-3xl mx-auto">
                    "{t.quote}"
                  </p>
                  <div className="mt-10 text-sm tracking-widest uppercase text-sage-deep">— {t.name}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-12" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveT(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-selected={activeT === i}
                  role="tab"
                  className={`min-h-11 min-w-11 flex items-center justify-center`}
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-500 ${activeT === i ? "w-8 bg-sage-deep" : "w-1.5 bg-ink/20"}`} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =============== FINAL CTA + BOOKING =============== */}
        <section id="book" className="relative py-24 md:py-36 px-6 md:px-10 bg-sage-darker text-ivory overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={room2} alt="" aria-hidden className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-sage-darker/80" />
          </div>
          <div className="relative max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="reveal lg:col-span-5">
              <div className="text-xs tracking-[0.32em] uppercase text-ivory/70 font-medium mb-6">Book Your Treatment</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory leading-[1.05] mb-8">
                Reserve your moment of stillness.
              </h2>
              <p className="text-ivory/80 text-lg leading-relaxed max-w-md mb-10">
                Choose your treatment, preferred date and time. Camilla will confirm your booking personally within 24 hours.
              </p>
              <div className="space-y-5 border-t border-ivory/15 pt-8 text-sm">
                <div>
                  <div className="text-xs tracking-widest uppercase text-ivory/60 mb-1">Telephone</div>
                  <a href={PHONE_HREF} className="font-display text-2xl text-ivory hover:text-sage transition-colors">{PHONE}</a>
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase text-ivory/60 mb-1">Email</div>
                  <a href={`mailto:${EMAIL}`} className="text-ivory hover:text-sage break-all">{EMAIL}</a>
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase text-ivory/60 mb-1">Hours</div>
                  <p className="text-ivory/80 leading-relaxed">Mon – Fri · 9:00 – 20:00<br/>Saturday · 10:00 – 18:00</p>
                </div>
              </div>
            </div>

            <div className="reveal lg:col-span-7">
              <div className="bg-ivory text-ink p-8 md:p-12 rounded-sm">
                {bookingSent ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-deep/10 flex items-center justify-center text-sage-deep text-2xl">✓</div>
                    <h3 className="font-display text-4xl text-ink mb-4">Thank you.</h3>
                    <p className="text-ink-soft max-w-md mx-auto leading-relaxed">
                      Your booking request has been received. Camilla will reply personally within 24 hours to confirm your appointment.
                    </p>
                    <button onClick={() => setBookingSent(false)} className="btn-secondary mt-8">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div className="pb-4 mb-2 border-b border-ink/10">
                      <h3 className="font-display text-3xl text-ink">Booking request</h3>
                    </div>

                    <Field label="Treatment" name="treatment">
                      <select id="treatment" name="treatment" required defaultValue="" className="field">
                        <option value="" disabled>Select a treatment…</option>
                        {allTreatments.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </Field>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Field label="Preferred date" name="date">
                        <input id="date" type="date" name="date" required min={today} className="field" />
                      </Field>
                      <Field label="Preferred time" name="time">
                        <select id="time" name="time" required defaultValue="" className="field">
                          <option value="" disabled>Select a time…</option>
                          {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </Field>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Field label="Full name" name="name">
                        <input id="name" name="name" required maxLength={100} placeholder="Your name" className="field" />
                      </Field>
                      <Field label="Telephone" name="phone">
                        <input id="phone" name="phone" type="tel" required maxLength={30} placeholder="07…" className="field" />
                      </Field>
                    </div>

                    <Field label="Email" name="email">
                      <input id="email" name="email" type="email" required maxLength={255} placeholder="you@email.com" className="field" />
                    </Field>

                    <Field label="Notes (optional)" name="notes">
                      <textarea id="notes" name="notes" rows={3} maxLength={1000} placeholder="Anything Camilla should know?" className="field resize-none" />
                    </Field>

                    <button type="submit" className="btn-primary w-full !py-4">Request Booking</button>
                    <p className="text-xs text-ink-soft text-center">
                      Your details are kept private and used only to arrange your treatment.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =============== FOOTER =============== */}
      <footer className="bg-ink text-ivory/70 pt-16 pb-10 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 pb-10 border-b border-ivory/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-ivory/20">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display text-xl text-ivory">The Restorative Sanctuary</div>
                <div className="text-xs tracking-widest uppercase text-ivory/50">Edinburgh</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              A private wellness sanctuary for restorative massage therapy in the heart of Edinburgh, Scotland.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs tracking-widest uppercase text-ivory/50 mb-4">Explore</div>
            <ul className="space-y-3 text-sm">
              {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-ivory transition-colors">{n.label}</a></li>)}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="text-xs tracking-widest uppercase text-ivory/50 mb-4">Contact</div>
            <p className="text-sm mb-2"><a href={PHONE_HREF} className="hover:text-ivory">{PHONE}</a></p>
            <p className="text-sm break-all mb-2"><a href={`mailto:${EMAIL}`} className="hover:text-ivory">{EMAIL}</a></p>
            <p className="text-sm">Edinburgh, Scotland</p>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} The Restorative Sanctuary</p>
          <p>Crafted with care · Edinburgh</p>
        </div>
      </footer>

      {/* Floating mobile CTA */}
      <a href="#book" className="lg:hidden fixed bottom-5 right-5 z-40 btn-primary shadow-xl">
        Book
      </a>
    </div>
  );
};

const Field = ({ label, name, children }: { label: string; name: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={name} className="block text-xs tracking-widest uppercase text-ink-soft mb-1">{label}</label>
    {children}
  </div>
);

export default Index;
