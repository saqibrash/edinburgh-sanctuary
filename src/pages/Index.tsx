import { useCallback, useEffect, useRef, useState } from "react";

import logoFull from "@/assets/brand-logo.png";

const camilla = "/assets/camilla.jpeg";
// Client photos (all used across treatments + gallery)
const gRoom01 = "/assets/gallery/room-01.jpeg";
const gRoom02 = "/assets/gallery/room-02.jpeg";
const gRoom03 = "/assets/gallery/room-03.jpeg";

const gBespokeRoom = "/assets/gallery/bespoke-restorative-room.jpeg";
const gShelves = "/assets/gallery/shelves-01.jpeg";
const gWindow = "/assets/gallery/window.jpeg";
const gTowels = "/assets/gallery/towels.jpeg";
const gDoor = "/assets/gallery/door.jpeg";
const gCandleEuc = "/assets/gallery/candle-eucalyptus.jpeg";
const gSconce = "/assets/gallery/sconce.jpeg";
const gPlantCandle = "/assets/gallery/plant-candle.jpeg";

// Gallery tiles — thumbnails are cropped with object-cover, the lightbox
// shows the complete uncropped image with object-contain.
const GALLERY: { src: string; alt: string; span: string }[] = [
  { src: gRoom01, alt: "Warmly lit massage treatment room in Silverknowes, Edinburgh", span: "col-span-12 md:col-span-8 aspect-[16/10] md:aspect-[16/11]" },
  { src: gShelves, alt: "Shelves with fresh towels, water and greenery in the Silverknowes treatment room", span: "col-span-6 md:col-span-4 aspect-square md:aspect-auto" },
  { src: gRoom02, alt: "Candlelit massage room with round mirror at The Restoration Room, Edinburgh", span: "col-span-6 md:col-span-4 aspect-square" },
  { src: gRoom03, alt: "Massage couch prepared for a Swedish massage in Silverknowes", span: "col-span-6 md:col-span-4 aspect-square" },
  { src: gBespokeRoom, alt: "Genuine treatment room with massage bed, wall sconces and round mirror in Edinburgh", span: "col-span-12 md:col-span-4 aspect-[4/3] md:aspect-square" },
  { src: gTowels, alt: "Rolled towels laid on the heated massage couch", span: "col-span-6 md:col-span-3 aspect-square" },
  { src: gWindow, alt: "Serene window with soft curtains and candles in the massage room", span: "col-span-6 md:col-span-3 aspect-square" },
  { src: gCandleEuc, alt: "Candle and eucalyptus detail in the Silverknowes massage studio", span: "col-span-6 md:col-span-3 aspect-square" },
  { src: gSconce, alt: "Warm brass wall sconce lighting the treatment room", span: "col-span-6 md:col-span-3 aspect-square" },
  { src: gDoor, alt: "Treatment room door with Camilla's framed massage therapy qualifications", span: "col-span-6 md:col-span-4 aspect-square" },
  { src: gPlantCandle, alt: "Plant and candle styled on a shelf in the Edinburgh massage room", span: "col-span-6 md:col-span-4 aspect-square" },
  { src: camilla, alt: "Camilla, qualified massage therapist in Silverknowes, Edinburgh", span: "col-span-12 md:col-span-4 aspect-[16/10] md:aspect-square" },
];


const BUSINESS = "The Restoration Room";
const PHONE = "07570 161699";
const PHONE_HREF = "tel:+447570161699";
const EMAIL = "therestorationroom85@gmail.com";
const ADDRESS = "Silverknowes, EH4, Edinburgh";
const FRESHA_URL = "https://www.fresha.com/book-now/the-restoration-room-p5d4vn56/all-offer?share=true&pId=3033869";
const HOURS = [
  { day: "Mon – Fri", hours: "10:00 – 19:00" },
  { day: "Saturday", hours: "By appointment only" },
  { day: "Sunday", hours: "By appointment only" },
];
const HOURS_NOTE = "Last appointment 6:30 PM";


