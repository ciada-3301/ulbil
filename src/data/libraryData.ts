// Uluberia Institute & Library - Master Data Store

export interface EminentPerson {
  id: string;
  name: string;
  designation: string;
  subDesignation?: string;
  roleInLibrary: string;
  image: string;
  message: string;
  fullMessageUrl?: string;
}

export interface Milestone {
  year: string;
  title: string;
  bengaliTitle?: string;
  description: string;
  tag: string;
  iconName: string;
}

export interface LibraryWing {
  id: string;
  title: string;
  bengaliTitle: string;
  description: string;
  booksCount: string;
  icon: string;
  features: string[];
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Notice' | 'Circular' | 'Anniversary' | 'Event';
  isNew: boolean;
  pdfUrl?: string;
}

export interface BookItem {
  id: string;
  title: string;
  bengaliTitle?: string;
  author: string;
  category: string;
  language: 'Bengali' | 'English' | 'Sanskrit' | 'Hindi';
  year?: string;
  accessionNo: string;
  status: 'Available' | 'Reference Only' | 'Issued';
  isRare?: boolean;
}

export const LIBRARY_INFO = {
  name: 'Uluberia Institute & Library',
  bengaliName: 'উলুবেড়িয়া ইনস্টিটিউট ও লাইব্রেরি',
  tagline: 'Mankind • Society • Culture',
  bengaliTagline: 'মানবতা • সমাজ • সংস্কৃতি',
  foundedYear: '1902',
  anniversaryMilestone: '125 Years of Glorious Heritage (1902–2027)',
  establishedDate: 'Established in 1902 (originally as Victoria Institute & Library)',
  address: 'Uluberia, Howrah, West Bengal - 711315, India',
  phone: '(+91) 98363 30911',
  emails: ['ulu.ins.library@ulbil.org', 'ulu.ins.library@gmail.com'],
  website: 'https://ulbil.org',
  timings: {
    morning: '9:00 AM – 12:00 PM',
    evening: '4:00 PM – 7:00 PM',
    openDays: 'Open Daily (Except notified statutory public holidays)'
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/p/Uluberia-Institute-Library-61553707542427/',
    twitter: '#',
    youtube: '#',
    instagram: '#'
  },
  stats: [
    { label: 'Years of Heritage', value: '125+', suffix: 'Years' },
    { label: 'Books & Volumes', value: '55,000+', suffix: 'Volumes' },
    { label: 'Active Patrons', value: '4,200+', suffix: 'Members' },
    { label: 'Cultural Wings', value: '8', suffix: 'Committees' },
    { label: 'Institutions Founded', value: '2', suffix: 'Colleges/Schools' }
  ]
};

