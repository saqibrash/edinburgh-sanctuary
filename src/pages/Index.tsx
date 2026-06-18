import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/logo.jpeg.asset.json";
import camilla from "@/assets/camilla.jpeg.asset.json";
import room1 from "@/assets/room-1.jpeg.asset.json";
import room2 from "@/assets/room-2.jpeg.asset.json";
import room3 from "@/assets/room-3.jpeg.asset.json";
import treatment from "@/assets/treatment.jpeg.asset.json";
import shelves from "@/assets/shelves.jpeg.asset.json";
import entrance from "@/assets/entrance.jpeg.asset.json";

const PHONE = "07XXX XXXXXX";
const PHONE_HREF = "tel:+447000000000";
const EMAIL = "hello@restorativesanctuary.co.uk";

const treatments = [
  {
    name: "Swedish Relaxation",
    duration: "60 / 90 min",
    price: "£60",
    priceNote: "from",
    desc: "Long, flowing strokes that calm the nervous system and melt away everyday stress.",
    includes: ["Full body relaxation", "Warm aromatic oils", "Guided breathwork"],
  },
  {
    name: "Bespoke Restorative",
    duration: "90 min",
    price: "£85",
    priceNote: "signature",
    desc: "Your treatment, tailored — a personalised blend of techniques after a thorough consultation.",
    includes: ["Personal consultation", "Blended techniques", "Hot towel finish", "Herbal tea ritual"],
    featured: true,
  },
  {
    name: "Deep Tissue",
    duration: "60 / 90 min",
    price: "£65",
    priceNote: "from",
    desc: "Slow, focused pressure to release stubborn tension, knots and chronic muscular tightness.",
    includes: ["Targeted pressure", "Postural assessment", "Aftercare guidance"],
  },
];

const moreTreatments = [
  { name: "Holistic Aromatherapy", time: "75 min", price: "from £70", desc: "A bespoke blend of essential oils paired with gentle technique to restore balance and ease." },
  { name: "Sports & Remedial", time: "60 min", price: "from £65", desc: "Targeted work for active bodies — recovery, mobility and injury prevention." },
  { name: "Pregnancy Massage", time: "60 min", price: "from £65", desc: "Safe, nurturing care for expectant mothers in the second and third trimesters." },
];

const faqs = [
  { q: "Where are you based?", a: "The Restorative Sanctuary is a private home studio in Edinburgh. The full address is shared once your booking is confirmed." },
  { q: "What should I expect at my first visit?", a: "A warm welcome, a quiet consultation about your needs, and a treatment tailored entirely to you in a candlelit, peaceful space." },
  { q: "How do I book?", a: "Use the booking form below, send an email, or call directly. Camilla replies personally within 24 hours." },
  { q: "Do you offer gift vouchers?", a: "Yes — beautifully presented vouchers are available for any treatment. Get in touch to arrange." },
  { q: "What is your cancellation policy?", a: "We kindly ask for at least 24 hours' notice so your time can be offered to another client." },
];

const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];

