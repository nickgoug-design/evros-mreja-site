import { MapPin, Phone, Mail, Facebook, Linkedin, Youtube } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/share/17xY3fURaH/" },
  { icon: Youtube, href: "https://www.youtube.com/@NORMASAEVROSWIRES" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/normawire" },
];

export default function ContactForm() {
  const { t } = useLanguage();

  const rows = [
    { icon: MapPin, label: t("contact.addressLabel"), value: t("contact.addressValue") },
    { icon: Phone, label: t("contact.phoneLabel"), value: "+359 896 600 975", href: "tel:+359896600975" },
    { icon: Mail, label: t("contact.emailLabel"), value: "vasilis.apostolov@gmail.com", href: "mailto:vasilis.apostolov@gmail.com" },
  ];

  return (
    <section id="contact" className="bg-paper mesh-line-bg py-24">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          {/* Ολόκληρο το section είναι ΜΙΑ μεγάλη "ετικέτα" -- η ίδια γλώσσα
              σχεδίασης με τις υπόλοιπες κάρτες/tags του site, εδώ σε μεγάλη κλίμακα */}
          <div className="tag-card relative overflow-hidden">
            {/* Απαλό accent φως στην πάνω γωνία -- σπάει το flat λευκό */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, rgba(31,95,168,0.8), transparent 70%)" }}
            />

            <div className="relative pt-10 px-8 md:px-12 pb-2 text-center">
              <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-3">{t("contact.kicker")}</p>
              <h2 className="font-display font-700 text-3xl md:text-4xl text-ink">{t("contact.heading")}</h2>
            </div>

            <div className="border-t border-dashed border-ink/15 mt-8 grid md:grid-cols-2 gap-10 px-8 md:px-12 pb-10 pt-8">
              {/* Αριστερά: στοιχεία επικοινωνίας + social */}
              <div>
                <div className="space-y-6">
                  {rows.map((r) => {
                    const Icon = r.icon;
                    const content = (
                      <>
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-accent" />
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-wide text-steel">{r.label}</div>
                          <div className="text-ink font-medium">{r.value}</div>
                        </div>
                      </>
                    );
                    return r.href ? (
                      <a key={r.label} href={r.href} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-accent group-hover:text-white">
                          <Icon size={18} className="text-accent group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-wide text-steel">{r.label}</div>
                          <div className="text-ink font-medium group-hover:text-accent transition-colors">{r.value}</div>
                        </div>
                      </a>
                    ) : (
                      <div key={r.label} className="flex items-center gap-4">{content}</div>
                    );
                  })}
                </div>

                <div className="mt-9">
                  <div className="font-mono text-[10px] uppercase tracking-wide text-steel mb-3">{t("contact.followUs")}</div>
                  <div className="flex gap-3">
                    {socials.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={i}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="social link"
                          className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-steel hover:text-white hover:bg-accent hover:border-accent transition-colors"
                        >
                          <Icon size={16} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Δεξιά: πραγματικός χάρτης, με "ετικέτα" περιθώριο ταιριαστό με το θέμα */}
              <div className="relative rounded-sm overflow-hidden border border-ink/15 aspect-[4/3] md:aspect-auto">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=NORMA+S.A.+Didymoteicho+Alexandroupoli+Greece"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-3 left-3 z-10 bg-white text-ink text-xs font-semibold px-3 py-1.5 rounded shadow flex items-center gap-1 hover:bg-accent hover:text-white transition-colors"
                >
                  {t("contact.openMaps")}
                </a>
                <iframe
                  title="Карта на местоположението на NORMA S.A."
                  className="w-full h-full min-h-[280px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=NORMA+S.A.+Didymoteicho+Alexandroupoli+Greece&output=embed"
                />
              </div>
            </div>

            {/* Κάτω μπάρα CTA -- ενσωματωμένη μέσα στην ίδια "ετικέτα" */}
            <div className="border-t border-dashed border-ink/15 px-8 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-ink/[0.03]">
              <p className="text-steel text-sm">{t("contact.ctaText")}</p>
              <a
                href="mailto:vasilis.apostolov@gmail.com"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 shrink-0"
              >
                {t("contact.ctaBtn")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