export const EMINENT_PERSONS: EminentPerson[] = [
  {
    id: 'sri-pulak-roy',
    name: 'Sri Pulak Roy',
    designation: "Hon'ble Member of the Legislative Assembly (MLA)",
    subDesignation: 'Govt. of West Bengal & Eminent Social Reformer',
    roleInLibrary: 'Life-Member, Uluberia Institute & Library',
    image: 'https://www.ulbil.org/files/contents/sri_pulok_roy.jpg',
    message: "Uluberia Institute and Library, a prestigious institution rich with eminent personalities from Uluberia's unique art, culture, literature, and education, marks a glorious 125-year chapter. This institution, which has always been vibrant with the comings and goings of cultured and talented people from various professions, is a prominent symbol of social consciousness and social values. I hope that in the days to come, this institution, radiating Bengali culture, will become even more accepted and cherished by the new generation in the field of balanced education and culture.",
    fullMessageUrl: 'https://www.ulbil.org/files/contents/Sri%20Pulok%20Roy.pdf'
  },
  {
    id: 'sri-abhay-kumar-das',
    name: 'Sri Abhay Kumar Das',
    designation: "Hon'ble Chairman, Uluberia Municipality",
    subDesignation: 'Eminent Personality & Social Worker',
    roleInLibrary: 'Life-Member, Uluberia Institute & Library',
    image: 'https://www.ulbil.org/files/contents/sri_abhay_das.jpg',
    message: "Uluberia Institute and Library, a centre of education and culture in the historic city of Uluberia flourished by Job Charnock, is one of the region's most prominent heritage structures. This institution played a pioneering role in the establishment of two of Uluberia's most renowned educational institutions, Uluberia College and Binapani Girls' High School. It preserves the culture of Bengal while paying tribute to great thinkers and showcasing innovative ideas.",
    fullMessageUrl: 'https://www.ulbil.org/files/contents/Sri%20Abhay%20Kumar%20Das.pdf'
  },
  {
    id: 'sri-manas-kumar-mondal',
    name: 'Sri Manas Kumar Mondal',
    designation: "Hon'ble Sub-Divisional Officer (SDO)",
    subDesignation: 'Uluberia Sub-Division, Uluberia, Howrah, W.B.',
    roleInLibrary: 'Ex-Officio President, Uluberia Institute & Library',
    image: 'https://www.ulbil.org/files/contents/shri_manas_kumar_mandal_sdo_uluberia.jpg',
    message: "The institution that emerged in 1902 as the Victoria Institute and Library has, after bearing witness to more than a century of history, become the Uluberia Institute and Library, standing proudly at the heart of Uluberia town. What was once primarily a meeting place for civic leaders has today become one of the most well-known centres of Uluberia's cultural landscape. This institution is considered a hallowed ground for history, education, culture, art, and literature.",
    fullMessageUrl: 'https://www.ulbil.org/files/contents/Sri%20Manas%20Kumar%20Mondal.pdf'
  },
  {
    id: 'sri-siddhartha-das',
    name: 'Sri Siddhartha Das',
    designation: 'General Secretary',
    subDesignation: 'Governing Council',
    roleInLibrary: 'Secretary, Uluberia Institute & Library',
    image: 'https://www.ulbil.org/files/contents/siddhartha_das.jpg',
    message: "At the vibrant heart of Uluberia stands the Uluberia Institute and Library—a century-old sanctuary where art, learning, and culture are woven into one enduring tapestry. Nurtured through the fellowship of Uluberia's many enlightened minds and eminent personalities, this institution has blossomed into a living symbol of our shared social and cultural values, guided by eight dedicated sub-committees.",
    fullMessageUrl: 'https://www.ulbil.org/files/contents/Sri%20Siddhartha%20Das.pdf'
  },
  {
    id: 'sri-barun-kumar-samui',
    name: 'Sri Barun Kumar Samui',
    designation: 'Working President',
    subDesignation: 'Executive Committee',
    roleInLibrary: 'Working President, Uluberia Institute & Library',
    image: 'https://www.ulbil.org/files/contents/barun_kumar_samui.jpg',
    message: "Today is a day of great glory. With the celebration of the birth days of scholars, we also observe various cultural programmes and perform different social duties. Let's move forward with the library on a better path—focus on enhancing digital services, leveraging our library as a community hub, forming strategic partnerships, and innovating with new educational programming.",
    fullMessageUrl: 'https://www.ulbil.org/files/contents/Sri%20Barun%20Kumar%20Samui.pdf'
  },
  {
    id: 'dr-akram-hossain',
    name: 'Prof. Dr. Akram Hossain',
    designation: 'Eminent Scholar, Professor & Author',
    subDesignation: 'Renowned Literary Figure',
    roleInLibrary: 'Life-Member, Uluberia Institute & Library',
    image: 'https://www.ulbil.org/files/contents/dr_akram_hossain.jpg',
    message: "Since its establishment in 1902 in pre-independence Bengal, Uluberia Institute and Library has advanced progressively forward leaving behind a trail of activities multifoliate and multivalent and holding aloft the mottos of 'mankind, society and culture'. The young ones are urged to fare forward, forge ahead and contribute their mite to the intellectual development of Howrah.",
    fullMessageUrl: 'https://www.ulbil.org/files/contents/Prof%20Dr%20Akram%20Hossain.pdf'
  },
  {
    id: 'sri-ranjit-kumar-raut',
    name: 'Sri Ranjit Kumar Raut',
    designation: 'Eminent Artist & Poet',
    subDesignation: 'Cultural Columnist',
    roleInLibrary: 'Life-Member, Uluberia Institute & Library',
    image: 'https://www.ulbil.org/files/contents/sri_ranjit_kumar_raut.jpg',
    message: "Nestled in the very heart of the historic town of Uluberia, the Uluberia Institute and Library stand today, after a long and illustrious journey, as one of the foremost institutions devoted to the pursuit of art, literature, culture, and social responsibility. As this century-old, light-bearing institution steps into its 125th Quasquicentennial milestone, it remains an enduring legacy.",
    fullMessageUrl: 'https://www.ulbil.org/files/contents/Sri%20Ranjit%20Kumar%20Raut.pdf'
  },
  {
    id: 'smt-benu-banerjee',
    name: 'Smt. Benu Banerjee',
    designation: 'Eminent Retired Teacher & Author',
    subDesignation: 'Associated with Institute since 1968',
    roleInLibrary: 'Life-Member, Uluberia Institute & Library',
    image: 'https://www.ulbil.org/files/contents/smt._benu_banerjee.jpg',
    message: "ULUBERIA INSTITUTE & LIBRARY: A TIMELESS JOURNEY (1902–2027). My association with this glorious institution spans over half a century (1968–Present), and in that long journey, I have had the privilege of witnessing its many transformations from very close quarters. Through the passage of time, different dedicated personalities have shouldered its responsibility, keeping pace with the needs of their era.",
    fullMessageUrl: 'https://www.ulbil.org/files/contents/Smt.%20Benu%20Banerjee.pdf'
  }
];