const nav = [
  { href: "#about", label: "About" },
  { href: "#treatments", label: "Treatments" },
  { href: "#experience", label: "Experience" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#book", label: "Contact" },
];

// Client-provided treatments and pricing
const treatments = [
  {
    name: "Swedish Massage",
    image: gRoom01,
    desc: "Swedish massage is a relaxing, therapeutic treatment that uses smooth, flowing strokes, kneading, and gentle techniques to ease muscle tension, improve circulation, and promote overall wellbeing. Each massage is tailored to your individual needs, with pressure adjusted to ensure a comfortable and effective treatment.\n\nWhether you’re looking to relieve stress, reduce muscular aches, or simply take time to unwind, Swedish massage offers the perfect opportunity to relax, restore, and recharge.",
    prices: [
      { duration: "30 minutes", price: "£30", key: "swedish-30" },
      { duration: "45 minutes", price: "£45", key: "swedish-45" },
      { duration: "60 minutes", price: "£55", key: "swedish-60" },
      { duration: "75 minutes", price: "£70", key: "swedish-75" },
    ],
  },
  {
    name: "Bespoke Restorative",
    image: gBespokeRoom,
    desc: "Our signature treatment, tailored entirely to your individual needs. Combining Swedish massage with deep tissue techniques, trigger point therapy, and assisted stretching, each session is designed to target areas of tension while promoting deep relaxation and restoring balance throughout the body.\n\nWhether you’re looking to relieve muscular aches, improve mobility, reduce stress, or simply unwind, every treatment is adapted to your body on the day, ensuring you receive the care that’s right for you.",
    prices: [
      { duration: "30 minutes", price: "£40", key: "bespoke-30" },
      { duration: "45 minutes", price: "£55", key: "bespoke-45" },
      { duration: "60 minutes", price: "£65", key: "bespoke-60" },
      { duration: "75 minutes", price: "£80", key: "bespoke-75" },
    ],
  },
  {
    name: "Restorative Foot Ritual",
    image: gTowels,
    desc: "Soothe tired, aching feet with a deeply relaxing treatment beginning with a warm, aromatic foot soak to cleanse and soften the skin. This is followed by a therapeutic foot and lower leg massage using a blend of soothing techniques to ease tension, improve circulation, and encourage complete relaxation.\n\nPerfect as a standalone treatment or as a calming addition to your massage, leaving your feet feeling refreshed, revitalised, and wonderfully restored.",
    prices: [
      { duration: "30 minutes", price: "£25", key: "foot-30" },
    ],
  },
  {
    name: "Rebalancing Scalp Massage",
    image: gRoom02,
    desc: "A deeply relaxing treatment designed to ease tension, calm the mind, and promote a sense of wellbeing. Gentle massage techniques are used across the scalp, temples, neck, and upper shoulders to help relieve stress, reduce headaches caused by muscle tension, and encourage deep relaxation.\n\nPerfect as a standalone treatment or as an addition to any massage for a truly restorative experience.",
    prices: [
      { duration: "25 minutes", price: "£20", key: "scalp-25" },
    ],
  },
];

// Flattened treatment+duration options for the booking form
const bookingOptions = treatments.flatMap(t =>
  t.prices.map(p => ({
    key: p.key,
    label: `${t.name} — ${p.duration} (${p.price})`,
    priceLabel: p.price,
  })),
);

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
  { title: "Free Parking", desc: "Free on-street parking right outside the treatment room." },
  { title: "Fully Insured", desc: "Fully qualified since 2008 and fully insured for your peace of mind." },
];

// NOTE: The testimonials below are placeholder copy for design preview only.
// They must be replaced with genuine client reviews before the website goes live.
const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    quote: "From the moment I arrived, I felt completely at ease. Camilla took the time to understand exactly what I needed and tailored the treatment perfectly. The room is beautiful, peaceful and so welcoming. I left feeling lighter, calmer and completely restored.",
  },
  {
    name: "Emma L.",
    rating: 5,
    quote: "I’ve had many massages over the years, but this was something special. The attention to detail, the calming atmosphere and Camilla’s intuitive touch made it a truly personalised experience. I can’t wait to return.",
  },
  {
    name: "Rachel T.",
    rating: 5,
    quote: "A wonderfully relaxing treatment in the most tranquil setting. Camilla is professional, warm and incredibly skilled. I came in with tension in my shoulders and left feeling completely different. Highly recommended.",
  },
  {
    name: "Kate H.",
    rating: 5,
    quote: "The whole experience felt luxurious yet personal. Soft music, candlelight and the most comfortable heated massage couch. Camilla has a gift for making you feel cared for from start to finish.",
  },
  {
    name: "Lucy B.",
    rating: 5,
    quote: "I booked a bespoke restorative treatment and it was exactly what my body needed. Camilla worked on areas of tightness with just the right pressure while keeping the session deeply relaxing. Free parking was a lovely bonus too.",
  },
];

// Time slots are derived from the selected date (see availableSlots below).
// Weekdays use WEEKDAY_SLOTS; weekends are by appointment only.

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

