import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  Sliders,
  Target,
  Brain,
  Check,
  AlertCircle
} from 'lucide-react';
import { StudentProfile, EducationLevel } from '../types';
import { STREAM_SUBJECTS_CONFIG, getSubjectsForStream, DEFAULT_STREAM } from '../config/streamSubjects';
import { CareerDirectionSelector } from './CareerDirectionSelector';
import { SearchableInterestSelector } from './SearchableInterestSelector';

interface OnboardingFlowProps {
  initialProfile?: StudentProfile | null;
  onComplete: (profile: StudentProfile) => void;
}

const INTEREST_CATEGORIES = [
  'Technology',
  'Programming',
  'Artificial Intelligence',
  'Data',
  'Science',
  'Medicine',
  'Business',
  'Finance',
  'Design',
  'Arts',
  'Media',
  'Education',
  'Research',
  'Engineering',
  'Cybersecurity',
  'Cloud Computing',
  'Management',
  'Social Sciences'
];

const SKILL_LIST = [
  'Programming',
  'Problem Solving',
  'Mathematics',
  'Communication',
  'Creativity',
  'Leadership',
  'Data Analysis',
  'Drawing/Design',
  'Research',
  'Logical Thinking',
  'Computer Skills'
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ initialProfile, onComplete }) => {
  const [step, setStep] = useState(1);
  const [, setIsAnalyzing] = useState(false);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);

  // Profile Form State
  const [name, setName] = useState(initialProfile?.name || '');
  const [email, setEmail] = useState(initialProfile?.email || '');
  const [educationLevel, setEducationLevel] = useState<EducationLevel>(
    initialProfile?.educationLevel || 'COMPLETED_12TH'
  );

  // 10th
  const [overall10th, setOverall10th] = useState<number>(initialProfile?.overall10thPercentage || 82);
  const [marks10th, setMarks10th] = useState<Record<string, number>>(
    initialProfile?.subjectMarks10th || { Mathematics: 85, Science: 80, English: 88, 'Social Science': 78 }
  );

  // 12th Stream & Subject Performance
  const [stream12th, setStream12th] = useState<string>(
    initialProfile?.stream12th || DEFAULT_STREAM
  );

  // Raw inputs for 12th subject marks (allows empty state & real-time typing)
  const [subjectRawMarks12th, setSubjectRawMarks12th] = useState<Record<string, string>>(() => {
    const subjects = getSubjectsForStream(initialProfile?.stream12th || DEFAULT_STREAM);
    const map: Record<string, string> = {};
    subjects.forEach((sub) => {
      if (initialProfile?.subjectMarks12th && initialProfile.subjectMarks12th[sub] !== undefined) {
        map[sub] = String(initialProfile.subjectMarks12th[sub]);
      } else {
        // Initial defaults for demo
        const defaults: Record<string, string> = {
          Mathematics: '85',
          Physics: '78',
          Chemistry: '82',
          'Computer Science': '90',
          Biology: '84',
          English: '88',
          'Commerce/Accountancy': '90',
          'Business Studies': '85',
          Economics: '82'
        };
        map[sub] = defaults[sub] || '80';
      }
    });
    return map;
  });

  // UG
  const [ugDegree, setUgDegree] = useState(initialProfile?.ugDegree || 'B.Sc Computer Science');
  const [ugPercentage, setUgPercentage] = useState<number>(initialProfile?.ugPercentage || 78);
  const [ugSubjects] = useState<string[]>(
    initialProfile?.ugSubjects || ['Data Structures', 'Java', 'Database Systems', 'Operating Systems']
  );

  // PG
  const [pgDegree, setPgDegree] = useState(initialProfile?.pgDegree || 'MCA');
  const [pgPercentage, setPgPercentage] = useState<number>(initialProfile?.pgPercentage || 80);

  // Profiling
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialProfile?.interests || ['Technology', 'Programming', 'Artificial Intelligence']
  );
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>(
    initialProfile?.skills || {
      Programming: 4,
      'Logical Thinking': 4,
      'Problem Solving': 4,
      Mathematics: 3,
      'Computer Skills': 5
    }
  );
  const [careerGoals, setCareerGoals] = useState<string[]>(
    initialProfile?.careerGoals || ['Software Engineer', 'AI Developer']
  );
  const [preferredDomains] = useState<string[]>(
    initialProfile?.preferredDomains || ['Computer Science & IT', 'Data Science & AI']
  );

  // ================= 12TH CALCULATOR & STATS HELPER =================
  const currentStreamSubjects = getSubjectsForStream(stream12th);

  const calculate12thStats = () => {
    let hasEmpty = false;
    let hasInvalid = false;
    let totalObtained = 0;
    const validMarksMap: Record<string, number> = {};
    const subjectValidationErrors: Record<string, string> = {};

    let highestSubject: { name: string; mark: number } | null = null;
    let lowestSubject: { name: string; mark: number } | null = null;

    for (const sub of currentStreamSubjects) {
      const rawVal = subjectRawMarks12th[sub];
      if (rawVal === undefined || rawVal === null || rawVal.trim() === '') {
        hasEmpty = true;
        continue;
      }

      const num = Number(rawVal);
      if (isNaN(num) || num < 0 || num > 100) {
        hasInvalid = true;
        subjectValidationErrors[sub] = 'Marks must be between 0 and 100.';
        continue;
      }

      validMarksMap[sub] = num;
      totalObtained += num;

      if (!highestSubject || num > highestSubject.mark) {
        highestSubject = { name: sub, mark: num };
      }
      if (!lowestSubject || num < lowestSubject.mark) {
        lowestSubject = { name: sub, mark: num };
      }
    }

    const totalMax = currentStreamSubjects.length * 100;
    const isComplete =
      !hasEmpty &&
      !hasInvalid &&
      Object.keys(validMarksMap).length === currentStreamSubjects.length;

    let overallPct: number | null = null;
    let performanceCategory = 'Pending';
    let performanceBadgeColor = 'bg-slate-800 text-slate-400';

    if (isComplete) {
      overallPct = Math.round((totalObtained / totalMax) * 10000) / 100;

      if (overallPct >= 90) {
        performanceCategory = 'Outstanding';
        performanceBadgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      } else if (overallPct >= 80) {
        performanceCategory = 'Excellent';
        performanceBadgeColor = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      } else if (overallPct >= 70) {
        performanceCategory = 'Good';
        performanceBadgeColor = 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      } else if (overallPct >= 60) {
        performanceCategory = 'Satisfactory';
        performanceBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      } else {
        performanceCategory = 'Needs Improvement';
        performanceBadgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      }
    }

    return {
      currentStreamSubjects,
      validMarksMap,
      subjectValidationErrors,
      hasEmpty,
      hasInvalid,
      isComplete,
      totalObtained,
      totalMax,
      overallPct,
      highestSubject,
      lowestSubject,
      performanceCategory,
      performanceBadgeColor
    };
  };

  // Handlers
  const handleStream12thChange = (newStream: string) => {
    setStream12th(newStream);
    const newSubjects = getSubjectsForStream(newStream);
    const newRawMap: Record<string, string> = {};

    newSubjects.forEach((sub) => {
      if (subjectRawMarks12th[sub] !== undefined) {
        newRawMap[sub] = subjectRawMarks12th[sub];
      } else {
        newRawMap[sub] = '';
      }
    });

    setSubjectRawMarks12th(newRawMap);
  };

  const handleSubjectMarkChange = (sub: string, val: string) => {
    setSubjectRawMarks12th((prev) => ({
      ...prev,
      [sub]: val
    }));
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const updateSkillRating = (skill: string, rating: number) => {
    setSkillRatings({ ...skillRatings, [skill]: rating });
  };

  const handleNext = () => {
    // Validate 12th Marks before proceeding from Step 3 if level is COMPLETED_12TH
    if (step === 3 && educationLevel === 'COMPLETED_12TH') {
      const stats = calculate12thStats();
      if (!stats.isComplete) {
        if (stats.hasInvalid) {
          alert('Please fix invalid subject marks (must be between 0 and 100) before proceeding.');
          return;
        }
        if (stats.hasEmpty) {
          alert('Please complete marks for all required subjects in your 12th stream before proceeding.');
          return;
        }
      }
    }

    if (step === 7) {
      const stats12th = calculate12thStats();

      setIsAnalyzing(true);
      setStep(8);
      const stepsList = [
        'Validating Academic Eligibility Rules...',
        'Evaluating Prerequisite Subject Alignment...',
        'Matching Rating Profiles & Skills...',
        'Computing Hybrid Compatibility Score...'
      ];

      stepsList.forEach((_, idx) => {
        setTimeout(() => {
          setAnalysisStepIndex(idx);
        }, idx * 600);
      });

      setTimeout(() => {
        setIsAnalyzing(false);
        const finalProfile: StudentProfile = {
          name: name || 'Student Profile',
          email: email || 'student@example.com',
          educationLevel,
          overall10thPercentage: overall10th,
          subjectMarks10th: marks10th,
          favoriteSubjects10th: Object.keys(marks10th),

          stream12th,
          subjectsStudied12th: stats12th.currentStreamSubjects,
          subjectMarks12th: stats12th.validMarksMap,
          totalObtained12thMarks: stats12th.totalObtained,
          totalMax12thMarks: stats12th.totalMax,
          overall12thPercentage: stats12th.overallPct || 0,

          ugDegree,
          ugPercentage,
          ugSubjects,

          pgDegree,
          pgPercentage,

          interests: selectedInterests,
          skills: skillRatings,
          careerGoals,
          preferredDomains
        };
        onComplete(finalProfile);
      }, 2600);
      return;
    }

    setStep(step + 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Step Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>STEP {step} OF 8</span>
          <span>{Math.round((step / 8) * 100)}% COMPLETED</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${(step / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Card Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-indigo-500/20 shadow-2xl relative">
        {/* STEP 1: Basic Profile */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Student Information</h2>
                <p className="text-xs text-slate-400">Let's create your academic profile to personalize your recommendations.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Education Level Selector */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">What is your current education level?</h2>
                <p className="text-xs text-slate-400">PathWise AI will adapt form inputs specifically to your level.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: 'COMPLETED_10TH',
                  title: 'Completed 10th',
                  desc: 'Looking for 11th & 12th stream recommendations (Science, Commerce, Arts, Vocational).'
                },
                {
                  id: 'COMPLETED_12TH',
                  title: 'Completed 12th',
                  desc: 'Looking for eligible Undergraduate (UG) degrees (B.Tech, B.Sc, BCA, B.Com, BBA, B.Des).'
                },
                {
                  id: 'UG_STUDENT',
                  title: 'UG Student / UG Completed',
                  desc: 'Looking for Postgraduate (PG) degrees & specializations (MCA, M.Sc, MBA, M.Tech).'
                },
                {
                  id: 'PG_STUDENT',
                  title: 'PG Student / PG Completed',
                  desc: 'Looking for Ph.D. research programs, executive diplomas, & advanced leadership tracks.'
                }
              ].map((lvl) => (
                <div
                  key={lvl.id}
                  onClick={() => setEducationLevel(lvl.id as EducationLevel)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between ${
                    educationLevel === lvl.id
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">{lvl.title}</span>
                    {educationLevel === lvl.id && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{lvl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Academic Marks & Dynamic Subject Details */}
        {step === 3 && (
          <div className="space-y-6">
            {educationLevel === 'COMPLETED_10TH' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">10th Grade Marks & Performance</h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Overall 10th Percentage (%)</label>
                  <input
                    type="number"
                    min="35"
                    max="100"
                    value={overall10th}
                    onChange={(e) => setOverall10th(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Mathematics', 'Science', 'English', 'Social Science'].map((sub) => (
                    <div key={sub}>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">{sub} Mark</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marks10th[sub] || 75}
                        onChange={(e) => setMarks10th({ ...marks10th, [sub]: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educationLevel === 'COMPLETED_12TH' && (() => {
              const stats = calculate12thStats();

              return (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">12th Stream & Subject Performance</h2>
                      <p className="text-xs text-slate-400">
                        Select your 12th stream and enter your subject marks. Overall percentage is calculated automatically in real time.
                      </p>
                    </div>
                  </div>

                  {/* 1. Stream Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select 12th Group / Stream</label>
                    <select
                      value={stream12th}
                      onChange={(e) => handleStream12thChange(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-indigo-500"
                    >
                      {Object.keys(STREAM_SUBJECTS_CONFIG).map((stName) => (
                        <option key={stName} value={stName}>
                          {stName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Subject Marks Input Fields (Dynamic per stream) */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">
                      Subject Marks Obtained (Max: 100 per subject)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {stats.currentStreamSubjects.map((sub) => {
                        const rawVal = subjectRawMarks12th[sub] ?? '';
                        const errorMsg = stats.subjectValidationErrors[sub];
                        const hasError = !!errorMsg;

                        return (
                          <div
                            key={sub}
                            className={`p-4 rounded-2xl bg-slate-900/90 border transition-all ${
                              hasError
                                ? 'border-rose-500 shadow-md shadow-rose-500/10'
                                : rawVal.trim() !== ''
                                ? 'border-indigo-500/40 bg-slate-900'
                                : 'border-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-sm text-white">{sub}</span>
                              <span className="text-[11px] font-semibold text-slate-400">Max: 100</span>
                            </div>

                            <div className="relative flex items-center">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                step="any"
                                value={rawVal}
                                onChange={(e) => handleSubjectMarkChange(sub, e.target.value)}
                                placeholder="e.g. 85"
                                className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm font-bold text-white focus:outline-none transition-all ${
                                  hasError
                                    ? 'border-rose-500 focus:border-rose-400 text-rose-200'
                                    : 'border-slate-700 focus:border-indigo-500'
                                }`}
                              />
                              <span className="absolute right-3 text-xs font-bold text-slate-400">/ 100</span>
                            </div>

                            {hasError && (
                              <p className="mt-1.5 text-[11px] font-semibold text-rose-400 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>{errorMsg}</span>
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Prominent Visual Overall Performance Card */}
                  <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Overall 12th Performance
                      </span>

                      {stats.isComplete ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${stats.performanceBadgeColor}`}>
                          {stats.performanceCategory}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                          Calculation Pending
                        </span>
                      )}
                    </div>

                    {/* Big Percentage Display & Animated Bar */}
                    <div className="text-center py-2 space-y-3">
                      <div className="text-4xl sm:text-5xl font-black tracking-tight">
                        {stats.isComplete && stats.overallPct !== null ? (
                          <span className="text-gradient-primary">{stats.overallPct.toFixed(2)}%</span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </div>

                      {/* Smooth Animated Progress Bar */}
                      <div className="w-full max-w-md mx-auto h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-500"
                          style={{ width: `${stats.isComplete && stats.overallPct !== null ? stats.overallPct : 0}%` }}
                        />
                      </div>

                      <div className="text-xs font-bold text-slate-300">
                        {stats.isComplete ? (
                          <span>{stats.totalObtained} / {stats.totalMax} Total Marks</span>
                        ) : stats.hasInvalid ? (
                          <span className="text-rose-400">Fix invalid subject marks (must be between 0 and 100) to calculate overall percentage.</span>
                        ) : (
                          <span className="text-slate-400">Complete all subject marks to calculate overall percentage.</span>
                        )}
                      </div>
                    </div>

                    {/* Performance Summary Breakdown */}
                    {stats.isComplete && stats.highestSubject && stats.lowestSubject && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">Strongest Subject</span>
                          <div className="font-extrabold text-sm text-white">{stats.highestSubject.name}</div>
                          <div className="text-xs font-bold text-emerald-300 mt-0.5">{stats.highestSubject.mark}% Marks</div>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                          <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">Lowest Subject</span>
                          <div className="font-extrabold text-sm text-white">{stats.lowestSubject.name}</div>
                          <div className="text-xs font-bold text-amber-300 mt-0.5">{stats.lowestSubject.mark}% Marks</div>
                        </div>

                        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200">
                          <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-0.5">Academic Performance</span>
                          <div className="font-extrabold text-sm text-white">{stats.performanceCategory}</div>
                          <div className="text-xs font-bold text-indigo-300 mt-0.5">{stats.overallPct?.toFixed(2)}% Aggregate</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {!stats.currentStreamSubjects.includes('Mathematics') && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>
                        Notice: Your stream ({stream12th}) does not include Mathematics. Engineering programs requiring Mathematics will be marked ❌ Not Eligible, and compatible alternatives (BCA, B.Sc Cyber Security) will be highlighted.
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            {educationLevel === 'UG_STUDENT' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Undergraduate (UG) Degree Details</h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">UG Degree Name</label>
                  <select
                    value={ugDegree}
                    onChange={(e) => setUgDegree(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
                  >
                    <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                    <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                    <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                    <option value="B.Com Honors">B.Com Honors</option>
                    <option value="BBA">BBA</option>
                    <option value="B.A Psychology">B.A Psychology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">UG Overall Aggregate (%)</label>
                  <input
                    type="number"
                    min="40"
                    max="100"
                    value={ugPercentage}
                    onChange={(e) => setUgPercentage(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>
            )}

            {educationLevel === 'PG_STUDENT' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Postgraduate (PG) Degree Details</h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">PG Degree Name</label>
                  <input
                    type="text"
                    value={pgDegree}
                    onChange={(e) => setPgDegree(e.target.value)}
                    placeholder="e.g. MCA or M.Sc CS"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">PG Overall Aggregate (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={pgPercentage}
                    onChange={(e) => setPgPercentage(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Validation Summary */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Academic Summary Check</h2>
                <p className="text-xs text-slate-400">Review your profile inputs before proceeding to skill & interest profiling.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Education Level:</span>
                <span className="font-bold text-white">{educationLevel}</span>
              </div>
              {educationLevel === 'COMPLETED_12TH' && (() => {
                const stats = calculate12thStats();
                return (
                  <>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">12th Stream:</span>
                      <span className="font-bold text-indigo-400">{stream12th}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Calculated Aggregate:</span>
                      <span className="font-bold text-emerald-400">
                        {stats.isComplete && stats.overallPct !== null ? `${stats.overallPct.toFixed(2)}% (${stats.totalObtained}/${stats.totalMax})` : 'Incomplete'}
                      </span>
                    </div>
                    <div className="text-xs pt-2 border-t border-slate-800">
                      <span className="text-slate-400 block mb-1.5">Verified Subject Marks:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {stats.currentStreamSubjects.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px]">
                            {s}: {subjectRawMarks12th[s] || '0'} / 100
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* STEP 5: Searchable Academic Interest Selection */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Select Your Academic Interests</h2>
                <p className="text-xs text-slate-400">Search and select categories that excite you for personalized score matching.</p>
              </div>
            </div>

            <SearchableInterestSelector
              selectedInterests={selectedInterests}
              onChange={(updated) => setSelectedInterests(updated)}
            />
          </div>
        )}

        {/* STEP 6: Interactive Skill Rating Sliders */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Rate Your Skills</h2>
                <p className="text-xs text-slate-400">Rate your proficiency from 1 (Beginner) to 5 (Expert).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_LIST.map((skill) => {
                const rating = skillRatings[skill] || 3;
                return (
                  <div key={skill} className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <div className="flex justify-between items-center text-xs font-semibold text-white mb-2">
                      <span>{skill}</span>
                      <span className="text-indigo-400">{rating} / 5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => updateSkillRating(skill, Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 7: Target Career Goals & Domains */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Career Vision & Preferred Directions</h2>
                <p className="text-xs text-slate-400">Search, select, or type custom career goals across all fields to personalize your recommendations.</p>
              </div>
            </div>

            <CareerDirectionSelector
              selectedCareers={careerGoals}
              onChange={(updated) => setCareerGoals(updated)}
            />
          </div>
        )}

        {/* STEP 8: Recommendation Engine Analysis Screen */}
        {step === 8 && (
          <div className="py-12 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <Brain className="w-8 h-8 text-indigo-400 animate-pulse" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Evaluating PathWise AI Engine</h2>
              <p className="text-xs text-slate-400 mt-1">Applying 2-Layer Eligibility & Personalized Match Rules...</p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-2 text-xs">
              {[
                '✓ Checking 12th stream & prerequisite subject constraints...',
                '✓ Validating minimum marks thresholds (Maths, Science)...',
                '✓ Calculating Jaccard similarity across interest profiles...',
                '✓ Computing hybrid 0-100% compatibility breakdown...'
              ].map((st, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 transition-opacity ${
                    analysisStepIndex >= idx ? 'opacity-100 text-emerald-400 font-medium' : 'opacity-30 text-slate-500'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        {step < 8 && (
          <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl glass-panel text-slate-300 font-semibold text-xs hover:bg-slate-800 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>{step === 7 ? 'Run PathWise AI Recommendation Engine' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