export const TIMELINE_MILESTONES: Milestone[] = [
  {
    year: '1902',
    title: 'Genesis as Victoria Institute & Library',
    bengaliTitle: 'ভিক্টোরিয়া ইনস্টিটিউট ও লাইব্রেরি রূপে সূচনা',
    description: 'Founded on the 2nd floor of Uluberia High English School by visionary educators and civic leaders to foster public literacy, reading habits, and intellectual debate in colonial Bengal.',
    tag: 'Foundation',
    iconName: 'Scroll'
  },
  {
    year: '1920s–1930s',
    title: 'Hub of Bengal Renaissance & National Awakening',
    bengaliTitle: 'বাংলার নবজাগরণ ও জাতীয় জাগরণের কেন্দ্র',
    description: 'Evolved into an active sanctuary for scholars, freedom fighters, and social reformers. The library grew its rare collection of early Bengali journals, manuscripts, and national literature.',
    tag: 'Heritage',
    iconName: 'Flame'
  },
  {
    year: '1948',
    title: 'Pioneering the Birth of Uluberia College',
    bengaliTitle: 'উলুবেড়িয়া কলেজ প্রতিষ্ঠার পথিকৃৎ',
    description: 'The Institute and its governing patrons played an instrumental and foundational role in establishing Uluberia College, bringing higher education to thousands of students across the district.',
    tag: 'Education Pillar',
    iconName: 'GraduationCap'
  },
  {
    year: '1955',
    title: 'Birth of Binapani Girls High School',
    bengaliTitle: 'বীণাপাণি গার্লস হাই স্কুলের প্রতিষ্ঠা',
    description: "Dedicated to female literacy and emancipation, the leadership of Uluberia Institute spearheaded the founding of Binapani Girls' High School, one of Howrah's most respected institutions.",
    tag: 'Women Empowerment',
    iconName: 'Heart'
  },
  {
    year: '1970s–1980s',
    title: "Launch of 'Satta' Literary Journal & Cultural Wings",
    bengaliTitle: "'সত্তা' সাহিত্য পত্রিকা ও সাংস্কৃতিক শাখা",
    description: "Inaugurated 'Satta'—the official literary mouthpiece publishing essays, poems, and scholarly critiques, alongside 8 dynamic cultural sub-committees for drama, music, and art.",
    tag: 'Literature & Art',
    iconName: 'BookOpen'
  },
  {
    year: '2000s–2010s',
    title: 'Centenary Celebrations & Architectural Expansion',
    bengaliTitle: 'শতবর্ষ উদযাপন ও প্রাতিষ্ঠানিক বিস্তার',
    description: 'Celebrated 100 years of unbroken service with a major renovation of the reading rooms, expansion of the children section, and creation of a dedicated career consultation wing.',
    tag: 'Centenary',
    iconName: 'Award'
  },
  {
    year: '2020s',
    title: 'Digital Preservation & Open Knowledge Initiative',
    bengaliTitle: 'ডিজিটাল সংরক্ষণ ও জ্ঞান বিনিময়',
    description: 'Initiated the scanning and digital archiving of historical manuscripts, establishment of electronic resources, and online patron outreach.',
    tag: 'Modernization',
    iconName: 'Cpu'
  },
  {
    year: '125th Jubilee',
    title: '125th Quasquicentennial Jubilee Milestone',
    bengaliTitle: '১২৫তম ঐতিহাসিক সার্ধশতবর্ষ পূর্তি',
    description: 'Celebrating 125 glorious years of Mankind, Society, and Culture with modern digital infrastructure, state-of-the-art e-library facilities, and worldwide alumni engagement.',
    tag: '125th Jubilee',
    iconName: 'Sparkles'
  }
];