const Section = ({ id, eyebrow, title, children, className = "", center = false }: any) => (
  <section id={id} className={`py-20 md:py-28 px-6 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {(eyebrow || title) && (
        <div className={center ? "text-center mb-12" : "mb-12"}>
          {eyebrow && (
            <div className={`flex items-center gap-3 mb-4 text-gold uppercase tracking-[0.32em] text-xs ${center ? "justify-center" : ""}`}>
              <span className="gold-divider" />{eyebrow}<span className="gold-divider" />
            </div>
          )}
          {title && (
            <h2 className={`font-display text-4xl md:text-5xl lg:text-[3.5rem] text-olive leading-[1.05] ${center ? "max-w-3xl mx-auto" : "max-w-3xl"}`}>
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bookingSent, setBookingSent] = useState(false);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "#about", label: "About" },
    { href: "#treatments", label: "Treatments" },
    { href: "#sanctuary", label: "Sanctuary" },
    { href: "#faq", label: "FAQ" },
    { href: "#book", label: "Book" },
  ];

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Admin-friendly payload — connect to Calendly/Fresha/SimplyBook or email service here.
    const payload = Object.fromEntries(data.entries());
    console.log("Booking request:", payload);
    setBookingSent(true);
    e.currentTarget.reset();
    setTimeout(() => setBookingSent(false), 8000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-cream/95 backdrop-blur-md border-b border-border shadow-soft py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <span className={`font-display text-xl md:text-2xl leading-none ${scrolled ? "text-olive" : "text-olive"}`}>
              The Restorative Sanctuary
              <span className="block font-script text-gold text-sm mt-0.5">by Camilla</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-sm tracking-wide">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-olive/80 hover:text-gold transition-colors">{n.label}</a>
            ))}
            <a href="#book" className="btn-primary !py-3 !px-6">Book Treatment</a>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-olive" aria-label="Menu">
            <div className="w-6 h-px bg-current mb-1.5" />
            <div className="w-6 h-px bg-current mb-1.5" />
            <div className="w-4 h-px bg-current ml-auto" />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-cream border-t border-border mt-3">
            <div className="px-6 py-6 flex flex-col gap-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="text-olive/80 hover:text-gold py-2">{n.label}</a>
              ))}
              <a href="#book" onClick={() => setMenuOpen(false)} className="btn-primary mt-2 w-full">Book Treatment</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center pt-28 pb-20 px-6">
        <div className="absolute inset-0 -z-10">
          <img src={treatment.url} alt="Candlelit massage treatment room in Edinburgh" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-cream/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream/90 via-transparent to-cream/40" />
        </div>
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="flex items-center gap-3 mb-6 text-gold uppercase tracking-[0.35em] text-xs">
              <span className="gold-divider" />Edinburgh · Holistic Massage
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-olive mb-6">
              A quiet place to <span className="font-script text-gold">restore</span><br/>
              body & mind.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-9 leading-relaxed">
              Personalised relaxation, deep tissue and holistic treatments with Camilla — in a calm, candlelit sanctuary tucked away in Edinburgh.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#book" className="btn-primary">Book Your Treatment</a>
              <a href="#treatments" className="btn-outline">View Treatments</a>
            </div>
            <div className="mt-12 flex flex-wrap gap-10 text-sm text-muted-foreground">
              <div><div className="text-gold font-display text-3xl">10+</div>Years of experience</div>
              <div><div className="text-gold font-display text-3xl">Fully</div>Qualified & insured</div>
              <div><div className="text-gold font-display text-3xl">1:1</div>Private studio</div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-feature ring-1 ring-gold/30">
              <img src={room1.url} alt="The Restorative Sanctuary treatment room" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-cream/95 backdrop-blur border border-gold/40 rounded-xl px-6 py-4 shadow-card">
              <p className="font-script text-gold text-2xl leading-none">Camilla</p>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-1">Founder & Therapist</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE STRIP */}
      <div className="bg-sage-soft border-y border-sage/30">
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">
          <p className="font-display text-2xl md:text-3xl italic text-olive/90 leading-relaxed">
            “Every treatment is a moment to pause, breathe, and come home to yourself.”
          </p>
          <p className="mt-3 text-gold tracking-[0.3em] text-xs uppercase">— Camilla</p>
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" eyebrow="Meet Camilla" title="A personal, considered approach to wellbeing.">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-card">
              <img src={camilla.url} alt="Camilla, qualified massage therapist at The Restorative Sanctuary in Edinburgh" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-cream border border-gold/40 rounded-xl px-6 py-4 shadow-card">
              <p className="font-script text-gold text-2xl">Camilla</p>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Founder & Therapist</p>
            </div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-sage/30 rounded-2xl -z-10" />
          </div>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg text-olive/90">
              I founded The Restorative Sanctuary to offer something different — treatments that feel less like a clinic appointment and more like a genuine moment of escape.
            </p>
            <p>
              With over a decade of training in remedial, deep tissue and holistic techniques, I work with each client individually. Every session begins with a quiet conversation, so the treatment can be shaped around exactly what your body and mind need that day.
            </p>
            <p>
              You'll find me in a small, private studio in Edinburgh — softly lit, warm, and entirely your own for the hour.
            </p>
            <div className="hairline my-8" />
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Qualifications</p>
                <p className="text-olive">ITEC Diploma in Massage Therapy</p>
              </div>
              <div>
                <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Memberships</p>
                <p className="text-olive">FHT Registered & fully insured</p>
              </div>
            </div>
            <a href="#book" className="btn-primary mt-4">Book a Session</a>
          </div>
        </div>
      </Section>

      {/* SIGNATURE TREATMENTS — PRICING CARDS */}
      <Section id="treatments" eyebrow="Signature Treatments" title="Tailored therapies for body, mind and stillness." className="bg-sage-soft/60" center>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto -mt-6 mb-14 leading-relaxed">
          Three signature treatments, each shaped around your needs. All sessions include a personal consultation and warm sanctuary welcome.
        </p>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {treatments.map((t) => (
            <article
              key={t.name}
              className={`relative flex flex-col rounded-2xl p-8 lg:p-10 transition-all duration-500 ${
                t.featured
                  ? "bg-olive text-primary-foreground shadow-feature border border-gold/40 lg:-translate-y-4 lg:scale-[1.03]"
                  : "bg-cream border border-border hover:border-gold/50 shadow-card hover:-translate-y-1"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-olive-deep text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-soft">
                  Most Loved
                </span>
              )}
              <p className={`text-xs uppercase tracking-[0.3em] mb-3 ${t.featured ? "text-gold" : "text-gold"}`}>{t.priceNote}</p>
              <h3 className={`font-display text-3xl mb-2 ${t.featured ? "text-primary-foreground" : "text-olive"}`}>{t.name}</h3>
              <p className={`text-xs uppercase tracking-[0.25em] mb-5 ${t.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{t.duration}</p>
              <div className="flex items-baseline gap-2 mb-5">
                <span className={`font-display text-5xl ${t.featured ? "text-gold" : "text-olive"}`}>{t.price}</span>
              </div>
              <p className={`leading-relaxed mb-6 ${t.featured ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{t.desc}</p>
              <ul className={`space-y-2.5 mb-8 text-sm ${t.featured ? "text-primary-foreground/90" : "text-olive/80"}`}>
                {t.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold mt-1">✦</span>{i}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`mt-auto inline-flex items-center justify-center px-6 py-3.5 text-xs uppercase tracking-[0.3em] rounded-md transition-all duration-300 ${
                  t.featured
                    ? "bg-gold text-olive-deep hover:bg-cream hover:text-olive-deep"
                    : "bg-olive text-primary-foreground hover:bg-gold hover:text-olive-deep"
                }`}
              >
                Book This Treatment
              </a>
            </article>
          ))}
        </div>

        {/* Additional treatments */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="text-gold uppercase tracking-[0.32em] text-xs mb-3">Also Available</p>
            <h3 className="font-display text-3xl md:text-4xl text-olive">Specialist treatments</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {moreTreatments.map((t) => (
              <div key={t.name} className="bg-cream rounded-xl border border-border p-7 shadow-soft hover:shadow-card hover:border-gold/40 transition-all">
                <div className="flex justify-between items-baseline gap-3 mb-2">
                  <h4 className="font-display text-2xl text-olive">{t.name}</h4>
                  <span className="text-gold font-display text-lg whitespace-nowrap">{t.price}</span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{t.time}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SANCTUARY GALLERY */}
      <Section id="sanctuary" eyebrow="The Sanctuary" title="A space designed to slow you down.">
        <p className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Soft lighting, warm textures and quiet detail. Every corner of the studio is shaped to help you exhale the moment you step inside.
        </p>
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          <div className="col-span-12 md:col-span-8 aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
            <img src={room1.url} alt="Massage treatment room with candles and soft lighting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="col-span-6 md:col-span-4 aspect-square overflow-hidden rounded-2xl shadow-card">
            <img src={shelves.url} alt="Treatment room shelves with candles, towels and plants" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="col-span-6 md:col-span-4 aspect-square overflow-hidden rounded-2xl shadow-card">
            <img src={entrance.url} alt="Warm entrance to the sanctuary with framed qualifications" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="col-span-6 md:col-span-4 aspect-square overflow-hidden rounded-2xl shadow-card">
            <img src={room2.url} alt="Quiet, warmly lit massage room with candles" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="col-span-6 md:col-span-4 aspect-square overflow-hidden rounded-2xl shadow-card">
            <img src={room3.url} alt="Candlelit massage table prepared for treatment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
        <div className="text-center mt-12">
          <a href="#book" className="btn-primary">Reserve Your Sanctuary Time</a>
        </div>
      </Section>

      {/* TRUST */}
      <section className="relative bg-olive text-primary-foreground py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 20%, hsl(var(--gold)) 0%, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--sage)) 0%, transparent 45%)` }} />
        <div className="relative max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            { t: "Fully Qualified", d: "ITEC-certified massage therapist with continued professional development." },
            { t: "Fully Insured", d: "Registered with the Federation of Holistic Therapists for your peace of mind." },
            { t: "Personalised Care", d: "Every treatment is shaped around your individual needs — never one-size-fits-all." },
          ].map((b) => (
            <div key={b.t}>
              <div className="font-script text-3xl text-gold mb-3">{b.t}</div>
              <p className="text-primary-foreground/75 leading-relaxed text-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Good To Know" title="Frequently asked questions.">
        <div className="max-w-3xl">
          {faqs.map((f, i) => (
            <div key={i} className={`rounded-xl mb-3 transition-all ${openFaq === i ? "bg-cream shadow-card border border-gold/30" : "bg-cream/60 border border-border"}`}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left gap-6"
              >
                <span className="font-display text-xl md:text-2xl text-olive">{f.q}</span>
                <span className={`text-gold text-2xl font-light transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* BOOKING */}
      <Section id="book" eyebrow="Reserve Your Session" title="Book your moment of stillness." className="bg-sage-soft/60">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Info column */}
          <div className="lg:col-span-2 space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Choose your treatment, preferred date and time, and Camilla will confirm your booking personally within 24 hours.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-card aspect-[4/3]">
              <img src={entrance.url} alt="The Restorative Sanctuary entrance in Edinburgh" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-5 text-olive">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Telephone</p>
                <a href={PHONE_HREF} className="font-display text-2xl hover:text-gold transition-colors">{PHONE}</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Email</p>
                <a href={`mailto:${EMAIL}`} className="font-display text-xl hover:text-gold transition-colors break-all">{EMAIL}</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Hours</p>
                <p className="text-sm text-muted-foreground">Mon – Fri · 9:00 – 20:00<br/>Saturday · 10:00 – 18:00<br/>Sunday · By appointment</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Location</p>
                <p className="text-sm text-muted-foreground">Private studio · Edinburgh<br/>Full address shared on booking confirmation.</p>
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="lg:col-span-3">
            <div className="bg-cream rounded-2xl shadow-feature border border-gold/30 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-sage/20 rounded-full blur-3xl -z-0" />
              <div className="relative">
                {bookingSent ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-olive flex items-center justify-center text-gold text-3xl">✦</div>
                    <h3 className="font-display text-3xl md:text-4xl text-olive mb-3">Thank you</h3>
                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Your booking request has been received. Camilla will reply personally within 24 hours to confirm your appointment.
                    </p>
                    <button onClick={() => setBookingSent(false)} className="btn-outline mt-8">Send another request</button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-5">
                    <div className="mb-2">
                      <h3 className="font-display text-3xl text-olive">Booking request</h3>
                      <p className="text-sm text-muted-foreground mt-1">All fields marked * are required.</p>
                    </div>

                    <BookingField label="Treatment *" name="treatment">
                      <select
                        name="treatment"
                        required
                        defaultValue=""
                        className="w-full mt-2 bg-background border border-border rounded-md px-4 py-3 text-olive focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition"
                      >
                        <option value="" disabled>Select a treatment…</option>
                        {[...treatments.map(t => t.name), ...moreTreatments.map(t => t.name), "Gift voucher", "Not sure yet"].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </BookingField>

                    <div className="grid md:grid-cols-2 gap-5">
                      <BookingField label="Preferred date *" name="date">
                        <input
                          type="date"
                          name="date"
                          required
                          min={today}
                          className="w-full mt-2 bg-background border border-border rounded-md px-4 py-3 text-olive focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition"
                        />
                      </BookingField>
                      <BookingField label="Preferred time *" name="time">
                        <select
                          name="time"
                          required
                          defaultValue=""
                          className="w-full mt-2 bg-background border border-border rounded-md px-4 py-3 text-olive focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition"
                        >
                          <option value="" disabled>Select a time…</option>
                          {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </BookingField>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <BookingField label="Full name *" name="name">
                        <input name="name" required maxLength={100} placeholder="Your name"
                          className="w-full mt-2 bg-background border border-border rounded-md px-4 py-3 text-olive focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition" />
                      </BookingField>
                      <BookingField label="Telephone *" name="phone">
                        <input name="phone" type="tel" required maxLength={30} placeholder="07…"
                          className="w-full mt-2 bg-background border border-border rounded-md px-4 py-3 text-olive focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition" />
                      </BookingField>
                    </div>

                    <BookingField label="Email *" name="email">
                      <input name="email" type="email" required maxLength={255} placeholder="you@email.com"
                        className="w-full mt-2 bg-background border border-border rounded-md px-4 py-3 text-olive focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition" />
                    </BookingField>

                    <BookingField label="Notes for Camilla" name="notes">
                      <textarea name="notes" rows={4} maxLength={1000} placeholder="Anything she should know? Areas of tension, preferences, special occasions…"
                        className="w-full mt-2 bg-background border border-border rounded-md px-4 py-3 text-olive focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition resize-none" />
                    </BookingField>

                    <button type="submit" className="btn-primary w-full !py-4">Request Booking</button>
                    <p className="text-xs text-muted-foreground text-center">
                      Your details are kept private and used only to arrange your treatment.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-olive-deep text-primary-foreground/80 py-14 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">
          <div>
            <p className="font-display text-2xl text-primary-foreground">The Restorative Sanctuary</p>
            <p className="font-script text-gold text-lg">by Camilla</p>
            <p className="mt-4 text-sm leading-relaxed">A calming home for relaxation, deep tissue and holistic massage therapy in Edinburgh, Scotland.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Explore</p>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold transition-colors">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Contact</p>
            <p className="text-sm"><a href={PHONE_HREF} className="hover:text-gold">{PHONE}</a></p>
            <p className="text-sm break-all"><a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a></p>
            <p className="text-sm mt-2">Edinburgh, Scotland</p>
            <a href="#book" className="inline-block mt-4 text-xs uppercase tracking-[0.3em] text-gold border-b border-gold/50 hover:border-gold pb-0.5">Book a treatment →</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-primary-foreground/15 text-xs flex flex-col md:flex-row justify-between gap-3">
          <p>© {new Date().getFullYear()} The Restorative Sanctuary. All rights reserved.</p>
          <p>Crafted with care · Edinburgh</p>
        </div>
      </footer>

      {/* Floating book CTA on mobile */}
      <a href="#book" className="lg:hidden fixed bottom-5 right-5 z-40 btn-primary !py-3 !px-5 shadow-feature">
        Book
      </a>
    </div>
  );
};

const BookingField = ({ label, name, children }: { label: string; name: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={name} className="text-xs uppercase tracking-[0.25em] text-olive/70">{label}</label>
    {children}
  </div>
);

export default Index;
