import { useEffect, useMemo, useRef, useState } from "react";

const logo = "/assets/logo.jpeg";
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

const stats = [
  { k: "Qualified", v: "Since 2008" },
  { k: "Bespoke", v: "Personalised Treatments" },
  { k: "Private", v: "Home Sanctuary" },
  { k: "Advanced", v: "Therapeutic Training" },
];

const treatments = [
  {
    n: "I",
    name: "Swedish Relaxation",
    duration: "60 · 90 min",
    price: "from £60",
    tag: "Signature",
    desc: "Long, flowing strokes that quiet the nervous system and gently melt away everyday stress.",
    includes: ["Full body relaxation", "Warm aromatic oils", "Guided breathwork"],
    image: room2,
  },
  {
    n: "II",
    name: "Bespoke Restorative",
    duration: "90 min",
    price: "£85",
    tag: "House Favourite",
    desc: "Your treatment, entirely tailored — a personalised blend of techniques shaped by a considered consultation.",
    includes: ["Personal consultation", "Blended techniques", "Hot towel finish", "Herbal tea ritual"],
    image: treatment,
    featured: true,
  },
  {
    n: "III",
    name: "Deep Tissue",
    duration: "60 · 90 min",
    price: "from £65",
    tag: "Therapeutic",
    desc: "Slow, focused pressure to release stubborn tension, knots and chronic muscular tightness.",
    includes: ["Targeted pressure", "Postural assessment", "Aftercare guidance"],
    image: room3,
  },
];

const moreTreatments = [
  { name: "Holistic Aromatherapy", time: "75 min", price: "from £70", desc: "A bespoke blend of essential oils paired with gentle technique to restore balance and ease." },
  { name: "Sports & Remedial", time: "60 min", price: "from £65", desc: "Targeted work for active bodies — recovery, mobility and injury prevention." },
  { name: "Pregnancy Massage", time: "60 min", price: "from £65", desc: "Safe, nurturing care for expectant mothers in the second and third trimesters." },
];

const packages = [
  { name: "The Pause", sessions: "Single Session", price: "£85", desc: "One 90-minute bespoke restorative treatment — a considered moment of stillness.", perks: ["90 min bespoke treatment", "Personal consultation", "Herbal tea ritual"] },
  { name: "The Return", sessions: "Three Sessions", price: "£240", perSession: "£80 / session", desc: "A monthly ritual of restoration — the most-loved way to sustain calm and recovery.", perks: ["3 × 90 min sessions", "Priority booking", "Complimentary aftercare", "Personal aromatic blend"], featured: true },
  { name: "The Sanctuary", sessions: "Six Sessions", price: "£450", perSession: "£75 / session", desc: "A committed programme of therapeutic care and lasting wellbeing.", perks: ["6 × 90 min sessions", "Postural review", "Bespoke home ritual", "Seasonal gift"] },
];

const journey = [
  { n: "01", title: "Before Treatment", body: "Arrive, settle into stillness and share what your body needs today over a warm cup of herbal tea." },
  { n: "02", title: "Relaxation", body: "Softened light, curated scent, warmed table. The mind quiets, the breath slows, the treatment begins." },
  { n: "03", title: "Recovery", body: "Precise, unhurried work — remedial, holistic or restorative — shaped entirely around you." },
  { n: "04", title: "Restored Wellbeing", body: "Time to return slowly, with aftercare guidance to carry the calm long past the session itself." },
];

const timeline = [
  { year: "2008", title: "Qualified", body: "ITEC Diploma in Massage Therapy. Beginning of a decade-long practice." },
  { year: "2012", title: "Advanced Training", body: "Deep tissue, remedial and sports specialisms. Postural assessment certification." },
  { year: "2017", title: "Holistic Practice", body: "Aromatherapy, pregnancy massage and holistic wellbeing techniques added." },
  { year: "2020", title: "Sanctuary Founded", body: "The Restorative Sanctuary opens as a private home studio in Edinburgh." },
  { year: "Today", title: "FHT Registered", body: "Federation of Holistic Therapists registered, fully insured, continually training." },
];

const sanctuaryDetails = [
  { title: "Heated Massage Couch", body: "Ergonomic, deeply warmed and dressed in soft organic linens for absolute comfort." },
  { title: "Bespoke Essential Oils", body: "Blended by hand to match your treatment intention — from grounding to uplifting." },
  { title: "Soft Candlelight", body: "Beeswax candles cast a low, honey light — never bright, never clinical." },
  { title: "Curated Atmosphere", body: "A slow-tempo soundscape, gentle scent and warmed towels the moment you arrive." },
  { title: "Personalised Care", body: "Every visit begins with quiet conversation. The treatment follows the client, not a script." },
];

