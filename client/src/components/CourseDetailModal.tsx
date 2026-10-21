import React from 'react';
import { X, CheckCircle2, XCircle, AlertTriangle, Sparkles, BookOpen, Layers, Target, Award, ShieldCheck } from 'lucide-react';
import { RecommendedCourse } from '../types';

interface CourseDetailModalProps {
  rec: RecommendedCourse | null;
  onClose: () => void;
  onToggleCompare: (id: string) => void;
  isCompared: boolean;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  rec,
  onClose,
  onToggleCompare,
  isCompared
}) => {
  if (!rec) return null;

  const { course, eligibility, compatibilityScore, breakdown, whyRecommended, thingsToVerify, alternativeSuggestions } = rec;
  const isEligible = eligibility.status === 'ELIGIBLE';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl space-y-6 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {course.degree}
            </span>
            <span className="text-xs text-slate-400">{course.domain} • {course.duration}</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white">{course.courseName}</h2>
          <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>
        </div>

        {/* Eligibility Status Box */}
        <div
          className={`p-4 rounded-2xl border text-xs space-y-2 ${
            isEligible
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          }`}
        >
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-2 text-sm">
              {isEligible ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400" />
              )}
              {isEligible ? 'Passed Rule-Based Eligibility Check' : 'Ineligible Under Current Eligibility Rules'}
            </span>
            {isEligible && <span className="text-emerald-300 text-sm font-black">{compatibilityScore}% Match Score</span>}
          </div>

          {!isEligible && (
            <div className="pl-7 space-y-1">
              <span className="font-semibold block text-rose-300">Failure Reasons:</span>
              {eligibility.reasons.map((r, idx) => (
                <p key={idx} className="text-rose-200">
                  • {r}
                </p>
              ))}

              {alternativeSuggestions && alternativeSuggestions.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                  <strong>Suggested Alternative Route:</strong> {alternativeSuggestions[0]}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Prerequisite Checklist */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Course Prerequisites & Minimum Thresholds
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Required Subjects:</span>
              <div className="flex flex-wrap gap-1.5">
                {course.requiredSubjects && course.requiredSubjects.length > 0 ? (
                  course.requiredSubjects.map((sub) => {
                    const passed = eligibility.passedPrerequisites.includes(sub);
                    return (
                      <span
                        key={sub}
                        className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 text-[11px] ${
                          passed
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {passed ? '✓ ' : '❌ '} {sub}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-slate-400">Open Prerequisite Standard</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">Minimum Overall Aggregate:</span>
              <span className="font-bold text-white text-xs">{course.minimumMarks}% Minimum Aggregate</span>
            </div>
          </div>
        </div>

        {/* Explainable AI: Why Recommended & Things to Verify */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Why Recommended
            </h4>
            <ul className="space-y-1 text-slate-300">
              {whyRecommended.map((w, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Things to Verify Before Admission
            </h4>
            <ul className="space-y-1 text-slate-300">
              {thingsToVerify.map((v, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PG Pathways & Career Opportunities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sky-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Eligible PG Pathways
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {course.pgPathways.map((pg) => (
                <span key={pg} className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/30 font-semibold">
                  {pg}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-purple-400 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              Target Career Roles
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {course.careerAreas.map((ca) => (
                <span key={ca} className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30 font-semibold">
                  {ca}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => onToggleCompare(course.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all border ${
              isCompared
                ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {isCompared ? '✓ Added to Comparison Matrix' : '+ Add to Course Comparison'}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
