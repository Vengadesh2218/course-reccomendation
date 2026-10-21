export interface StreamGroup {
  id: string;
  stream: 'Science' | 'Commerce' | 'Arts & Humanities' | 'Vocational';
  groupName: string;
  subjects: string[];
  careerPaths: string[];
  searchableKeywords: string[];
}

export const EXPANDED_12TH_STREAM_GROUPS: StreamGroup[] = [
  // ================= 1. SCIENCE STREAM =================
  {
    id: 'sci-bio-maths',
    stream: 'Science',
    groupName: 'Group 1 — Pure Science / Bio-Maths',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
    careerPaths: ['Medicine', 'Dental', 'Engineering', 'Biotechnology', 'Pharmacy', 'Agriculture'],
    searchableKeywords: ['bio', 'biology', 'maths', 'mathematics', 'pure science', 'PCM', 'PCB', 'PCMB', 'medicine', 'engineering']
  },
  {
    id: 'sci-cs-eng',
    stream: 'Science',
    groupName: 'Group 2 — Computer Science / Engineering Focus',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    careerPaths: ['Computer Science Engineering', 'Information Technology', 'Data Science', 'Artificial Intelligence', 'B.Sc Mathematics', 'B.Sc Physics'],
    searchableKeywords: ['computer', 'computer science', 'CS', 'engineering', 'tech', 'software', 'AI', 'PCM']
  },
  {
    id: 'sci-pure-bio',
    stream: 'Science',
    groupName: 'Group 3 — Pure Biology / Medical Focus',
    subjects: ['Physics', 'Chemistry', 'Botany', 'Zoology'],
    careerPaths: ['Medicine', 'Dental', 'Veterinary Science', 'Nursing', 'Forensic Science', 'Life Sciences'],
    searchableKeywords: ['biology', 'pure biology', 'medical', 'botany', 'zoology', 'doctor', 'nursing', 'PCB']
  },
  {
    id: 'sci-allied',
    stream: 'Science',
    groupName: 'Group 4 — Allied Sciences',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Microbiology', 'Biochemistry', 'Home Science', 'Nutrition & Dietetics'],
    careerPaths: ['Clinical Research', 'Microbiology', 'Biochemistry', 'Nutritionist', 'Food Science'],
    searchableKeywords: ['allied', 'allied sciences', 'microbiology', 'biochemistry', 'nutrition', 'dietetics', 'health']
  },

  // ================= 2. COMMERCE STREAM =================
  {
    id: 'comm-biz-maths',
    stream: 'Commerce',
    groupName: 'Commerce with Business Mathematics',
    subjects: ['Commerce', 'Accountancy', 'Economics', 'Business Mathematics', 'Statistics'],
    careerPaths: ['CA', 'CMA', 'CS', 'B.Com', 'BBA', 'Finance', 'Actuarial Science'],
    searchableKeywords: ['commerce', 'business maths', 'business mathematics', 'CA', 'finance', 'statistics', 'stats', 'accountancy']
  },
  {
    id: 'comm-cs-app',
    stream: 'Commerce',
    groupName: 'Commerce with Computer Applications',
    subjects: ['Commerce', 'Accountancy', 'Economics', 'Computer Applications'],
    careerPaths: ['B.Com Computer Applications', 'BCA', 'E-Commerce', 'FinTech', 'Business Administration'],
    searchableKeywords: ['commerce', 'computer', 'computer applications', 'CS', 'BCA', 'fintech', 'e-commerce']
  },
  {
    id: 'comm-stats-history',
    stream: 'Commerce',
    groupName: 'Commerce with Statistics / History',
    subjects: ['Commerce', 'Accountancy', 'Economics', 'Statistics', 'History', 'Political Science'],
    careerPaths: ['Financial Analyst', 'Economic Researcher', 'Civil Services', 'B.Com General'],
    searchableKeywords: ['commerce', 'statistics', 'history', 'economics', 'political science', 'general commerce']
  },

  // ================= 3. ARTS & HUMANITIES STREAM =================
  {
    id: 'arts-general',
    stream: 'Arts & Humanities',
    groupName: 'General Arts Group',
    subjects: ['History', 'Geography', 'Economics', 'Political Science'],
    careerPaths: ['Law', 'Civil Services', 'Journalism', 'International Relations'],
    searchableKeywords: ['arts', 'humanities', 'general arts', 'history', 'geography', 'political science', 'law', 'UPSC']
  },
  {
    id: 'arts-lang-lit',
    stream: 'Arts & Humanities',
    groupName: 'Advanced Languages / Literature',
    subjects: ['Advanced Tamil', 'Advanced English', 'History', 'Economics', 'Sociology'],
    careerPaths: ['Journalism', 'Mass Communication', 'Translation', 'Content Creation', 'Teaching'],
    searchableKeywords: ['arts', 'languages', 'literature', 'english', 'tamil', 'advanced languages', 'sociology']
  },
  {
    id: 'arts-social-cs',
    stream: 'Arts & Humanities',
    groupName: 'Social Sciences with Computers',
    subjects: ['History', 'Economics', 'Political Science', 'Computer Applications', 'Statistics'],
    careerPaths: ['Data Analyst', 'Public Policy', 'Digital Media', 'Civil Services'],
    searchableKeywords: ['arts', 'social science', 'computer', 'computer applications', 'CS', 'statistics', 'political science']
  },

  // ================= 4. VOCATIONAL STREAM =================
  {
    id: 'voc-mech',
    stream: 'Vocational',
    groupName: 'Basic Mechanical Engineering',
    subjects: ['Mathematics', 'Basic Mechanical Engineering', 'Engineering Drawing', 'Workshop Technology'],
    careerPaths: ['Mechanical Diploma', 'Automobile Engineering', 'Technical Apprenticeship'],
    searchableKeywords: ['vocational', 'mechanical', 'basic mechanical', 'engineering', 'workshop']
  },
  {
    id: 'voc-elec',
    stream: 'Vocational',
    groupName: 'Basic Electrical Engineering',
    subjects: ['Mathematics', 'Basic Electrical Engineering', 'Electrical Circuits', 'Workshop Practice'],
    careerPaths: ['Electrical Diploma', 'Power Technician', 'Solar Energy Tech'],
    searchableKeywords: ['vocational', 'electrical', 'basic electrical', 'circuits', 'power']
  },
  {
    id: 'voc-civil',
    stream: 'Vocational',
    groupName: 'Basic Civil Engineering',
    subjects: ['Mathematics', 'Basic Civil Engineering', 'Building Construction', 'Surveying'],
    careerPaths: ['Civil Diploma', 'Surveying', 'Construction Management'],
    searchableKeywords: ['vocational', 'civil', 'basic civil', 'construction', 'surveying']
  },
  {
    id: 'voc-auto',
    stream: 'Vocational',
    groupName: 'Basic Automobile Engineering',
    subjects: ['Mathematics', 'Basic Automobile Engineering', 'Auto Engines', 'Vehicle Servicing'],
    careerPaths: ['Auto Tech Diploma', 'Vehicle Inspector', 'EV Technology'],
    searchableKeywords: ['vocational', 'automobile', 'basic automobile', 'auto', 'engine', 'vehicle']
  },
  {
    id: 'voc-comp-office',
    stream: 'Vocational',
    groupName: 'Computer Technology & Office Management',
    subjects: ['Computer Applications', 'Office Automation', 'Desktop Publishing', 'Accounting Software'],
    careerPaths: ['BCA', 'Office Administrator', 'Data Entry Specialist', 'DTP Operator'],
    searchableKeywords: ['vocational', 'computer technology', 'office management', 'automation', 'IT']
  },
  {
    id: 'voc-agri-flori',
    stream: 'Vocational',
    groupName: 'Agricultural Practices & Floriculture',
    subjects: ['Soil Science', 'Crop Production', 'Floriculture', 'Organic Farming'],
    careerPaths: ['B.Sc Agriculture', 'Horticulture', 'Farm Management', 'Agribusiness'],
    searchableKeywords: ['vocational', 'agricultural practices', 'agriculture', 'floriculture', 'farming', 'crops']
  },
  {
    id: 'voc-nursing',
    stream: 'Vocational',
    groupName: 'General Nursing Theory & Practice',
    subjects: ['General Nursing', 'First Aid', 'Community Health', 'Anatomy Basics'],
    careerPaths: ['B.Sc Nursing', 'General Nursing & Midwifery (GNM)', 'Paramedical'],
    searchableKeywords: ['vocational', 'nursing', 'general nursing', 'health', 'medical', 'first aid']
  },
  {
    id: 'voc-food-textile',
    stream: 'Vocational',
    groupName: 'Food Service Management, Nutrition & Textile Designing',
    subjects: ['Food Production', 'Nutrition & Dietetics', 'Textile Design', 'Garment Tech'],
    careerPaths: ['Hotel Management', 'Fashion Design', 'Catering Tech', 'Nutritionist'],
    searchableKeywords: ['vocational', 'food service', 'nutrition', 'textile', 'fashion', 'garment']
  }
];