/* =============== LIGHTBOX =============== */
const Lightbox = ({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) => {
  const touchX = useRef<number | null>(null);
  const open = index !== null;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go, onClose]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4 md:p-10 animate-in fade-in"
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close image viewer"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full border border-cream/40 text-cream text-2xl leading-none flex items-center justify-center hover:bg-cream/15 transition-colors"
      >
        ×
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        aria-label="Previous image"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/40 text-cream flex items-center justify-center hover:bg-cream/15 transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); go(1); }}
        aria-label="Next image"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/40 text-cream flex items-center justify-center hover:bg-cream/15 transition-colors"
      >
        ›
      </button>

      <figure className="max-w-[92vw] max-h-[86vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.alt}
          className="max-w-[92vw] max-h-[76vh] w-auto h-auto object-contain rounded-md shadow-2xl"
        />
      </figure>
    </div>
  );
};


const Index = () => {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeT, setActiveT] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              src={logoFull}
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
            <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !py-3 !px-6 !text-[11px]">Book on Fresha</a>
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
              <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="btn-primary w-full mt-6">Book on Fresha</a>
              <a href="#book" onClick={() => setMenuOpen(false)} className="btn-secondary w-full mt-3">Book on our site</a>
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
                  <span className="eyebrow">Silverknowes, Edinburgh · Est. 2008</span>
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
                <p className="text-taupe text-lg lg:text-xl leading-relaxed max-w-md mb-4 font-light">
                  Personalised massage therapy in a calm, cosy treatment room in Silverknowes, Edinburgh — Swedish and bespoke restorative massage tailored to you.
                </p>
                <p className="sr-only">
                  The Restoration Room by Camilla is a massage therapist in Silverknowes, Edinburgh, offering Swedish massage, bespoke restorative massage, deep tissue and acupressure treatments for clients across Edinburgh and nearby areas including Davidsons Mains, Cramond, Blackhall and Barnton.
                </p>
                <div className="mb-8" aria-hidden />

                <div className="flex flex-wrap gap-3">
                  <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Book on Fresha</a>
                  <a href="#book" className="btn-secondary">Book on our site</a>
                  <a href="#treatments" className="text-[11px] tracking-[0.28em] uppercase text-rose hover:text-rose-deep transition-colors self-center">Discover Treatments →</a>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-taupe">
                  <span className="inline-flex items-center gap-2"><span className="text-gold">P</span> Free Parking</span>
                  <span className="inline-flex items-center gap-2"><span className="text-gold">✓</span> Fully Insured</span>
                  <span className="inline-flex items-center gap-2"><span className="text-gold">★</span> Qualified Since 2008</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-6 relative min-h-[60vh] lg:min-h-dvh flex items-center justify-center p-6 md:p-10 lg:p-14">
              <div className="relative w-full max-w-[640px]">
                <div className="lux-image relative rounded-lg overflow-hidden border border-blush shadow-[0_30px_80px_-40px_rgba(120,80,60,0.5)] bg-blush/20">
                  <img
                    src="/assets/hero-brand.jpeg"
                    alt="The Restoration Room by Camilla — brand mark with candle, pampas grass and stacked massage stones"
                    className="block w-full h-auto object-contain"
                    loading="eager"
                    fetchPriority="high"
                  />
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
                Your massage therapist in<br/>
                <span className="font-script text-rose">Silverknowes, Edinburgh.</span>
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





        <section id="treatments" className="relative py-24 md:py-36 px-6 md:px-10 bg-blush/40">
          <div className="max-w-[1300px] mx-auto">
            <div className="reveal text-center max-w-2xl mx-auto mb-16 md:mb-20">
              <div className="ornament mb-5"><span className="eyebrow">Treatments</span></div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.1] mb-5">
                Massage treatments in Silverknowes to help you<br/>
                <span className="font-script text-rose">relax, restore</span> and feel your best.
              </h2>
              <p className="text-taupe text-[15px] leading-relaxed">
                Swedish massage, bespoke restorative massage and shorter rituals — all delivered from a private treatment room in Silverknowes, Edinburgh, with free parking.
              </p>
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

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
              <div className="ornament mb-5"><span className="eyebrow">The Room · Silverknowes, Edinburgh</span></div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[54px] text-ink leading-[1.1]">
                A space designed<br/>to <span className="font-script text-rose">slow you down.</span>
              </h2>
              <p className="mt-5 text-taupe text-[15px] leading-relaxed">
                Inside the private treatment room in Silverknowes, Edinburgh. Tap any photo to view it in full.
              </p>
            </div>


            <div className="grid grid-cols-12 gap-3 md:gap-5">
              {GALLERY.map((g, i) => (
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

            <Lightbox
              items={GALLERY}
              index={lightbox}
              onClose={() => setLightbox(null)}
              onIndex={(i) => setLightbox(i)}
            />
          </div>

        </section>

        {/* =============== TESTIMONIALS =============== */}
        <section id="testimonials" className="relative py-24 md:py-32 px-6 md:px-10 bg-cream overflow-hidden">
          <div className="max-w-[1300px] mx-auto">
            <div className="reveal text-center max-w-2xl mx-auto mb-14 md:mb-20">
              <div className="ornament mb-5"><span className="eyebrow">Kind Words</span></div>
              <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.1]">
                Client Testimonials
              </h2>
            </div>

            {/* Mobile carousel */}
            <div className="md:hidden relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeT * 100}%)` }}
                >
                  {testimonials.map((t, i) => (
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
                <button
                  onClick={() => setActiveT((i) => (i + 1) % testimonials.length)}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full border border-gold/50 text-gold hover:bg-blush/50 flex items-center justify-center transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`reveal lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
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
                <ContactRow icon="◉" label="Location" value={ADDRESS} />
                <ContactRow icon="P" label="Parking" value="Free parking available" />
                <ContactRow icon="✓" label="Trust" value="Qualified since 2008 · Fully insured" />
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-taupe mb-1">Opening Hours</div>
                  <div className="text-ink leading-relaxed space-y-0.5">
                    {HOURS.map(h => (
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
                    View live availability, choose your treatment and time, and secure your appointment in a few taps —
                    all through our booking partner, Fresha.
                  </p>
                </div>

                <ul className="space-y-3 text-sm text-ink/85 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-gold" aria-hidden>✓</span>
                    <span>Real-time availability, updated instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-gold" aria-hidden>✓</span>
                    <span>Secure card payment to confirm your booking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-gold" aria-hidden>✓</span>
                    <span>Automatic confirmation and appointment reminders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 text-gold" aria-hidden>✓</span>
                    <span>Reschedule or manage your booking any time</span>
                  </li>
                </ul>

                <a
                  href={FRESHA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full !py-4 text-center block"
                >
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
                  <a href={PHONE_HREF} className="btn-secondary w-full !py-3.5 text-center block">
                    Call {PHONE}
                  </a>
                  <a href={`mailto:${EMAIL}`} className="btn-secondary w-full !py-3.5 text-center block">
                    Email Camilla
                  </a>
                </div>
                <p className="text-[11px] text-taupe/80 text-center mt-4">
                  Weekend appointments (Saturday & Sunday) are available on request — please call or email to arrange.
                </p>
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
              Personalised massage therapy in a calm, cosy space designed for your wellbeing. Based in Silverknowes, Edinburgh.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-6 text-[10px] uppercase tracking-[0.28em] text-taupe">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-cream">✓ Fully Insured</span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-cream">P Free Parking</span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-cream">★ Qualified 2008</span>
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
              <p className="text-ink/80">{ADDRESS}</p>
              <p className="text-taupe text-xs">Free parking available · Fully insured</p>
              <p><a href={PHONE_HREF} className="text-ink hover:text-rose transition-colors flex items-center gap-2"><span aria-hidden>✆</span>{PHONE}</a></p>
              <p><a href={`mailto:${EMAIL}`} className="text-ink hover:text-rose transition-colors break-all flex items-center gap-2"><span aria-hidden>✉</span>{EMAIL}</a></p>
              <div className="pt-3 border-t border-blush mt-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-taupe mb-2">Opening Hours</div>
                <div className="text-ink/80 space-y-0.5">
                  {HOURS.map(h => (
                    <div key={h.day} className="flex justify-between gap-6"><span>{h.day}</span><span className="text-taupe">{h.hours}</span></div>
                  ))}
                </div>
                <div className="text-[11px] text-gold mt-2 italic">{HOURS_NOTE}</div>
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
      <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="lg:hidden fixed bottom-5 right-5 z-40 btn-primary shadow-2xl">Book on Fresha</a>
    </div>
  );
};


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
    // Personalised: heart
    "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.5-7 10-7 10z",
    // Free Parking: car
    "M5 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2m8 0v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2M4 12l2-5a2 2 0 0 1 2-1h8a2 2 0 0 1 2 1l2 5m-16 0h16m-16 0v5h16v-5M7 15h.01M17 15h.01",
    // Fully Insured: shield check
    "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[i]} />
    </svg>
  );
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
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

const TestimonialCard = ({ t }: { t: { name: string; rating: number; quote: string } }) => (
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

export default Index;
