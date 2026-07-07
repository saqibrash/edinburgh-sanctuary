import { useEffect, useMemo, useState } from "react";

import logoFull from "@/assets/brand-logo.png";
import logoMono from "@/assets/brand-monogram.png";
const camilla = "/assets/camilla.jpeg";
const room1 = "/assets/room-1.jpeg";
const room2 = "/assets/room-2.jpeg";
const room3 = "/assets/room-3.jpeg";
const treatment = "/assets/treatment.jpeg";
const shelves = "/assets/shelves.jpeg";
const entrance = "/assets/entrance.jpeg";

const BUSINESS = "The Restoration Room";
const PHONE = "07570 161699";
const PHONE_HREF = "tel:+447570161699";
const EMAIL = "hello@therestorationroom.co.uk";
const INSTAGRAM = "@therestorationroom";

const nav = [
  { href: "#about", label: "About" },
  { href: "#treatments", label: "Treatments" },
  { href: "#experience", label: "Experience" },
  { href: "#gallery", label: "Gallery" },
  { href: "#book", label: "Contact" },
];

// Client-provided treatments and pricing
const treatments = [
  {
    name: "Swedish Massage",
    image: room2,
    desc: "Swedish massage is a relaxing, therapeutic treatment that uses smooth, flowing strokes, kneading, and gentle techniques to ease muscle tension, improve circulation, and promote overall wellbeing. Each massage is tailored to your individual needs, with pressure adjusted to ensure a comfortable and effective treatment.\n\nWhether you’re looking to relieve stress, reduce muscular aches, or simply take time to unwind, Swedish massage offers the perfect opportunity to relax, restore, and recharge.",
    prices: [
      { duration: "30 minutes", price: "£30" },
      { duration: "45 minutes", price: "£45" },
      { duration: "60 minutes", price: "£60" },
      { duration: "75 minutes", price: "£75" },
    ],
  },
  {
    name: "Bespoke Restorative",
    image: treatment,
    desc: "Our signature treatment, tailored entirely to your individual needs. Combining Swedish massage with deep tissue techniques, trigger point therapy, and assisted stretching, each session is designed to target areas of tension while promoting deep relaxation and restoring balance throughout the body.\n\nWhether you’re looking to relieve muscular aches, improve mobility, reduce stress, or simply unwind, every treatment is adapted to your body on the day, ensuring you receive the care that’s right for you.",
    prices: [
      { duration: "30 minutes", price: "£35" },
      { duration: "45 minutes", price: "£50" },
      { duration: "60 minutes", price: "£65" },
      { duration: "75 minutes", price: "£80" },
    ],
  },
];

const cancellationPolicy = {
  deposit: "A 50% deposit is required at the time of booking to secure your appointment.",
  refund: "Your deposit is fully refundable if you cancel or reschedule with at least 48 hours’ notice.",
  fee: "Cancellations made with less than 48 hours’ notice, or failure to attend your appointment, will result in the deposit being retained as a cancellation fee.",
};

const pillars = [
  { title: "Holistic Approach", desc: "Treating the mind, body and spirit as a whole." },
  { title: "Peaceful Space", desc: "A calm treatment room in the comfort of my home." },
  { title: "Quality Products", desc: "Carefully selected essential oils and premium products." },
  { title: "Personalised Care", desc: "Every treatment tailored to your unique needs." },
];

// NOTE: Testimonials below are placeholder copy — awaiting the client's real client reviews.
const testimonials = [
  { quote: "[Placeholder testimonial — awaiting client copy]", name: "Client name" },
  { quote: "[Placeholder testimonial — awaiting client copy]", name: "Client name" },
  { quote: "[Placeholder testimonial — awaiting client copy]", name: "Client name" },
];

