import { ShieldCheck, TrendingUp, Globe2, Leaf } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Vision() {
  const { t } = useLanguage();

  const pillars = [
    { icon: ShieldCheck, title: t("vision.pillar1Title"), body: t("vision.pillar1Body") },
    { icon: TrendingUp, title: t("vision.pillar2Title"), body: t("vision.pillar2Body") },
    { icon: Globe2, title: t("vision.pillar3Title"), body: t("vision.pillar3Body") },
    { icon: Leaf, title: t("vision.pillar4Title"), body: t("vision.pillar4Body") },
  ];

  return (
    <section id="vision" className="bg-paper py-24">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <p className="font-mono text-accent text-xs tracking-[0.2em] uppercase mb-3">{t("vision.kicker")}</p>
          <h2 className="font-display font-700 text-3xl md:text-4xl text-ink max-w-2xl mb-6">{t("vision.heading")}</h2>
          <p className="text-steel leading-relaxed max-w-2xl mb-14">{t("vision.body")}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 80}>
                <div className="tag-card h-full p-6">
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-600 text-base text-ink mb-2">{p.title}</h3>
                  <p className="text-steel text-sm leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