const testimonials = [
  { quote: "The most restorative hour I've spent in years. Camilla is quietly gifted — I left feeling completely renewed.", name: "Sarah M.", role: "Edinburgh" },
  { quote: "A world away from any spa I've visited. Every detail considered, every technique precise. Simply exceptional.", name: "Louise K.", role: "New Town" },
  { quote: "I came for deep tissue relief and left with a sense of calm I didn't know I needed. Truly a sanctuary.", name: "James R.", role: "Stockbridge" },
];

const faqs = [
  { q: "Where are you based?", a: "The Restorative Sanctuary is a private home studio in Edinburgh. The full address is shared once your booking is confirmed." },
  { q: "What should I expect at my first visit?", a: "A warm welcome, a quiet consultation about your needs, and a treatment tailored entirely to you in a candlelit, peaceful space." },
  { q: "How do I book?", a: "Use the booking form below, send an email, or call directly. Camilla replies personally within 24 hours." },
  { q: "Do you offer gift vouchers?", a: "Yes — beautifully presented vouchers are available for any treatment. Get in touch to arrange." },
  { q: "What is your cancellation policy?", a: "We kindly ask for at least 24 hours' notice so your time can be offered to another client." },
];

const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];

const nav = [
  { href: "#sanctuary", label: "Sanctuary", n: "01" },
  { href: "#treatments", label: "Treatments", n: "02" },
  { href: "#pricing", label: "Pricing", n: "03" },
  { href: "#about", label: "About", n: "04" },
  { href: "#contact", label: "Contact", n: "05" },
];

/* ---------- Hooks ---------- */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const useParallax = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
};

