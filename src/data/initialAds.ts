import { PrivateAd } from '../utils/ads.ts';

export const initialPrivateAds: PrivateAd[] = [
  {
    id: 'ad_init_1',
    title: 'శ్రీ గాయత్రీ జ్యోతిష్య & పూజా సామాగ్రి నిలయం',
    category: 'Puja Samagri / పూజా ద్రవ్యాలు',
    description: 'స్వచ్ఛమైన ఆవు నెయ్యి, కర్పూరం, హోమ ద్రవ్యాలు, ఒరిజినల్ రుద్రాక్షలు మరియు కాపర్ యంత్రాలు హోల్‌సేల్ ధరలకు లభించును. హైదరాబాద్ లో హోమ్ డెలివరీ కలదు.',
    contactNumber: '7093586539',
    city: 'Hyderabad',
    status: 'approved',
    submittedAt: Date.now() - 3600 * 1000 * 48,
    approvedAt: Date.now() - 3600 * 1000 * 40,
    featured: true,
  },
  {
    id: 'ad_init_2',
    title: 'సహజ వనమూలికా మూలికలు & నాటు ఔషధాలు',
    category: 'Herbal Medicine / నాటు వైద్యం',
    description: 'అడవిలో సేకరించిన స్వచ్ఛమైన అశ్వగంధ, శిలాజిత్, సాలబ్ మిస్రీ, శుద్ధమైన అటవీ తేనె లభించును. పూర్తి స్వచ్ఛత గ్యారంటీ.',
    contactNumber: '7093586539',
    city: 'Vijayawada / తిరుపతి',
    status: 'approved',
    submittedAt: Date.now() - 3600 * 1000 * 72,
    approvedAt: Date.now() - 3600 * 1000 * 60,
    featured: true,
  },
  {
    id: 'ad_init_3',
    title: 'శ్రీ లక్ష్మీ కుబేర హోమం & గోపూజ సమన్వయం',
    category: 'Vedic Ceremonies / వైదిక పూజలు',
    description: 'గృహప్రవేశం, వ్యాపార ప్రారంభ పూజలు, రుద్ర హోమాలకు అనుభవజ్ఞులైన వేద పండితులు అందుబాటులో కలరు.',
    contactNumber: '7093586539',
    city: 'Visakhapatnam',
    status: 'pending',
    submittedAt: Date.now() - 3600 * 1000 * 5,
    featured: false,
  },
];
