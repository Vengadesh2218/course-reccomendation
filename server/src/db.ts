import fs from 'fs';
import path from 'path';
import { Course, User, StudentProfile } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const COURSES_FILE = path.join(DATA_DIR, 'courses.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const INITIAL_COURSES: Course[] = [
  // ================= 10TH MODULE COURSES / STREAMS =================
  {
    id: 'c-10-sci-cs',
    courseName: '11th/12th Science with Computer Science Stream',
    degree: 'Higher Secondary (11th & 12th)',
    level: 'COMPLETED_10TH',
    domain: 'Computer Science & STEM',
    duration: '2 Years',
    acceptedStreams: ['10th Pass'],
    requiredSubjects: ['Mathematics', 'Science'],
    minimumMarks: 60,
    subjectRequirements: [
      { subject: 'Mathematics', minMark: 60 },
      { subject: 'Science', minMark: 60 }
    ],
    skills: ['Mathematics', 'Logical Thinking', 'Problem Solving', 'Computer Skills'],
    interests: ['Technology', 'Programming', 'Artificial Intelligence', 'Engineering'],
    careerAreas: ['Software Engineer', 'Data Scientist', 'AI Engineer', 'System Architect'],
    eligiblePreviousQualifications: ['Completed 10th'],
    pgPathways: ['B.Tech Computer Science', 'B.Sc Computer Science', 'BCA', 'B.Tech AI & DS'],
    additionalRequirements: 'Strong aptitude in algebra and physics recommended.',
    description: 'Designed for students aiming for technology, engineering, software development, and AI careers post 12th.',
    isPopular: true
  },
  {
    id: 'c-10-sci-bio',
    courseName: '11th/12th Bio-Mathematics / Pure Science Stream',
    degree: 'Higher Secondary (11th & 12th)',
    level: 'COMPLETED_10TH',
    domain: 'Healthcare & Bio-Science',
    duration: '2 Years',
    acceptedStreams: ['10th Pass'],
    requiredSubjects: ['Science', 'Mathematics'],
    minimumMarks: 60,
    subjectRequirements: [
      { subject: 'Science', minMark: 65 }
    ],
    skills: ['Research', 'Mathematics', 'Problem Solving', 'Data Analysis'],
    interests: ['Medicine', 'Science', 'Research', 'Biotechnology'],
    careerAreas: ['Doctor / Physician', 'Biomedical Engineer', 'Pharmacist', 'Research Scientist'],
    eligiblePreviousQualifications: ['Completed 10th'],
    pgPathways: ['MBBS', 'B.Tech Biotechnology', 'B.Sc Nursing', 'B.Pharm'],
    additionalRequirements: 'Requires strong dedication to biological sciences and chemistry.',
    description: 'Ideal pathway for medicine, healthcare, biotechnology, neuroscience, and medical research.',
    isPopular: true
  },
  {
    id: 'c-10-comm-math',
    courseName: '11th/12th Commerce with Mathematics Stream',
    degree: 'Higher Secondary (11th & 12th)',
    level: 'COMPLETED_10TH',
    domain: 'Commerce & Finance',
    duration: '2 Years',
    acceptedStreams: ['10th Pass'],
    requiredSubjects: ['Mathematics'],
    minimumMarks: 55,
    subjectRequirements: [
      { subject: 'Mathematics', minMark: 55 }
    ],
    skills: ['Mathematics', 'Business Skills', 'Logical Thinking', 'Data Analysis'],
    interests: ['Business', 'Finance', 'Data', 'Management'],
    careerAreas: ['Chartered Accountant', 'Financial Analyst', 'Investment Banker', 'Actuary'],
    eligiblePreviousQualifications: ['Completed 10th'],
    pgPathways: ['B.Com Honors', 'BBA', 'B.Sc Data Analytics', 'CA Foundation'],
    additionalRequirements: 'Keen interest in business trends, financial markets, and numerical reasoning.',
    description: 'Blends financial accounting with quantitative mathematics for finance and business leadership.',
    isPopular: true
  },
  {
    id: 'c-10-comm-cs',
    courseName: '11th/12th Commerce with Computer Applications Stream',
    degree: 'Higher Secondary (11th & 12th)',
    level: 'COMPLETED_10TH',
    domain: 'Commerce & IT',
    duration: '2 Years',
    acceptedStreams: ['10th Pass'],
    requiredSubjects: ['English'],
    minimumMarks: 50,
    subjectRequirements: [],
    skills: ['Computer Skills', 'Business Skills', 'Communication'],
    interests: ['Business', 'Technology', 'Finance', 'Cloud Computing'],
    careerAreas: ['FinTech Analyst', 'E-Commerce Manager', 'Business Analyst', 'BCA Graduate'],
    eligiblePreviousQualifications: ['Completed 10th'],
    pgPathways: ['BCA', 'B.Com Computer Applications', 'BBA IT', 'B.Des UI/UX'],
    additionalRequirements: 'Great foundation for modern digital commerce, e-business, and tech-driven business administration.',
    description: 'Prepares students for modern tech-enabled business management, FinTech, and BCA applications.'
  },
  {
    id: 'c-10-arts-hum',
    courseName: '11th/12th Humanities & Social Sciences Stream',
    degree: 'Higher Secondary (11th & 12th)',
    level: 'COMPLETED_10TH',
    domain: 'Arts & Media',
    duration: '2 Years',
    acceptedStreams: ['10th Pass'],
    requiredSubjects: ['English', 'Social Science'],
    minimumMarks: 50,
    subjectRequirements: [],
    skills: ['Writing', 'Communication', 'Presentation', 'Creativity'],
    interests: ['Arts', 'Media', 'Design', 'Social Sciences', 'Education'],
    careerAreas: ['Journalist', 'Clinical Psychologist', 'UI/UX Designer', 'Civil Servant / IAS'],
    eligiblePreviousQualifications: ['Completed 10th'],
    pgPathways: ['B.A Psychology', 'B.Des UI/UX', 'B.A Journalism', 'LL.B Law'],
    additionalRequirements: 'Focus on analytical writing, history, political science, and psychology.',
    description: 'Perfect stream for law, psychology, journalism, public policy, fine arts, and digital design.'
  },

  // ================= 12TH MODULE COURSES (UG) =================
  {
    id: 'c-ug-btech-cs',
    courseName: 'B.Tech in Computer Science & Engineering',
    degree: 'B.Tech',
    level: 'COMPLETED_12TH',
    domain: 'Computer Science & IT',
    duration: '4 Years',
    acceptedStreams: ['Computer Science + Mathematics', 'Biology + Mathematics', 'Pure Science'],
    requiredSubjects: ['Mathematics', 'Physics', 'Chemistry'],
    minimumMarks: 60,
    subjectRequirements: [
      { subject: 'Mathematics', minMark: 60 },
      { subject: 'Physics', minMark: 55 }
    ],
    skills: ['Programming', 'Problem Solving', 'Mathematics', 'Logical Thinking'],
    interests: ['Technology', 'Programming', 'Artificial Intelligence', 'Cybersecurity', 'Engineering'],
    careerAreas: ['Full Stack Developer', 'Software Architect', 'Cloud Engineer', 'DevOps Specialist'],
    eligiblePreviousQualifications: ['Completed 12th Science with Mathematics'],
    pgPathways: ['M.Tech CS', 'MCA', 'M.Sc Data Science', 'MS in CS', 'MBA IT'],
    additionalRequirements: 'Entrance exam scores (JEE / State Entrance / University Exam) required by most universities.',
    description: 'Comprehensive 4-year engineering program covering algorithms, software architecture, cloud, web engines, and systems.',
    isPopular: true
  },
  {
    id: 'c-ug-btech-ai',
    courseName: 'B.Tech in Artificial Intelligence & Data Science',
    degree: 'B.Tech',
    level: 'COMPLETED_12TH',
    domain: 'Data Science & AI',
    duration: '4 Years',
    acceptedStreams: ['Computer Science + Mathematics', 'Biology + Mathematics', 'Pure Science'],
    requiredSubjects: ['Mathematics', 'Physics'],
    minimumMarks: 60,
    subjectRequirements: [
      { subject: 'Mathematics', minMark: 65 }
    ],
    skills: ['Mathematics', 'Data Analysis', 'Programming', 'Logical Thinking', 'Problem Solving'],
    interests: ['Artificial Intelligence', 'Data', 'Technology', 'Programming', 'Research'],
    careerAreas: ['AI Engineer', 'Machine Learning Developer', 'Data Scientist', 'BI Architect'],
    eligiblePreviousQualifications: ['Completed 12th Science with Mathematics'],
    pgPathways: ['M.Sc Artificial Intelligence', 'M.Tech AI', 'M.Sc Data Science', 'Ph.D in AI'],
    additionalRequirements: 'Requires strong foundation in calculus, linear algebra, and Python programming aptitude.',
    description: 'Specialized 4-year engineering program focused on neural networks, machine learning models, big data pipelines, and intelligent systems.',
    isPopular: true
  },
  {
    id: 'c-ug-bsc-cs',
    courseName: 'B.Sc in Computer Science',
    degree: 'B.Sc',
    level: 'COMPLETED_12TH',
    domain: 'Computer Science & IT',
    duration: '3 Years',
    acceptedStreams: ['Computer Science + Mathematics', 'Biology + Mathematics', 'Pure Science'],
    requiredSubjects: ['Mathematics'],
    minimumMarks: 50,
    subjectRequirements: [
      { subject: 'Mathematics', minMark: 50 }
    ],
    skills: ['Programming', 'Logical Thinking', 'Problem Solving', 'Computer Skills'],
    interests: ['Technology', 'Programming', 'Cybersecurity', 'Cloud Computing'],
    careerAreas: ['Software Developer', 'Web Developer', 'System Administrator', 'Database Administrator'],
    eligiblePreviousQualifications: ['Completed 12th with Mathematics'],
    pgPathways: ['M.Sc Computer Science', 'MCA', 'M.Sc Data Science', 'M.Sc Information Technology'],
    additionalRequirements: 'Focuses on fundamental computer science principles, database management, and programming languages.',
    description: '3-year undergraduate degree building fundamental concepts in computer systems, object-oriented programming, networks, and software engineering.',
    isPopular: true
  },
  {
    id: 'c-ug-bca',
    courseName: 'BCA (Bachelor of Computer Applications)',
    degree: 'BCA',
    level: 'COMPLETED_12TH',
    domain: 'Computer Science & IT',
    duration: '3 Years',
    acceptedStreams: [
      'Computer Science + Mathematics',
      'Computer Science + Biology',
      'Biology + Mathematics',
      'Commerce + Computer Applications',
      'Commerce',
      'Pure Science',
      'Vocational'
    ],
    requiredSubjects: [],
    minimumMarks: 45,
    subjectRequirements: [],
    skills: ['Programming', 'Computer Skills', 'Problem Solving', 'Communication'],
    interests: ['Technology', 'Programming', 'Business', 'Cloud Computing'],
    careerAreas: ['Application Developer', 'Web Developer', 'QA Automation Engineer', 'IT Support Manager'],
    eligiblePreviousQualifications: ['Completed 12th (Science / Commerce with CS/Maths/English)'],
    pgPathways: ['MCA', 'M.Sc Computer Science', 'M.Sc Data Analytics', 'MBA IT'],
    additionalRequirements: 'Highly accessible professional degree for students with CS, Maths, or Commerce CS backgrounds.',
    description: 'Applied computing degree focusing on web technologies, mobile app development, software tools, and software project management.',
    isPopular: true
  },
  {
    id: 'c-ug-bsc-cyber',
    courseName: 'B.Sc in Cyber Security & Digital Forensics',
    degree: 'B.Sc',
    level: 'COMPLETED_12TH',
    domain: 'Computer Science & IT',
    duration: '3 Years',
    acceptedStreams: ['Computer Science + Mathematics', 'Computer Science + Biology', 'Pure Science'],
    requiredSubjects: ['Computer Science'],
    minimumMarks: 50,
    subjectRequirements: [],
    skills: ['Problem Solving', 'Logical Thinking', 'Computer Skills', 'Research'],
    interests: ['Cybersecurity', 'Technology', 'Programming'],
    careerAreas: ['Ethical Hacker', 'Cyber Defense Analyst', 'Digital Forensics Specialist', 'Security Auditor'],
    eligiblePreviousQualifications: ['Completed 12th with CS / Maths'],
    pgPathways: ['M.Sc Cyber Security', 'MCA', 'M.Sc Information Security'],
    additionalRequirements: 'Hands-on focus on network security, ethical hacking tools, cryptography, and threat analysis.',
    description: '3-year degree preparing students to protect digital infrastructure, investigate cyber crime, and build defensive security measures.'
  },
  {
    id: 'c-ug-btech-biotech',
    courseName: 'B.Tech in Biotechnology',
    degree: 'B.Tech',
    level: 'COMPLETED_12TH',
    domain: 'Healthcare & Bio-Science',
    duration: '4 Years',
    acceptedStreams: ['Biology + Mathematics', 'Computer Science + Biology', 'Pure Science', 'Biology'],
    requiredSubjects: ['Biology', 'Chemistry'],
    minimumMarks: 55,
    subjectRequirements: [
      { subject: 'Biology', minMark: 55 },
      { subject: 'Chemistry', minMark: 50 }
    ],
    skills: ['Research', 'Data Analysis', 'Problem Solving', 'Logical Thinking'],
    interests: ['Science', 'Medicine', 'Research', 'Biotechnology'],
    careerAreas: ['Biotech Researcher', 'Geneticist', 'Bioinformatics Scientist', 'Quality Manager'],
    eligiblePreviousQualifications: ['Completed 12th Science with Biology & Chemistry'],
    pgPathways: ['M.Sc Biotechnology', 'M.Tech Biotech', 'Ph.D in Life Sciences', 'M.Sc Bioinformatics'],
    additionalRequirements: 'Combines biology, genetics, chemical engineering, and molecular computing.',
    description: '4-year engineering application of biological systems for medical therapies, agriculture, genetic engineering, and bio-manufacturing.'
  },
  {
    id: 'c-ug-mbbs',
    courseName: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
    degree: 'MBBS',
    level: 'COMPLETED_12TH',
    domain: 'Healthcare & Bio-Science',
    duration: '5.5 Years',
    acceptedStreams: ['Biology + Mathematics', 'Computer Science + Biology', 'Pure Science', 'Biology'],
    requiredSubjects: ['Biology', 'Physics', 'Chemistry'],
    minimumMarks: 60,
    subjectRequirements: [
      { subject: 'Biology', minMark: 60 },
      { subject: 'Physics', minMark: 55 },
      { subject: 'Chemistry', minMark: 55 }
    ],
    skills: ['Problem Solving', 'Communication', 'Research', 'Leadership'],
    interests: ['Medicine', 'Science', 'Research'],
    careerAreas: ['Physician', 'Surgeon', 'Medical Specialist', 'Clinical Researcher'],
    eligiblePreviousQualifications: ['Completed 12th Science with Physics, Chemistry, Biology'],
    pgPathways: ['MD (Doctor of Medicine)', 'MS (Master of Surgery)', 'DNB Specialization'],
    additionalRequirements: 'Mandatory qualification in National Entrance Exams (e.g. NEET UG).',
    description: 'Premier medical degree program for practicing physicians, surgeons, and clinical medical experts.'
  },
  {
    id: 'c-ug-bcom-honors',
    courseName: 'B.Com (Honors) in Finance & Accounting',
    degree: 'B.Com',
    level: 'COMPLETED_12TH',
    domain: 'Commerce & Finance',
    duration: '3 Years',
    acceptedStreams: ['Commerce', 'Commerce + Mathematics', 'Commerce + Computer Applications', 'Computer Science + Mathematics'],
    requiredSubjects: ['Commerce/Accountancy'],
    minimumMarks: 50,
    subjectRequirements: [],
    skills: ['Mathematics', 'Business Skills', 'Data Analysis', 'Presentation'],
    interests: ['Finance', 'Business', 'Management'],
    careerAreas: ['Financial Analyst', 'Auditor', 'Corporate Tax Advisor', 'Investment Associate'],
    eligiblePreviousQualifications: ['Completed 12th Commerce or Science with Maths'],
    pgPathways: ['M.Com', 'MBA Finance', 'CA / CFA / ACCA Certification'],
    additionalRequirements: 'In-depth corporate finance, taxation rules, financial modeling, and auditing principles.',
    description: '3-year specialized business degree in corporate accounting, financial planning, banking, and tax laws.'
  },
  {
    id: 'c-ug-bba',
    courseName: 'BBA (Bachelor of Business Administration)',
    degree: 'BBA',
    level: 'COMPLETED_12TH',
    domain: 'Commerce & Finance',
    duration: '3 Years',
    acceptedStreams: [
      'Commerce',
      'Commerce + Computer Applications',
      'Computer Science + Mathematics',
      'Humanities',
      'Pure Science',
      'Vocational'
    ],
    requiredSubjects: ['English'],
    minimumMarks: 45,
    subjectRequirements: [],
    skills: ['Leadership', 'Communication', 'Business Skills', 'Presentation'],
    interests: ['Business', 'Management', 'Finance', 'Data'],
    careerAreas: ['Business Operations Lead', 'Marketing Manager', 'HR Consultant', 'Product Associate'],
    eligiblePreviousQualifications: ['Completed 12th in any stream'],
    pgPathways: ['MBA', 'M.Sc Management', 'PGDM in Business Analytics'],
    additionalRequirements: 'Focuses on strategic management, organizational behavior, marketing, and leadership case studies.',
    description: '3-year professional management degree cultivating corporate leadership, strategic thinking, marketing, and operations management.'
  },
  {
    id: 'c-ug-ba-psych',
    courseName: 'B.A / B.Sc in Psychology',
    degree: 'B.A / B.Sc',
    level: 'COMPLETED_12TH',
    domain: 'Arts & Media',
    duration: '3 Years',
    acceptedStreams: ['Humanities', 'Biology + Mathematics', 'Computer Science + Biology', 'Commerce', 'Pure Science'],
    requiredSubjects: ['English'],
    minimumMarks: 45,
    subjectRequirements: [],
    skills: ['Communication', 'Research', 'Writing', 'Problem Solving'],
    interests: ['Arts', 'Social Sciences', 'Research', 'Education', 'Medicine'],
    careerAreas: ['Clinical Psychologist', 'HR Talent Specialist', 'Cognitive Researcher', 'Counselor'],
    eligiblePreviousQualifications: ['Completed 12th in any stream'],
    pgPathways: ['M.A Clinical Psychology', 'M.Sc Neuropsychology', 'MSW', 'MBA HR'],
    additionalRequirements: 'Explores cognitive science, behavioral patterns, mental health diagnostics, and human counseling.',
    description: '3-year foundational program in human behavior, brain function, cognitive processes, and counseling methodologies.'
  },
  {
    id: 'c-ug-bdes-uiux',
    courseName: 'B.Des in UI/UX & Digital Product Design',
    degree: 'B.Des',
    level: 'COMPLETED_12TH',
    domain: 'Arts & Media',
    duration: '4 Years',
    acceptedStreams: [
      'Humanities',
      'Commerce + Computer Applications',
      'Computer Science + Mathematics',
      'Pure Science',
      'Vocational'
    ],
    requiredSubjects: ['English'],
    minimumMarks: 45,
    subjectRequirements: [],
    skills: ['Drawing/Design', 'Creativity', 'Computer Skills', 'Problem Solving', 'Communication'],
    interests: ['Design', 'Arts', 'Technology', 'Programming'],
    careerAreas: ['UI/UX Designer', 'Product Designer', 'Design Systems Architect', 'User Researcher'],
    eligiblePreviousQualifications: ['Completed 12th in any stream'],
    pgPathways: ['M.Des Interaction Design', 'M.Des Product Design', 'MBA Design Management'],
    additionalRequirements: 'Design aptitude exam / portfolio evaluation standard for admission.',
    description: '4-year professional design degree covering human-computer interaction, wireframing, design systems, and digital product experience.'
  },
  {
    id: 'c-ug-bsc-data',
    courseName: 'B.Sc in Data Analytics & Applied Statistics',
    degree: 'B.Sc',
    level: 'COMPLETED_12TH',
    domain: 'Data Science & AI',
    duration: '3 Years',
    acceptedStreams: ['Computer Science + Mathematics', 'Biology + Mathematics', 'Commerce + Mathematics', 'Pure Science'],
    requiredSubjects: ['Mathematics'],
    minimumMarks: 50,
    subjectRequirements: [
      { subject: 'Mathematics', minMark: 50 }
    ],
    skills: ['Mathematics', 'Data Analysis', 'Logical Thinking', 'Programming'],
    interests: ['Data', 'Technology', 'Finance', 'Artificial Intelligence'],
    careerAreas: ['Data Analyst', 'Business Intelligence Analyst', 'Risk Modeling Analyst', 'Statistician'],
    eligiblePreviousQualifications: ['Completed 12th with Mathematics'],
    pgPathways: ['M.Sc Data Science', 'M.Sc Statistics', 'MCA', 'MBA Business Analytics'],
    additionalRequirements: 'Covers linear algebra, probability models, SQL database querying, Python R statistics.',
    description: '3-year mathematical and computational degree turning complex raw datasets into actionable strategic intelligence.'
  },

  // ================= UG TO PG MODULE COURSES (PG) =================
  {
    id: 'c-pg-mca',
    courseName: 'MCA (Master of Computer Applications)',
    degree: 'MCA',
    level: 'UG_STUDENT',
    domain: 'Computer Science & IT',
    duration: '2 Years',
    acceptedStreams: ['B.Sc Computer Science', 'BCA', 'B.Tech CS/IT', 'B.Sc Mathematics', 'B.Sc Physics', 'B.Com with Maths'],
    requiredSubjects: [],
    minimumMarks: 50,
    subjectRequirements: [],
    skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Computer Skills'],
    interests: ['Technology', 'Programming', 'Cloud Computing', 'Cybersecurity', 'Artificial Intelligence'],
    careerAreas: ['Senior Software Engineer', 'Solutions Architect', 'Full Stack Tech Lead', 'DevOps Manager'],
    eligiblePreviousQualifications: ['BCA', 'B.Sc CS', 'B.Tech', 'UG Degree with Mathematics at 12th/UG Level'],
    pgPathways: ['Ph.D in Computer Science', 'Post-Graduate Diploma in Cloud Architecture'],
    additionalRequirements: 'NIMCET or State MCA Entrance exam score usually evaluated.',
    description: '2-year post-graduate degree advancing enterprise software architecture, full-stack frameworks, cloud deployment, and system security.',
    isPopular: true
  },
  {
    id: 'c-pg-msc-cs',
    courseName: 'M.Sc in Computer Science',
    degree: 'M.Sc',
    level: 'UG_STUDENT',
    domain: 'Computer Science & IT',
    duration: '2 Years',
    acceptedStreams: ['B.Sc Computer Science', 'BCA', 'B.Tech CS/IT'],
    requiredSubjects: [],
    minimumMarks: 50,
    subjectRequirements: [],
    skills: ['Programming', 'Research', 'Logical Thinking', 'Problem Solving'],
    interests: ['Technology', 'Programming', 'Research', 'Artificial Intelligence'],
    careerAreas: ['Research Scientist', 'Algorithms Engineer', 'System Programmer', 'Lead Developer'],
    eligiblePreviousQualifications: ['B.Sc CS', 'BCA', 'B.Tech Computer Science'],
    pgPathways: ['Ph.D in Computer Science', 'Post-Doc Research'],
    additionalRequirements: 'Advanced study of computational theory, algorithm complexity, parallel computing, and distributed systems.',
    description: '2-year academic research and advanced computing master degree specializing in deep computer science theory and software development.'
  },
  {
    id: 'c-pg-msc-ds-ai',
    courseName: 'M.Sc in Artificial Intelligence & Data Science',
    degree: 'M.Sc',
    level: 'UG_STUDENT',
    domain: 'Data Science & AI',
    duration: '2 Years',
    acceptedStreams: ['B.Sc Computer Science', 'BCA', 'B.Tech CS/IT', 'B.Sc Mathematics', 'B.Sc Data Analytics', 'B.Sc Statistics'],
    requiredSubjects: [],
    minimumMarks: 55,
    subjectRequirements: [],
    skills: ['Mathematics', 'Data Analysis', 'Programming', 'Logical Thinking', 'Research'],
    interests: ['Artificial Intelligence', 'Data', 'Technology', 'Programming', 'Research'],
    careerAreas: ['Lead Data Scientist', 'AI Research Scientist', 'NLP Architect', 'Computer Vision Specialist'],
    eligiblePreviousQualifications: ['B.Sc CS', 'BCA', 'B.Sc Maths/Stats', 'B.Tech'],
    pgPathways: ['Ph.D in AI & Machine Learning', 'Executive AI Strategy'],
    additionalRequirements: 'Prerequisites in matrix linear algebra, Python ML libraries (PyTorch/TensorFlow), and statistics.',
    description: '2-year cutting-edge master program covering deep neural networks, natural language processing, LLM architectures, and big data intelligence.',
    isPopular: true
  },
  {
    id: 'c-pg-mba-analytics',
    courseName: 'MBA in Business Analytics & Digital Transformation',
    degree: 'MBA',
    level: 'UG_STUDENT',
    domain: 'Commerce & Finance',
    duration: '2 Years',
    acceptedStreams: ['All UG Degrees (B.Tech, B.Sc, BCA, B.Com, BBA, B.A)'],
    requiredSubjects: [],
    minimumMarks: 50,
    subjectRequirements: [],
    skills: ['Business Skills', 'Data Analysis', 'Leadership', 'Communication', 'Presentation'],
    interests: ['Business', 'Data', 'Management', 'Technology', 'Finance'],
    careerAreas: ['Management Consultant', 'Director of Analytics', 'Product Manager', 'Business Strategy Lead'],
    eligiblePreviousQualifications: ['Any recognized Bachelor Degree'],
    pgPathways: ['Executive Leadership in Data Strategy', 'Ph.D in Management'],
    additionalRequirements: 'CAT / XAT / MAT / GMAT score + personal interview.',
    description: '2-year business leadership program bridging data analytics with executive corporate management and strategic decisions.',
    isPopular: true
  },
  {
    id: 'c-pg-msc-biotech',
    courseName: 'M.Sc in Advanced Biotechnology',
    degree: 'M.Sc',
    level: 'UG_STUDENT',
    domain: 'Healthcare & Bio-Science',
    duration: '2 Years',
    acceptedStreams: ['B.Tech Biotechnology', 'B.Sc Bio', 'B.Sc Chemistry', 'B.Sc Microbiology'],
    requiredSubjects: [],
    minimumMarks: 55,
    subjectRequirements: [],
    skills: ['Research', 'Data Analysis', 'Problem Solving'],
    interests: ['Science', 'Medicine', 'Research', 'Biotechnology'],
    careerAreas: ['Senior Biotech Research Scientist', 'Pharma R&D Director', 'Genomics Lead'],
    eligiblePreviousQualifications: ['B.Sc / B.Tech in Life Sciences, Biotechnology, or Bio-chemistry'],
    pgPathways: ['Ph.D in Biotechnology', 'Clinical Research Fellowship'],
    additionalRequirements: 'Lab research dissertation component included.',
    description: '2-year master degree in molecular biology, gene editing (CRISPR), biopharmaceuticals, and bio-industrial research.'
  },
  {
    id: 'c-pg-ma-psych',
    courseName: 'M.A in Clinical & Cognitive Psychology',
    degree: 'M.A',
    level: 'UG_STUDENT',
    domain: 'Arts & Media',
    duration: '2 Years',
    acceptedStreams: ['B.A Psychology', 'B.Sc Psychology', 'MBBS'],
    requiredSubjects: [],
    minimumMarks: 50,
    subjectRequirements: [],
    skills: ['Communication', 'Research', 'Writing', 'Problem Solving'],
    interests: ['Arts', 'Social Sciences', 'Research', 'Medicine'],
    careerAreas: ['Licensed Clinical Psychologist', 'Hospital Neuropsychologist', 'Corporate Wellness Director'],
    eligiblePreviousQualifications: ['B.A / B.Sc in Psychology'],
    pgPathways: ['Ph.D in Clinical Psychology', 'M.Phil Clinical Psychology'],
    additionalRequirements: 'Supervised clinical internship hours required during degree.',
    description: '2-year specialized clinical master degree in psychological diagnostics, psychotherapy, neuro-behavioral evaluation, and mental healthcare.'
  },

  // ================= PG TO HIGHER STUDIES / SPECIALIZATIONS =================
  {
    id: 'c-phd-cs-ai',
    courseName: 'Ph.D. in Computer Science & Artificial Intelligence',
    degree: 'Ph.D.',
    level: 'PG_STUDENT',
    domain: 'Computer Science & IT',
    duration: '3 - 5 Years',
    acceptedStreams: ['MCA', 'M.Sc CS', 'M.Sc AI', 'M.Tech CS'],
    requiredSubjects: [],
    minimumMarks: 60,
    subjectRequirements: [],
    skills: ['Research', 'Programming', 'Mathematics', 'Writing', 'Logical Thinking'],
    interests: ['Research', 'Artificial Intelligence', 'Technology', 'Education'],
    careerAreas: ['University Professor', 'Principal AI Scientist', 'Head of AI Research Lab'],
    eligiblePreviousQualifications: ['Master Degree in CS / AI / Data Science / Tech'],
    pgPathways: ['Post-Doctoral Fellowship', 'Industrial Research Chair'],
    additionalRequirements: 'Research proposal submission and peer-reviewed journal publications required.',
    description: 'Highest academic research degree dedicated to pushing boundaries in computer science, machine learning models, autonomous systems, and foundational AI algorithms.'
  },
  {
    id: 'c-pgd-cloud-devops',
    courseName: 'Post-Graduate Executive Diploma in Cloud Architecture & DevOps',
    degree: 'PG Diploma',
    level: 'PG_STUDENT',
    domain: 'Computer Science & IT',
    duration: '1 Year',
    acceptedStreams: ['MCA', 'M.Sc CS', 'M.Tech', 'B.Tech CS with work exp'],
    requiredSubjects: [],
    minimumMarks: 50,
    subjectRequirements: [],
    skills: ['Programming', 'Problem Solving', 'Computer Skills', 'Leadership'],
    interests: ['Cloud Computing', 'Technology', 'Cybersecurity'],
    careerAreas: ['Principal Cloud Architect', 'VP of Infrastructure', 'DevOps Director'],
    eligiblePreviousQualifications: ['PG Degree in IT/CS or Engineering Degree with 2+ yrs experience'],
    pgPathways: ['Executive CISO Certification', 'CTO Leadership Track'],
    additionalRequirements: 'Hands-on AWS / Azure / GCP enterprise Kubernetes deployment capstone project.',
    description: '1-year post-graduate executive diploma focused on high-scale cloud infrastructure, zero-trust security, microservices architecture, and CI/CD pipelines.'
  }
];

