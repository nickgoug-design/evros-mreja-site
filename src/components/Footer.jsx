import { Facebook, Linkedin, Youtube } from "lucide-react";
import { asset } from "../utils/asset.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/share/17xY3fURaH/" },
  { icon: Youtube, href: "https://www.youtube.com/@NORMASAEVROSWIRES" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/normawire" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink border-t border-white/10 pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Λογότυπο + σύντομο μότο */}
        <div>
          <img src={asset("/images/norma-logo.png")} alt="NORMA S.A." className="w-10 h-10 object-contain mb-3" />
          <p className="font-display font-600 text-white text-sm">NORMA S.A.</p>
          <p className="text-white/40 text-xs mt-1">{t("footer.tagline")}</p>
        </div>

        {/* Διεύθυνση */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-accent mb-2">{t("footer.addressLabel")}</p>
          <p className="text-white/50 text-sm leading-relaxed">
            {t("footer.addressValue")}<br />{t("footer.addressCountry")}
          </p>
        </div>

        {/* Επικοινωνία */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-accent mb-2">{t("footer.contactLabel")}</p>
          <p className="text-white/50 text-sm leading-relaxed">
            <a href="tel:+359896600975" className="hover:text-white transition-colors">+359 896 600 975</a>
            <br />
            <a href="mailto:vasilis.apostolov@gmail.com" className="hover:text-white transition-colors">vasilis.apostolov@gmail.com</a>
          </p>
        </div>

        {/* Social */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-accent mb-2">{t("footer.followUs")}</p>
          <div className="flex gap-3">
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
                  aria-label="social link"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-white/10 text-center">
        <p className="font-mono text-[11px] text-white/35">
          &copy; {new Date().getFullYear()} NORMA S.A. — {t("footer.legal")}
        </p>
      </div>
    </footer>
  );
}
