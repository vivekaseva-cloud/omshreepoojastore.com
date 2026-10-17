/**
 * Private Ads & Google Ads Management Utilities
 */

export interface PrivateAd {
  id: string;
  title: string;
  category: string;
  description: string;
  contactNumber: string;
  city?: string;
  imageUrl?: string;
  targetLink?: string;
  status: 'approved' | 'pending' | 'rejected';
  submittedAt: number;
  approvedAt?: number;
  featured?: boolean;
}

export interface GoogleAdsConfig {
  enabled: boolean;
  clientScriptUrl?: string; // e.g. https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-...
  adClient: string; // e.g. ca-pub-1234567890123456
  adSlotBanner: string; // Slot ID for top/mid banners
  customHtmlSnippet?: string; // Direct snippet pasted by user
}

export function validatePrivateAdSubmission(ad: Partial<PrivateAd>): { isValid: boolean; error?: string } {
  if (!ad.title || ad.title.trim().length < 3) {
    return { isValid: false, error: 'శీర్షిక (Title) కనీసం 3 అక్షరాలు ఉండాలి / Title must be at least 3 characters' };
  }
  if (!ad.description || ad.description.trim().length < 10) {
    return { isValid: false, error: 'వివరణ (Description) కనీసం 10 అక్షరాలు ఉండాలి / Description must be at least 10 characters' };
  }
  const cleanPhone = (ad.contactNumber || '').replace(/[^0-9]/g, '');
  if (cleanPhone.length < 10) {
    return { isValid: false, error: 'చెల్లుబాటు అయ్యే 10 అంకెల ఫోన్ నంబర్ ఇవ్వండి / Enter valid 10-digit phone number' };
  }
  return { isValid: true };
}

export function createPendingPrivateAd(data: {
  title: string;
  category: string;
  description: string;
  contactNumber: string;
  city?: string;
  imageUrl?: string;
  targetLink?: string;
}): PrivateAd {
  return {
    id: `ad_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: data.title.trim(),
    category: data.category.trim() || 'General / సాధారణం',
    description: data.description.trim(),
    contactNumber: data.contactNumber.trim(),
    city: data.city?.trim() || '',
    imageUrl: data.imageUrl?.trim() || '',
    targetLink: data.targetLink?.trim() || '',
    status: 'pending',
    submittedAt: Date.now(),
  };
}

export function approveAd(ads: PrivateAd[], adId: string): PrivateAd[] {
  return ads.map((ad) =>
    ad.id === adId
      ? { ...ad, status: 'approved', approvedAt: Date.now() }
      : ad
  );
}

export function rejectAd(ads: PrivateAd[], adId: string): PrivateAd[] {
  return ads.map((ad) =>
    ad.id === adId
      ? { ...ad, status: 'rejected' }
      : ad
  );
}

export function deleteAd(ads: PrivateAd[], adId: string): PrivateAd[] {
  return ads.filter((ad) => ad.id !== adId);
}
