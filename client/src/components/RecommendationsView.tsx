import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Sliders,
  Award,
  Layers,
  Search,
  Filter,
  ArrowUpRight,
  PlusCircle,
  Check,
  Info
} from 'lucide-react';
import { RecommendationResponse, RecommendedCourse } from '../types';

interface RecommendationsViewProps {
  recommendationData: RecommendationResponse | null;
  onSelectCourseDetail: (rec: RecommendedCourse) => void;
  selectedCompareIds: string[];
  onToggleCompare: (courseId: string) => void;
  savedPathIds: string[];
  onToggleSavePath: (courseId: string) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendationData,
  onSelectCourseDetail,
  selectedCompareIds,
  onToggleCompare,
  savedPathIds,
  onToggleSavePath
}) => {
  const [activeTabSection, setActiveTabSection] = useState<'ALL' | 'TOP' | 'OTHER' | 'BRIDGE' | 'NOT_ELIGIBLE' | 'FUTURE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('ALL');

  if (!recommendationData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <BookOpen className="w-12 h-12 text-indigo-400 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-white">No Recommendation Profile Found</h2>
        <p className="text-xs text-slate-400">Please complete onboarding to generate your personalized course recommendations.</p>
      </div>
    );
  }

  const { topCompatible, otherEligible, coursesRequiringPrerequisites, notEligibleCourses, futurePathways } =
    recommendationData;

  // Filter helper
  const filterList = (list: RecommendedCourse[]) => {
    return list.filter((item) => {
      const matchesSearch =
        item.course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course.domain.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDomain = domainFilter === 'ALL' || item.course.domain === domainFilter;
      return matchesSearch && matchesDomain;
    });
  };

  const filteredTop = filterList(topCompatible);
  const filteredOther = filterList(otherEligible);
  const filteredBridge = filterList(coursesRequiringPrerequisites);
  const filteredNotEligible = filterList(notEligibleCourses);
  const filteredFuture = filterList(futurePathways);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            2-Layer Eligibility Pipeline Applied
          </div>
          <h1 className="text-3xl font-extrabold text-white">Course Recommendations</h1>
          <p className="text-xs text-slate-400 mt-1">
            Displaying courses categorized by strict academic eligibility and personalized compatibility matching.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search course or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="w-full sm:w-auto bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Domains</option>
            <option value="Computer Science & IT">Computer Science & IT</option>
            <option value="Data Science & AI">Data Science & AI</option>
            <option value="Commerce & Finance">Commerce & Finance</option>
            <option value="Healthcare & Bio-Science">Healthcare & Bio-Science</option>
            <option value="Arts & Media">Arts & Media</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
        {[
          { id: 'ALL', label: 'All Courses', count: topCompatible.length + otherEligible.length + notEligibleCourses.length },
          { id: 'TOP', label: 'Top Compatible (Score 80%+)', count: topCompatible.length },
          { id: 'OTHER', label: 'Other Eligible', count: otherEligible.length },
          { id: 'BRIDGE', label: 'Bridge / Prerequisites', count: coursesRequiringPrerequisites.length },
          { id: 'NOT_ELIGIBLE', label: 'Not Currently Eligible', count: notEligibleCourses.length },
          { id: 'FUTURE', label: 'Future PG Pathways', count: futurePathways.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabSection(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTabSection === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 text-indigo-300">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* SECTION A: TOP COMPATIBLE COURSES */}
      {(activeTabSection === 'ALL' || activeTabSection === 'TOP') && filteredTop.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Section A: Top Compatible Courses</h2>
            <span className="text-xs text-slate-400 font-normal">Passed eligibility + Score ≥ 80%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTop.map((rec) => (
              <CourseCard
                key={rec.course.id}
                rec={rec}
                onSelectDetail={() => onSelectCourseDetail(rec)}
                isCompared={selectedCompareIds.includes(rec.course.id)}
                onToggleCompare={() => onToggleCompare(rec.course.id)}
                isSaved={savedPathIds.includes(rec.course.id)}
                onToggleSavePath={() => onToggleSavePath(rec.course.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION B: OTHER ELIGIBLE COURSES */}
      {(activeTabSection === 'ALL' || activeTabSection === 'OTHER') && filteredOther.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl font-bold text-white">Section B: Other Eligible Courses</h2>
            <span className="text-xs text-slate-400 font-normal">Passed eligibility prerequisites</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOther.map((rec) => (
              <CourseCard
                key={rec.course.id}
                rec={rec}
                onSelectDetail={() => onSelectCourseDetail(rec)}
                isCompared={selectedCompareIds.includes(rec.course.id)}
                onToggleCompare={() => onToggleCompare(rec.course.id)}
                isSaved={savedPathIds.includes(rec.course.id)}
                onToggleSavePath={() => onToggleSavePath(rec.course.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION C: COURSES REQUIRING PREREQUISITES */}
      {(activeTabSection === 'ALL' || activeTabSection === 'BRIDGE') && filteredBridge.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Section C: Courses Requiring Bridge / Additional Entry</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBridge.map((rec) => (
              <CourseCard
                key={rec.course.id}
                rec={rec}
                onSelectDetail={() => onSelectCourseDetail(rec)}
                isCompared={selectedCompareIds.includes(rec.course.id)}
                onToggleCompare={() => onToggleCompare(rec.course.id)}
                isSaved={savedPathIds.includes(rec.course.id)}
                onToggleSavePath={() => onToggleSavePath(rec.course.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION D: NOT CURRENTLY ELIGIBLE */}
      {(activeTabSection === 'ALL' || activeTabSection === 'NOT_ELIGIBLE') && filteredNotEligible.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold text-white">Section D: Not Currently Eligible</h2>
            <span className="text-xs text-slate-400 font-normal">Rule check failed (Prerequisite or Minimum Marks threshold unmet)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotEligible.map((rec) => (
              <CourseCard
                key={rec.course.id}
                rec={rec}
                onSelectDetail={() => onSelectCourseDetail(rec)}
                isCompared={selectedCompareIds.includes(rec.course.id)}
                onToggleCompare={() => onToggleCompare(rec.course.id)}
                isSaved={savedPathIds.includes(rec.course.id)}
                onToggleSavePath={() => onToggleSavePath(rec.course.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* SECTION E: FUTURE PATHWAYS */}
      {(activeTabSection === 'ALL' || activeTabSection === 'FUTURE') && filteredFuture.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Section E: Possible Future Pathways</h2>
            <span className="text-xs text-slate-400 font-normal">Next level degree progression preview</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFuture.map((rec) => (
              <CourseCard
                key={rec.course.id}
                rec={rec}
                onSelectDetail={() => onSelectCourseDetail(rec)}
                isCompared={selectedCompareIds.includes(rec.course.id)}
                onToggleCompare={() => onToggleCompare(rec.course.id)}
                isSaved={savedPathIds.includes(rec.course.id)}
                onToggleSavePath={() => onToggleSavePath(rec.course.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* Component: Individual Course Card */
interface CourseCardProps {
  rec: RecommendedCourse;
  onSelectDetail: () => void;
  isCompared: boolean;
  onToggleCompare: () => void;
  isSaved: boolean;
  onToggleSavePath: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  rec,
  onSelectDetail,
  isCompared,
  onToggleCompare,
  isSaved,
  onToggleSavePath
}) => {
  const { course, eligibility, compatibilityScore, breakdown, whyRecommended, alternativeSuggestions } = rec;
  const isEligible = eligibility.status === 'ELIGIBLE';
  const isPartially = eligibility.status === 'PARTIALLY_COMPATIBLE';

  return (
    <div
      className={`p-6 rounded-3xl glass-panel border transition-all flex flex-col justify-between space-y-4 ${
        isEligible
          ? 'border-emerald-500/20 glass-panel-hover'
          : isPartially
          ? 'border-amber-500/20 glass-panel-hover'
          : 'border-rose-500/20 bg-slate-950/60'
      }`}
    >
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {course.degree}
              </span>
              <span className="text-[11px] text-slate-400">{course.domain} • {course.duration}</span>
            </div>
            <h3 className="font-extrabold text-lg text-white leading-snug">{course.courseName}</h3>
          </div>

          {/* Compatibility Score / Status Badge */}
          <div className="text-right shrink-0">
            {isEligible ? (
              <div className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black shadow-md shadow-emerald-500/10">
                {compatibilityScore}% Compatible
              </div>
            ) : isPartially ? (
              <div className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                ⚠️ Bridge Required
              </div>
            ) : (
              <div className="px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                Not Eligible
              </div>
            )}
          </div>
        </div>

        {/* Explainable Status Banner */}
        {!isEligible && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-rose-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Eligibility Rule Check Failed</span>
            </div>
            {eligibility.reasons.map((r, idx) => (
              <p key={idx} className="text-[11px] leading-relaxed text-rose-200/90 pl-5">
                • {r}
              </p>
            ))}

            {alternativeSuggestions && alternativeSuggestions.length > 0 && (
              <div className="mt-2 pt-2 border-t border-rose-500/20 text-amber-300 text-[11px]">
                <strong className="block text-amber-400">💡 Smart Compatible Alternative:</strong>
                {alternativeSuggestions[0]}
              </div>
            )}
          </div>
        )}

        {/* Compatibility Breakdown Bars (for Eligible Courses) */}
        {isEligible && (
          <div className="grid grid-cols-3 gap-2 pt-2 text-[10px]">
            <div className="p-2 rounded-lg bg-slate-900/80">
              <div className="text-slate-400 font-medium">Academic</div>
              <div className="font-bold text-sky-300 mt-0.5">{breakdown.academicMatch}%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80">
              <div className="text-slate-400 font-medium">Interest</div>
              <div className="font-bold text-amber-300 mt-0.5">{breakdown.interestMatch}%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/80">
              <div className="text-slate-400 font-medium">Skill</div>
              <div className="font-bold text-purple-300 mt-0.5">{breakdown.skillMatch}%</div>
            </div>
          </div>
        )}

        {/* Explainable Why Recommended */}
        {isEligible && whyRecommended.length > 0 && (
          <div className="text-xs text-slate-300 space-y-1 pt-1">
            <span className="text-emerald-400 font-semibold block text-[11px]">Why Recommended:</span>
            <p className="text-[11px] text-slate-300 leading-relaxed truncate">✓ {whyRecommended[0]}</p>
          </div>
        )}
      </div>

      {/* Card Action Controls */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <button
          onClick={onSelectDetail}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 transition-all"
        >
          <Info className="w-3.5 h-3.5 text-sky-400" />
          <span>View Details</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleCompare}
            className={`px-3 py-2 rounded-xl font-semibold transition-all flex items-center gap-1 border ${
              isCompared
                ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {isCompared ? <Check className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
            <span>Compare</span>
          </button>

          <button
            onClick={onToggleSavePath}
            className={`p-2 rounded-xl border transition-all ${
              isSaved
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title={isSaved ? 'Saved to My Path' : 'Add to My Path'}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
