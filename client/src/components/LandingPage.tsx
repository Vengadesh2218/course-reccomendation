import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  GraduationCap,
  Award,
  BookCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Bot,
  Layers,
  Search,
  Compass,
  Briefcase,
  TrendingUp,
  BarChart3,
  Check
} from 'lucide-react';
import { Course } from '../types';

import { SearchableStreamSelector } from './SearchableStreamSelector';
import { EXPANDED_12TH_STREAM_GROUPS, StreamGroup } from '../config/expanded12thStreams';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExploreCourses: () => void;
  onOpenAi: () => void;
  sampleCourses: Course[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onExploreCourses,
  onOpenAi,
  sampleCourses
}) => {
  // Education Levels tab selection
  const [selectedLevel, setSelectedLevel] = useState<'10th' | '12th' | 'UG' | 'PG'>('12th');

  // Quick eligibility demo widget state
  const [selectedStreamGroup, setSelectedStreamGroup] = useState<StreamGroup | null>(
    EXPANDED_12TH_STREAM_GROUPS[1] // Default: Group 2 — Computer Science / Engineering Focus
  );
  const [quickHasMaths, setQuickHasMaths] = useState<boolean>(true);
  const [quickTargetCourse, setQuickTargetCourse] = useState('c-ug-btech-cs');

  const selectedCourse = sampleCourses.find((c) => c.id === quickTargetCourse) || sampleCourses[0];

  // Quick eligibility test result
  const testEligibility = () => {
    if (!selectedCourse) return { eligible: false, reason: 'Course not found' };

    const reqMaths = selectedCourse.requiredSubjects?.includes('Mathematics');
    const groupHasMaths = selectedStreamGroup ? selectedStreamGroup.subjects.includes('Mathematics') : quickHasMaths;
    const hasMaths = groupHasMaths && quickHasMaths;

    if (reqMaths && !hasMaths) {
      return {
        eligible: false,
        reason: `❌ Mathematics is a required prerequisite for ${selectedCourse.courseName}. Since your selected 12th group (${selectedStreamGroup?.groupName || 'No Maths'}) does not satisfy Mathematics requirements, you are not eligible for direct admission.`,
        suggestedAlternative: 'BCA (Bachelor of Computer Applications) or B.Sc Cyber Security'
      };
    }
    return {
      eligible: true,
      reason: `✓ You meet the core prerequisite subject requirements for ${selectedCourse.courseName} with ${selectedStreamGroup?.groupName || 'your 12th stream'}!`,
      suggestedAlternative: undefined
    };
  };

  const testResult = testEligibility();

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden bg-[#0b0f19] text-slate-100">
      
      {/* 1. HERO VIDEO SECTION */}
      <section className="relative w-full min-h-[650px] md:min-h-[720px] lg:min-h-[750px] flex items-center justify-center overflow-hidden z-10">
        
        {/* Background Video Element */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={`${import.meta.env.BASE_URL}videos/hero-poster.png`}
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity brightness-90 transition-opacity duration-1000 scale-105"
          >
            <source src={`${import.meta.env.BASE_URL}videos/hero-background.mp4`} type="video/mp4" />
            <source src={`${import.meta.env.BASE_URL}videos/gemini_generated_video_b5678760.mp4`} type="video/mp4" />
            {/* Accessible Fallback image if video fails */}
            <img 
              src={`${import.meta.env.BASE_URL}videos/hero-poster.png`} 
              alt="PathWise AI Academic Guidance" 
              className="w-full h-full object-cover" 
            />
          </video>
          
          {/* Dark Gradient Overlay for optimal readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/70 via-[#0b0f19]/80 to-[#0b0f19]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19]/80 via-transparent to-[#0b0f19]/80" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-xl shadow-indigo-500/10 animate-bounce-subtle">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI-Powered Academic Course Recommendations</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            Your Marks. Your Interests. <span className="text-gradient-primary">Your Future.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-md">
            Discover academic pathways personalized to your marks, subjects, interests and skills.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-base shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group"
            >
              <span>Start My Journey →</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreCourses}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-slate-800/90 text-slate-200 font-semibold text-base border border-slate-700/80 shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <BookCheck className="w-5 h-5 text-sky-400" />
              <span>Explore Courses</span>
            </button>
          </div>

          {/* Academic Pathway Visual Element */}
          <div className="mt-14 inline-block max-w-3xl mx-auto px-6 py-4 rounded-2xl glass-panel border border-indigo-500/25 shadow-2xl backdrop-blur-md">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Academic Pathway
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
              <span className="px-3.5 py-1.5 rounded-xl bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 shadow-sm animate-pulse-glow">
                10th
              </span>
              <span className="text-indigo-400 font-extrabold">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-sky-950/80 text-sky-300 border border-sky-500/40 shadow-sm">
                12th
              </span>
              <span className="text-sky-400 font-extrabold">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-sm">
                UG
              </span>
              <span className="text-amber-400 font-extrabold">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm">
                PG
              </span>
              <span className="text-emerald-400 font-extrabold">→</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-sm">
                Career
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW PATHWISE AI WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
            <Zap className="w-3.5 h-3.5" />
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How PathWise AI Works
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            From entering your marks to unlocking your ideal career roadmap, our intelligence engine guides every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Academic Profile',
              desc: 'Select education level (10th, 12th, UG, PG) and enter subject marks with real-time percentage calculation.',
              icon: GraduationCap,
              color: 'from-indigo-500 to-indigo-700'
            },
            {
              step: '02',
              title: 'Eligibility Check',
              desc: 'Rule-aware engine checks prerequisite subjects (e.g. Maths for B.Tech) and cutoff percentages.',
              icon: ShieldCheck,
              color: 'from-sky-500 to-sky-700'
            },
            {
              step: '03',
              title: 'AI Compatibility',
              desc: 'Calculates 0-100% compatibility scores matching your interests, technical skills, and career goals.',
              icon: Sparkles,
              color: 'from-emerald-500 to-emerald-700'
            },
            {
              step: '04',
              title: 'Career Pathway',
              desc: 'Explore explainable recommendations, entrance exams, PG options, and target job roles.',
              icon: Target,
              color: 'from-purple-500 to-purple-700'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-panel border border-slate-800 hover:border-slate-700 transition-all duration-300 relative group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-700 group-hover:text-slate-500 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EDUCATION LEVELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-3 border border-sky-500/20">
            <Layers className="w-3.5 h-3.5" />
            Comprehensive Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education Levels
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Select your current education stage to see how PathWise AI shapes your academic roadmap.
          </p>
        </div>

        {/* Level Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-slate-800 gap-2">
            {(['10th', '12th', 'UG', 'PG'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-6 py-3 rounded-xl font-bold text-xs transition-all ${
                  selectedLevel === lvl
                    ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {lvl === '10th' && '10th'}
                {lvl === '12th' && '12th'}
                {lvl === 'UG' && 'UG'}
                {lvl === 'PG' && 'PG'}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Level Card */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-indigo-500/30 shadow-2xl relative">
          {selectedLevel === '10th' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                  Stage 1: 10th Completion
                </span>
                <h3 className="text-2xl font-bold text-white mt-4 mb-3">
                  Stream & Subject Group Recommendation
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Not sure whether to choose Science, Commerce, or Arts? PathWise AI evaluates your 10th subject strengths (Maths, Science, Social) and personal interests to recommend the ideal 11th/12th stream.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Pure Science (PCM/PCB) vs Bio-Maths guidance</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Commerce with Computer Applications / Accountancy</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Arts, Humanities & Vocational Skill Streams</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sample 10th Pathway Output</div>
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                  <div className="flex justify-between items-center text-xs font-bold text-indigo-300">
                    <span>Recommended Stream: Science (PCM + CS)</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">96% Match</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    High performance in 10th Maths (92/100) & Science (88/100) coupled with interest in Coding.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedLevel === '12th' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
                  Stage 2: After 12th Standard
                </span>
                <h3 className="text-2xl font-bold text-white mt-4 mb-3">
                  Undergraduate (UG) Degree Selection
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Input individual 12th subject marks (Maths, Physics, Chem, CS, Bio, Commerce) with automatic real-time percentage calculations. Get matched to eligible B.Tech, B.Sc, BCA, B.Com, and Law programs.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Automatic subject prerequisite checking (e.g. Maths for B.Tech CS)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Cutoff score validation & minimum mark thresholds</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Entrance exam alerts (JEE, TNEA, CUET, NEET)</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sample 12th Pathway Output</div>
                <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30">
                  <div className="flex justify-between items-center text-xs font-bold text-sky-300">
                    <span>Primary Choice: B.Tech Artificial Intelligence</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Eligible (94% Score)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Maths: 85/100, Physics: 78/100, CS: 90/100. Meets 60% minimum cutoff requirement.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedLevel === 'UG' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  Stage 3: After UG Graduation
                </span>
                <h3 className="text-2xl font-bold text-white mt-4 mb-3">
                  Postgraduate (PG) & Specialization Guidance
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Transition from your bachelor's degree (B.Tech, B.Sc, BCA, B.Com) into specialized master's programs (M.Tech, MCA, MBA, M.Sc) aligned with market demand.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>GATE, TANCET, CAT, CUET-PG exam requirements</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Interdisciplinary switches (e.g. Non-CS UG to MCA / Data Science)</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sample UG Pathway Output</div>
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30">
                  <div className="flex justify-between items-center text-xs font-bold text-amber-300">
                    <span>Target PG: M.Sc Data Science / MCA</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Eligible (89% Score)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    UG CGPA: 8.2. Strong foundation in Statistics & Programming modules.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedLevel === 'PG' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                  Stage 4: After PG Degree
                </span>
                <h3 className="text-2xl font-bold text-white mt-4 mb-3">
                  Research (Ph.D) & Advanced Career Pathways
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  For master's graduates aiming for high-level industry R&D, academia, or doctorate studies (Ph.D), discover specialized domains and top tech career roles.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>CSIR-NET, GATE, UGC-NET fellowship eligibility</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Principal AI Researcher & Specialized Architect roles</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sample PG Pathway Output</div>
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30">
                  <div className="flex justify-between items-center text-xs font-bold text-purple-300">
                    <span>Target Goal: Ph.D in Machine Intelligence / R&D Lead</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">92% Alignment</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    PG Thesis in NLP & Deep Learning. Suitable for industrial research labs.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. SMART ELIGIBILITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero Guesswork Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Smart Eligibility
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Unlike basic recommendation sites, PathWise AI checks mandatory prerequisites first so you never waste time applying for courses you cannot enter.
          </p>
        </div>

        {/* Live Simulator Widget */}
        <div className="glass-panel p-8 rounded-3xl border border-sky-500/30 shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Live Eligibility Rule Simulator</h3>
              <p className="text-xs text-slate-400">
                Try selecting different 12th subjects to see how our engine handles prerequisites in real time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Searchable 12th Stream Selector */}
            <div className="lg:col-span-2">
              <SearchableStreamSelector
                selectedGroup={selectedStreamGroup}
                onSelectGroup={(grp) => {
                  setSelectedStreamGroup(grp);
                  // Update math flag based on group subjects
                  setQuickHasMaths(grp.subjects.includes('Mathematics'));
                }}
              />
            </div>

            {/* Input 3: Target UG Course */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Check Target Course</label>
              <select
                value={quickTargetCourse}
                onChange={(e) => setQuickTargetCourse(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
              >
                <option value="c-ug-btech-cs">B.Tech Computer Science (Requires Maths)</option>
                <option value="c-ug-bca">BCA (Flexible Prerequisites)</option>
                <option value="c-ug-btech-biotech">B.Tech Biotechnology (Requires Biology)</option>
                <option value="c-ug-bcom-honors">B.Com Honors (Finance)</option>
              </select>
            </div>
          </div>

          {/* Test Result Display Box */}
          <div className="mt-6 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-start gap-3">
              {testResult.eligible ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      testResult.eligible
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {testResult.eligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                  </span>
                  <span className="text-[11px] text-slate-400">Target: {selectedCourse?.courseName}</span>
                </div>

                <p className="mt-2 text-xs text-slate-200 leading-relaxed">{testResult.reason}</p>

                {testResult.suggestedAlternative && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Smart Compatible Alternative: <strong>{testResult.suggestedAlternative}</strong>
                    </span>
                    <button
                      onClick={onStartOnboarding}
                      className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-[11px] border border-amber-500/40"
                    >
                      Apply My Profile →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI COURSE RECOMMENDATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold mb-3 border border-purple-500/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Explainable Scoring Algorithm
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Course Recommendations
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              Explore real academic programs scored on Academic Fit, Subject Alignment, Skill Readiness, and Career Demand.
            </p>
          </div>
          <button
            onClick={onExploreCourses}
            className="px-5 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-xs font-bold text-indigo-300 border border-indigo-500/30 flex items-center gap-2 shrink-0"
          >
            <span>View All Courses</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleCourses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-3xl glass-panel border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-500/30">
                    {course.domain || course.degree}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    <Sparkles className="w-3 h-3" />
                    High Match
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {course.courseName}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-semibold text-slate-200">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Min Cutoff:</span>
                    <span className="font-semibold text-slate-200">{course.minimumMarks}% Marks</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Required:</span>
                    <span className="font-semibold text-indigo-300">
                      {course.requiredSubjects.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onStartOnboarding}
                className="mt-6 w-full py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-xs transition-colors border border-slate-800 hover:border-indigo-500 flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                <span>Check My Match Score</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ACADEMIC PATHWAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/20">
            <Compass className="w-3.5 h-3.5" />
            End-to-End Visual Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Pathway
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            PathWise AI maps out your complete journey from high school choices to top-tier industry career goals.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-indigo-500/20 shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            {[
              {
                stage: 'Step 1: 10th Marks',
                title: 'Stream Selection',
                desc: 'PCM, PCB, Commerce, Arts alignment based on interest & aptitude.',
                icon: GraduationCap,
                color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
              },
              {
                stage: 'Step 2: 12th Marks',
                title: 'Subject Performance',
                desc: 'Real-time percentage calculation & mandatory prerequisite validation.',
                icon: BookCheck,
                color: 'text-sky-400 border-sky-500/30 bg-sky-500/10'
              },
              {
                stage: 'Step 3: UG Admission',
                title: 'Degree Program',
                desc: 'Top eligible B.Tech, BCA, B.Sc, B.Com courses with cutoff checks.',
                icon: ShieldCheck,
                color: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
              },
              {
                stage: 'Step 4: PG Degree',
                title: 'Specialization',
                desc: 'Master degrees (M.Tech, MCA, MBA) & GATE/CAT entrance prep.',
                icon: Award,
                color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
              },
              {
                stage: 'Step 5: Future Goal',
                title: 'Target Career Role',
                desc: 'AI Specialist, Software Architect, Financial Analyst, Data Scientist.',
                icon: Target,
                color: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
              }
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col items-center justify-between text-left group"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${step.color} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {step.stage}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI ADVISOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 relative z-10">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/30">
              <Bot className="w-4 h-4 text-sky-400" />
              AI Advisor
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Have questions about your academic pathway?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ask our rule-aware AI advisor about stream prerequisites, PG pathways, subject choices, or why you match specific degree programs.
            </p>
          </div>

          <button
            onClick={onOpenAi}
            className="px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/30 transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2"
          >
            <span>Ask AI Advisor Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 relative z-10">
        <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-r from-indigo-900 via-sky-900 to-emerald-900 text-center relative overflow-hidden shadow-2xl border border-indigo-500/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Ready to Discover Your Ideal Academic Path?
            </h2>
            <p className="mt-4 text-slate-200 text-base sm:text-lg">
              Calculate your marks, check subject prerequisites, and receive explainable AI course recommendations in less than 2 minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartOnboarding}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-950 font-extrabold text-base shadow-2xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span>Start My Journey Now</span>
                <ArrowRight className="w-5 h-5 text-indigo-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