export const LIBRARY_WINGS: LibraryWing[] = [
  {
    id: 'general-lending',
    title: 'General Lending Division',
    bengaliTitle: 'সাধারণ সঞ্চালন বিভাগ',
    description: 'Over 35,000 borrowable fiction, non-fiction, biographies, philosophy, and classic works in Bengali, English, and Hindi.',
    booksCount: '35,000+ Titles',
    icon: 'BookOpen',
    features: ['Bi-weekly book borrowing', 'Automated issue/return tracking', 'Personalized reader recommendations', 'Spacious open-access shelves']
  },
  {
    id: 'reference-research',
    title: 'Reference & Research Room',
    bengaliTitle: 'তথ্যসূত্র ও গবেষণা কক্ষ',
    description: 'Air-conditioned quiet study zone housing rare encyclopaedias, dictionaries, historical gazetteers, and academic compendiums.',
    booksCount: '8,000+ Reference Works',
    icon: 'Search',
    features: ['Dedicated research desks', 'High-speed scholarly Wi-Fi', 'Govt. Reports & Gazetteers', 'Photocopy & scanning assistance']
  },
  {
    id: 'rare-manuscripts',
    title: 'Heritage & Rare Archives',
    bengaliTitle: 'ঐতিহাসিক ও দুর্লভ পাণ্ডুলিপি',
    description: 'Preserved 19th and early 20th century periodicals, handwritten manuscripts, colonial records, and first-edition publications.',
    booksCount: '2,500+ Rare Items',
    icon: 'Shield',
    features: ['Climate-monitored preservation', 'Digital scans available', 'Scholarly access with prior approval', 'Archival conservation care']
  },
  {
    id: 'children-wing',
    title: 'Children & Young Readers Corner',
    bengaliTitle: 'শিশু ও কিশোর বিভাগ',
    description: 'Colourful, vibrant interactive space filled with folk tales, science comics, illustrated encyclopaedias, and board games.',
    booksCount: '5,000+ Young Titles',
    icon: 'Smile',
    features: ['Weekly storytelling sessions', 'Annual drawing & recitation competitions', 'Junior reading club', 'Safe, joyful atmosphere']
  },
  {
    id: 'career-study',
    title: 'Competitive Exam & Career Desk',
    bengaliTitle: 'কর্মসংস্থান ও প্রতিযোগিতা প্রস্তুতি',
    description: 'Curated repository of UPSC, WBCS, Banking, Railways, SSC, NET/SET study materials and current affairs magazines.',
    booksCount: '3,000+ Guides & Tests',
    icon: 'Briefcase',
    features: ['Daily national newspapers (Anandabazar, The Hindu, Times)', 'Monthly competitive digests', 'Peer study group zone', 'Career mentorship events']
  },
  {
    id: 'satta-literary',
    title: "'Satta' Literary & Cultural Wing",
    bengaliTitle: "'সত্তা' সাহিত্য ও সংস্কৃতি পরিষদ",
    description: "The creative soul of the library, organizing literary symposiums, Basanta Utsab, drama workshops, and publishing 'Satta'.",
    booksCount: '50+ Published Volumes',
    icon: 'Feather',
    features: ['Annual literary souvenir', 'Drama & theatre workshop summer camp', 'Poetry reading evenings', 'Rabindra Jayanti & commemorative festivals']
  }
];