export class Database {
  private courses: Course[] = [];
  private users: User[] = [];
  private analytics: Record<string, any> = {
    totalRecommendations: 0,
    levelCounts: { COMPLETED_10TH: 0, COMPLETED_12TH: 0, UG_STUDENT: 0, PG_STUDENT: 0 },
    topRecommendedCourses: {},
    topInterests: {},
    topSkills: {}
  };

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      if (fs.existsSync(COURSES_FILE)) {
        const raw = fs.readFileSync(COURSES_FILE, 'utf-8');
        this.courses = JSON.parse(raw);
      } else {
        this.courses = INITIAL_COURSES;
        this.saveCourses();
      }

      if (fs.existsSync(USERS_FILE)) {
        const raw = fs.readFileSync(USERS_FILE, 'utf-8');
        this.users = JSON.parse(raw);
      } else {
        this.users = [
          {
            id: 'u-admin-1',
            name: 'PathWise Administrator',
            email: 'admin@pathwise.ai',
            role: 'ADMIN',
            passwordHash: 'admin123',
            createdAt: new Date().toISOString()
          },
          {
            id: 'u-student-demo',
            name: 'Alex Rivera',
            email: 'alex@example.com',
            role: 'STUDENT',
            passwordHash: 'student123',
            createdAt: new Date().toISOString(),
            profile: {
              name: 'Alex Rivera',
              email: 'alex@example.com',
              educationLevel: 'COMPLETED_12TH',
              stream12th: 'Computer Science + Mathematics',
              subjectsStudied12th: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'English'],
              overall12thPercentage: 88,
              subjectMarks12th: {
                'Computer Science': 94,
                Mathematics: 85,
                Physics: 82,
                Chemistry: 80,
                English: 90
              },
              interests: ['Technology', 'Programming', 'Artificial Intelligence'],
              skills: { Programming: 5, 'Logical Thinking': 4, 'Problem Solving': 4, Mathematics: 4 },
              careerGoals: ['Software Engineer', 'AI Engineer'],
              preferredDomains: ['Computer Science & IT', 'Data Science & AI']
            }
          }
        ];
        this.saveUsers();
      }

      if (fs.existsSync(ANALYTICS_FILE)) {
        const raw = fs.readFileSync(ANALYTICS_FILE, 'utf-8');
        this.analytics = JSON.parse(raw);
      } else {
        this.saveAnalytics();
      }
    } catch (err) {
      console.error('Error loading DB files, falling back to defaults:', err);
      this.courses = INITIAL_COURSES;
    }
  }

  public saveCourses() {
    fs.writeFileSync(COURSES_FILE, JSON.stringify(this.courses, null, 2));
  }

  public saveUsers() {
    fs.writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2));
  }

  public saveAnalytics() {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(this.analytics, null, 2));
  }

  public getAllCourses(): Course[] {
    return this.courses;
  }

  public getCourseById(id: string): Course | undefined {
    return this.courses.find((c) => c.id === id);
  }

  public addCourse(course: Course): Course {
    this.courses.unshift(course);
    this.saveCourses();
    return course;
  }

  public updateCourse(id: string, updated: Partial<Course>): Course | undefined {
    const idx = this.courses.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    this.courses[idx] = { ...this.courses[idx], ...updated };
    this.saveCourses();
    return this.courses[idx];
  }

  public deleteCourse(id: string): boolean {
    const initialLen = this.courses.length;
    this.courses = this.courses.filter((c) => c.id !== id);
    if (this.courses.length !== initialLen) {
      this.saveCourses();
      return true;
    }
    return false;
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  public getStudents(): User[] {
    return this.users.filter((u) => u.role === 'STUDENT');
  }

  public createUser(user: User): User {
    this.users.push(user);
    this.saveUsers();
    return user;
  }

  public updateUserProfile(userId: string, profile: StudentProfile): User | undefined {
    const user = this.getUserById(userId);
    if (!user) return undefined;
    user.profile = profile;
    this.saveUsers();
    return user;
  }

  public recordRecommendationEvent(profile: StudentProfile, topCourses: string[]) {
    this.analytics.totalRecommendations += 1;
    
    if (profile.educationLevel) {
      this.analytics.levelCounts[profile.educationLevel] =
        (this.analytics.levelCounts[profile.educationLevel] || 0) + 1;
    }

    topCourses.forEach((cName) => {
      this.analytics.topRecommendedCourses[cName] =
        (this.analytics.topRecommendedCourses[cName] || 0) + 1;
    });

    profile.interests.forEach((interest) => {
      this.analytics.topInterests[interest] =
        (this.analytics.topInterests[interest] || 0) + 1;
    });

    Object.keys(profile.skills || {}).forEach((skill) => {
      this.analytics.topSkills[skill] = (this.analytics.topSkills[skill] || 0) + 1;
    });

    this.saveAnalytics();
  }

  public getAnalytics() {
    return {
      ...this.analytics,
      totalUsers: this.users.length,
      totalStudents: this.users.filter((u) => u.role === 'STUDENT').length,
      totalCourses: this.courses.length
    };
  }
}

export const db = new Database();
