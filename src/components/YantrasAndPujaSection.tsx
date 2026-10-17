import React from 'react';
import { Sparkles, MessageSquare, Phone, PackageCheck, Shield } from 'lucide-react';
import { yantrasCatalog, YantraItem } from '../data/yantrasAndPuja.ts';
import { translations, Language } from '../data/translations.ts';

interface YantrasSectionProps {
  lang: Language;
}

export const YantrasAndPujaSection: React.FC<YantrasSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="yantras" className="py-16 bg-[#0d0805] text-amber-50 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 tracking-wider mb-2">
            <span>సిద్ధ యంత్ర ప్రతిష్ట</span>
            <span aria-hidden="true">·</span>
            <span>పూజా విశేష ద్రవ్యాలు</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-100">
            {t.yantras.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80 leading-relaxed">
            {t.yantras.subtitle}
          </p>
        </div>

        {/* Yantras Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yantrasCatalog.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-b from-[#180e08] to-[#120a06] border border-amber-800/40 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-amber-600/60 transition-all"
            >
              <div>
                {/* Sacred Geometric Visual Frame */}
                <div className="relative aspect-video w-full rounded-lg bg-[#0e0704] border border-amber-900/60 flex items-center justify-center overflow-hidden mb-4 p-4">
                  {/* Subtle Sri Yantra vector representation */}
                  <svg viewBox="0 0 100 100" className="w-24 h-24 text-amber-400 stroke-current fill-none stroke-[1.2] opacity-80">
                    <polygon points="50,15 85,75 15,75" />
                    <polygon points="50,85 85,25 15,25" />
                    <polygon points="50,25 75,70 25,70" />
                    <polygon points="50,75 75,30 25,30" />
                    <circle cx="50" cy="50" r="42" />
                    <circle cx="50" cy="50" r="48" />
                  </svg>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded">
                    {lang === 'te' ? item.metalTe : item.metalEn}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold font-serif text-amber-100 leading-snug">
                    {lang === 'te' ? item.nameTe : item.nameEn}
                  </h3>
                  <span className="text-[11px] text-amber-400 shrink-0 font-medium">
                    {lang === 'te' ? item.tagTe : item.tagEn}
                  </span>
                </div>

                <p className="text-xs text-amber-200/80 leading-relaxed mb-3">
                  {lang === 'te' ? item.purposeTe : item.purposeEn}
                </p>

                <div className="text-[11px] text-amber-300/90 bg-[#0e0704] p-2.5 rounded-lg border border-amber-900/40 mb-4 flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{lang === 'te' ? item.blessingTe : item.blessingEn}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-amber-900/30 flex items-center justify-between gap-2">
                <a
                  href={`https://wa.me/917093586539?text=${encodeURIComponent(
                    `నమస్కారం శ్రీనివాస్ మహారాజ్ గారు, నాకు "${item.nameTe}" ఆర్డర్ / వివరాలు కావాలి.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.yantras.orderNow}</span>
                </a>

                <a
                  href="tel:7093586539"
                  className="py-2 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>7093586539</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Courier & Guarantee Notice */}
        <div className="mt-10 p-4 rounded-xl bg-[#140b07] border border-amber-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/90 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <PackageCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              {lang === 'te'
                ? 'భారతదేశమంతటా స్పీడ్ పోస్ట్ & కొరియర్ ద్వారా 2-3 రోజుల్లో హోమ్ డెలివరీ చేయబడును.'
                : 'All-India express courier delivery to your doorstep within 2-3 business days.'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold shrink-0">
            <Shield className="w-4 h-4" />
            <span>{t.yantras.energizedGuarantee}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
