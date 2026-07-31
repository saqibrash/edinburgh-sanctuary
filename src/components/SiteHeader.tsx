import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoFull from "@/assets/brand-logo.png";
import { BUSINESS, FRESHA_URL, PHONE, PHONE_HREF, nav } from "@/data/site";

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-cream/95 backdrop-blur-xl border-b border-gold/25 shadow-[0_6px_30px_-16px_rgba(120,80,60,0.25)] py-2"
          : "py-3 bg-cream/70 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 md:gap-4 group shrink-0" aria-label={`${BUSINESS} — Home`}>
          <img
            src={logoFull}
            alt=""
            aria-hidden
            width="128"
            height="128"
            className="w-14 h-14 md:w-20 md:h-20 object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <div className="leading-tight">
            <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-gold">The</div>
            <div className="font-display text-[18px] sm:text-[22px] md:text-[26px] text-ink tracking-tight whitespace-nowrap">Restoration Room</div>
            <div className="font-script text-[13px] sm:text-[14px] text-rose -mt-0.5"></div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-6" aria-label="Primary">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `relative text-[11px] uppercase tracking-[0.2em] transition-colors group py-2 ${
                  isActive ? "text-rose" : "text-ink/75 hover:text-rose"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {n.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-rose transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-4">
          <a href={PHONE_HREF} className="text-[13px] text-taupe hover:text-rose flex items-center gap-2 transition-colors">
            <span aria-hidden>✆</span>{PHONE}
          </a>
          <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !py-3 !px-5 !text-[11px]">Book on Fresha</a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="xl:hidden p-3 -mr-3 min-h-11 min-w-11 text-ink"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <div className={`w-6 h-px bg-current my-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-px bg-current transition-all duration-500 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="xl:hidden bg-cream border-t border-gold/25 mt-2 fade-up max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-8 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMenuOpen(false)}
                className="py-3.5 border-b border-blush font-display text-xl text-ink flex items-center justify-between"
              >
                {n.label}
                <span className="text-rose text-sm" aria-hidden>→</span>
              </Link>
            ))}
            <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="btn-primary w-full mt-6">Book on Fresha</a>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="btn-secondary w-full mt-3 text-center">Booking Information</Link>
            <a href={PHONE_HREF} className="mt-4 text-center text-rose tracking-wide">✆ {PHONE}</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
