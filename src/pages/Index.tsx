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
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || menuOpen ? "bg-ivory/95 backdrop-blur-xl border-b border-ink/10 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.15)] py-3" : "py-5 bg-ivory/40 backdrop-blur-md border-b border-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 group shrink-0">
            <img src={logoMark} alt="" aria-hidden className="w-10 h-10 md:w-11 md:h-11 object-contain transition-transform duration-500 group-hover:rotate-[8deg]" />
            <div className="leading-tight hidden sm:block">
              <div className="font-display text-[17px] md:text-[19px] text-ink tracking-tight">The Restorative Sanctuary</div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Edinburgh · Est. 2008</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="relative text-[13px] uppercase tracking-[0.18em] text-ink/80 hover:text-sage-deep transition-colors group">
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <a href={PHONE_HREF} className="text-sm text-ink hover:text-sage-deep flex items-center gap-2">
              <span aria-hidden>☏</span>{PHONE}
            </a>
            <a href="#book" className="btn-primary !py-3 !px-6 text-[12px] tracking-[0.15em] uppercase">Reserve</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-3 -mr-3 min-h-11 min-w-11 text-ink" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <div className={`w-6 h-px bg-current my-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-ivory border-t border-ink/10 mt-3 fade-up">
            <div className="px-6 py-8 flex flex-col gap-1">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-4 border-b border-ink/10 font-display text-2xl text-ink flex items-center justify-between">
                  {n.label}<span className="text-gold text-sm" aria-hidden>→</span>
                </a>
              ))}
              <a href="#book" onClick={() => setMenuOpen(false)} className="btn-primary mt-6 w-full">Reserve Your Treatment</a>
              <a href={PHONE_HREF} className="mt-4 text-center text-sage-deep tracking-wide">☏ {PHONE}</a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* =============== HERO — split, readable =============== */}
        <section className="relative min-h-dvh w-full overflow-hidden bg-ivory pt-24 lg:pt-0">
          <div className="lg:grid lg:grid-cols-12 lg:min-h-dvh">
            {/* Content */}
            <div className="relative lg:col-span-6 xl:col-span-5 flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:pl-24 py-14 lg:py-28 z-10">
              <div className="fade-up max-w-xl">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-10 h-px bg-gold" />
                  <span className="text-[11px] tracking-[0.4em] uppercase text-gold font-medium">Edinburgh Wellness · Est. 2008</span>
                </div>
                <h1 className="font-display text-ink text-[42px] sm:text-[54px] md:text-6xl lg:text-[68px] xl:text-[76px] leading-[1.02] mb-8 tracking-tight">
                  A private<br/>
                  <span className="text-sage-deep italic font-normal">sanctuary</span><br/>
                  for stillness.
                </h1>
                <p className="text-ink-soft text-lg md:text-xl leading-relaxed max-w-md mb-10 font-light">
                  Bespoke massage therapy in the heart of Edinburgh — quietly considered, deeply restorative.
                </p>
                <div className="flex flex-wrap gap-3 mb-12">
                  <a href="#book" className="btn-primary">Reserve Your Treatment</a>
                  <a href="#treatments" className="btn-secondary">Explore Treatments</a>
                </div>
                <div className="grid grid-cols-3 gap-4 max-w-md pt-8 border-t border-ink/10">
                  {trust.slice(0, 3).map((t) => (
                    <div key={t.k}>
                      <div className="font-display text-xl md:text-2xl text-sage-deep">{t.k}</div>
                      <div className="text-[11px] tracking-wider uppercase text-ink-soft mt-1">{t.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="relative lg:col-span-6 xl:col-span-7 min-h-[60vh] lg:min-h-dvh">
              <div className="absolute inset-4 md:inset-8 lg:inset-10 overflow-hidden">
                <img src={treatment} alt="Candlelit treatment room at The Restorative Sanctuary in Edinburgh" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
                {/* Gold frame */}
                <div className="absolute inset-3 md:inset-4 border border-gold/40 pointer-events-none" />
                {/* Floating quote card */}
                <div className="hidden md:block absolute bottom-8 left-8 right-8 lg:left-auto lg:right-8 lg:max-w-xs bg-ivory/95 backdrop-blur-md p-6 shadow-2xl">
                  <div className="text-gold text-2xl font-display leading-none mb-2">"</div>
                  <p className="text-ink text-sm leading-relaxed italic font-display">The most restorative hour I've spent in years.</p>
                  <div className="text-[10px] tracking-[0.28em] uppercase text-ink-soft mt-3">— Sarah M.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-soft text-[10px] tracking-[0.4em] uppercase flex-col items-center gap-2 z-20">
            <span>Scroll</span>
            <span className="w-px h-8 bg-ink/30 animate-pulse" />
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
      <footer className="relative bg-sage-darker text-ivory/80 overflow-hidden">
        {/* Newsletter band */}
        <div className="relative border-b border-ivory/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">The Journal</div>
              <h3 className="font-display text-3xl md:text-4xl text-ivory leading-[1.1] max-w-md">
                Quiet notes on wellbeing, delivered monthly.
              </h3>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing."); (e.currentTarget as HTMLFormElement).reset(); }} className="flex flex-col sm:flex-row gap-3 w-full">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" required placeholder="your@email.com" className="flex-1 bg-ivory/5 border border-ivory/20 text-ivory placeholder:text-ivory/40 px-5 py-4 focus:outline-none focus:border-gold transition-colors" />
              <button type="submit" className="btn-primary !bg-gold !border-gold hover:!bg-[hsl(var(--gold-soft))] hover:!border-[hsl(var(--gold-soft))] !text-ink whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10 grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <img src={logo} alt="The Restorative Sanctuary" className="h-24 w-auto mb-4 -ml-2 brightness-0 invert opacity-90" loading="lazy" />
            <p className="text-sm leading-relaxed text-ivory/70 max-w-sm mb-6">
              A private wellness sanctuary offering bespoke massage therapy in the heart of Edinburgh, Scotland.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "Instagram", d: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.06 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.06.42 2.23.07 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.06 1.17-.25 1.8-.42 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.17-1.06.36-2.23.42-1.25.07-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.06-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.36-1.06-.42-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.06-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.36 2.23-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 10.55a4.15 4.15 0 1 1 0-8.3 4.15 4.15 0 0 1 0 8.3ZM18.9 6.35a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" },
                { label: "Facebook", d: "M13.5 21v-8h2.7l.4-3.15h-3.1V7.85c0-.9.25-1.5 1.55-1.5h1.65V3.55c-.3-.05-1.3-.15-2.45-.15-2.45 0-4.1 1.5-4.1 4.25v2.2H7.5V13h2.65v8h3.35Z" },
                { label: "Pinterest", d: "M12 2a10 10 0 0 0-3.65 19.3c-.1-.75-.15-1.9.05-2.7.15-.65 1-4.15 1-4.15s-.25-.5-.25-1.25c0-1.15.7-2 1.55-2 .75 0 1.1.55 1.1 1.2 0 .75-.5 1.85-.75 2.9-.2.85.45 1.55 1.3 1.55 1.55 0 2.75-1.65 2.75-4 0-2.1-1.5-3.55-3.65-3.55-2.5 0-3.95 1.85-3.95 3.75 0 .75.3 1.55.65 2 .05.1.1.15.05.25l-.25 1c-.05.15-.15.2-.3.1-1.1-.5-1.75-2.1-1.75-3.4 0-2.75 2-5.3 5.8-5.3 3.05 0 5.4 2.15 5.4 5.05 0 3.05-1.9 5.5-4.55 5.5-.9 0-1.7-.45-2-1l-.55 2.05c-.2.75-.7 1.7-1.05 2.3A10 10 0 1 0 12 2Z" }
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-11 h-11 flex items-center justify-center rounded-full border border-ivory/20 text-ivory/70 hover:text-ink hover:bg-gold hover:border-gold transition-all">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">Explore</div>
            <ul className="space-y-3 text-sm">
              {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold transition-colors">{n.label}</a></li>)}
            </ul>
          </div>

          {/* Treatments */}
          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">Treatments</div>
            <ul className="space-y-3 text-sm">
              {allTreatments.slice(0, 6).map((t) => <li key={t}><a href="#book" className="hover:text-gold transition-colors">{t}</a></li>)}
            </ul>
          </div>

          {/* Visit */}
          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">Visit</div>
            <address className="not-italic text-sm space-y-3 leading-relaxed">
              <p className="text-ivory/70">Edinburgh<br/>Scotland, United Kingdom</p>
              <p><a href={PHONE_HREF} className="hover:text-gold transition-colors flex items-center gap-2"><span aria-hidden>☏</span>{PHONE}</a></p>
              <p><a href={`mailto:${EMAIL}`} className="hover:text-gold transition-colors break-all">{EMAIL}</a></p>
              <div className="pt-3 border-t border-ivory/10 mt-4">
                <div className="text-[11px] uppercase tracking-widest text-ivory/50 mb-2">Opening Hours</div>
                <p className="text-ivory/70">Mon – Fri · 9:00 – 20:00<br/>Saturday · 10:00 – 18:00<br/>Sunday · By appointment</p>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ivory/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
            <p>© {new Date().getFullYear()} The Restorative Sanctuary. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
              <a href="#" className="hover:text-gold transition-colors">Cookies</a>
            </div>
            <p className="tracking-widest uppercase text-[10px]">Crafted in Edinburgh</p>
          </div>
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
