import React, { useState } from 'react';
import {
  X,
  Lock,
  Youtube,
  Megaphone,
  Code,
  Users,
  Server,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { YouTubeVideo, createYouTubeVideo } from '../utils/youtube.ts';
import { PrivateAd, GoogleAdsConfig, approveAd, rejectAd, deleteAd } from '../utils/ads.ts';
import { ConsultationLead } from './ConsultationForm.tsx';
import { translations, Language } from '../data/translations.ts';

interface AdminModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  isAdminAuthenticated: boolean;
  onAuthenticate: (success: boolean) => void;
  videos: YouTubeVideo[];
  onAddVideo: (video: YouTubeVideo) => void;
  onDeleteVideo: (videoId: string) => void;
  ads: PrivateAd[];
  onUpdateAds: (ads: PrivateAd[]) => void;
  googleAdsConfig: GoogleAdsConfig;
  onUpdateGoogleAds: (config: GoogleAdsConfig) => void;
  leads: ConsultationLead[];
}

export const AdminModal: React.FC<AdminModalProps> = ({
  lang,
  isOpen,
  onClose,
  isAdminAuthenticated,
  onAuthenticate,
  videos,
  onAddVideo,
  onDeleteVideo,
  ads,
  onUpdateAds,
  googleAdsConfig,
  onUpdateGoogleAds,
  leads,
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'ads' | 'googleAds' | 'leads' | 'bigrock'>('videos');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Video Form State
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('Naturopathy & Vitality');
  const [videoError, setVideoError] = useState('');
  const [videoSuccess, setVideoSuccess] = useState('');

  // Google Ads Form State
  const [gAdsEnabled, setGAdsEnabled] = useState(googleAdsConfig.enabled);
  const [gAdsClient, setGAdsClient] = useState(googleAdsConfig.adClient);
  const [gAdsSlot, setGAdsSlot] = useState(googleAdsConfig.adSlotBanner);
  const [gAdsSnippet, setGAdsSnippet] = useState(googleAdsConfig.customHtmlSnippet || '');
  const [gAdsSaved, setGAdsSaved] = useState(false);

  // BigRock Copy Status
  const [copiedHtaccess, setCopiedHtaccess] = useState(false);

  const t = translations[lang];

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 7093 or srinivas7093 or admin123
    if (pinInput.trim() === '7093' || pinInput.trim() === 'srinivas7093' || pinInput.trim() === 'admin123') {
      onAuthenticate(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleAddVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVideoError('');
    setVideoSuccess('');

    try {
      const newVid = createYouTubeVideo({
        url: videoUrl,
        title: videoTitle || 'సద్గురు నాటు వైద్యం - యూట్యూబ్ వీడియో',
        titleTe: videoTitle || 'సద్గురు నాటు వైద్యం - యూట్యూబ్ వీడియో',
        category: videoCategory,
        categoryTe: videoCategory,
        featured: true,
      });

      onAddVideo(newVid);
      setVideoSuccess(
        lang === 'te'
          ? 'వీడియో విజయవంతంగా జోడించబడింది! ఇది మొదటి (1st) స్థానంలో ప్రదర్శించబడుతుంది.'
          : 'Video added successfully! It is now positioned 1st on the website.'
      );
      setVideoUrl('');
      setVideoTitle('');
    } catch (err: any) {
      setVideoError(
        lang === 'te'
          ? 'చెల్లుబాటు అయ్యే యూట్యూబ్ లింక్ నమోదు చేయండి.'
          : 'Please enter a valid YouTube video URL or ID.'
      );
    }
  };

  const handleApproveAd = (id: string) => {
    const updated = approveAd(ads, id);
    onUpdateAds(updated);
  };

  const handleRejectAd = (id: string) => {
    const updated = rejectAd(ads, id);
    onUpdateAds(updated);
  };

  const handleDeleteAd = (id: string) => {
    const updated = deleteAd(ads, id);
    onUpdateAds(updated);
  };

  const handleSaveGoogleAds = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoogleAds({
      enabled: gAdsEnabled,
      adClient: gAdsClient.trim(),
      adSlotBanner: gAdsSlot.trim(),
      customHtmlSnippet: gAdsSnippet.trim(),
    });
    setGAdsSaved(true);
    setTimeout(() => setGAdsSaved(false), 2000);
  };

  const htaccessCode = `# BigRock Apache .htaccess for React SPA
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#140b07] border border-amber-800/80 rounded-2xl shadow-2xl text-amber-100 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/40 bg-[#1c100a] shrink-0">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold font-serif text-amber-100">
              {t.admin.title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {isAdminAuthenticated && (
              <button
                onClick={() => onAuthenticate(false)}
                className="text-xs text-amber-400 hover:text-white px-2.5 py-1 rounded border border-amber-800 bg-amber-950/60"
              >
                {t.admin.logoutBtn}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-amber-400 hover:text-white rounded-lg hover:bg-amber-900/40"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Authentication Form if Not Authenticated */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400 mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold font-serif text-amber-100 mb-1">
              {t.admin.loginTitle}
            </h4>
            <p className="text-xs text-amber-300/80 mb-6">
              {lang === 'te'
                ? 'శ్రీనివాస్ మహారాజ్ గారి అడ్మిన్ పాస్వర్డ్ (డిఫాల్ట్: 7093 లేదా srinivas7093)'
                : 'Enter Srinivas Maharaj Admin password (default: 7093)'}
            </p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
              <input
                type="password"
                placeholder={t.admin.enterPin}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 bg-[#0d0704] border border-amber-800/80 rounded-xl text-center text-base tracking-widest text-amber-100 focus:outline-none focus:border-amber-400 font-mono"
              />

              {pinError && (
                <div className="text-xs text-red-400">
                  {lang === 'te' ? 'తప్పు పాస్వర్డ్! దయచేసి మళ్లీ ప్రయత్నించండి.' : 'Invalid password, please try again.'}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl transition-colors shadow-lg"
              >
                {t.admin.loginBtn}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs (Functional buttons, clean segmented design) */}
            <div className="flex items-center gap-1 px-6 py-2.5 border-b border-amber-900/40 bg-[#120a06] overflow-x-auto shrink-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'videos'
                    ? 'bg-red-600 text-white'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>{t.admin.tabs.videos} ({videos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('ads')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'ads'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>
                  {t.admin.tabs.ads} (
                  {ads.filter((a) => a.status === 'pending').length} pending)
                </span>
              </button>

              <button
                onClick={() => setActiveTab('googleAds')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'googleAds'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>{t.admin.tabs.googleAds}</span>
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'leads'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{t.admin.tabs.leads} ({leads.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('bigrock')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'bigrock'
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-amber-300 hover:text-white'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>{t.admin.tabs.bigrock}</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 text-sm">
              {/* TAB 1: VIDEOS */}
              {activeTab === 'videos' && (
                <div className="flex flex-col gap-6">
                  <div className="bg-[#180e08] p-5 rounded-xl border border-amber-900/50">
                    <h4 className="text-sm font-bold text-amber-200 mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-red-500" />
                      <span>
                        {lang === 'te'
                          ? 'కొత్త యూట్యూబ్ వీడియో లింక్ జోడించండి (1st స్థానంలో కనిపిస్తుంది)'
                          : 'Add New YouTube Video (Automatically placed 1st)'}
                      </span>
                    </h4>

                    <form onSubmit={handleAddVideoSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      <div className="md:col-span-5">
                        <input
                          type="text"
                          required
                          placeholder="Paste YouTube Link (https://youtu.be/...)"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0e0704] border border-amber-800/60 rounded-lg text-xs text-amber-100 font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <input
                          type="text"
                          placeholder="Video Title / శీర్షిక"
                          value={videoTitle}
                          onChange={(e) => setVideoTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0e0704] border border-amber-800/60 rounded-lg text-xs text-amber-100 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <button
                          type="submit"
                          className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap shadow-md"
                        >
                          {lang === 'te' ? '+ 1st గా జోడించండి' : '+ Prepend (1st)'}
                        </button>
                      </div>
                    </form>

                    {videoError && <p className="mt-2 text-xs text-red-400">{videoError}</p>}
                    {videoSuccess && <p className="mt-2 text-xs text-emerald-400">{videoSuccess}</p>}
                  </div>

                  {/* List of current videos */}
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                      {lang === 'te' ? 'ప్రస్తుత వీడియోల జాబితా (మొదటి నుండి వరుసగా)' : 'Active Video Queue'}
                    </h4>
                    <div className="flex flex-col gap-2">
                      {videos.map((vid, index) => (
                        <div
                          key={vid.id}
                          className="flex items-center justify-between p-3 bg-[#110905] border border-amber-900/40 rounded-xl gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-xs font-mono font-bold text-amber-500 w-6 shrink-0">
                              #{index + 1}
                            </span>
                            <img
                              src={vid.thumbnailUrl}
                              alt=""
                              className="w-14 h-9 object-cover rounded bg-stone-900 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-amber-100 truncate">
                                {vid.title}
                              </div>
                              <div className="text-[11px] text-amber-400/80 font-mono">
                                ID: {vid.youtubeId} · {vid.category}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-amber-400 hover:text-white rounded hover:bg-amber-900/30"
                              title="Open in YouTube"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => onDeleteVideo(vid.id)}
                              className="p-1.5 text-red-400 hover:text-red-200 rounded hover:bg-red-950/60"
                              title="Delete video"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRIVATE ADS */}
              {activeTab === 'ads' && (
                <div className="flex flex-col gap-6">
                  <div className="text-xs text-amber-300/80 bg-[#180e08] p-3 rounded-lg border border-amber-900/40">
                    {lang === 'te'
                      ? 'ప్రజలు వెబ్సైట్లో సమర్పించిన ప్రైవేట్ ప్రకటనలను ఇక్కడ ఆమోదించవచ్చు (Approve) లేదా తిరస్కరించవచ్చు (Reject).'
                      : 'Moderate user-submitted private ads. Approved ads show immediately on the public website.'}
                  </div>

                  <div className="flex flex-col gap-3">
                    {ads.length === 0 ? (
                      <p className="text-xs text-amber-400/60">No private ads available.</p>
                    ) : (
                      ads.map((ad) => (
                        <div
                          key={ad.id}
                          className={`p-4 rounded-xl border ${
                            ad.status === 'pending'
                              ? 'bg-[#1e1008] border-amber-600/60'
                              : ad.status === 'approved'
                              ? 'bg-[#11160e] border-emerald-800/60'
                              : 'bg-[#180c0c] border-red-900/40 opacity-70'
                          } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                                  ad.status === 'pending'
                                    ? 'bg-amber-500 text-stone-950'
                                    : ad.status === 'approved'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-red-800 text-white'
                                }`}
                              >
                                {ad.status}
                              </span>
                              <span className="text-xs text-amber-400">{ad.category}</span>
                              {ad.city && <span className="text-xs text-amber-500/70">· {ad.city}</span>}
                            </div>
                            <h5 className="text-sm font-bold text-amber-100">{ad.title}</h5>
                            <p className="text-xs text-amber-200/80 mt-1 line-clamp-2">{ad.description}</p>
                            <div className="text-xs text-amber-300 font-mono mt-2">
                              Phone: <strong className="text-amber-100">{ad.contactNumber}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {ad.status !== 'approved' && (
                              <button
                                onClick={() => handleApproveAd(ad.id)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1 shadow-sm"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>{lang === 'te' ? 'ఆమోదించు' : 'Approve'}</span>
                              </button>
                            )}

                            {ad.status !== 'rejected' && (
                              <button
                                onClick={() => handleRejectAd(ad.id)}
                                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-200 font-semibold text-xs rounded-lg flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>{lang === 'te' ? 'తిరస్కరించు' : 'Reject'}</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteAd(ad.id)}
                              className="p-1.5 text-red-400 hover:text-red-200 rounded hover:bg-red-950/60"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: GOOGLE ADS */}
              {activeTab === 'googleAds' && (
                <form onSubmit={handleSaveGoogleAds} className="flex flex-col gap-4 max-w-xl">
                  <div className="flex items-center justify-between p-3 bg-[#180e08] rounded-xl border border-amber-900/50">
                    <div>
                      <div className="text-xs font-bold text-amber-100">
                        {lang === 'te' ? 'గూగుల్ యాడ్స్ యాక్టివేట్ చేయండి' : 'Enable Google Ads'}
                      </div>
                      <div className="text-[11px] text-amber-300/70">
                        {lang === 'te' ? 'వెబ్సైట్లో యాడ్స్ బ్యానర్లు కనిపిస్తాయి' : 'Render AdSense banners on pages'}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={gAdsEnabled}
                      onChange={(e) => setGAdsEnabled(e.target.checked)}
                      className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      Google AdSense Client ID (e.g. ca-pub-1234567890123456)
                    </label>
                    <input
                      type="text"
                      placeholder="ca-pub-..."
                      value={gAdsClient}
                      onChange={(e) => setGAdsClient(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0e0704] border border-amber-800/60 rounded-lg text-xs text-amber-100 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      Google Ads Slot ID (e.g. 9876543210)
                    </label>
                    <input
                      type="text"
                      placeholder="Slot ID"
                      value={gAdsSlot}
                      onChange={(e) => setGAdsSlot(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0e0704] border border-amber-800/60 rounded-lg text-xs text-amber-100 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      {lang === 'te' ? 'లేదా పూర్తి Google Ads Script Snippet ఇక్కడ పేస్ట్ చేయండి' : 'Or Paste Raw AdSense HTML/Script Snippet'}
                    </label>
                    <textarea
                      rows={4}
                      placeholder='<script async src="https://pagead2.googlesyndication.com/..."></script>'
                      value={gAdsSnippet}
                      onChange={(e) => setGAdsSnippet(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0e0704] border border-amber-800/60 rounded-lg text-xs text-amber-100 font-mono focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {gAdsSaved ? (
                      <span className="text-xs text-emerald-400 font-semibold">
                        {lang === 'te' ? 'సెట్టింగ్స్ భద్రపరచబడ్డాయి!' : 'Saved successfully!'}
                      </span>
                    ) : (
                      <span />
                    )}

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-colors"
                    >
                      {lang === 'te' ? 'సేవ్ చేయండి' : 'Save Google Ads Config'}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: LEADS / INQUIRIES */}
              {activeTab === 'leads' && (
                <div className="flex flex-col gap-3">
                  <div className="text-xs text-amber-300/80 bg-[#180e08] p-3 rounded-lg border border-amber-900/40">
                    {lang === 'te'
                      ? 'భక్తులు, ప్రజలు పంపిన సంప్రదింపు అభ్యర్థనలు (Consultation Inquiries)'
                      : 'Incoming consultation leads submitted through the appointment form.'}
                  </div>

                  {leads.length === 0 ? (
                    <p className="text-xs text-amber-400/60">No consultation requests yet.</p>
                  ) : (
                    leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 rounded-xl bg-[#120a06] border border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-xs text-amber-400 font-semibold mb-0.5">
                            {lead.problemType}
                          </div>
                          <h5 className="text-sm font-bold text-amber-100">{lead.name}</h5>
                          {lead.details && (
                            <p className="text-xs text-amber-200/80 mt-1">{lead.details}</p>
                          )}
                          <div className="text-[11px] text-amber-400/70 font-mono mt-1">
                            {new Date(lead.createdAt).toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `నమస్కారం ${lead.name} గారు, శ్రీనివాస్ మహారాజ్ గారి సద్గురు నాటు వైద్యం సెంటర్ నుండి మాట్లాడుతున్నాము.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg"
                          >
                            WhatsApp
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg"
                          >
                            Call {lead.phone}
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 5: BIGROCK HOSTING GUIDE */}
              {activeTab === 'bigrock' && (
                <div className="flex flex-col gap-5 max-w-2xl text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  <div className="p-4 bg-[#1a0f0a] border border-amber-700/60 rounded-xl">
                    <h4 className="text-sm font-bold text-amber-100 mb-1 flex items-center gap-2">
                      <Server className="w-4 h-4 text-amber-400" />
                      <span>
                        {lang === 'te'
                          ? 'BigRock హోస్టింగ్ లో ఈ వెబ్సైట్ ను ఎలా అప్లోడ్ చేయాలి?'
                          : 'How to Deploy this Website to BigRock Hosting'}
                      </span>
                    </h4>
                    <p className="text-xs text-amber-300/80">
                      {lang === 'te'
                        ? 'ఈ ప్రాజెక్ట్ BigRock లైనక్స్/cPanel హోస్టింగ్ కు 100% అనుకూలంగా రూపొందించబడింది.'
                        : 'This Vite project is fully static and production-optimized for BigRock cPanel / Apache hosting.'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-[#110905] rounded-lg border border-amber-900/40">
                      <strong className="text-amber-100 block mb-1">
                        స్టెప్ 1: ప్రొడక్షన్ బిల్డ్ రూపొందించండి (Build)
                      </strong>
                      <p className="text-xs text-amber-300/70 mb-2">
                        టెర్మినల్ లో <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded font-mono">npm run build</code> రన్ చేయండి.
                        ఇది ప్రాజెక్ట్ రూట్ లో <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded font-mono">dist</code> అనే ఫోల్డర్ ను సృష్టిస్తుంది.
                      </p>
                    </div>

                    <div className="p-3 bg-[#110905] rounded-lg border border-amber-900/40">
                      <strong className="text-amber-100 block mb-1">
                        స్టెప్ 2: BigRock cPanel File Manager లోకి లాగిన్ అవ్వండి
                      </strong>
                      <p className="text-xs text-amber-300/70">
                        BigRock కంట్రోల్ ప్యానెల్ లో <strong>cPanel</strong> తెరవండి. అందులో <strong>File Manager</strong> పై క్లిక్ చేసి <strong>public_html</strong> డైరెక్టరీకి వెళ్లండి.
                      </p>
                    </div>

                    <div className="p-3 bg-[#110905] rounded-lg border border-amber-900/40">
                      <strong className="text-amber-100 block mb-1">
                        స్టెప్ 3: dist ఫోల్డర్ లోని ఫైళ్లను అప్లోడ్ చేయండి
                      </strong>
                      <p className="text-xs text-amber-300/70">
                        <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded font-mono">dist</code> ఫోల్డర్ లోని index.html మరియు assets ఫోల్డర్ ను public_html లోకి అప్లోడ్ చేసి ఎక్స్‌ట్రాక్ట్ చేయండి.
                      </p>
                    </div>

                    <div className="p-3 bg-[#110905] rounded-lg border border-amber-900/40">
                      <div className="flex items-center justify-between mb-2">
                        <strong className="text-amber-100">
                          స్టెప్ 4: BigRock .htaccess ఫైల్ (SPA Routing కోసం)
                        </strong>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(htaccessCode);
                            setCopiedHtaccess(true);
                            setTimeout(() => setCopiedHtaccess(false), 2000);
                          }}
                          className="flex items-center gap-1 text-[11px] px-2 py-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded border border-amber-700/60"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedHtaccess ? 'Copied!' : 'Copy .htaccess'}</span>
                        </button>
                      </div>
                      <pre className="p-2.5 bg-black/60 rounded text-[11px] font-mono text-amber-300/90 overflow-x-auto">
                        {htaccessCode}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
