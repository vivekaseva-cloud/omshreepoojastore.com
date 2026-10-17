import React, { useState } from 'react';
import { Send, Phone, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { translations, Language } from '../data/translations.ts';

export interface ConsultationLead {
  id: string;
  name: string;
  phone: string;
  problemType: string;
  details: string;
  createdAt: number;
}

interface ConsultationFormProps {
  lang: Language;
  onNewLead: (lead: ConsultationLead) => void;
  initialProblem?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  lang,
  onNewLead,
  initialProblem,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [problemType, setProblemType] = useState(initialProblem || 'వశీకరణ / Vashikaran');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newLead: ConsultationLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      phone: phone.trim(),
      problemType,
      details: details.trim(),
      createdAt: Date.now(),
    };

    onNewLead(newLead);
    setSubmitted(true);
  };

  const handleSendWhatsAppDirect = () => {
    const text = `నమస్కారం శ్రీనివాస్ మహారాజ్ గారు,\nపేరు: ${name || 'భక్తుడు'}\nఫోన్: ${phone || '7093586539'}\nసమస్య: ${problemType}\nవివరాలు: ${details || 'పరిష్కారం కావాలి'}`;
    window.open(`https://wa.me/917093586539?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="consultation" className="py-16 bg-[#0c0805] text-amber-50 border-b border-amber-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#180e08] to-[#110905] border border-amber-800/50 rounded-2xl p-6 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Confidential / సంపూర్ణ గోప్యత</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
              {t.form.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-amber-200/80">
              {t.form.subtitle}
            </p>
          </div>

          {submitted ? (
            <div className="py-10 text-center flex flex-col items-center">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-amber-100 mb-2">
                {lang === 'te' ? 'ధన్యవాదాలు! మీ వివరాలు అందినవి.' : 'Inquiry Submitted Successfully!'}
              </h3>
              <p className="text-sm text-amber-200/90 max-w-md mb-6">
                {t.form.successMessage}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleSendWhatsAppDirect}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'te' ? 'వాట్సాప్ లో తక్షణమే సంప్రదించండి' : 'Open in WhatsApp Now'}</span>
                </button>

                <a
                  href="tel:7093586539"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>{lang === 'te' ? 'కాల్: 7093586539' : 'Call 7093586539'}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    {t.form.name} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'te' ? 'మీ పేరు' : 'Your Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e0704] border border-amber-900/60 rounded-xl text-amber-100 focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    {t.form.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e0704] border border-amber-900/60 rounded-xl text-amber-100 focus:outline-none focus:border-amber-400 text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {t.form.problemType}
                </label>
                <select
                  value={problemType}
                  onChange={(e) => setProblemType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0e0704] border border-amber-900/60 rounded-xl text-amber-100 focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                >
                  <option value="వశీకరణ / Vashikaran">వశీకరణ సిద్ధ ప్రక్రియ (Vashikaran)</option>
                  <option value="భార్యాభర్తల సమస్యలు / Marital Disputes">భార్యాభర్తల సమస్యలు & విడాకుల నివారణ (Husband-Wife)</option>
                  <option value="ప్రేమికుల సమస్యలు / Love Problems">ప్రేమికుల మధ్య సమస్యలు (Love & Relationship)</option>
                  <option value="స్వయం సంపర్కుల ప్రేమ / LGBTQ+">స్వయం సంపర్కుల ప్రేమ సమస్యలు (LGBTQ+ Relationships)</option>
                  <option value="హిజ్రాల రక్షణ / Transgender Justice">హిజ్రాలను మోసం చేసే వారిని దారికి తేవడం</option>
                  <option value="మరుగు మందు / Marugu Mandu">అసలైన మరుగు మందు కావాలి</option>
                  <option value="మర్ల మందు / Marla Mandu Antidote">మర్ల మందు తీయడం (విరుగుడు)</option>
                  <option value="చేతబడి నివారణ / Black Magic Removal">చేతబడి నిర్మూలన, నిర్ధారణ & రక్షణ</option>
                  <option value="పురుషుల ఆరోగ్యం / Men Vitality">పురుషుల సమస్యలు (అంగస్తంభన, శీఘ్రస్కలనం)</option>
                  <option value="ఆర్ధిక ఇబ్బందులు / Financial Crisis">ఆర్ధిక ఇబ్బందులు & అప్పుల బాధలు</option>
                  <option value="కోర్టు కేసులు / Court Cases">కోర్టు కేసులు & భూ తగాదాలు</option>
                  <option value="లక్ష్మీదేవి నిలబడకపోవడం / Wealth Drain">లక్ష్మీదేవి ఇంట్లో నిలబడకపోవడం</option>
                  <option value="సిద్ధ యంత్రాలు / Energized Yantras">శక్తిమంతమైన సిద్ధ యంత్రాలు & పూజా ద్రవ్యాలు</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {t.form.problemDetails}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    lang === 'te'
                      ? 'మీ పరిస్థితిని లేదా సమస్యను వివరించండి...'
                      : 'Briefly describe your situation...'
                  }
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0e0704] border border-amber-900/60 rounded-xl text-amber-100 focus:outline-none focus:border-amber-400 text-xs sm:text-sm resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-amber-400/80">
                  {lang === 'te' ? 'డైరెక్ట్ కాల్ హెల్ప్‌లైన్:' : 'Direct Helpline:'}{' '}
                  <strong className="text-amber-200">7093586539</strong>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSendWhatsAppDirect}
                    className="flex-1 sm:flex-initial px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{lang === 'te' ? 'వాట్సాప్ లో పంపండి' : 'Send via WhatsApp'}</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.form.submit}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
