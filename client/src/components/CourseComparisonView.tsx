import React from 'react';
import { X, CheckCircle2, XCircle, AlertTriangle, Layers, BookOpen, Trash2 } from 'lucide-react';
import { RecommendedCourse } from '../types';

interface CourseComparisonViewProps {
  selectedRecs: RecommendedCourse[];
  onRemoveFromCompare: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const CourseComparisonView: React.FC<CourseComparisonViewProps> = ({
  selectedRecs,
  onRemoveFromCompare,
  onClearAll,
  onClose
}) => {
  if (selectedRecs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">No Courses Selected for Comparison</h2>
        <p className="text-xs text-slate-400">Click "+ Compare" on any course card to add it to your matrix.</p>
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
        >
          Return to Recommendations
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Side-by-Side Course Comparison Matrix</h1>
          <p className="text-xs text-slate-400">
            Comparing {selectedRecs.length} selected program{selectedRecs.length > 1 ? 's' : ''} across eligibility, scores, prerequisites, and PG pathways.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClearAll}
            className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            Clear Comparison
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl glass-panel hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold"
          >
            Close Matrix
          </button>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="glass-panel rounded-3xl border border-indigo-500/20 overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-xs">
              <th className="p-4 font-bold text-slate-400 w-48">Feature Comparison</th>
              {selectedRecs.map((rec) => (
                <th key={rec.course.id} className="p-4 font-bold text-white border-l border-slate-800 relative">
                  <button
                    onClick={() => onRemoveFromCompare(rec.course.id)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-slate-800"
                    title="Remove course"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="text-indigo-400 text-[10px] uppercase font-semibold">{rec.course.degree}</div>
                  <div className="font-extrabold text-sm text-white pr-6">{rec.course.courseName}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs">
            {/* Row 1: Eligibility Status */}
            <tr className="hover:bg-slate-900/40">
              <td className="p-4 font-bold text-slate-300">Eligibility Status</td>
              {selectedRecs.map((rec) => {
                const isEligible = rec.eligibility.status === 'ELIGIBLE';
                return (
                  <td key={rec.course.id} className="p-4 border-l border-slate-800">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                        isEligible
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {isEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isEligible ? 'Eligible' : 'Not Eligible'}
                    </span>
                  </td>
                );
              })}
            </tr>

            {/* Row 2: Compatibility Score */}
            <tr className="hover:bg-slate-900/40">
              <td className="p-4 font-bold text-slate-300">Compatibility Score</td>
              {selectedRecs.map((rec) => (
                <td key={rec.course.id} className="p-4 border-l border-slate-800 font-extrabold text-sm text-sky-400">
                  {rec.compatibilityScore}% Match
                </td>
              ))}
            </tr>

            {/* Row 3: Duration & Domain */}
            <tr className="hover:bg-slate-900/40">
              <td className="p-4 font-bold text-slate-300">Duration & Domain</td>
              {selectedRecs.map((rec) => (
                <td key={rec.course.id} className="p-4 border-l border-slate-800 text-slate-300">
                  <div>{rec.course.duration}</div>
                  <div className="text-[10px] text-slate-400">{rec.course.domain}</div>
                </td>
              ))}
            </tr>

            {/* Row 4: Required Subjects */}
            <tr className="hover:bg-slate-900/40">
              <td className="p-4 font-bold text-slate-300">Required Subjects</td>
              {selectedRecs.map((rec) => (
                <td key={rec.course.id} className="p-4 border-l border-slate-800">
                  <div className="flex flex-wrap gap-1">
                    {rec.course.requiredSubjects && rec.course.requiredSubjects.length > 0 ? (
                      rec.course.requiredSubjects.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px]">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500 text-[11px]">Flexible / Open</span>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            {/* Row 5: Minimum Overall Marks */}
            <tr className="hover:bg-slate-900/40">
              <td className="p-4 font-bold text-slate-300">Minimum Marks</td>
              {selectedRecs.map((rec) => (
                <td key={rec.course.id} className="p-4 border-l border-slate-800 text-slate-300 font-semibold">
                  {rec.course.minimumMarks}% Aggregate
                </td>
              ))}
            </tr>

            {/* Row 6: Match Breakdown */}
            <tr className="hover:bg-slate-900/40">
              <td className="p-4 font-bold text-slate-300">Match Breakdown</td>
              {selectedRecs.map((rec) => (
                <td key={rec.course.id} className="p-4 border-l border-slate-800 text-[11px] space-y-1 text-slate-300">
                  <div>Academic Match: <span className="font-bold text-sky-400">{rec.breakdown.academicMatch}%</span></div>
                  <div>Interest Match: <span className="font-bold text-amber-400">{rec.breakdown.interestMatch}%</span></div>
                  <div>Skill Match: <span className="font-bold text-purple-400">{rec.breakdown.skillMatch}%</span></div>
                </td>
              ))}
            </tr>

            {/* Row 7: PG Pathways */}
            <tr className="hover:bg-slate-900/40">
              <td className="p-4 font-bold text-slate-300">Possible PG Pathways</td>
              {selectedRecs.map((rec) => (
                <td key={rec.course.id} className="p-4 border-l border-slate-800 text-[11px]">
                  <div className="flex flex-wrap gap-1">
                    {rec.course.pgPathways.map((pg) => (
                      <span key={pg} className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px]">
                        {pg}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Row 8: Target Careers */}
            <tr className="hover:bg-slate-900/40">
              <td className="p-4 font-bold text-slate-300">Career Options</td>
              {selectedRecs.map((rec) => (
                <td key={rec.course.id} className="p-4 border-l border-slate-800 text-[11px] text-slate-300">
                  {rec.course.careerAreas.slice(0, 3).join(', ')}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
