import React from 'react';
import { Layers, GraduationCap, ShieldCheck, Award, Target, ChevronRight } from 'lucide-react';
import { RecommendationResponse, StudentProfile } from '../types';

interface PathwayVisualizerProps {
  profile: StudentProfile | null;
  recommendationData: RecommendationResponse | null;
}

export const PathwayVisualizer: React.FC<PathwayVisualizerProps> = ({ profile, recommendationData }) => {
  const topCourse = recommendationData?.topCompatible[0];
  const pgPaths = topCourse ? topCourse.course.pgPathways : ['MCA', 'M.Sc CS', 'MBA IT'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Academic Pathway Visualizer</h1>
            <p className="text-xs text-slate-400 mt-1">
              Visual roadmap mapping your current education milestone to eligible degree programs, PG pathways, and target industry roles.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Flow Node Diagram */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/20 shadow-2xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Interactive Node Pipeline</span>
          <h2 className="text-xl font-bold text-white">End-to-End Career Progression</h2>
        </div>

        {/* Nodes Container */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Node 1: 10th Milestone */}
          <div className="p-5 rounded-2xl glass-panel border border-indigo-500/30 bg-slate-900/80 text-center space-y-3 relative group hover:border-indigo-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 1</span>
              <h3 className="font-extrabold text-sm text-white">10th Completion</h3>
              <p className="text-[11px] text-emerald-400 mt-1">✓ Passed ({profile?.overall10thPercentage || 82}%)</p>
            </div>
          </div>

          {/* Node 2: 12th Stream */}
          <div className="p-5 rounded-2xl glass-panel border border-sky-500/30 bg-slate-900/80 text-center space-y-3 relative group hover:border-sky-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center mx-auto">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 2</span>
              <h3 className="font-extrabold text-sm text-white">{profile?.stream12th || '12th Stream'}</h3>
              <p className="text-[11px] text-sky-400 mt-1">{profile?.overall12thPercentage || 85}% Score</p>
            </div>
          </div>

          {/* Node 3: Rule Eligibility Engine */}
          <div className="p-5 rounded-2xl glass-panel border border-amber-500/30 bg-amber-950/20 text-center space-y-3 relative group hover:border-amber-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase">Stage 3</span>
              <h3 className="font-extrabold text-sm text-white">Eligibility Filter</h3>
              <p className="text-[11px] text-amber-300 mt-1">Prerequisite Verified</p>
            </div>
          </div>

          {/* Node 4: Eligible UG Course */}
          <div className="p-5 rounded-2xl glass-panel border border-emerald-500/40 bg-emerald-950/20 text-center space-y-3 relative group hover:border-emerald-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Stage 4</span>
              <h3 className="font-extrabold text-sm text-white">{topCourse ? topCourse.course.courseName : 'UG Degree'}</h3>
              <p className="text-[11px] text-emerald-300 mt-1">{topCourse ? `${topCourse.compatibilityScore}% Compatible` : 'Matched'}</p>
            </div>
          </div>

          {/* Node 5: PG & Career Goal */}
          <div className="p-5 rounded-2xl glass-panel border border-purple-500/30 bg-purple-950/20 text-center space-y-3 relative group hover:border-purple-500 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase">Stage 5</span>
              <h3 className="font-extrabold text-sm text-white">{profile?.careerGoals[0] || 'Software Engineer'}</h3>
              <p className="text-[11px] text-purple-300 mt-1">{pgPaths[0] || 'MCA / PG Path'}</p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown of Next Milestones */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-sm">Recommended Milestone Action Plan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-bold block">1. Undergraduate Focus Areas:</span>
              <p className="text-slate-300">
                Focus on core prerequisite concepts (Data Structures, Calculus, Algorithms) to maintain a high GPA for PG eligibility.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold block">2. Post-Graduate Progression:</span>
              <p className="text-slate-300">
                Eligible PG Options post-graduation: {pgPaths.join(', ')}. Entrance exams (NIMCET / GATE / CAT) recommended.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
