export type EducationLevel = 'COMPLETED_10TH' | 'COMPLETED_12TH' | 'UG_STUDENT' | 'PG_STUDENT';

export interface SubjectRequirement {
  subject: string;
  minMark: number;
}

export interface Course {
  id: string;
  courseName: string;
  degree: string;
  level: EducationLevel;
  domain: string;
  duration: string;
  acceptedStreams: string[];
  requiredSubjects: string[];
  minimumMarks: number;
  subjectRequirements: SubjectRequirement[];
  skills: string[];
  interests: string[];
  careerAreas: string[];
  eligiblePreviousQualifications: string[];
  pgPathways: string[];
  additionalRequirements: string;
  description: string;
  isPopular?: boolean;
}

export interface StudentProfile {
  id?: string;
  name: string;
  email: string;
  educationLevel: EducationLevel;
  
  // 10th Details
  overall10thPercentage?: number;
  subjectMarks10th?: Record<string, number>;
  favoriteSubjects10th?: string[];

  // 12th Details
  stream12th?: string;
  subjectsStudied12th?: string[];
  subjectMarks12th?: Record<string, number>;
  totalObtained12thMarks?: number;
  totalMax12thMarks?: number;
  overall12thPercentage?: number;

  // UG Details
  ugDegree?: string;
  ugSpecialization?: string;
  ugPercentage?: number;
  ugSubjects?: string[];

  // PG Details
  pgDegree?: string;
  pgSpecialization?: string;
  pgPercentage?: number;

  // Profiling
  interests: string[];
  skills: Record<string, number>; // skill name -> rating (1-5)
  careerGoals: string[];
  preferredDomains: string[];
}

export type EligibilityStatus = 'ELIGIBLE' | 'PARTIALLY_COMPATIBLE' | 'NOT_ELIGIBLE';

export interface EligibilityDetail {
  status: EligibilityStatus;
  reasons: string[];
  passedPrerequisites: string[];
  missingPrerequisites: string[];
  missingMinMarks: boolean;
}

export interface CompatibilityBreakdown {
  academicMatch: number; // 0-100
  subjectMatch: number;
  interestMatch: number;
  skillMatch: number;
  careerMatch: number;
}

export interface RecommendedCourse {
  course: Course;
  eligibility: EligibilityDetail;
  compatibilityScore: number; // 0-100 %
  breakdown: CompatibilityBreakdown;
  whyRecommended: string[];
  thingsToVerify: string[];
  alternativeSuggestions?: string[];
  isAddedToPath?: boolean;
}

export interface RecommendationResponse {
  studentProfile: StudentProfile;
  academicPathway: {
    currentStep: string;
    nextMilestone: string;
    pathwayChain: string[];
  };
  topCompatible: RecommendedCourse[];
  otherEligible: RecommendedCourse[];
  coursesRequiringPrerequisites: RecommendedCourse[];
  notEligibleCourses: RecommendedCourse[];
  futurePathways: RecommendedCourse[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN';
  passwordHash: string;
  createdAt: string;
  profile?: StudentProfile;
}
