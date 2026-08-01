import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LegalLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

const LegalLayout = ({ title,updated,children }: LegalLayoutProps) => (
  <div className="min-h-dvh bg-cream text-ink">
    <header className="border-b border-blush">
      <div className="max-w-[820px] mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="font-display text-xl text-ink hover:text-rose transition-colors">
          The Restoration Room
        </Link>
        <Link
          to="/"
          className="text-[11px] tracking-[0.28em] uppercase text-rose hover:text-rose-deep transition-colors"
        >
          ← Back to site
        </Link>
      </div>
    </header>

    <main className="max-w-[820px] mx-auto px-6 py-14 md:py-20">
      <h1 className="font-display text-[38px] md:text-[52px] leading-[1.05] text-ink">{title}</h1>
      <p className="mt-4 text-xs tracking-[0.24em] uppercase text-taupe">Last updated: {updated}</p>
      <div className="mt-10 space-y-8 text-taupe leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-rose [&_a]:underline">
        {children}
      </div>
    </main>

    <footer className="border-t border-blush">
      <div className="max-w-[820px] mx-auto px-6 py-8 text-xs text-taupe flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} The Restoration Room by Camilla.</p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="hover:text-rose transition-colors">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-rose transition-colors">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  </div>
);

export default LegalLayout;
