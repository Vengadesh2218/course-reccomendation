import React from 'react';
import {
  User as UserIcon,
  GraduationCap,
  Award,
  Sparkles,
  Sliders,
  Target,
  ArrowRight,
  CheckCircle2,
  Layers,
  BookOpen
} from 'lucide-react';
import { StudentProfile, RecommendationResponse } from '../types';

interface StudentDashboardProps {
  profile: StudentProfile;
  recommendationData: RecommendationResponse | null;
  onNavigateToRecs: () => void;
  onNavigateToPathway: () => void;
  onOpenAi: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  recommendationData,
  onNavigateToRecs,
  onNavigateToPathway,
  onOpenAi
}) => {
  const topCourse = recommendationData?.topCompatible[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Welcome Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 p-0.5 shadow-xl shadow-indigo-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-sky-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{profile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {profile.educationLevel.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {profile.stream12th ? `12th Stream: ${profile.stream12th}` : profile.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onNavigateToRecs}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Recommendations ({recommendationData?.topCompatible.length || 0})</span>
            </button>

            <button
              onClick={onNavigateToPathway}
              className="px-5 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-all"
            >
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Pathway Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Cards Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Academic Strength */}
        <div className="p-6 rounded-3xl glass-panel border border-indigo-500/20 glass-panel-hover space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Academic Strength</h3>
            </div>
            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {profile.overall12thPercentage !== undefined
                ? `${profile.overall12thPercentage.toFixed(2)}%`
                : `${profile.overall10thPercentage || 80}%`} Aggregate
            </span>
          </div>

          {profile.totalObtained12thMarks && profile.totalMax12thMarks && (
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex justify-between font-bold text-slate-300">
              <span>Total Marks:</span>
              <span className="text-indigo-300">{profile.totalObtained12thMarks} / {profile.totalMax12thMarks}</span>
            </div>
          )}

          <div className="space-y-2 text-xs">
            {profile.subjectMarks12th ? (
              Object.entries(profile.subjectMarks12th).map(([sub, mark]) => (
                <div key={sub} className="flex justify-between items-center p-2 rounded-lg bg-slate-900/80">
                  <span className="text-slate-300 font-medium">{sub}</span>
                  <span className="font-bold text-indigo-300">{mark} / 100</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-xs">Overall academic performance logged.</p>
            )}
          </div>
        </div>

        {/* Card 2: Top Compatible Recommendation Preview */}
        <div className="p-6 rounded-3xl glass-panel border border-emerald-500/30 glass-panel-hover space-y-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">#1 Match Pathway</h3>
            </div>
            {topCourse && (
              <span className="text-xs font-extrabold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40">
                {topCourse.compatibilityScore}% Compatible
              </span>
            )}
          </div>

          {topCourse ? (
            <div className="space-y-3">
              <div>
                <h4 className="font-extrabold text-lg text-white">{topCourse.course.courseName}</h4>
                <p className="text-xs text-slate-400">{topCourse.course.degree} • {topCourse.course.duration}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                <span className="text-emerald-400 font-semibold block mb-1">✓ Key Reason:</span>
                {topCourse.whyRecommended[0] || 'Matches your subject background and interests.'}
              </div>

              <button
                onClick={onNavigateToRecs}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <span>View Course Details & Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400">Complete onboarding assessment to see top recommendation.</div>
          )}
        </div>

        {/* Card 3: Interest Profile */}
        <div className="p-6 rounded-3xl glass-panel border border-amber-500/20 glass-panel-hover space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Interest Profile</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Card 4: Rated Skill Profile */}
        <div className="p-6 rounded-3xl glass-panel border border-purple-500/20 glass-panel-hover space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Top Rated Skills</h3>
          </div>

          <div className="space-y-2 text-xs">
            {Object.entries(profile.skills || {}).map(([sk, val]) => (
              <div key={sk} className="space-y-1">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>{sk}</span>
                  <span className="text-purple-400">{val} / 5</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-400"
                    style={{ width: `${(val / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5: Target Career Direction */}
        <div className="p-6 rounded-3xl glass-panel border border-rose-500/20 glass-panel-hover space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Career Direction</h3>
          </div>

          <div className="space-y-2">
            {profile.careerGoals.map((cg) => (
              <div key={cg} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                <span>{cg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Academic Pathway Timeline */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Your Academic Pathway Timeline</h3>
            <p className="text-xs text-slate-400">Step-by-step roadmap calculated for your qualifications.</p>
          </div>
          <button
            onClick={onNavigateToPathway}
            className="text-xs font-semibold text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Full Node Diagram →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {[
            { step: '10th Completion', status: '✓ Completed', highlight: false },
            {
              step: profile.stream12th || '12th Stream',
              status: `✓ ${profile.overall12thPercentage || 80}% Aggregate`,
              highlight: true
            },
            {
              step: topCourse ? topCourse.course.courseName : 'Eligible UG Course',
              status: topCourse ? `Top Match (${topCourse.compatibilityScore}%)` : 'Pending Match',
              highlight: true
            },
            {
              step: topCourse?.course.pgPathways[0] || 'Eligible PG Pathway',
              status: 'Future Specialization',
              highlight: false
            }
          ].map((pt, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center space-y-2 ${
                pt.highlight
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="text-xs font-bold">{pt.step}</div>
              <div className="text-[11px] text-slate-400">{pt.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
