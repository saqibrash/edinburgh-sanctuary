import { useEffect } from "react";
import { SITE_URL } from "@/data/site";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const setMeta = (attr: "name" | "property",key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content",content);
};

const Seo = ({ title, description, path, jsonLd }: SeoProps) => {
  const url = `${SITE_URL}${path}`;

  useEffect(() => {
    document.title = title;
    setMeta("name","description",description);
    setMeta("property","og:title",title);
    setMeta("property","og:description",description);
    setMeta("property","og:url",url);
    setMeta("property","og:type","website");
    setMeta("property","og:locale","en_GB");
    setMeta("name","twitter:card","summary_large_image");
    setMeta("name","twitter:title",title);
    setMeta("name","twitter:description",description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  },[title, description, url]);

  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "page";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  },[jsonLd]);

  return null;
};

export default Seo;