export const SAMPLE_CATALOGUE: BookItem[] = [
  { id: 'b-101', title: 'Gitanjali (Song Offerings)', bengaliTitle: 'গীতাঞ্জলি', author: 'Rabindranath Tagore', category: 'Poetry & Literature', language: 'Bengali', year: '1910', accessionNo: 'UIL-LIT-00104', status: 'Available' },
  { id: 'b-102', title: 'Pather Panchali (Song of the Little Road)', bengaliTitle: 'পথের পাঁচালী', author: 'Bibhutibhushan Bandyopadhyay', category: 'Classic Fiction', language: 'Bengali', year: '1929', accessionNo: 'UIL-LIT-00342', status: 'Available' },
  { id: 'b-103', title: 'History of Bengal (Pre-Mughal to Modern)', bengaliTitle: 'বাংলার ইতিহাস', author: 'Dr. Ramesh Chandra Majumdar', category: 'History & Heritage', language: 'English', year: '1943', accessionNo: 'UIL-HIS-01129', status: 'Reference Only' },
  { id: 'b-104', title: 'The Discovery of India', author: 'Jawaharlal Nehru', category: 'History & Politics', language: 'English', year: '1946', accessionNo: 'UIL-POL-00512', status: 'Available' },
  { id: 'b-105', title: 'Anandamath', bengaliTitle: 'আনন্দমঠ', author: 'Bankim Chandra Chattopadhyay', category: 'Classic Fiction', language: 'Bengali', year: '1882', accessionNo: 'UIL-LIT-00088', status: 'Reference Only', isRare: true },
  { id: 'b-106', title: 'Sanchaita', bengaliTitle: 'সঞ্চয়িতা', author: 'Rabindranath Tagore', category: 'Poetry', language: 'Bengali', year: '1931', accessionNo: 'UIL-POE-00219', status: 'Available' },
  { id: 'b-107', title: 'Chokher Bali', bengaliTitle: 'চোখের বালি', author: 'Rabindranath Tagore', category: 'Classic Fiction', language: 'Bengali', year: '1903', accessionNo: 'UIL-LIT-00190', status: 'Available' },
  { id: 'b-108', title: 'Aranyer Adhikar (Right to the Forest)', bengaliTitle: 'অরণ্যের অধিকার', author: 'Mahasweta Devi', category: 'Contemporary Fiction', language: 'Bengali', year: '1977', accessionNo: 'UIL-LIT-02410', status: 'Available' },
  { id: 'b-109', title: 'Feluda Samagra (Complete Volume I & II)', bengaliTitle: 'ফেলুদা সমগ্র', author: 'Satyajit Ray', category: 'Mystery & Detective', language: 'Bengali', year: '1985', accessionNo: 'UIL-CHI-00750', status: 'Available' },
  { id: 'b-110', title: 'Shonku Samagra (Professor Shonku Tales)', bengaliTitle: 'শঙ্কু সমগ্র', author: 'Satyajit Ray', category: 'Science Fiction', language: 'Bengali', year: '1980', accessionNo: 'UIL-SCI-00430', status: 'Available' },
  { id: 'b-111', title: 'Indian Constitutional Law', author: 'Dr. M. P. Jain', category: 'Law & Governance', language: 'English', year: '2021', accessionNo: 'UIL-LAW-03841', status: 'Reference Only' },
  { id: 'b-112', title: 'WBCS Executive Comprehensive Study Guide', author: 'Editorial Board', category: 'Competitive Examinations', language: 'Bengali', year: '2025', accessionNo: 'UIL-CMP-04910', status: 'Available' },
  { id: 'b-113', title: 'Ancient Manuscripts on Ayurveda & Herbal Botany', bengaliTitle: 'প্রাচীন আয়ুর্বেদ পাণ্ডুলিপি', author: 'Manuscript Collection', category: 'Rare Archives', language: 'Sanskrit', year: '1895', accessionNo: 'UIL-RAR-00012', status: 'Reference Only', isRare: true },
  { id: 'b-114', title: '125th Commemorative Souvenir Volume', bengaliTitle: '১২৫তম বর্ষপূর্তি স্মারক গ্রন্থ', author: 'Uluberia Institute & Library Editorial Council', category: 'Souvenirs & Publications', language: 'Bengali', year: '2026', accessionNo: 'UIL-SOU-00125', status: 'Available' },
  { id: 'b-115', title: 'Debi Choudhurani', bengaliTitle: 'দেবী চৌধুরাণী', author: 'Bankim Chandra Chattopadhyay', category: 'Classic Fiction', language: 'Bengali', year: '1884', accessionNo: 'UIL-LIT-00092', status: 'Available' },
  { id: 'b-116', title: 'Gora', bengaliTitle: 'গোরা', author: 'Rabindranath Tagore', category: 'Classic Fiction', language: 'Bengali', year: '1910', accessionNo: 'UIL-LIT-00155', status: 'Available' },
  { id: 'b-117', title: 'Char Adhyay (Four Chapters)', bengaliTitle: 'চার অধ্যায়', author: 'Rabindranath Tagore', category: 'Classic Fiction', language: 'Bengali', year: '1934', accessionNo: 'UIL-LIT-00210', status: 'Available' },
  { id: 'b-118', title: 'Selected Bengali Poems of 20th Century', bengaliTitle: 'বিংশ শতাব্দীর নির্বাচিত বাংলা কবিতা', author: 'Shankha Ghosh & Alokeranjan Dasgupta', category: 'Poetry', language: 'Bengali', year: '1982', accessionNo: 'UIL-POE-00832', status: 'Available' },
  { id: 'b-119', title: 'Freedom Movement in Howrah District', bengaliTitle: 'হাওড়া জেলায় স্বাধীনতা সংগ্রাম', author: 'Local Historians Council', category: 'History & Heritage', language: 'Bengali', year: '1972', accessionNo: 'UIL-HIS-00450', status: 'Reference Only', isRare: true },
  { id: 'b-120', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science & Cosmos', language: 'English', year: '1988', accessionNo: 'UIL-SCI-01044', status: 'Available' }
];

export const RECENT_NOTICES: Notice[] = [
  {
    id: 'n-01',
    title: 'Grand Inauguration of 125th Quasquicentennial Anniversary Celebrations & Special Exhibition',
    date: 'February 2026',
    category: 'Anniversary',
    isNew: true,
    pdfUrl: 'https://www.ulbil.org/home/About_us.pdf'
  },
  {
    id: 'n-02',
    title: 'Annual General Meeting (AGM) Notice & Election of New Governing Council (2026–2028)',
    date: 'January 2026',
    category: 'Notice',
    isNew: true,
    pdfUrl: 'https://www.ulbil.org/home/Administrtion.jpg'
  },
  {
    id: 'n-03',
    title: 'Invitation for Entries: All Bengal Inter-School Recitation, Drawing & Essay Competition',
    date: 'December 2025',
    category: 'Event',
    isNew: false,
    pdfUrl: 'https://www.ulbil.org/files/news/newsletter.pdf'
  },
  {
    id: 'n-04',
    title: 'Notice regarding Digitization of Rare Historical Periodicals & Launch of Digital Portal',
    date: 'November 2025',
    category: 'Circular',
    isNew: false,
    pdfUrl: 'https://www.ulbil.org/home/Digitalised_Documents_of_Uluberia_Institute_&_Library.pdf'
  },
  {
    id: 'n-05',
    title: 'Holiday Schedule for Saraswati Puja, Basanta Utsab & Republic Day Celebrations',
    date: 'January 2026',
    category: 'Circular',
    isNew: false,
    pdfUrl: 'https://www.ulbil.org/home/Publications.pdf'
  }
];

export const GALLERY_SLIDES = [
  { id: 1, title: 'Historical Library Facade & Heritage Arch', year: 'Archival Collection', url: 'https://www.ulbil.org/images/Banner/2.jpg', category: 'Heritage' },
  { id: 2, title: 'Annual Cultural Festival & Dignitaries Felicitation', year: 'Annual Ceremony', url: 'https://www.ulbil.org/images/Banner/3.jpg', category: 'Events' },
  { id: 3, title: 'Children Summer Drama & Art Workshop', year: 'Youth Academy', url: 'https://www.ulbil.org/images/Banner/4.jpg', category: 'Workshops' },
  { id: 4, title: 'Central Reading Room & Rare Manuscript Desk', year: 'Reading Halls', url: 'https://www.ulbil.org/images/Banner/5.jpg', category: 'Library' },
  { id: 5, title: 'Basanta Utsab & Spring Literary Gathering', year: 'Festival of Spring', url: 'https://www.ulbil.org/images/Banner/6.jpg', category: 'Events' },
  { id: 6, title: 'Book Fair & Commemorative Souvenir Release', year: 'Publication Desk', url: 'https://www.ulbil.org/images/Banner/7.jpg', category: 'Publications' },
  { id: 7, title: 'Seminar on Bengal Literature & Social Reform', year: 'Academic Wing', url: 'https://www.ulbil.org/images/Banner/8.jpg', category: 'Seminars' },
  { id: 8, title: 'Student Study Wing & Competitive Exam Corner', year: 'Student Services', url: 'https://www.ulbil.org/images/Banner/9.jpg', category: 'Library' },
  { id: 9, title: 'Prize Distribution for Youth Recitation & Drama', year: 'Cultural Wing', url: 'https://www.ulbil.org/images/Banner/10.jpg', category: 'Events' },
  { id: 10, title: 'Historical Archive & Minutes Register from 1902', year: 'Archives', url: 'https://www.ulbil.org/images/Banner/11.jpg', category: 'Heritage' },
  { id: 11, title: 'Commemorative Exhibition for 125 Years', year: 'Jubilee 125', url: 'https://www.ulbil.org/images/Banner/12.jpg', category: 'Jubilee' },
  { id: 12, title: 'Executive Committee & Patron Assembly', year: 'Governing Council', url: 'https://www.ulbil.org/images/Banner/13.jpg', category: 'Council' }
];

export interface MembershipTier {
  id: string;
  name: string;
  bengaliName: string;
  fee: string;
  period: string;
  deposit: string;
  quota: string;
  features: string[];
  recommended?: boolean;
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'general',
    name: 'General Reader Membership',
    bengaliName: 'সাধারণ পাঠক সদস্যতা',
    fee: '₹100',
    period: '/ annual',
    deposit: '₹200 (Refundable Caution Deposit)',
    quota: '2 Books at a time for 14 days',
    features: [
      'Access to General Lending section (35,000+ books)',
      'Daily access to Reading Room during operating hours',
      'Online catalogue renewal & reservation requests',
      'Free entry to all public library lectures & seminars'
    ],
    recommended: true
  },
  {
    id: 'student',
    name: 'Student & Senior Concession',
    bengaliName: 'ছাত্র ও প্রবীণ নাগরিক সদস্যতা',
    fee: '₹50',
    period: '/ annual',
    deposit: '₹100 (Refundable Caution Deposit)',
    quota: '2 Books + 1 Competitive Examination Guide',
    features: [
      'Special subsidized fee structure for learners & seniors',
      'Access to Career Corner & Daily National Newspapers',
      'Quiet study room privileges & Wi-Fi research access',
      'Priority participation in workshops, drama camps & quizzes'
    ],
    recommended: false
  },
  {
    id: 'life-member',
    name: 'Honourable Life Patron',
    bengaliName: 'আজীবন পৃষ্ঠপোষক সদস্যতা',
    fee: '₹2,500',
    period: 'One-time Lifetime',
    deposit: 'No Recurring Deposit',
    quota: '4 Books at a time + Priority Periodicals',
    features: [
      'Lifetime borrowing and research privileges',
      "Complimentary copy of all library souvenirs & 'Satta' magazine",
      'Voting rights in General Body & Governing Council meetings',
      'Name permanently inscribed on the 125th Jubilee Patron Wall'
    ],
    recommended: false
  }
];

