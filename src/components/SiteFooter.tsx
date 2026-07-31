import { Link } from "react-router-dom";
import logoFull from "@/assets/brand-logo.png";
import { BUSINESS, HOURS, HOURS_NOTE, nav } from "@/data/site";

const SiteFooter = () => (
  <footer className="relative bg-cream text-ink border-t border-blush">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10 grid gap-12 md:grid-cols-12">
      <div className="md:col-span-5">
        <img src={logoFull} alt={BUSINESS} className="h-32 md:h-40 w-auto mb-4 -ml-3" loading="lazy" />
        <p className="text-sm leading-relaxed text-taupe max-w-sm">
          Personalised massage therapy in a calm, cosy space designed for your wellbeing.
        </p>
        <div className="mt-6 rounded-md border border-gold/40 bg-blush/30 p-4 text-xs leading-relaxed text-ink/80 max-w-sm">
          This website is currently on hold by SR Innovations as the client has not settled the
          outstanding payment. Contact details and bookings are unavailable while the matter is under dispute.
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
        <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">Opening Hours</div>
        <div className="text-sm text-ink/80 space-y-0.5">
          {HOURS.map((h) => (
            <div key={h.day} className="flex justify-between gap-6"><span>{h.day}</span><span className="text-taupe">{h.hours}</span></div>
          ))}
        </div>
        <div className="text-[11px] text-gold mt-2 italic">{HOURS_NOTE}</div>
        <p className="text-xs text-taupe mt-5 leading-relaxed">
          Telephone, email, address and online booking have been removed while the website is on hold.
        </p>
      </div>
    </div>

    <div className="border-t border-blush">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-taupe">
        <p>© {new Date().getFullYear()} {BUSINESS}. Website by SR Innovations — on hold pending payment.</p>
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
