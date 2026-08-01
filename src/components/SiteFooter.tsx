import { Link } from "react-router-dom";
import logoFull from "@/assets/brand-logo.png";
import {
  ADDRESS,
  BUSINESS,
  EMAIL,
  HOURS,
  HOURS_NOTE,
  PHONE,
  PHONE_HREF,
  nav,
} from "@/data/site";

const SiteFooter = () => (
  <footer className="relative bg-cream text-ink border-t border-blush">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10 grid gap-12 md:grid-cols-12">
      <div className="md:col-span-5">
        <img src={logoFull} alt={`${BUSINESS} by Camilla`} className="h-32 md:h-40 w-auto mb-4 -ml-3" loading="lazy" />
        <p className="text-sm leading-relaxed text-taupe max-w-sm">
          Personalised massage therapy in a calm, cosy space designed for your wellbeing. Based in Silverknowes,Edinburgh.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-6 text-[10px] uppercase tracking-[0.28em] text-taupe">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-cream">✓ Fully Insured</span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-cream">P Free Parking</span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-cream">★ Qualified 2008</span>
        </div>
      </div>

      <div className="md:col-span-3">
        <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">Explore</div>
        <ul className="space-y-3 text-sm">
          {nav.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className="text-ink/80 hover:text-rose transition-colors">{n.label}</Link>
            </li>
          ))}
        </ul>
      </div>

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
              {HOURS.map((h) => (
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
          <Link to="/privacy-policy" className="hover:text-rose transition-colors">Privacy Policy</Link>
          <span className="text-gold/50">|</span>
          <Link to="/terms-and-conditions" className="hover:text-rose transition-colors">Terms &amp; Conditions</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