export const FAQS = [
  {
    q: 'What are the official working hours of Uluberia Institute & Library?',
    a: 'The library is open daily in two sessions: Morning Session from 9:00 AM to 12:00 Noon, and Evening Session from 4:00 PM to 7:00 PM. It remains closed only on officially notified statutory public holidays.'
  },
  {
    q: 'How can I become a member of the library?',
    a: 'You can apply online via our Membership page or visit the library counter during operating hours. Please bring two passport-sized photographs, valid photo ID/address proof, and the prescribed registration and refundable deposit fee.'
  },
  {
    q: 'Can researchers consult rare manuscripts and historical periodicals?',
    a: 'Yes, scholars and researchers are welcome to access our Heritage & Rare Archives wing upon submitting a brief research inquiry to the Librarian or Secretary.'
  },
  {
    q: 'How is the library celebrating its 125th Anniversary?',
    a: 'We are hosting year-long commemorative programs including special seminars, an all-Bengal youth recitation and drawing competition, the release of our 125th Souvenir Volume, modernization of our e-library facilities, and historical exhibitions.'
  },
  {
    q: 'Can I donate books or contribute to the 125th Anniversary Development Fund?',
    a: 'Yes! We warmly welcome book donations in good condition and contributions towards our digitization and building fund. Please contact the Secretary or visit the library office for formal receipt and acknowledgement.'
  }
];
