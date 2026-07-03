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

const treatments = [
  {
    n: "01",
    name: "Swedish Relaxation",
    duration: "60 / 90 min",
    price: "from £60",
    desc: "Long, flowing strokes that calm the nervous system and melt away everyday stress.",
    includes: ["Full body relaxation", "Warm aromatic oils", "Guided breathwork"],
    image: room2,
  },
  {
    n: "02",
    name: "Bespoke Restorative",
    duration: "90 min",
    price: "£85",
    desc: "Your treatment, tailored — a personalised blend of techniques after a thorough consultation.",
    includes: ["Personal consultation", "Blended techniques", "Hot towel finish", "Herbal tea ritual"],
    image: treatment,
    featured: true,
  },
  {
    n: "03",
    name: "Deep Tissue",
    duration: "60 / 90 min",
    price: "from £65",
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

const journey = [
  { step: "I", title: "Arrive", body: "Step away from the city. You're welcomed with warmth, quiet conversation and a herbal tea ritual." },
  { step: "II", title: "Relax", body: "Softened lighting, curated scent and stillness. Your consultation shapes the hour ahead." },
  { step: "III", title: "Restore", body: "A treatment designed around your body — precise, unhurried and entirely present." },
  { step: "IV", title: "Renew", body: "Time to return slowly. Aftercare guidance and space to carry the calm home with you." },
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
  { href: "#intro", label: "Sanctuary" },
  { href: "#treatments", label: "Treatments" },
  { href: "#journey", label: "Journey" },
  { href: "#camilla", label: "Camilla" },
  { href: "#book", label: "Book" },
];

/* ------ Reusable eyebrow ------ */
const Eyebrow = ({ children, light = false }: any) => (
  <div className={`inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] ${light ? "text-gold-soft" : "text-gold"}`}>
    <span className="w-8 h-px bg-current opacity-70" />
    {children}
  </div>
);

/* ------ Parallax hook ------ */
const useParallax = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
};

/* ------ Reveal on scroll ------ */
const Reveal = ({ children, className = "", delay = 0 }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1100ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bookingSent, setBookingSent] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const y = useParallax();
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((i) => (i + 1) % testimonials.length), 6500);
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
    <div className="min-h-screen bg-[hsl(36,32%,94%)] text-foreground overflow-x-hidden selection:bg-olive selection:text-cream">
      {/* =============== TOP MARQUEE =============== */}
      <div className="hidden md:block bg-olive-deep text-cream/80 text-[10px] tracking-[0.4em] uppercase py-2 text-center">
        <span className="text-gold-soft">✦</span>&nbsp;&nbsp; Private wellness sanctuary · Edinburgh &nbsp;&nbsp;<span className="text-gold-soft">✦</span>&nbsp;&nbsp; By appointment only &nbsp;&nbsp;<span className="text-gold-soft">✦</span>&nbsp;&nbsp; Est. Scotland
      </div>

      {/* =============== NAV =============== */}
      <header className={`fixed inset-x-0 z-50 transition-all duration-500 ${scrolled ? "top-0 bg-[hsl(36,32%,94%)]/90 backdrop-blur-xl border-b border-olive/10 py-3" : "top-0 md:top-8 py-5 bg-transparent"}`}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-gold/40 shadow-soft">
              <img src={logo} alt="The Restorative Sanctuary logo" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg md:text-xl text-olive-deep tracking-tight">The Restorative Sanctuary</div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold">by Camilla · Edinburgh</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.32em]">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-olive/70 hover:text-gold transition-colors relative group">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <a href={PHONE_HREF} className="text-xs tracking-widest text-olive/70 hover:text-gold">{PHONE}</a>
            <a href="#book" className="btn-primary !py-3 !px-6 !text-[10px]">Reserve</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-olive" aria-label="Menu">
            <div className={`w-6 h-px bg-current transition-all ${menuOpen ? "translate-y-1 rotate-45" : ""}`} />
            <div className={`w-6 h-px bg-current my-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-px bg-current transition-all ${menuOpen ? "-translate-y-1 -rotate-45" : "w-4 ml-auto"}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-cream/98 backdrop-blur-xl border-t border-olive/10 mt-3">
            <div className="px-6 py-8 flex flex-col gap-5">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="font-display text-2xl text-olive-deep hover:text-gold border-b border-olive/10 pb-3">{n.label}</a>
              ))}
              <a href={PHONE_HREF} className="text-sm text-gold mt-2 tracking-widest">{PHONE}</a>
              <a href="#book" onClick={() => setMenuOpen(false)} className="btn-primary mt-2 w-full">Reserve a Session</a>
            </div>
          </div>
        )}
      </header>

      {/* =============== HERO — cinematic =============== */}
      <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${y * 0.35}px) scale(1.08)` }}>
          <img src={treatment} alt="Candlelit treatment room at The Restorative Sanctuary" className="w-full h-[120%] object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-olive-deep/70 via-olive-deep/40 to-olive-deep/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-olive-deep/60 via-transparent to-transparent" />

        {/* Floating gold frame */}
        <div className="absolute inset-6 md:inset-10 border border-gold-soft/25 pointer-events-none" />

        <div className="relative z-10 min-h-[100svh] flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-14 pt-40">
          <div className="max-w-[1400px] mx-auto w-full">
            <Reveal>
              <div className="text-gold-soft text-[10px] uppercase tracking-[0.5em] mb-8 flex items-center gap-3">
                <span className="w-12 h-px bg-gold-soft" />
                Edinburgh · A Private Wellness Sanctuary
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h1 className="font-display font-light text-cream text-[13vw] md:text-[8vw] lg:text-[6.2vw] leading-[0.95] tracking-[-0.02em] max-w-6xl">
                Your sanctuary for<br/>
                <span className="italic text-gold-soft">rest, recovery</span><br/>
                &amp; wellbeing.
              </h1>
            </Reveal>
            <Reveal delay={500}>
              <div className="mt-10 md:mt-14 grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end max-w-5xl">
                <p className="text-cream/85 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                  Luxury massage therapy and personalised wellness treatments — hand-crafted for the body and mind in a private studio in Edinburgh.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#book" className="btn-primary bg-gold !text-olive-deep hover:!bg-cream">Reserve Your Session</a>
                  <a href="#treatments" className="btn-outline !border-cream/40 !text-cream hover:!border-gold hover:!text-gold">Explore Treatments</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/70 text-[10px] uppercase tracking-[0.5em] flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="w-px h-10 bg-gradient-to-b from-gold-soft to-transparent animate-pulse" />
        </div>
      </section>

      {/* =============== INTRO — editorial split =============== */}
      <section id="intro" className="relative py-24 md:py-40 px-6 md:px-14 bg-[hsl(36,32%,94%)]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          <Reveal className="lg:col-span-6 relative">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-gold/50" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b border-r border-gold/50" />
              <img src={room1} alt="Interior of the sanctuary treatment room" className="w-full h-[70vh] object-cover shadow-feature" />
              <div className="absolute -bottom-10 -left-4 md:-left-10 bg-cream px-8 py-6 shadow-feature border border-gold/30 max-w-[240px]">
                <div className="font-display text-4xl text-olive">10+</div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold mt-1">Years of expertise</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-6 lg:pl-10">
            <Eyebrow>An Invitation</Eyebrow>
            <h2 className="font-display font-light text-olive-deep text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-6 mb-8 tracking-tight">
              A quieter kind of<br/>luxury <span className="italic text-gold">— </span>designed<br/>entirely for you.
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="text-olive/80 text-lg leading-relaxed mb-6 font-light">
              The Restorative Sanctuary was created as an escape from the ordinary. A private, considered space where every element — the lighting, the scent, the pace — is shaped around a single purpose: your restoration.
            </p>
            <p className="text-olive/70 leading-relaxed mb-10">
              Camilla brings over a decade of remedial and holistic training to each treatment. Her approach is unhurried, precise and deeply personal — never templated, always tailored.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-olive/10">
              {[
                { k: "ITEC", v: "Certified" },
                { k: "FHT", v: "Registered" },
                { k: "1:1", v: "Private studio" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display text-2xl text-gold">{s.k}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-olive/60 mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =============== SIGNATURE TREATMENTS — alternating panels =============== */}
      <section id="treatments" className="relative bg-olive-deep py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--gold)) 0%, transparent 50%), radial-gradient(circle at 80% 70%, hsl(var(--sage)) 0%, transparent 60%)` }} />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-14">
          <Reveal className="text-center mb-20 md:mb-28">
            <Eyebrow light>Signature Rituals</Eyebrow>
            <h2 className="font-display font-light text-cream text-4xl md:text-6xl lg:text-7xl leading-[1.05] mt-6 max-w-4xl mx-auto">
              Treatments shaped<br/>around <span className="italic text-gold-soft">you</span>.
            </h2>
            <p className="text-cream/70 max-w-xl mx-auto mt-8 leading-relaxed font-light">
              Each ritual begins with quiet consultation and unfolds through techniques chosen for what your body needs today.
            </p>
          </Reveal>

          <div className="space-y-24 md:space-y-32">
            {treatments.map((t, i) => {
              const reverse = i % 2 === 1;
              return (
                <Reveal key={t.name}>
                  <div className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="lg:col-span-7 relative group">
                      <div className="relative overflow-hidden">
                        <img src={t.image} alt={`${t.name} treatment room`} className="w-full h-[55vh] md:h-[70vh] object-cover transition-transform duration-[2500ms] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/60 to-transparent" />
                        <div className="absolute top-6 left-6 font-display text-6xl md:text-8xl text-gold-soft/80 leading-none">{t.n}</div>
                        {t.featured && (
                          <div className="absolute top-6 right-6 bg-gold text-olive-deep px-4 py-2 text-[10px] uppercase tracking-[0.35em]">
                            ✦ Most Loved
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`lg:col-span-5 ${reverse ? "lg:pr-8" : "lg:pl-8"}`}>
                      <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft mb-4">{t.duration}</div>
                      <h3 className="font-display font-light text-cream text-4xl md:text-5xl mb-6 leading-tight">{t.name}</h3>
                      <div className="w-12 h-px bg-gold mb-6" />
                      <p className="text-cream/75 leading-relaxed text-lg mb-8 font-light">{t.desc}</p>
                      <ul className="space-y-3 mb-10">
                        {t.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-3 text-cream/70 text-sm">
                            <span className="text-gold mt-1 text-xs">✦</span>{inc}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-end justify-between border-t border-cream/15 pt-6">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.35em] text-cream/50 mb-1">Investment</div>
                          <div className="font-display text-4xl text-gold-soft">{t.price}</div>
                        </div>
                        <a href="#book" className="text-cream text-[10px] uppercase tracking-[0.35em] border-b border-gold pb-1 hover:text-gold transition-colors">Reserve →</a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Also available — minimal list */}
          <Reveal className="mt-28 md:mt-36 pt-16 border-t border-cream/10">
            <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-20 mb-10">
              <div>
                <Eyebrow light>Also Available</Eyebrow>
                <h3 className="font-display text-3xl md:text-4xl text-cream mt-4 max-w-xs leading-tight">Specialist therapies.</h3>
              </div>
              <div className="divide-y divide-cream/10">
                {moreTreatments.map((m) => (
                  <div key={m.name} className="py-6 grid md:grid-cols-[1fr_2fr_auto] gap-4 md:gap-8 items-baseline group hover:pl-2 transition-all cursor-default">
                    <div>
                      <div className="font-display text-2xl text-cream group-hover:text-gold-soft transition-colors">{m.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.35em] text-cream/50 mt-1">{m.time}</div>
                    </div>
                    <p className="text-cream/65 text-sm leading-relaxed font-light">{m.desc}</p>
                    <div className="font-display text-2xl text-gold-soft">{m.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =============== JOURNEY — 4 steps =============== */}
      <section id="journey" className="relative py-24 md:py-40 px-6 md:px-14 bg-[hsl(80,14%,90%)]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="text-center mb-20">
            <Eyebrow>Your Wellbeing Journey</Eyebrow>
            <h2 className="font-display font-light text-olive-deep text-4xl md:text-6xl lg:text-7xl leading-[1.05] mt-6 max-w-3xl mx-auto">
              Four moments of<br/><span className="italic text-gold">quiet transformation.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {journey.map((j, i) => (
              <Reveal key={j.step} delay={i * 150}>
                <div className="relative group h-full">
                  <div className="bg-cream/70 backdrop-blur-md border border-gold/20 p-10 h-full transition-all duration-500 hover:bg-cream hover:-translate-y-2 hover:shadow-feature">
                    <div className="font-display text-7xl text-gold-soft/70 leading-none mb-6 group-hover:text-gold transition-colors">{j.step}</div>
                    <div className="w-8 h-px bg-olive/30 mb-4" />
                    <h3 className="font-display text-3xl text-olive-deep mb-4">{j.title}</h3>
                    <p className="text-olive/70 leading-relaxed font-light text-sm">{j.body}</p>
                  </div>
                  {i < journey.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gold/40 z-10" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =============== EXPERIENCE THE SANCTUARY — immersive gallery =============== */}
      <section id="sanctuary" className="relative py-24 md:py-32 bg-[hsl(36,32%,94%)]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-14">
          <div className="grid lg:grid-cols-12 gap-10 mb-16 items-end">
            <Reveal className="lg:col-span-7">
              <Eyebrow>Experience The Sanctuary</Eyebrow>
              <h2 className="font-display font-light text-olive-deep text-4xl md:text-6xl lg:text-7xl leading-[1.05] mt-6 tracking-tight">
                Softened light.<br/><span className="italic text-gold">Warm textures.</span><br/>Quiet detail.
              </h2>
            </Reveal>
            <Reveal delay={200} className="lg:col-span-5">
              <p className="text-olive/75 leading-relaxed font-light text-lg">
                Every corner of the studio is shaped to help you exhale the moment you step inside — from the flicker of candlelight to the warmth of the treatment table.
              </p>
              <a href="#book" className="inline-block mt-8 text-[10px] uppercase tracking-[0.4em] text-olive border-b border-gold pb-1 hover:text-gold">Reserve your time →</a>
            </Reveal>
          </div>

          {/* Asymmetric magazine gallery */}
          <div className="grid grid-cols-12 gap-3 md:gap-5">
            <Reveal className="col-span-12 md:col-span-8 group overflow-hidden">
              <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                <img src={room1} alt="Warmly lit treatment room with candles" className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-110" />
                <div className="absolute bottom-6 left-6 text-cream">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft mb-1">Treatment Room</div>
                  <div className="font-display text-2xl md:text-3xl">The main sanctuary</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/60 via-transparent to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={100} className="col-span-12 md:col-span-4 flex flex-col gap-3 md:gap-5">
              <div className="group overflow-hidden relative flex-1 min-h-[30vh]">
                <img src={shelves} alt="Shelves with candles, towels and plants" className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-110" />
              </div>
              <div className="group overflow-hidden relative flex-1 min-h-[30vh]">
                <img src={entrance} alt="Warm entrance with framed qualifications" className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-110" />
              </div>
            </Reveal>
            <Reveal delay={200} className="col-span-6 md:col-span-4 group overflow-hidden">
              <div className="relative h-[40vh] overflow-hidden">
                <img src={room2} alt="Massage room with candles" className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-110" />
              </div>
            </Reveal>
            <Reveal delay={300} className="col-span-6 md:col-span-4 group overflow-hidden">
              <div className="relative h-[40vh] overflow-hidden">
                <img src={room3} alt="Candlelit massage table prepared for treatment" className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-110" />
              </div>
            </Reveal>
            <Reveal delay={400} className="col-span-12 md:col-span-4 bg-olive-deep text-cream p-8 md:p-10 flex flex-col justify-between min-h-[40vh]">
              <div className="font-display text-6xl text-gold-soft leading-none">"</div>
              <div>
                <p className="font-display text-lg md:text-xl leading-snug mb-6 italic">A moment to pause, breathe, and come home to yourself.</p>
                <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft">— Camilla</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =============== MEET CAMILLA — large portrait, story =============== */}
      <section id="camilla" className="relative py-24 md:py-40 bg-[hsl(95,20%,17%)] text-cream overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.06]" style={{ backgroundImage: `linear-gradient(135deg, hsl(var(--gold)), transparent 60%)` }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid lg:grid-cols-12 gap-10 lg:gap-20 items-center relative">
          <Reveal className="lg:col-span-5 order-2 lg:order-1">
            <Eyebrow light>Meet Camilla</Eyebrow>
            <h2 className="font-display font-light text-cream text-4xl md:text-6xl leading-[1.02] mt-6 mb-8">
              A practice built on <span className="italic text-gold-soft">presence</span>, precision and care.
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <div className="space-y-5 text-cream/75 leading-relaxed font-light">
              <p className="text-lg">
                I founded The Restorative Sanctuary to offer something different — treatments that feel less like a clinic appointment and more like a genuine moment of escape.
              </p>
              <p>
                With over a decade of training in remedial, deep tissue and holistic techniques, I work with each client individually. Every session begins with a quiet conversation, so the treatment can be shaped around exactly what your body and mind need that day.
              </p>
              <p>
                You'll find me in a small, private studio in Edinburgh — softly lit, warm, and entirely your own for the hour.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 pt-8 border-t border-cream/15">
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold-soft mb-2">Qualifications</div>
                <p className="text-cream">ITEC Diploma in Massage Therapy</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold-soft mb-2">Memberships</div>
                <p className="text-cream">FHT Registered &amp; fully insured</p>
              </div>
            </div>
            <a href="#book" className="btn-primary mt-10 bg-gold !text-olive-deep hover:!bg-cream">Book with Camilla</a>
          </Reveal>
          <Reveal delay={200} className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="relative">
              <img src={camilla} alt="Camilla, founder and therapist at The Restorative Sanctuary" className="w-full h-[80vh] object-cover shadow-feature" />
              <div className="absolute inset-0 border border-gold-soft/30 m-4" />
              <div className="absolute -bottom-6 -left-6 md:-left-10 bg-cream text-olive-deep px-8 py-6 shadow-feature">
                <div className="font-display italic text-3xl text-gold">Camilla</div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-olive/60 mt-1">Founder &amp; Therapist</div>
              </div>
              <div className="hidden md:block absolute -top-8 -right-8 bg-olive-deep border border-gold/40 px-6 py-4 text-cream">
                <div className="font-display text-3xl text-gold-soft">10+</div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-cream/60">Years</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =============== TESTIMONIALS — luxury rotator =============== */}
      <section className="relative py-24 md:py-40 px-6 md:px-14 bg-[hsl(36,32%,94%)]">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <Eyebrow>In Their Words</Eyebrow>
            <div className="font-display text-8xl md:text-9xl text-gold/40 leading-none mt-6">"</div>
          </Reveal>
          <div className="relative min-h-[280px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-1000 ${activeTestimonial === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
              >
                <p className="font-display font-light italic text-olive-deep text-2xl md:text-4xl lg:text-5xl leading-[1.25] max-w-4xl mx-auto">
                  {t.quote}
                </p>
                <div className="mt-10">
                  <div className="w-12 h-px bg-gold mx-auto mb-4" />
                  <div className="text-olive font-display text-xl">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-gold mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-px transition-all duration-500 ${activeTestimonial === i ? "w-12 bg-gold" : "w-6 bg-olive/25"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =============== BOOKING — premium =============== */}
      <section id="book" className="relative py-24 md:py-32 px-6 md:px-14 bg-olive-deep text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={room2} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-olive-deep/85" />
        </div>
        <div className="relative max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow light>Reserve Your Session</Eyebrow>
              <h2 className="font-display font-light text-cream text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-6 mb-8">
                Book your <span className="italic text-gold-soft">moment</span> of stillness.
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <p className="text-cream/75 leading-relaxed font-light text-lg mb-10">
                Choose your treatment, preferred date and time. Camilla will confirm your booking personally within 24 hours.
              </p>
              <div className="space-y-6 border-t border-cream/15 pt-8">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft mb-2">Telephone</div>
                  <a href={PHONE_HREF} className="font-display text-2xl text-cream hover:text-gold-soft transition-colors">{PHONE}</a>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft mb-2">Email</div>
                  <a href={`mailto:${EMAIL}`} className="font-display text-xl text-cream hover:text-gold-soft break-all">{EMAIL}</a>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft mb-2">Hours</div>
                  <p className="text-sm text-cream/70 font-light leading-relaxed">Mon – Fri · 9:00 – 20:00<br/>Saturday · 10:00 – 18:00<br/>Sunday · By appointment</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft mb-2">Location</div>
                  <p className="text-sm text-cream/70 font-light">Private studio · Edinburgh<br/>Address shared on booking confirmation.</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-7">
            <div className="bg-cream text-olive-deep p-8 md:p-12 shadow-feature border border-gold/30 relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-gold/60" />
              {bookingSent ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-olive flex items-center justify-center text-gold text-4xl">✦</div>
                  <h3 className="font-display text-4xl text-olive-deep mb-4">Thank you.</h3>
                  <div className="w-12 h-px bg-gold mx-auto mb-6" />
                  <p className="text-olive/70 max-w-md mx-auto leading-relaxed font-light">
                    Your booking request has been received. Camilla will reply personally within 24 hours to confirm your appointment.
                  </p>
                  <button onClick={() => setBookingSent(false)} className="btn-outline mt-10">Send another request</button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="mb-4 pb-6 border-b border-olive/10">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">Booking Request</div>
                    <h3 className="font-display text-3xl text-olive-deep">Reserve your session</h3>
                  </div>

                  <Field label="Treatment">
                    <select name="treatment" required defaultValue="" className="lux-input">
                      <option value="" disabled>Select a treatment…</option>
                      {[...treatments.map(t => t.name), ...moreTreatments.map(t => t.name), "Gift voucher", "Not sure yet"].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </Field>

                  <div className="grid md:grid-cols-2 gap-5">
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

                  <div className="grid md:grid-cols-2 gap-5">
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

                  <button type="submit" className="btn-primary w-full !py-5 bg-olive-deep hover:bg-gold">Request Booking</button>
                  <p className="text-xs text-olive/50 text-center font-light">
                    Your details are kept private and used only to arrange your treatment.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =============== FAQ =============== */}
      <section className="relative py-24 md:py-32 px-6 md:px-14 bg-[hsl(38,26%,89%)]">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <Eyebrow>Good to Know</Eyebrow>
            <h2 className="font-display font-light text-olive-deep text-4xl md:text-5xl lg:text-6xl leading-[1.05] mt-6">
              Frequently asked.
            </h2>
          </Reveal>
          <div className="divide-y divide-olive/15 border-t border-b border-olive/15">
            {faqs.map((f, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-7 flex items-center justify-between text-left gap-6 group"
                >
                  <span className="font-display text-xl md:text-2xl text-olive-deep group-hover:text-gold transition-colors">{f.q}</span>
                  <span className={`text-gold text-2xl font-light transition-transform duration-500 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? "max-h-96 pb-7" : "max-h-0"}`}>
                  <p className="text-olive/75 leading-relaxed font-light max-w-3xl">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <footer className="bg-[hsl(95,28%,10%)] text-cream/70 pt-20 pb-10 px-6 md:px-14">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 pb-12 border-b border-cream/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-gold/40">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display text-xl text-cream">The Restorative Sanctuary</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft">by Camilla · Edinburgh</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-light max-w-md">
              A private luxury sanctuary for relaxation, deep tissue and holistic massage therapy in the heart of Edinburgh, Scotland.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft mb-5">Explore</div>
            <ul className="space-y-3 text-sm">
              {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold-soft transition-colors">{n.label}</a></li>)}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold-soft mb-5">Sanctuary</div>
            <p className="text-sm mb-2"><a href={PHONE_HREF} className="hover:text-gold-soft">{PHONE}</a></p>
            <p className="text-sm break-all mb-2"><a href={`mailto:${EMAIL}`} className="hover:text-gold-soft">{EMAIL}</a></p>
            <p className="text-sm mb-6">Edinburgh, Scotland</p>
            <a href="#book" className="inline-block text-[10px] uppercase tracking-[0.4em] text-gold border-b border-gold/50 hover:border-gold pb-0.5">Reserve a treatment →</a>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-8 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.35em] text-cream/40">
          <p>© {new Date().getFullYear()} The Restorative Sanctuary</p>
          <p>Crafted with care · Edinburgh</p>
        </div>
      </footer>

      {/* Floating mobile CTA */}
      <a href="#book" className="lg:hidden fixed bottom-5 right-5 z-40 bg-gold text-olive-deep px-6 py-3 rounded-full shadow-feature text-[10px] uppercase tracking-[0.35em] font-medium">
        Reserve
      </a>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[10px] uppercase tracking-[0.35em] text-olive/60 mb-2">{label}</label>
    {children}
  </div>
);

export default Index;
