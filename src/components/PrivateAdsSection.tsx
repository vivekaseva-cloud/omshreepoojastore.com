import React from 'react';
import { Megaphone, Plus, Phone, CheckCircle, ShieldAlert } from 'lucide-react';
import { PrivateAd } from '../utils/ads.ts';
import { translations, Language } from '../data/translations.ts';

interface PrivateAdsSectionProps {
  lang: Language;
  ads: PrivateAd[];
  onOpenSubmitModal: () => void;
  isAdmin: boolean;
  onOpenAdmin: () => void;
}

export const PrivateAdsSection: React.FC<PrivateAdsSectionProps> = ({
  lang,
  ads,
  onOpenSubmitModal,
  isAdmin,
  onOpenAdmin,
}) => {
  const t = translations[lang];

  // Only show approved ads on public section
  const approvedAds = ads.filter((ad) => ad.status === 'approved');

  return (
    <section id="private-ads" className="py-16 bg-[#0a0604] text-amber-50 border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-amber-900/30">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Megaphone className="w-4 h-4" />
              <span>{lang === 'te' ? 'కమ్యూనిటీ & వ్యాపార ప్రకటనలు' : 'Community & Business Classifieds'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
              {t.pvtAds.title}
            </h2>
            <p className="mt-2 text-sm text-amber-200/80 max-w-2xl">
              {t.pvtAds.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSubmitModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-950/60 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>{t.pvtAds.submitAdBtn}</span>
            </button>
          </div>
        </div>

        {/* Ads Cards Grid */}
        {approvedAds.length === 0 ? (
          <div className="text-center py-12 bg-[#120a06] border border-amber-900/30 rounded-xl text-amber-300/70">
            <Megaphone className="w-10 h-10 mx-auto mb-2 opacity-40 text-amber-500" />
            <p className="text-sm">
              {lang === 'te'
                ? 'ప్రస్తుతం ఆమోదించబడిన ప్రకటనలు లేవు. మీ ప్రకటనను ఇవ్వడానికి పై బటన్ నొక్కండి.'
                : 'No approved private ads yet. Click the button above to submit your advertisement.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-gradient-to-b from-[#160d08] to-[#100804] border border-amber-900/40 rounded-xl p-5 shadow-md flex flex-col justify-between hover:border-amber-700/60 transition-all"
              >
                <div>
                  {/* Clean unboxed metadata (Zero-pill discipline) */}
                  <div className="flex items-center justify-between text-xs text-amber-400/90 mb-2 font-medium">
                    <span>{ad.category}</span>
                    {ad.city && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{ad.city}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-amber-100 font-serif mb-2 leading-snug">
                    {ad.title}
                  </h3>

                  <p className="text-xs text-amber-200/80 leading-relaxed line-clamp-4 mb-4">
                    {ad.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-900/30 flex items-center justify-between gap-3">
                  <div className="text-xs text-amber-300 font-mono">
                    {t.pvtAds.contactLabel}: <strong className="text-amber-100">{ad.contactNumber}</strong>
                  </div>

                  <a
                    href={`tel:${ad.contactNumber}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span>{lang === 'te' ? 'కాల్' : 'Call'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Verification policy footer notice */}
        <div className="mt-8 p-3.5 rounded-xl bg-[#120a06] border border-amber-900/40 flex items-center justify-between text-xs text-amber-300/80 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {lang === 'te'
                ? 'ప్రైవేట్ ప్రకటనలన్నీ అడ్మిన్ (శ్రీనివాస్ మహారాజ్) పరిశీలించి ఆమోదించిన తర్వాతే కనిపిస్తాయి.'
                : 'All private advertisements are moderated and approved by Admin (Srinivas Maharaj) before display.'}
            </span>
          </div>

          <button
            onClick={onOpenAdmin}
            className="text-amber-400 hover:underline font-semibold"
          >
            {lang === 'te' ? 'అడ్మిన్ లాగిన్ →' : 'Admin Approval Portal →'}
          </button>
        </div>
      </div>
    </section>
  );
};