const Index = () => {
  useReveal();
  const y = useParallax();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bookingSent, setBookingSent] = useState(false);
  const [activeT, setActiveT] = useState(0);
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
    <div className="min-h-screen bg-ivory text-charcoal overflow-x-hidden">
      {/* =============== TOP BAR MARQUEE =============== */}
      <div className="hidden md:block bg-sage-darker text-ivory/80 py-2 overflow-hidden">
        <div className="flex whitespace-nowrap marquee">
          {Array.from({ length: 2 }).map((_, r) => (
            <div key={r} className="flex items-center caps text-[10px] tracking-[0.4em] shrink-0">
              {["Private Wellness Sanctuary · Edinburgh", "By Appointment Only", "Qualified Since 2008", "Bespoke Restorative Rituals", "FHT Registered · Fully Insured"].map((t, i) => (
                <span key={i} className="flex items-center gap-8 px-8">
                  <span className="text-gold-soft">✦</span>
                  <span>{t}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* =============== NAV =============== */}
      <header className={`fixed inset-x-0 z-50 transition-all duration-500 ${scrolled ? "top-0 bg-ivory/95 backdrop-blur-xl border-b border-charcoal/5 py-3" : "top-0 md:top-9 py-5 bg-transparent"}`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-gold/50 shadow-soft">
              <img src={logo} alt="The Restorative Sanctuary" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className={`font-display text-xl md:text-[22px] tracking-tight ${scrolled ? "text-sage-deep" : "text-sage-deep"}`}>The Restorative Sanctuary</div>
              <div className="eyebrow text-gold mt-0.5">By Camilla · Edinburgh</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-10">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="group flex items-baseline gap-2 caps text-[10px] text-charcoal/70 hover:text-gold transition-colors">
                <span className="text-gold text-[9px]">{n.n}</span>
                <span className="relative">
                  {n.label}
                  <span className="absolute -bottom-1 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-500" />
                </span>
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <a href="#book" className="btn-lux !py-3 !px-6">Reserve</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-sage-deep" aria-label="Menu">
            <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <div className={`w-6 h-px bg-current my-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "-translate-y-[7px] -rotate-45" : "w-4 ml-auto"}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-ivory border-t border-charcoal/5 mt-3 fade-up">
            <div className="px-6 py-8 flex flex-col gap-1">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="flex items-baseline gap-3 py-4 border-b border-charcoal/10">
                  <span className="text-gold caps text-[9px]">{n.n}</span>
                  <span className="font-display text-3xl text-sage-deep">{n.label}</span>
                </a>
              ))}
              <a href="#book" onClick={() => setMenuOpen(false)} className="btn-lux mt-6 w-full">Reserve a Session</a>
              <a href={PHONE_HREF} className="mt-4 caps text-gold text-center">{PHONE}</a>
            </div>
          </div>
        )}
      </header>

      {/* =============== HERO =============== */}
      <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${y * 0.35}px) scale(1.1)` }}>
          <img src={treatment} alt="Candlelit treatment room" className="w-full h-[120%] object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--sage-darker))]/70 via-[hsl(var(--sage-darker))]/55 to-[hsl(var(--sage-darker))]/90" />

        {/* Thin gold frame */}
        <div className="absolute inset-4 md:inset-8 border border-gold/25 pointer-events-none" />

        {/* Corner labels */}
        <div className="absolute top-8 md:top-14 right-8 md:right-16 text-ivory/60 caps text-[10px] hidden md:flex flex-col items-end gap-2 z-10 pt-4">
          <div>Est. Edinburgh</div>
          <div className="w-8 h-px bg-gold" />
          <div>MMVIII</div>
        </div>

        <div className="relative z-10 min-h-[100svh] flex flex-col justify-between pt-40 pb-16 md:pb-24 px-8 md:px-16">
          <div className="max-w-[1500px] mx-auto w-full flex-1 flex flex-col justify-center">
            <div className="fade-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center gap-4 mb-10">
                <span className="w-16 h-px bg-gold" />
                <span className="caps text-gold-soft">A Private Wellness Sanctuary</span>
              </div>
            </div>
            <h1 className="fade-up display-xl text-ivory text-[15vw] md:text-[9.5vw] lg:text-[7.5vw] max-w-[16ch]" style={{ animationDelay: "300ms" }}>
              A quieter kind<br/>of luxury, <span className="font-script italic text-gold-soft">for the</span><br/>body &amp; mind.
            </h1>
            <div className="fade-up mt-12 md:mt-16 max-w-2xl" style={{ animationDelay: "600ms" }}>
              <p className="text-ivory/80 text-lg md:text-xl leading-relaxed font-light">
                Bespoke massage therapy and holistic wellness rituals — handcrafted in a private candlelit studio, hidden in the heart of Edinburgh.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#book" className="btn-lux-light">Reserve Your Session</a>
                <a href="#treatments" className="btn-lux-outline">The Treatments</a>
              </div>
            </div>
          </div>

          {/* Bottom rail */}
          <div className="fade-up relative z-10 flex items-end justify-between gap-8" style={{ animationDelay: "900ms" }}>
            <div className="text-ivory/60 caps text-[10px] flex items-center gap-3">
              <span className="w-8 h-px bg-gold" />Scroll to explore
            </div>
            <a href={PHONE_HREF} className="hidden md:block text-ivory/80 font-display text-xl hover:text-gold-soft transition-colors">{PHONE}</a>
          </div>
        </div>
      </section>

      {/* =============== STATS BAND =============== */}
      <section className="relative bg-sage-deep text-ivory border-y border-gold/20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/20 border-x border-gold/20">
          {stats.map((s, i) => (
            <div key={s.k} className="reveal p-8 md:p-12 text-center hover:bg-sage-darker/40 transition-colors duration-500" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="font-display text-3xl md:text-4xl text-gold-soft">{s.k}</div>
              <div className="w-8 h-px bg-gold mx-auto my-4" />
              <div className="caps text-ivory/70">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =============== INTRO — editorial split =============== */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 bg-ivory">
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="reveal lg:col-span-6">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-gold/50" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b border-r border-gold/50" />
              <div className="lux-image">
                <img src={room1} alt="The main treatment room" className="w-full h-[70vh] md:h-[80vh] object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-4 md:-left-10 bg-ivory px-8 py-6 shadow-lux border border-gold/30 max-w-[260px]">
                <div className="font-display text-4xl text-sage-deep">15+</div>
                <div className="caps text-gold mt-2">Years of practice</div>
                <div className="w-8 h-px bg-charcoal/10 my-3" />
                <div className="text-xs text-charcoal-soft leading-relaxed">Trained across remedial, deep tissue &amp; holistic techniques.</div>
              </div>
            </div>
          </div>
          <div className="reveal lg:col-span-6 lg:pl-8">
            <div className="flex items-center gap-4 mb-8">
              <span className="hairline-gold" />
              <span className="caps text-gold">An Invitation</span>
            </div>
            <h2 className="display-xl text-sage-deep text-4xl md:text-5xl lg:text-6xl leading-[1.02] mb-8">
              A sanctuary built on <span className="font-script italic text-gold">presence</span>,<br/>precision &amp; genuine care.
            </h2>
            <div className="hairline-gold mb-8" />
            <p className="text-charcoal-soft text-lg leading-[1.85] mb-6 font-light">
              The Restorative Sanctuary was created as an escape from the ordinary — a private, considered space where every element is shaped around a single purpose: your restoration.
            </p>
            <p className="text-charcoal-soft leading-[1.85] mb-10 font-light">
              Camilla brings over fifteen years of remedial and holistic training to each treatment. Her approach is unhurried, precise and deeply personal — never templated, always tailored to the body in front of her.
            </p>
            <a href="#about" className="inline-flex items-center gap-3 caps text-sage-deep hover:text-gold transition-colors border-b border-gold/40 pb-1">
              Meet Camilla <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* =============== TREATMENTS — alternating full-bleed panels =============== */}
      <section id="treatments" className="relative bg-sage-darker text-ivory py-24 md:py-32">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="reveal text-center mb-20 md:mb-28">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="hairline-gold" />
              <span className="caps text-gold">Signature Rituals</span>
              <span className="hairline-gold" />
            </div>
            <h2 className="display-xl text-ivory text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-4xl mx-auto">
              Treatments shaped<br/>entirely <span className="font-script italic text-gold-soft">around you.</span>
            </h2>
            <p className="text-ivory/70 max-w-xl mx-auto mt-8 leading-relaxed font-light">
              Each ritual begins with quiet consultation and unfolds through techniques chosen for what your body needs today.
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {treatments.map((t, i) => {
              const reverse = i % 2 === 1;
              return (
                <div key={t.name} className={`reveal grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="lg:col-span-7 relative">
                    <div className="lux-image relative">
                      <img src={t.image} alt={t.name} className="w-full h-[55vh] md:h-[75vh] object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-sage-darker/60 to-transparent" />
                      <div className="absolute top-8 left-8 font-display text-7xl md:text-8xl text-gold-soft/70 leading-none">{t.n}</div>
                      {t.featured && (
                        <div className="absolute top-8 right-8 bg-gold text-charcoal px-4 py-2 caps text-[10px]">✦ House Favourite</div>
                      )}
                    </div>
                  </div>
                  <div className={`lg:col-span-5 ${reverse ? "lg:pr-8" : "lg:pl-8"}`}>
                    <div className="caps text-gold-soft mb-4">{t.tag} · {t.duration}</div>
                    <h3 className="font-display text-4xl md:text-5xl mb-6 leading-tight">{t.name}</h3>
                    <div className="w-12 h-px bg-gold mb-6" />
                    <p className="text-ivory/75 leading-[1.85] text-lg mb-8 font-light">{t.desc}</p>
                    <ul className="space-y-3 mb-10">
                      {t.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-3 text-ivory/70 text-sm">
                          <span className="text-gold mt-1 text-xs">✦</span>{inc}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-end justify-between border-t border-ivory/15 pt-6">
                      <div>
                        <div className="caps text-ivory/50 mb-1">Investment</div>
                        <div className="font-display text-4xl text-gold-soft">{t.price}</div>
                      </div>
                      <a href="#book" className="caps text-ivory border-b border-gold pb-1 hover:text-gold transition-colors">Reserve →</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Specialist list */}
          <div className="reveal mt-28 md:mt-36 pt-16 border-t border-ivory/10">
            <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-20 mb-8">
              <div>
                <div className="caps text-gold mb-4">Also Available</div>
                <h3 className="font-display text-3xl md:text-4xl text-ivory max-w-xs leading-tight">Specialist therapies.</h3>
              </div>
              <div className="divide-y divide-ivory/10">
                {moreTreatments.map((m) => (
                  <div key={m.name} className="py-6 grid md:grid-cols-[1fr_2fr_auto] gap-4 md:gap-8 items-baseline group cursor-default">
                    <div>
                      <div className="font-display text-2xl text-ivory group-hover:text-gold-soft transition-colors">{m.name}</div>
                      <div className="caps text-ivory/50 mt-1">{m.time}</div>
                    </div>
                    <p className="text-ivory/65 text-sm leading-relaxed font-light">{m.desc}</p>
                    <div className="font-display text-2xl text-gold-soft">{m.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============== TRANSFORMATION JOURNEY =============== */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 bg-stone">
        <div className="max-w-[1500px] mx-auto">
          <div className="reveal text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="hairline-gold" />
              <span className="caps text-gold">The Transformation</span>
              <span className="hairline-gold" />
            </div>
            <h2 className="display-xl text-sage-deep text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-3xl mx-auto">
              Four movements toward<br/><span className="font-script italic text-gold">restored wellbeing.</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gold/40 -translate-y-1/2" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
              {journey.map((j, i) => (
                <div key={j.n} className="reveal relative" style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold ring-8 ring-stone" />
                  <div className="bg-ivory p-10 border border-charcoal/5 shadow-soft hover:shadow-lux transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="flex items-baseline justify-between mb-6">
                      <span className="font-display text-5xl text-gold">{j.n}</span>
                      <span className="caps text-charcoal/40">Step</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-sage-deep mb-4">{j.title}</h3>
                    <div className="w-8 h-px bg-gold mb-4" />
                    <p className="text-charcoal-soft leading-relaxed text-sm font-light">{j.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== THE SANCTUARY — immersive =============== */}
      <section id="sanctuary" className="relative bg-ivory">
        {/* Full bleed parallax hero */}
        <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
          <div className="absolute inset-0" style={{ transform: `translateY(${(y - 1800) * 0.25}px) scale(1.1)` }}>
            <img src={room1} alt="The sanctuary treatment room" className="w-full h-[120%] object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-sage-darker/70 via-sage-darker/20 to-transparent" />
          <div className="relative h-full flex items-end px-6 md:px-14 pb-14 md:pb-20">
            <div className="max-w-[1500px] mx-auto w-full">
              <div className="reveal max-w-3xl">
                <div className="caps text-gold-soft mb-6">The Sanctuary</div>
                <h2 className="display-xl text-ivory text-5xl md:text-7xl lg:text-8xl leading-[1] mb-4">
                  Softened light.<br/><span className="font-script italic text-gold-soft">Warm textures.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Sanctuary details */}
        <div className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="reveal lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <h3 className="font-display text-3xl md:text-5xl text-sage-deep leading-tight mb-6">
                  A space designed to slow you down.
                </h3>
                <div className="hairline-gold mb-8" />
                <p className="text-charcoal-soft leading-[1.85] font-light mb-8">
                  Every corner of the studio is shaped to help you exhale the moment you step inside — from the flicker of beeswax candlelight to the warmth of the treatment table.
                </p>
                <a href="#book" className="btn-lux">Reserve Your Time</a>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="divide-y divide-charcoal/10 border-t border-charcoal/10">
                {sanctuaryDetails.map((d, i) => (
                  <div key={d.title} className="reveal py-8 grid grid-cols-[auto_1fr] gap-6" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="font-display text-gold text-xl w-10">0{i + 1}</div>
                    <div>
                      <h4 className="font-display text-2xl md:text-3xl text-sage-deep mb-3">{d.title}</h4>
                      <p className="text-charcoal-soft leading-relaxed font-light">{d.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Magazine gallery */}
        <div className="pb-24 md:pb-32 px-6 md:px-12">
          <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-3 md:gap-5">
            <div className="reveal col-span-12 md:col-span-7 lux-image">
              <img src={room2} alt="Warmly lit treatment room" className="w-full h-[45vh] md:h-[65vh] object-cover" />
            </div>
            <div className="reveal col-span-6 md:col-span-5 lux-image">
              <img src={shelves} alt="Curated shelves" className="w-full h-[45vh] md:h-[65vh] object-cover" />
            </div>
            <div className="reveal col-span-6 md:col-span-4 lux-image">
              <img src={entrance} alt="Sanctuary entrance" className="w-full h-[35vh] md:h-[45vh] object-cover" />
            </div>
            <div className="reveal col-span-6 md:col-span-4 bg-sage-deep text-ivory p-8 md:p-10 flex flex-col justify-between min-h-[35vh]">
              <div className="font-display text-7xl text-gold-soft leading-none">"</div>
              <div>
                <p className="font-display text-xl md:text-2xl italic leading-snug mb-6">A moment to pause, breathe, and come home to yourself.</p>
                <div className="caps text-gold-soft">— Camilla</div>
              </div>
            </div>
            <div className="reveal col-span-12 md:col-span-4 lux-image">
              <img src={room3} alt="Candlelit massage table" className="w-full h-[35vh] md:h-[45vh] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* =============== PRICING PACKAGES =============== */}
      <section id="pricing" className="relative py-24 md:py-40 px-6 md:px-12 bg-stone-warm/60">
        <div className="max-w-[1500px] mx-auto">
          <div className="reveal text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="hairline-gold" />
              <span className="caps text-gold">Signature Packages</span>
              <span className="hairline-gold" />
            </div>
            <h2 className="display-xl text-sage-deep text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-3xl mx-auto">
              A considered <span className="font-script italic text-gold">investment</span><br/>in your wellbeing.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`reveal group relative flex flex-col p-10 lg:p-12 transition-all duration-500 hover:-translate-y-2 ${
                  p.featured
                    ? "bg-sage-darker text-ivory lg:-translate-y-4 lg:scale-[1.02] shadow-lux border border-gold/40"
                    : "bg-ivory text-charcoal border border-charcoal/10 hover:shadow-lux"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal caps text-[10px] px-5 py-2">✦ Most Loved</span>
                )}
                <div className={`caps mb-3 ${p.featured ? "text-gold-soft" : "text-gold"}`}>{p.sessions}</div>
                <h3 className={`font-display text-4xl mb-4 ${p.featured ? "text-ivory" : "text-sage-deep"}`}>{p.name}</h3>
                <div className={`hairline-gold mb-6`} />
                <p className={`leading-relaxed mb-8 font-light ${p.featured ? "text-ivory/75" : "text-charcoal-soft"}`}>{p.desc}</p>
                <div className="mb-8">
                  <div className={`font-display text-6xl ${p.featured ? "text-gold-soft" : "text-sage-deep"}`}>{p.price}</div>
                  {p.perSession && <div className={`caps mt-2 ${p.featured ? "text-ivory/50" : "text-charcoal/40"}`}>{p.perSession}</div>}
                </div>
                <ul className={`space-y-3 mb-10 text-sm ${p.featured ? "text-ivory/80" : "text-charcoal-soft"}`}>
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <span className="text-gold text-xs mt-1">✦</span>{perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#book"
                  className={`mt-auto inline-flex items-center justify-center py-4 px-6 caps transition-all duration-400 ${
                    p.featured
                      ? "bg-gold text-charcoal hover:bg-ivory"
                      : "bg-sage-deep text-ivory hover:bg-gold hover:text-charcoal"
                  }`}
                >
                  Choose {p.name}
                </a>
              </div>
            ))}
          </div>

          <p className="reveal text-center text-charcoal-soft mt-12 font-light text-sm">
            All packages include complimentary consultation, herbal tea ritual and aftercare guidance.
          </p>
        </div>
      </section>

      {/* =============== ABOUT CAMILLA — timeline =============== */}
      <section id="about" className="relative py-24 md:py-40 bg-sage-darker text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 15% 20%, hsl(var(--gold)) 0%, transparent 40%), radial-gradient(circle at 85% 80%, hsl(var(--sage)) 0%, transparent 50%)` }} />
        <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
            <div className="reveal lg:col-span-7 relative order-2 lg:order-1">
              <div className="relative">
                <div className="lux-image">
                  <img src={camilla} alt="Camilla, founder and therapist" className="w-full h-[70vh] md:h-[85vh] object-cover" />
                </div>
                <div className="absolute inset-0 border border-gold-soft/25 m-4 pointer-events-none" />
                <div className="absolute -bottom-6 -right-4 md:-right-10 bg-ivory text-charcoal px-8 py-6 shadow-lux">
                  <div className="font-script italic text-3xl text-gold">Camilla</div>
                  <div className="caps text-charcoal/50 mt-1">Founder &amp; Therapist</div>
                </div>
                <div className="hidden md:block absolute top-8 -left-8 bg-sage-deep border border-gold/40 px-6 py-4">
                  <div className="font-display text-3xl text-gold-soft">2008</div>
                  <div className="caps text-ivory/60">Qualified</div>
                </div>
              </div>
            </div>
            <div className="reveal lg:col-span-5 order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="hairline-gold" />
                <span className="caps text-gold">Meet Camilla</span>
              </div>
              <h2 className="display-xl text-ivory text-4xl md:text-6xl leading-[1.02] mb-8">
                Fifteen years of <span className="font-script italic text-gold-soft">quiet</span> devotion to the craft.
              </h2>
              <div className="hairline-gold mb-8" />
              <div className="space-y-5 text-ivory/75 leading-[1.85] font-light">
                <p className="text-lg">
                  I founded The Restorative Sanctuary to offer something different — treatments that feel less like a clinic appointment and more like a genuine moment of escape.
                </p>
                <p>
                  With over fifteen years of training in remedial, deep tissue and holistic techniques, I work with each client individually. Every session begins with a quiet conversation, so the treatment can be shaped around exactly what your body and mind need that day.
                </p>
                <p>
                  You'll find me in a small, private studio in Edinburgh — softly lit, warm, and entirely your own for the hour.
                </p>
              </div>
              <a href="#book" className="btn-lux-light mt-10">Book with Camilla</a>
            </div>
          </div>

          {/* Timeline */}
          <div className="reveal">
            <div className="caps text-gold mb-6 text-center">The Journey</div>
            <h3 className="font-display text-3xl md:text-5xl text-ivory text-center mb-16">A practice in continual refinement.</h3>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/30 -translate-x-1/2 hidden md:block" />
              <div className="space-y-12 md:space-y-20">
                {timeline.map((t, i) => {
                  const left = i % 2 === 0;
                  return (
                    <div key={t.year} className="reveal grid md:grid-cols-2 gap-8 md:gap-16 relative">
                      <div className="hidden md:block absolute left-1/2 top-6 w-3 h-3 rounded-full bg-gold ring-4 ring-sage-darker -translate-x-1/2" />
                      <div className={left ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"}>
                        <div className="font-display text-5xl md:text-6xl text-gold-soft mb-2">{t.year}</div>
                        <div className="w-12 h-px bg-gold mb-4 md:mx-0" style={{ marginLeft: left ? "auto" : "0" }} />
                        <h4 className="font-display text-2xl md:text-3xl text-ivory mb-3">{t.title}</h4>
                        <p className="text-ivory/70 leading-relaxed font-light">{t.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-24 pt-16 border-t border-ivory/10 grid md:grid-cols-3 gap-8 text-center">
              {[
                { t: "ITEC Certified", d: "Diploma in Massage Therapy" },
                { t: "FHT Registered", d: "Federation of Holistic Therapists" },
                { t: "Fully Insured", d: "Professional indemnity & liability" },
              ].map((c) => (
                <div key={c.t} className="p-8 border border-ivory/10 hover:border-gold/40 transition-colors">
                  <div className="font-display text-2xl text-gold-soft mb-2">{c.t}</div>
                  <div className="w-8 h-px bg-gold/50 mx-auto my-3" />
                  <div className="caps text-ivory/60">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== TESTIMONIALS =============== */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 bg-ivory">
        <div className="max-w-5xl mx-auto text-center">
          <div className="reveal">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="hairline-gold" />
              <span className="caps text-gold">In Their Words</span>
              <span className="hairline-gold" />
            </div>
            <div className="font-display text-8xl md:text-9xl text-gold/40 leading-none mt-4">"</div>
          </div>
          <div className="relative min-h-[300px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-1000 ${activeT === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
              >
                <p className="font-display italic text-sage-deep text-2xl md:text-4xl lg:text-5xl leading-[1.25] max-w-4xl mx-auto font-light">
                  {t.quote}
                </p>
                <div className="mt-12">
                  <div className="hairline-gold mb-4" />
                  <div className="font-display text-2xl text-charcoal">{t.name}</div>
                  <div className="caps text-gold mt-2">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveT(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-px transition-all duration-500 ${activeT === i ? "w-14 bg-gold" : "w-6 bg-charcoal/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =============== BOOKING =============== */}
      <section id="book" className="relative py-24 md:py-32 px-6 md:px-12 bg-sage-darker text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={room2} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-sage-darker/80" />
        </div>
        <div className="relative max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="reveal lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline-gold" />
              <span className="caps text-gold-soft">Reserve Your Session</span>
            </div>
            <h2 className="display-xl text-ivory text-4xl md:text-5xl lg:text-6xl leading-[1.02] mb-8">
              Book your <span className="font-script italic text-gold-soft">moment</span> of stillness.
            </h2>
            <div className="hairline-gold mb-8" />
            <p className="text-ivory/75 leading-[1.85] font-light text-lg mb-10">
              Choose your treatment, preferred date and time. Camilla will confirm your booking personally within 24 hours.
            </p>
            <div className="space-y-6 border-t border-ivory/15 pt-8">
              <div>
                <div className="caps text-gold-soft mb-2">Telephone</div>
                <a href={PHONE_HREF} className="font-display text-2xl text-ivory hover:text-gold-soft transition-colors">{PHONE}</a>
              </div>
              <div>
                <div className="caps text-gold-soft mb-2">Email</div>
                <a href={`mailto:${EMAIL}`} className="font-display text-xl text-ivory hover:text-gold-soft break-all">{EMAIL}</a>
              </div>
              <div>
                <div className="caps text-gold-soft mb-2">Hours</div>
                <p className="text-sm text-ivory/70 font-light leading-relaxed">Mon – Fri · 9:00 – 20:00<br/>Saturday · 10:00 – 18:00<br/>Sunday · By appointment</p>
              </div>
              <div>
                <div className="caps text-gold-soft mb-2">Location</div>
                <p className="text-sm text-ivory/70 font-light">Private studio · Edinburgh<br/>Address shared on booking confirmation.</p>
              </div>
            </div>
          </div>

          <div className="reveal lg:col-span-7">
            <div className="bg-ivory text-charcoal p-8 md:p-14 shadow-lux border border-gold/30 relative">
              <div className="absolute -top-4 -right-4 w-28 h-28 border-t border-r border-gold/60" />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 border-b border-l border-gold/60" />
              {bookingSent ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-sage-deep flex items-center justify-center text-gold text-4xl">✦</div>
                  <h3 className="font-display text-5xl text-sage-deep mb-4">Thank you.</h3>
                  <div className="hairline-gold mb-6" />
                  <p className="text-charcoal-soft max-w-md mx-auto leading-relaxed font-light">
                    Your booking request has been received. Camilla will reply personally within 24 hours to confirm your appointment.
                  </p>
                  <button onClick={() => setBookingSent(false)} className="btn-lux mt-10">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-7">
                  <div className="pb-6 border-b border-charcoal/10">
                    <div className="caps text-gold mb-2">Booking Request</div>
                    <h3 className="font-display text-4xl text-sage-deep">Reserve your session</h3>
                  </div>

                  <Field label="Treatment">
                    <select name="treatment" required defaultValue="" className="lux-input">
                      <option value="" disabled>Select a treatment…</option>
                      {[...treatments.map(t => t.name), ...moreTreatments.map(t => t.name), "Gift voucher", "Not sure yet"].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Preferred date">
                      <input type="date" name="date" required min={today} className="lux-input" />
                    </Field>
                    <Field label="Preferred time">
                      <select name="time" required defaultValue="" className="lux-input">
                        <option value="" disabled>Select a time…</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Full name">
                      <input name="name" required maxLength={100} placeholder="Your name" className="lux-input" />
                    </Field>
                    <Field label="Telephone">
                      <input name="phone" type="tel" required maxLength={30} placeholder="07…" className="lux-input" />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input name="email" type="email" required maxLength={255} placeholder="you@email.com" className="lux-input" />
                  </Field>

                  <Field label="Notes for Camilla">
                    <textarea name="notes" rows={4} maxLength={1000} placeholder="Areas of tension, preferences, special occasions…" className="lux-input resize-none" />
                  </Field>

                  <button type="submit" className="btn-lux w-full !py-5">Request Booking</button>
                  <p className="text-xs text-charcoal/50 text-center font-light">
                    Your details are kept private and used only to arrange your treatment.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =============== FAQ =============== */}
      <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12 bg-ivory">
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="reveal lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <span className="hairline-gold" />
              <span className="caps text-gold">Good to Know</span>
            </div>
            <h2 className="display-xl text-sage-deep text-4xl md:text-5xl lg:text-6xl leading-[1.02] mb-8">
              Frequently<br/><span className="font-script italic text-gold">asked.</span>
            </h2>
            <div className="hairline-gold mb-8" />
            <p className="text-charcoal-soft font-light leading-relaxed">
              Have another question? Reach out directly — Camilla replies personally within 24 hours.
            </p>
            <div className="mt-10 space-y-4">
              <a href={PHONE_HREF} className="block font-display text-2xl text-sage-deep hover:text-gold transition-colors">{PHONE}</a>
              <a href={`mailto:${EMAIL}`} className="block font-display text-xl text-sage-deep hover:text-gold transition-colors break-all">{EMAIL}</a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="divide-y divide-charcoal/15 border-t border-b border-charcoal/15">
              {faqs.map((f, i) => (
                <div key={i} className="reveal">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-7 flex items-center justify-between text-left gap-6 group"
                  >
                    <span className="font-display text-xl md:text-2xl text-sage-deep group-hover:text-gold transition-colors">{f.q}</span>
                    <span className={`text-gold text-2xl font-light transition-transform duration-500 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? "max-h-96 pb-7" : "max-h-0"}`}>
                    <p className="text-charcoal-soft leading-relaxed font-light max-w-3xl">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <footer className="bg-[hsl(133,20%,10%)] text-ivory/70 pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto grid md:grid-cols-12 gap-10 pb-12 border-b border-ivory/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-gold/40">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display text-xl text-ivory">The Restorative Sanctuary</div>
                <div className="caps text-gold-soft">By Camilla · Edinburgh</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-light max-w-md">
              A private luxury sanctuary for restorative massage therapy and holistic wellbeing in the heart of Edinburgh, Scotland.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="caps text-gold-soft mb-5">Explore</div>
            <ul className="space-y-3 text-sm">
              {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold-soft transition-colors">{n.label}</a></li>)}
              <li><a href="#book" className="hover:text-gold-soft transition-colors">Booking</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="caps text-gold-soft mb-5">Sanctuary</div>
            <p className="text-sm mb-2"><a href={PHONE_HREF} className="hover:text-gold-soft">{PHONE}</a></p>
            <p className="text-sm break-all mb-2"><a href={`mailto:${EMAIL}`} className="hover:text-gold-soft">{EMAIL}</a></p>
            <p className="text-sm mb-6">Edinburgh, Scotland</p>
            <a href="#book" className="inline-block caps text-gold border-b border-gold/50 hover:border-gold pb-0.5">Reserve a treatment →</a>
          </div>
        </div>
        <div className="max-w-[1500px] mx-auto mt-8 flex flex-col md:flex-row justify-between gap-3 caps text-ivory/40">
          <p>© {new Date().getFullYear()} The Restorative Sanctuary</p>
          <p>Crafted with care · Edinburgh</p>
        </div>
      </footer>

      {/* Floating mobile CTA */}
      <a href="#book" className="lg:hidden fixed bottom-5 right-5 z-40 bg-gold text-charcoal px-6 py-3 shadow-lux caps">
        Reserve
      </a>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block caps text-charcoal/50 mb-1">{label}</label>
    {children}
  </div>
);

export default Index;
