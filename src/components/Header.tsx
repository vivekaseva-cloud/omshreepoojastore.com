import React from 'react';
import { Phone, Lock, Globe, Menu, X, Sparkles } from 'lucide-react';
import { translations, Language } from '../data/translations.ts';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenAdmin: () => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onOpenAdmin,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0906]/95 backdrop-blur-md border-b border-amber-900/30 text-amber-50">
      {/* Top emergency announcement bar */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 py-1.5 px-4 text-center text-xs font-medium text-amber-200 border-b border-amber-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 mx-auto">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              {lang === 'te'
                ? 'శ్రీనివాస్ మహారాజ్ గారితో ప్రత్యక్ష సంభాషణకు సంప్రదించండి: '
                : 'Direct Spiritual Consultation with Srinivas Maharaj: '}
              <a href="tel:7093586539" className="font-bold underline text-amber-100 hover:text-white">
                7093586539
              </a>
            </span>
          </div>
          <button
            onClick={onToggleLang}
            className="hidden sm:flex items-center gap-1.5 text-xs text-amber-300 hover:text-white px-2 py-0.5 rounded border border-amber-700/50 hover:bg-amber-800/40 transition-colors"
            title="Change Language / భాషను మార్చండి"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'te' ? 'English' : 'తెలుగు'}</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar (Strict 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md shadow-amber-900/30">
            <div className="w-full h-full rounded-full bg-[#150d08] flex items-center justify-center text-amber-400 font-bold text-lg">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-amber-200 font-serif leading-tight group-hover:text-amber-100 transition-colors">
              {lang === 'te' ? 'సద్గురు నాటు వైద్యం' : 'Sadguru Natu Vaidyam'}
            </span>
            <span className="text-[11px] text-amber-400/80 font-medium tracking-wide">
              {lang === 'te' ? 'శ్రీనివాస్ మహారాజ్' : 'Srinivas Maharaj'}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-amber-200/90">
          <a href="#services" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.services}
          </a>
          <a href="#videos" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.videos}
          </a>
          <a href="#yantras" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.yantras}
          </a>
          <a href="#private-ads" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.pvtAds}
          </a>
          <a href="#consultation" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            {t.nav.consult}
          </a>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 text-xs text-amber-300 px-2 py-1 rounded border border-amber-800 bg-amber-950/60 hover:bg-amber-900/60 transition-colors"
            aria-label="Toggle language"
            title="Change Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-semibold">{lang === 'te' ? 'EN' : 'తెలుగు'}</span>
          </button>

          <a
            href="tel:7093586539"
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#1a0f08] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-900/40 whitespace-nowrap shrink-0"
            title="Call Srinivas Maharaj: 7093586539"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            <span className="hidden xs:inline sm:inline">7093586539</span>
            <span className="xs:hidden sm:hidden">{lang === 'te' ? 'కాల్' : 'Call'}</span>
          </a>

          <button
            onClick={onOpenAdmin}
            className="p-1.5 sm:p-2 text-amber-400 hover:text-amber-200 hover:bg-amber-950/60 rounded-lg border border-amber-900/50 transition-colors"
            title={lang === 'te' ? 'అడ్మిన్ లాగిన్' : 'Admin Login'}
            aria-label="Admin portal login"
          >
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-amber-300 hover:text-white rounded-lg border border-amber-900/50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#120a06] border-b border-amber-900/40 px-6 py-4 flex flex-col gap-3 text-sm">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.services}
          </a>
          <a
            href="#videos"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.videos}
          </a>
          <a
            href="#yantras"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.yantras}
          </a>
          <a
            href="#private-ads"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.pvtAds}
          </a>
          <a
            href="#consultation"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-amber-200 hover:text-white border-b border-amber-900/20"
          >
            {t.nav.consult}
          </a>
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 px-4 text-center font-bold text-amber-950 bg-amber-400 rounded-lg"
            >
              {t.hero.bookAppointment}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
