import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import TreatwellBookButton from "@/components/TreatwellBookButton";
import { FRESHA_URL } from "@/data/site";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  },[pathname]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  },[pathname]);

  return (
    <div className="min-h-dvh bg-cream text-ink overflow-x-hidden">
      <SiteHeader />
      <main id="top">{children}</main>
      <SiteFooter />
      <div className="xl:hidden fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        <TreatwellBookButton className="btn-primary shadow-2xl !text-[11px] !py-3 !px-4">
          Book on Treatwell
        </TreatwellBookButton>
        <a
          href={FRESHA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary shadow-2xl !text-[11px] !py-3 !px-4 bg-cream"
        >
          Book on Fresha
        </a>
      </div>
    </div>
  );
};

export default SiteLayout;
