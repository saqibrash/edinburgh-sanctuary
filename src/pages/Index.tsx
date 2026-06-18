import { useEffect, useState } from "react";
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
  { name: "Deep Tissue Massage", time: "60 / 90 min", price: "from £65", desc: "Slow, focused pressure to release stubborn tension, knots and chronic muscular tightness." },
  { name: "Swedish Relaxation", time: "60 / 90 min", price: "from £60", desc: "Long, flowing strokes that calm the nervous system and melt away everyday stress." },
  { name: "Holistic Aromatherapy", time: "75 min", price: "from £70", desc: "A bespoke blend of essential oils paired with gentle technique to restore balance and ease." },
  { name: "Sports & Remedial", time: "60 min", price: "from £65", desc: "Targeted work for active bodies — recovery, mobility and injury prevention." },
  { name: "Pregnancy Massage", time: "60 min", price: "from £65", desc: "Safe, nurturing care for expectant mothers in the second and third trimesters." },
  { name: "Bespoke Restorative", time: "90 min", price: "from £85", desc: "Your treatment, tailored — a personalised blend of techniques after a thorough consultation." },
];

const faqs = [
  { q: "Where are you based?", a: "The Restorative Sanctuary is a private home studio in Edinburgh. The full address is shared once your booking is confirmed." },
  { q: "What should I expect at my first visit?", a: "A warm welcome, a quiet consultation about your needs, and a treatment tailored entirely to you in a candlelit, peaceful space." },
  { q: "How do I book?", a: "Please use the enquiry form below, send an email, or call directly. Camilla replies personally within 24 hours." },
  { q: "Do you offer gift vouchers?", a: "Yes — beautifully presented vouchers are available for any treatment. Get in touch to arrange." },
  { q: "What is your cancellation policy?", a: "We kindly ask for at least 24 hours' notice so your time can be offered to another client." },
];

