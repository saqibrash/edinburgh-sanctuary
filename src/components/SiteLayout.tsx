import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { FRESHA_URL } from "@/data/site";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-cream text-ink overflow-x-hidden">
      <SiteHeader />
      <main id="top">{children}</main>
      <SiteFooter />
      <a
        href={FRESHA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="xl:hidden fixed bottom-5 right-5 z-40 btn-primary shadow-2xl"
      >
        Book on Fresha
      </a>
    </div>
  );
};

export default SiteLayout;