const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];

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
    <div className="min-h-dvh bg-cream text-ink overflow-x-hidden">
      {/* =============== NAV =============== */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-cream/95 backdrop-blur-xl border-b border-gold/25 shadow-[0_6px_30px_-16px_rgba(120,80,60,0.25)] py-2"
            : "py-3 bg-cream/70 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 md:gap-4 group shrink-0" aria-label={`${BUSINESS} — Home`}>
            <img
              src={logoMono}
              alt=""
              aria-hidden
              width="128"
              height="128"
              className="w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-700 group-hover:scale-105"
            />
            <div className="leading-tight">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-gold">The</div>
              <div className="font-display text-[18px] sm:text-[22px] md:text-[26px] text-ink tracking-tight whitespace-nowrap">Restoration Room</div>
              <div className="font-script text-[13px] sm:text-[14px] text-rose -mt-0.5">by Camilla</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative text-[12px] uppercase tracking-[0.24em] text-ink/75 hover:text-rose transition-colors group py-2"
              >
                {n.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-rose transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-5">
            <a href={PHONE_HREF} className="text-[13px] text-taupe hover:text-rose flex items-center gap-2 transition-colors">
              <span aria-hidden>✆</span>{PHONE}
            </a>
            <a href="#book" className="btn-primary !py-3 !px-6 !text-[11px]">Book Now</a>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-3 -mr-3 min-h-11 min-w-11 text-ink"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <div className={`w-6 h-px bg-current my-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-cream border-t border-gold/25 mt-2 fade-up">
            <div className="px-6 py-8 flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-4 border-b border-blush font-display text-2xl text-ink flex items-center justify-between"
                >
                  {n.label}
                  <span className="text-rose text-sm" aria-hidden>→</span>
                </a>
              ))}
              <a href="#book" onClick={() => setMenuOpen(false)} className="btn-primary w-full mt-6">Book Now</a>
              <a href={PHONE_HREF} className="mt-4 text-center text-rose tracking-wide">✆ {PHONE}</a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* =============== HERO =============== */}
        <section className="relative min-h-dvh w-full overflow-hidden pt-28 lg:pt-0 bg-brand-radial">
          {/* subtle floating leaves */}
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-blush/60 blur-3xl float-slow pointer-events-none" aria-hidden />
          <div className="absolute bottom-10 right-0 w-72 h-72 rounded-full bg-nude/50 blur-3xl float-slow pointer-events-none" aria-hidden />

          <div className="relative lg:grid lg:grid-cols-12 lg:min-h-dvh max-w-[1500px] mx-auto">
            {/* Content */}
            <div className="lg:col-span-6 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-14 lg:py-28 z-10">
              <div className="fade-up max-w-xl">
                <div className="ornament mb-6">
                  <span className="eyebrow">Edinburgh · Est. 2008</span>
                </div>
                <h1 className="font-display text-ink text-[46px] sm:text-[58px] lg:text-[76px] leading-[1.02] tracking-tight">
                  Restore.<br/>
                  Relax.<br/>
                  <span className="font-script text-rose">Rebalance.</span>
                </h1>
                <div className="flex items-center gap-3 my-8" aria-hidden>
                  <span className="h-px w-14 bg-gold" />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold"><path d="M12 2c2 5 5 8 10 10-5 2-8 5-10 10-2-5-5-8-10-10 5-2 8-5 10-10z" fill="currentColor" opacity="0.6"/></svg>
                  <span className="h-px w-14 bg-gold" />
                </div>
                <p className="text-taupe text-lg lg:text-xl leading-relaxed max-w-md mb-10 font-light">
                  Personalised massage therapy in a calm, cosy space designed for your wellbeing.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#treatments" className="btn-primary">Discover Treatments</a>
                  <a href="#book" className="btn-secondary">Book a Session</a>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-6 relative min-h-[60vh] lg:min-h-dvh flex items-center justify-center p-6 md:p-10 lg:p-14">
              <div className="relative w-full max-w-[560px] aspect-[4/5]">
                {/* gold arch frame */}
                <div
                  className="absolute inset-0 border border-gold/50 pointer-events-none"
                  style={{ borderTopLeftRadius: "999px", borderTopRightRadius: "999px" }}
                />
                <div
                  className="absolute inset-3 overflow-hidden"
                  style={{ borderTopLeftRadius: "999px", borderTopRightRadius: "999px" }}
                >
                  <img
                    src={camilla}
                    alt="Camilla, therapist and founder of The Restoration Room"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                {/* floating quote card */}
                <div className="hidden md:block absolute -bottom-6 -left-6 lg:-left-10 bg-cream border border-blush shadow-[0_20px_60px_-30px_rgba(120,80,60,0.4)] p-6 max-w-[240px] rounded-md">
                  <div className="text-gold font-display text-3xl leading-none mb-1">“</div>
                  <p className="font-script text-ink text-lg leading-snug">A quiet moment, entirely for you.</p>
                </div>
                {/* corner gold dot */}
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gold/70" aria-hidden />
              </div>
            </div>
          </div>
        </section>

        {/* =============== ABOUT / WELCOME =============== */}
        <section id="about" className="relative py-24 md:py-36 px-6 md:px-10 bg-cream">
          <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div className="reveal order-2 lg:order-1">
              <div className="ornament mb-6"><span className="eyebrow">Welcome</span></div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.1] mb-8">
                Welcome to<br/>
                <span className="font-script text-rose">The Restoration Room.</span>
              </h2>
              <div className="space-y-5 text-taupe text-[17px] leading-[1.8] max-w-xl">
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
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#book" className="btn-primary">Book with Camilla</a>
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

        {/* =============== TREATMENTS =============== */}
        <section id="treatments" className="relative py-24 md:py-36 px-6 md:px-10 bg-blush/40">
          <div className="max-w-[1300px] mx-auto">
            <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20">
              <div className="ornament mb-5"><span className="eyebrow">Treatments</span></div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.1] mb-5">
                Tailored therapies to help you<br/>
                <span className="font-script text-rose">relax, restore</span> and feel your best.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
              {treatments.map((t, i) => (
                <div
                  key={t.name}
                  className="reveal group bg-cream rounded-lg overflow-hidden shadow-[0_20px_50px_-30px_rgba(120,80,60,0.3)] hover:shadow-[0_30px_60px_-30px_rgba(120,80,60,0.45)] transition-all duration-500 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="lux-image aspect-[4/3] rounded-none">
                    <img src={t.image} alt={`${t.name} treatment`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-8 md:p-10 text-center">
                    <h3 className="font-display text-[22px] md:text-2xl text-ink leading-tight uppercase tracking-wide mb-4">{t.name}</h3>
                    <div className="w-10 h-px bg-gold mx-auto mb-5" aria-hidden />
                    <div className="text-taupe text-[15px] leading-[1.75] mb-6 space-y-4 max-w-md mx-auto text-left">
                      {t.desc.split("\n\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                    <div className="inline-block bg-blush/40 rounded-md border border-blush px-6 py-4 mb-6">
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
                    <div>
                      <a href="#book" className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-rose hover:text-rose-deep transition-colors">
                        Book this treatment <span aria-hidden>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =============== CANCELLATION POLICY =============== */}
        <section id="cancellation" className="relative py-20 md:py-28 px-6 md:px-10 bg-cream border-y border-blush">
          <div className="max-w-[900px] mx-auto text-center">
            <div className="reveal ornament mb-5"><span className="eyebrow">Booking Policy</span></div>
            <h2 className="reveal font-display text-3xl md:text-4xl text-ink leading-[1.1] mb-10">
              Cancellation & <span className="font-script text-rose">Deposit Policy</span>
            </h2>
            <div className="reveal grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-blush/30 border border-blush rounded-lg p-6 md:p-8">
                <div className="w-10 h-10 rounded-full bg-cream border border-gold/50 flex items-center justify-center text-gold mb-4">1</div>
                <h3 className="font-display text-lg text-ink uppercase tracking-wide mb-2">Deposit</h3>
                <p className="text-taupe text-sm leading-relaxed">{cancellationPolicy.deposit}</p>
              </div>
              <div className="bg-blush/30 border border-blush rounded-lg p-6 md:p-8">
                <div className="w-10 h-10 rounded-full bg-cream border border-gold/50 flex items-center justify-center text-gold mb-4">2</div>
                <h3 className="font-display text-lg text-ink uppercase tracking-wide mb-2">48-Hour Refund</h3>
                <p className="text-taupe text-sm leading-relaxed">{cancellationPolicy.refund}</p>
              </div>
              <div className="bg-blush/30 border border-blush rounded-lg p-6 md:p-8">
                <div className="w-10 h-10 rounded-full bg-cream border border-gold/50 flex items-center justify-center text-gold mb-4">3</div>
                <h3 className="font-display text-lg text-ink uppercase tracking-wide mb-2">Late Cancellation</h3>
                <p className="text-taupe text-sm leading-relaxed">{cancellationPolicy.fee}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =============== WHY CHOOSE / PILLARS =============== */}
        <section id="experience" className="relative py-24 md:py-32 px-6 md:px-10 bg-cream">
          <div className="max-w-[1300px] mx-auto">
            <div className="reveal text-center max-w-2xl mx-auto mb-14">
              <div className="ornament mb-5"><span className="eyebrow">The Experience</span></div>
              <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.1]">
                Every detail, <span className="font-script text-rose">quietly considered.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {pillars.map((p, i) => (
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

        {/* =============== GALLERY =============== */}
        <section id="gallery" className="relative py-24 md:py-36 bg-nude/25">
          <div className="max-w-[1500px] mx-auto px-6 md:px-10">
            <div className="reveal max-w-2xl mb-14 md:mb-16">
              <div className="ornament mb-5"><span className="eyebrow">The Room</span></div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.1]">
                A space designed<br/>to <span className="font-script text-rose">slow you down.</span>
              </h2>
            </div>

            <div className="grid grid-cols-12 gap-3 md:gap-5">
              <div className="reveal lux-image col-span-12 md:col-span-8 aspect-[16/10] md:aspect-[16/11]">
                <img src={room1} alt="Warmly lit main treatment room" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="reveal lux-image col-span-6 md:col-span-4 aspect-square md:aspect-auto">
                <img src={shelves} alt="Curated shelves with candles and premium oils" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="reveal lux-image col-span-6 md:col-span-4 aspect-square">
                <img src={entrance} alt="Warm entrance to The Restoration Room" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="reveal lux-image col-span-6 md:col-span-4 aspect-square">
                <img src={room2} alt="Candlelit massage room" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="reveal lux-image col-span-6 md:col-span-4 aspect-square">
                <img src={room3} alt="Massage table prepared for treatment" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* =============== TESTIMONIALS (placeholder) =============== */}
        <section className="relative py-24 md:py-32 px-6 md:px-10 bg-cream" aria-label="Client testimonials">
          <div className="max-w-4xl mx-auto text-center">
            <div className="reveal ornament mb-6"><span className="eyebrow">Kind Words</span></div>
            <p className="reveal text-[11px] tracking-[0.28em] uppercase text-taupe/70 mb-8">Placeholder — awaiting client-provided reviews</p>
            <div className="relative min-h-[220px] md:min-h-[200px]">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  aria-hidden={activeT !== i}
                  className={`absolute inset-0 transition-all duration-1000 ${activeT === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                >
                  <p className="font-display italic text-2xl md:text-4xl text-ink leading-[1.3] max-w-3xl mx-auto">
                    {t.quote}
                  </p>
                  <div className="mt-8 text-xs tracking-[0.28em] uppercase text-rose">— {t.name}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-10" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
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
          </div>
        </section>

        {/* =============== FINAL CTA + BOOKING =============== */}
        <section id="book" className="relative py-24 md:py-36 px-6 md:px-10 bg-brand-gradient overflow-hidden">
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-nude/50 blur-3xl float-slow pointer-events-none" aria-hidden />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-blush/60 blur-3xl float-slow pointer-events-none" aria-hidden />

          <div className="relative max-w-[1300px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="reveal lg:col-span-5">
              <div className="ornament mb-6"><span className="eyebrow">Contact & Booking</span></div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.05] mb-6">
                Ready to take<br/>
                <span className="font-script text-rose">time for you?</span>
              </h2>
              <p className="text-taupe text-lg leading-relaxed max-w-md mb-10">
                Book your appointment today and start your journey towards relaxation and wellbeing.
              </p>
              <div className="space-y-5 border-t border-ink/10 pt-8 text-sm">
                <ContactRow icon="✆" label="Telephone" value={PHONE} href={PHONE_HREF} />
                <ContactRow icon="✉" label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
                <ContactRow icon="◉" label="Location" value="Edinburgh" />
                <ContactRow icon="◈" label="Instagram" value={INSTAGRAM} href="#" />
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-taupe mb-1">Hours</div>
                  <p className="text-ink leading-relaxed">Mon – Fri · 9:00 – 20:00<br/>Saturday · 10:00 – 18:00<br/>Sunday · By appointment</p>
                </div>
              </div>
            </div>

            <div className="reveal lg:col-span-7">
              <div className="bg-cream text-ink p-8 md:p-12 rounded-lg shadow-[0_30px_80px_-40px_rgba(120,80,60,0.4)] border border-blush">
                {bookingSent ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rose/15 flex items-center justify-center text-rose text-2xl">✓</div>
                    <h3 className="font-display text-4xl text-ink mb-4">Thank you.</h3>
                    <p className="text-taupe max-w-md mx-auto leading-relaxed">
                      Your booking request has been received. Camilla will reply personally within 24 hours to confirm your appointment.
                    </p>
                    <button onClick={() => setBookingSent(false)} className="btn-secondary mt-8">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div className="pb-4 mb-2 border-b border-blush">
                      <h3 className="font-display text-3xl text-ink">Booking request</h3>
                      <p className="text-xs text-taupe mt-1">Camilla will confirm your appointment personally within 24 hours.</p>
                    </div>

                    <Field label="Treatment" name="treatment">
                      <select id="treatment" name="treatment" required defaultValue="" className="field">
                        <option value="" disabled>Select a treatment…</option>
                        {treatments.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                        <option value="Not sure yet">Not sure yet</option>
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
                    <p className="text-xs text-taupe text-center">
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
      <footer className="relative bg-cream text-ink border-t border-blush">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10 grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <img src={logoFull} alt={`${BUSINESS} by Camilla`} className="h-32 md:h-40 w-auto mb-4 -ml-3" loading="lazy" />
            <p className="text-sm leading-relaxed text-taupe max-w-sm">
              Personalised massage therapy in a calm, cosy space designed for your wellbeing. Based in Edinburgh.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { label: "Instagram", d: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.06 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.06.42 2.23.07 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.06 1.17-.25 1.8-.42 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.17-1.06.36-2.23.42-1.25.07-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.06-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.36-1.06-.42-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.06-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.36 2.23-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 10.55a4.15 4.15 0 1 1 0-8.3 4.15 4.15 0 0 1 0 8.3ZM18.9 6.35a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" },
                { label: "Facebook", d: "M13.5 21v-8h2.7l.4-3.15h-3.1V7.85c0-.9.25-1.5 1.55-1.5h1.65V3.55c-.3-.05-1.3-.15-2.45-.15-2.45 0-4.1 1.5-4.1 4.25v2.2H7.5V13h2.65v8h3.35Z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-gold/40 text-taupe hover:text-cream hover:bg-rose hover:border-rose transition-all"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">Explore</div>
            <ul className="space-y-3 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-ink/80 hover:text-rose transition-colors">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div className="md:col-span-4">
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">Get in Touch</div>
            <address className="not-italic text-sm space-y-3 leading-relaxed">
              <p className="text-ink/80">Edinburgh, Scotland</p>
              <p><a href={PHONE_HREF} className="text-ink hover:text-rose transition-colors flex items-center gap-2"><span aria-hidden>✆</span>{PHONE}</a></p>
              <p><a href={`mailto:${EMAIL}`} className="text-ink hover:text-rose transition-colors break-all flex items-center gap-2"><span aria-hidden>✉</span>{EMAIL}</a></p>
              <p><a href="#" className="text-ink hover:text-rose transition-colors flex items-center gap-2"><span aria-hidden>◈</span>{INSTAGRAM}</a></p>
              <div className="pt-3 border-t border-blush mt-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-taupe mb-2">Opening Hours</div>
                <p className="text-ink/80">Mon – Fri · 9:00 – 20:00<br/>Saturday · 10:00 – 18:00<br/>Sunday · By appointment</p>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-blush">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-taupe">
            <p>© {new Date().getFullYear()} {BUSINESS} by Camilla. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-rose transition-colors">Privacy Policy</a>
              <span className="text-gold/50">|</span>
              <a href="#" className="hover:text-rose transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating mobile CTA */}
      <a href="#book" className="lg:hidden fixed bottom-5 right-5 z-40 btn-primary shadow-2xl">Book</a>
    </div>
  );
};

const Field = ({ label, name, children }: { label: string; name: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={name} className="block text-[10px] tracking-[0.28em] uppercase text-taupe mb-1">{label}</label>
    {children}
  </div>
);

const ContactRow = ({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) => (
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

const PillarIcon = ({ i }: { i: number }) => {
  const paths = [
    // Holistic: leaf
    "M12 3c4 3 6 6 6 10 0 3-2 6-6 8-4-2-6-5-6-8 0-4 2-7 6-10zm0 4v12",
    // Peaceful: house
    "M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9z",
    // Products: bottle
    "M10 3h4v3l2 3v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l2-3V3z",
    // Personalised: heart w/ user
    "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.5-7 10-7 10z",
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[i]} />
    </svg>
  );
};

export default Index;