const Section = ({ id, eyebrow, title, children, className = "" }: any) => (
  <section id={id} className={`py-20 md:py-28 px-6 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {eyebrow && (
        <div className="flex items-center gap-3 mb-4 text-gold uppercase tracking-[0.3em] text-xs">
          <span className="w-8 h-px bg-gold/60" />{eyebrow}
        </div>
      )}
      {title && <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-10 max-w-3xl leading-tight">{title}</h2>}
      {children}
    </div>
  </section>
);

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "#about", label: "About" },
    { href: "#treatments", label: "Treatments" },
    { href: "#sanctuary", label: "The Sanctuary" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/60 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <span className="font-display text-xl md:text-2xl text-foreground leading-none">
              The Restorative Sanctuary
              <span className="block font-script text-gold text-sm mt-0.5">by Camilla</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-sm tracking-wide">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-foreground/80 hover:text-gold transition-colors">{n.label}</a>
            ))}
            <a href="#contact" className="px-6 py-2.5 border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all text-xs uppercase tracking-[0.25em]">Book Treatment</a>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-foreground" aria-label="Menu">
            <div className="w-6 h-px bg-current mb-1.5" />
            <div className="w-6 h-px bg-current mb-1.5" />
            <div className="w-4 h-px bg-current ml-auto" />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-background border-t border-border mt-3">
            <div className="px-6 py-6 flex flex-col gap-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="text-foreground/80 hover:text-gold py-2">{n.label}</a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 px-6 py-3 border border-gold text-gold text-center text-xs uppercase tracking-[0.25em]">Book Treatment</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center pt-28 pb-20 px-6">
        <div className="absolute inset-0 -z-10">
          <img src={treatment.url} alt="Candlelit massage treatment room in Edinburgh" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="flex items-center gap-3 mb-6 text-gold uppercase tracking-[0.35em] text-xs">
              <span className="w-10 h-px bg-gold/60" />Edinburgh · Holistic Massage
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-6">
              A quiet place to <span className="font-script text-gold">restore</span><br/>
              body and mind.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Personalised relaxation, deep tissue and holistic treatments with Camilla — in a calm, candlelit sanctuary tucked away in Edinburgh.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-4 bg-primary text-primary-foreground hover:bg-foreground transition-colors text-xs uppercase tracking-[0.3em]">Enquire & Book</a>
              <a href="#treatments" className="px-8 py-4 border border-foreground/30 text-foreground hover:border-gold hover:text-gold transition-colors text-xs uppercase tracking-[0.3em]">View Treatments</a>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 text-sm text-muted-foreground">
              <div><div className="text-gold font-display text-2xl">10+</div>Years of experience</div>
              <div><div className="text-gold font-display text-2xl">Fully</div>Qualified & insured</div>
              <div><div className="text-gold font-display text-2xl">1:1</div>Private studio</div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={logo.url} alt="The Restorative Sanctuary logo with candle and stones" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <div className="bg-secondary/50 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-10 text-center">
          <p className="font-display text-2xl md:text-3xl italic text-foreground/80 leading-relaxed">
            “Every treatment is a moment to pause, breathe, and come home to yourself.”
          </p>
          <p className="mt-3 text-gold tracking-[0.3em] text-xs uppercase">— Camilla</p>
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" eyebrow="Meet Camilla" title="A personal, considered approach to wellbeing.">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={camilla.url} alt="Camilla, qualified massage therapist at The Restorative Sanctuary in Edinburgh" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-background border border-gold/40 px-6 py-4">
              <p className="font-script text-gold text-2xl">Camilla</p>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Founder & Therapist</p>
            </div>
          </div>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
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
                <p className="text-foreground">ITEC Diploma in Massage Therapy</p>
              </div>
              <div>
                <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Memberships</p>
                <p className="text-foreground">FHT Registered & fully insured</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TREATMENTS */}
      <Section id="treatments" eyebrow="The Treatments" title="Tailored therapies for body, mind and stillness." className="bg-muted/40">
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {treatments.map((t) => (
            <article key={t.name} className="bg-background p-8 md:p-10 group hover:bg-secondary/40 transition-colors">
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-gold transition-colors">{t.name}</h3>
                <span className="text-gold font-display text-xl whitespace-nowrap">{t.price}</span>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">{t.time}</p>
              <p className="text-muted-foreground leading-relaxed">{t.desc}</p>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground italic mb-4">Not sure which treatment is right for you? Camilla will help you choose.</p>
          <a href="#contact" className="inline-block px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-colors text-xs uppercase tracking-[0.3em]">Enquire Now</a>
        </div>
      </Section>

      {/* SANCTUARY GALLERY */}
      <Section id="sanctuary" eyebrow="The Sanctuary" title="A space designed to slow you down.">
        <p className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Soft lighting, warm textures and quiet detail. Every corner of the studio is shaped to help you exhale the moment you step inside.
        </p>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-8 aspect-[4/3] overflow-hidden">
            <img src={room1.url} alt="Massage treatment room with candles and soft lighting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="col-span-6 md:col-span-4 aspect-square overflow-hidden">
            <img src={shelves.url} alt="Treatment room shelves with candles, towels and plants" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="col-span-6 md:col-span-4 aspect-square overflow-hidden">
            <img src={entrance.url} alt="Warm entrance to the sanctuary with framed qualifications" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="col-span-6 md:col-span-4 aspect-square overflow-hidden">
            <img src={room2.url} alt="Quiet, warmly lit massage room with candles" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="col-span-6 md:col-span-4 aspect-square overflow-hidden">
            <img src={room3.url} alt="Candlelit massage table prepared for treatment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
      </Section>

      {/* TRUST */}
      <section className="bg-primary text-primary-foreground py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            { t: "Fully Qualified", d: "ITEC-certified massage therapist with continued professional development." },
            { t: "Fully Insured", d: "Registered with the Federation of Holistic Therapists for your peace of mind." },
            { t: "Personalised Care", d: "Every treatment is shaped around your individual needs — never one-size-fits-all." },
          ].map((b) => (
            <div key={b.t}>
              <div className="font-script text-3xl text-gold mb-3">{b.t}</div>
              <p className="text-primary-foreground/70 leading-relaxed text-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <Section id="faq" eyebrow="Good To Know" title="Frequently asked questions.">
        <div className="max-w-3xl">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full py-6 flex items-center justify-between text-left gap-6"
              >
                <span className="font-display text-xl md:text-2xl text-foreground">{f.q}</span>
                <span className={`text-gold text-2xl font-light transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && <p className="pb-6 text-muted-foreground leading-relaxed pr-12">{f.a}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="bg-secondary/40">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4 text-gold uppercase tracking-[0.3em] text-xs">
              <span className="w-8 h-px bg-gold/60" />Begin Your Visit
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Book your moment of stillness.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Send a short note and Camilla will reply personally within 24 hours to arrange your treatment.
            </p>
            <div className="space-y-5 text-foreground">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Telephone</p>
                <a href={PHONE_HREF} className="font-display text-2xl hover:text-gold transition-colors">{PHONE}</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Email</p>
                <a href={`mailto:${EMAIL}`} className="font-display text-2xl hover:text-gold transition-colors break-all">{EMAIL}</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Location</p>
                <p className="font-display text-2xl">Private studio · Edinburgh</p>
                <p className="text-sm text-muted-foreground mt-1">Full address shared on booking confirmation.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Hours</p>
                <p>Mon – Fri · 9:00 – 20:00<br/>Saturday · 10:00 – 18:00<br/>Sunday · By appointment</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thank you — Camilla will be in touch shortly."); }}
            className="bg-background border border-border p-8 md:p-10 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Name" name="name" required />
              <Field label="Telephone" name="phone" type="tel" />
            </div>
            <Field label="Email" name="email" type="email" required />
            <div>
              <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Treatment of Interest</label>
              <select className="w-full mt-2 bg-transparent border-b border-border py-3 focus:border-gold outline-none text-foreground">
                <option>Not sure yet</option>
                {treatments.map((t) => <option key={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Message</label>
              <textarea rows={4} className="w-full mt-2 bg-transparent border-b border-border py-3 focus:border-gold outline-none text-foreground resize-none" placeholder="Tell Camilla a little about what you're hoping for…" />
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-primary-foreground hover:bg-foreground transition-colors text-xs uppercase tracking-[0.3em]">Send Enquiry</button>
            <p className="text-xs text-muted-foreground text-center">Your details are kept private and used only to respond to your enquiry.</p>
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground/80 py-14 px-6">
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
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-primary-foreground/15 text-xs flex flex-col md:flex-row justify-between gap-3">
          <p>© {new Date().getFullYear()} The Restorative Sanctuary. All rights reserved.</p>
          <p>Crafted with care · Edinburgh</p>
        </div>
      </footer>
    </div>
  );
};

const Field = ({ label, name, type = "text", required = false }: any) => (
  <div>
    <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}{required && " *"}</label>
    <input
      name={name}
      type={type}
      required={required}
      className="w-full mt-2 bg-transparent border-b border-border py-3 focus:border-gold outline-none text-foreground"
    />
  </div>
);

export default Index;
