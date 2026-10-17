import React, { useState } from 'react';
import { X, Megaphone, CheckCircle2, AlertCircle } from 'lucide-react';
import { validatePrivateAdSubmission, createPendingPrivateAd, PrivateAd } from '../utils/ads.ts';
import { translations, Language } from '../data/translations.ts';

interface SubmitAdModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ad: PrivateAd) => void;
}

export const SubmitAdModal: React.FC<SubmitAdModalProps> = ({
  lang,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Puja Samagri / పూజా సామాగ్రి');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = translations[lang];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validatePrivateAdSubmission({
      title,
      description,
      contactNumber,
    });

    if (!validation.isValid) {
      setError(validation.error || 'Please fill required fields properly');
      return;
    }

    const newAd = createPendingPrivateAd({
      title,
      category,
      description,
      contactNumber,
      city,
    });

    onSubmit(newAd);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // reset
      setTitle('');
      setDescription('');
      setContactNumber('');
      setCity('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#160d08] border border-amber-800/80 rounded-2xl p-6 shadow-2xl text-amber-100">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-900/50">
          <div className="flex items-center gap-2 text-base font-bold text-amber-200">
            <Megaphone className="w-5 h-5 text-amber-400" />
            <span>{lang === 'te' ? 'మీ ప్రైవేట్ ప్రకటనను సమర్పించండి' : 'Submit Your Private Ad'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-amber-400 hover:text-white rounded-lg hover:bg-amber-950/60"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
            <h4 className="text-lg font-bold text-amber-100 mb-2">
              {lang === 'te' ? 'ప్రకటన విజయవంతంగా సమర్పించబడింది!' : 'Advertisement Submitted!'}
            </h4>
            <p className="text-xs text-amber-300/80 max-w-xs text-center">
              {t.pvtAds.pendingNotice}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs sm:text-sm">
            {error && (
              <div className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">
                {lang === 'te' ? 'ప్రకటన శీర్షిక (Title) *' : 'Ad Title *'}
              </label>
              <input
                type="text"
                required
                placeholder={lang === 'te' ? 'ఉదా: ఒరిజినల్ ఆయుర్వేద మూలికల షాప్' : 'e.g. Natural Ayurvedic Herb Center'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {lang === 'te' ? 'విభాగం (Category)' : 'Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
                >
                  <option value="Puja Samagri / పూజా సామాగ్రి">Puja Samagri / పూజా సామాగ్రి</option>
                  <option value="Herbal Medicine / నాటు వైద్యం">Herbal Medicine / నాటు వైద్యం</option>
                  <option value="Vedic Astrology / జ్యోతిష్యం">Vedic Astrology / జ్యోతిష్యం</option>
                  <option value="Business / వ్యాపారం">Business / వ్యాపారం</option>
                  <option value="Services / సేవలు">Services / సేవలు</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {lang === 'te' ? 'ఊరు / నగరం (City)' : 'City / Location'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'te' ? 'ఉదా: హైదరాబాద్ / తిరుపతి' : 'e.g. Hyderabad / Vijayawada'}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">
                {lang === 'te' ? 'సంప్రదించాల్సిన ఫోన్ నంబర్ *' : 'Contact Phone Number *'}
              </label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-3 py-2 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1">
                {lang === 'te' ? 'ప్రకటన పూర్తి వివరాలు (Description) *' : 'Ad Description *'}
              </label>
              <textarea
                required
                rows={3}
                placeholder={
                  lang === 'te'
                    ? 'మీ సేవలు లేదా వస్తువుల పూర్తి వివరాలను ఇక్కడ రాయండి...'
                    : 'Describe your products or services...'
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-[#0e0704] border border-amber-900/60 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 text-xs resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-amber-900/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-amber-400 hover:text-white"
              >
                {lang === 'te' ? 'రద్దు' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                {lang === 'te' ? 'ప్రకటనను సమర్పించండి' : 'Submit for Approval'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
