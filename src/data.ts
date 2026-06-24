import { ServiceCard, Testimonial, FAQItem, PortfolioItem } from './types';

export const SERVICES_DATA: ServiceCard[] = [
  {
    id: 'web-design',
    title: 'Web Designing/Developing',
    shortDescription: 'Premium, interactive web solutions with world-class performance and pristine responsiveness.',
    description: 'We craft high-converting, lightning-fast digital experiences tailored strictly to your business objectives. From glassmorphism dashboards to fluid enterprise portals, we write flawless code ensuring zero lag and maximum conversions. All sites include fully integrated backend systems and custom SEO foundation.',
    priceEstimate: 'Starting at ₹15,000',
    timeline: '7-14 Days',
    icon: 'Laptop',
    features: ['React & NextJS/Vite Tech Stack', 'Mobile-Responsive & Speed Optimized', 'Bespoke UI/UX Layouts', 'Integrated Content Management Systems', 'SEO & Analytics Groundwork']
  },
  {
    id: 'resume-cv',
    title: 'Resume & CV Making',
    shortDescription: 'ATS-optimized, executive-grade resumes and portfolios that open elite career doors.',
    description: 'Elevate your professional profile with resume structures engineered specifically to bypass automated applicant tracking systems (ATS). We match content to target job descriptions, building powerful descriptions, sleek layouts, and matching digital bio websites that capture executive attention.',
    priceEstimate: 'Starting at ₹1,500',
    timeline: '2-4 Days',
    icon: 'FileText',
    features: ['ATS-Friendliness Score >95%', 'Custom Executive Layouts', 'Industry-Specific Keyword Mapping', 'Digital Bio Pages (Web version)', 'Standard Formats (PDF/Word)']
  },
  {
    id: 'thumbnail-video',
    title: 'Thumbnail & Video Editing',
    shortDescription: 'High-CTR visual narratives and short-form video hooks designed to dominate algorithm feeds.',
    description: 'Turn viewers into loyal subscribers. We design thumbnails with high visual contrast that draw high click-through rates. Our video editing suite handles reels, shorts, or long-form features with flawless audio correction, rhythmic cuts, dynamic captions, and expert color styling.',
    priceEstimate: 'Starting at ₹2,500',
    timeline: '3-5 Days',
    icon: 'Video',
    features: ['High Click-Through & Impression CTRs', 'Cinematic Color Grading & SFX', 'Rhythmic Subtitles & Captions', 'Engaging Call-to-Actions (CTAs)', 'Multi-Format Export (HD/4K)']
  },
  {
    id: 'growth-agency',
    title: 'Growth Agency & Business Establishment',
    shortDescription: 'Scale your brand via influencer matchmaking, SEO listing setups, and high-growth funnels.',
    description: 'We configure and secure your digital presence on Google Maps & Search. We also partner you with vetted influencers across India to drive qualified prospects straight into your sales channels, establishing local authority fast.',
    priceEstimate: 'Starting at ₹12,000',
    timeline: 'Ongoing / Monthly plans',
    icon: 'TrendingUp',
    features: ['Google My Business setup & SEO ranking', 'Local Map Citation & Review management', 'Vetted Influencer Collaborations', 'Social Media Expansion Funnels', 'Growth Analytics Auditing']
  },
  {
    id: 'license-forms',
    title: 'Licence & Forms Registration',
    shortDescription: 'Seamless business certifications, legal formation forms, and government digital registrations.',
    description: 'Bypass government bureaucracy with secure, guided registration frameworks. We handle all paperwork filings, MSME digital setups, local trade certifications, and digital business form requests on your behalf with complete security and updates.',
    priceEstimate: 'Starting at ₹3,500',
    timeline: '5-10 Days',
    icon: 'FileCheck',
    features: ['MSME & GST Application filing', 'Local Municipal Trade Licences', 'Business Form Setup assistance', 'Expert Documentation Auditing', 'Secure status tracking log']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Aniket Sharma',
    role: 'Co-Founder',
    companyString: 'NeoVibe E-commerce',
    feedback: 'Walt Designs engineered our high-speed store dashboard in record time. On-time delivery and absolute class-leading speed. Our conversion rates spiked 30%!',
    rating: 5
  },
  {
    id: '2',
    name: 'Meera Deshmukh',
    role: 'Creative Director',
    companyString: 'Apex Digital Agency',
    feedback: 'Priyanshu and team are legends. Their Thumbnail and Video Editing editing work dramatically boosted our click-through rates. Truly premium and communicative throughout.',
    rating: 5
  },
  {
    id: '3',
    name: 'Rajveer Singh',
    role: 'Principal',
    companyString: 'Singh Legal Ventures',
    feedback: 'Extremely professional Licence and GST registration assistance. No complications, no manual errors. Highly recommended all over India!',
    rating: 5
  },
  {
    id: '4',
    name: 'Pooja Iyer',
    role: 'Lifestyle Creator',
    companyString: '1.2M+ YouTube Creator',
    feedback: 'The growth campaign and video edits are outstanding. They know exactly how algorithms think. Affordable prices and premium output.',
    rating: 5
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'process',
    question: 'How do we kick off a premium project with Walt Designs?',
    answer: 'Simply complete our interactive Inquiry Form or consult our custom AI Business Planner on this site. Our founder Priyanshu Kumar will reach out directly to finalize the design scope and issue a secure quote.'
  },
  {
    id: 'faq-2',
    category: 'payments',
    question: 'Are there hidden or maintenance charges on Walt services?',
    answer: 'Adhering to our core value of Affordable Prices, we practice absolute billing transparency. All estimates are detailed upfront. Maintenance terms are agreed upon transparently prior to launch.'
  },
  {
    id: 'faq-3',
    category: 'planning',
    question: 'How does the interactive AI Planner work?',
    answer: 'Our proprietary AI planner uses advanced Gemini intelligence to examine your business goals, target audience, and budget, then instantly maps out a 5-step operational blueprint paired with corresponding services from Walt Designs.'
  },
  {
    id: 'faq-4',
    category: 'availability',
    question: 'Do you cover regional services outside urban hubs?',
    answer: 'Absolutely. We are proud to serve clients all over India, with specialized local support for NCR areas (Delhi, Noida, Faridabad) and offices grounded in West Bengal.'
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'p-1',
    title: 'Svelte Ecommerce Architecture',
    category: 'Web Design',
    description: 'Next-gen React and Tailwind commerce suite featuring micro-interactions and smooth payment flows.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    stats: '60% Faster Loading'
  },
  {
    id: 'p-2',
    title: 'Alpha Shorts YouTube Growth',
    category: 'Video Editing',
    description: 'Dynamic short-form video edit pack combining high visual contrast subtitles and custom audio grading.',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80',
    stats: '14M+ Aggregate Views'
  },
  {
    id: 'p-3',
    title: 'Google My Business Dominance',
    category: 'Growth Agency',
    description: 'Comprehensive SEO listing and schema optimization scaling 4 local franchises onto Delhi primary packs.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
    stats: 'Top 3 Map Ranking'
  },
  {
    id: 'p-4',
    title: 'Executive Portfolio Resume',
    category: 'Resume & CV',
    description: 'Bespoke, ATS-friendly digital CV design featuring interactive achievements logs and elegant layouts.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
    stats: 'Interviews Secured'
  }
];
