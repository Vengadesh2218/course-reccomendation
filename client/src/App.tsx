import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { StudentDashboard } from './components/StudentDashboard';
import { RecommendationsView } from './components/RecommendationsView';
import { CourseDetailModal } from './components/CourseDetailModal';
import { CourseComparisonView } from './components/CourseComparisonView';
import { PathwayVisualizer } from './components/PathwayVisualizer';
import { AiAdvisorDrawer } from './components/AiAdvisorDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';

import { StudentProfile, RecommendationResponse, RecommendedCourse, User, Course } from './types';
import { analyzeRecommendations, fetchCourses } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>({
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
  });

  const [recommendationData, setRecommendationData] = useState<RecommendationResponse | null>(null);
  const [sampleCourses, setSampleCourses] = useState<Course[]>([]);

  // Selection States
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<RecommendedCourse | null>(null);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [savedPathIds, setSavedPathIds] = useState<string[]>([]);

  // Modals & Drawers
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Initial load
  useEffect(() => {
    loadInitialCourses();
    if (profile) {
      runAnalysis(profile);
    }
  }, []);

  const loadInitialCourses = async () => {
    try {
      const res = await fetchCourses();
      setSampleCourses(res.courses || []);
    } catch (err) {
      console.warn('Could not fetch sample courses:', err);
    }
  };

  const runAnalysis = async (prof: StudentProfile) => {
    try {
      const res = await analyzeRecommendations(prof);
      setRecommendationData(res);
    } catch (err) {
      console.error('Error running recommendation pipeline:', err);
    }
  };

  const handleOnboardingComplete = async (newProfile: StudentProfile) => {
    setProfile(newProfile);
    await runAnalysis(newProfile);
    setActiveTab('recommendations');
  };

  const handleToggleCompare = (courseId: string) => {
    if (selectedCompareIds.includes(courseId)) {
      setSelectedCompareIds(selectedCompareIds.filter((id) => id !== courseId));
    } else {
      if (selectedCompareIds.length >= 4) {
        alert('You can compare up to 4 courses at a time.');
        return;
      }
      setSelectedCompareIds([...selectedCompareIds, courseId]);
    }
  };

  const handleToggleSavePath = (courseId: string) => {
    if (savedPathIds.includes(courseId)) {
      setSavedPathIds(savedPathIds.filter((id) => id !== courseId));
    } else {
      setSavedPathIds([...savedPathIds, courseId]);
    }
  };

  // Helper to retrieve compare items
  const getCompareList = (): RecommendedCourse[] => {
    if (!recommendationData) return [];
    const all = [
      ...recommendationData.topCompatible,
      ...recommendationData.otherEligible,
      ...recommendationData.coursesRequiringPrerequisites,
      ...recommendationData.notEligibleCourses
    ];
    return all.filter((r) => selectedCompareIds.includes(r.course.id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          setUser(null);
          setProfile(null);
          setRecommendationData(null);
        }}
        onToggleAi={() => setIsAiOpen(!isAiOpen)}
        profile={profile}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onStartOnboarding={() => setActiveTab('onboarding')}
            onExploreCourses={() => setActiveTab('recommendations')}
            onOpenAi={() => setIsAiOpen(true)}
            sampleCourses={sampleCourses}
          />
        )}

        {activeTab === 'onboarding' && (
          <OnboardingFlow initialProfile={profile} onComplete={handleOnboardingComplete} />
        )}

        {activeTab === 'dashboard' && profile && (
          <StudentDashboard
            profile={profile}
            recommendationData={recommendationData}
            onNavigateToRecs={() => setActiveTab('recommendations')}
            onNavigateToPathway={() => setActiveTab('pathway')}
            onOpenAi={() => setIsAiOpen(true)}
          />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationsView
            recommendationData={recommendationData}
            onSelectCourseDetail={(rec) => setSelectedCourseDetail(rec)}
            selectedCompareIds={selectedCompareIds}
            onToggleCompare={handleToggleCompare}
            savedPathIds={savedPathIds}
            onToggleSavePath={handleToggleSavePath}
          />
        )}

        {activeTab === 'compare' && (
          <CourseComparisonView
            selectedRecs={getCompareList()}
            onRemoveFromCompare={(id) => setSelectedCompareIds(selectedCompareIds.filter((cId) => cId !== id))}
            onClearAll={() => setSelectedCompareIds([])}
            onClose={() => setActiveTab('recommendations')}
          />
        )}

        {activeTab === 'pathway' && (
          <PathwayVisualizer profile={profile} recommendationData={recommendationData} />
        )}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Compare Matrix Bar */}
      {selectedCompareIds.length > 0 && activeTab !== 'compare' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-panel px-6 py-3.5 rounded-2xl border border-purple-500/40 shadow-2xl flex items-center gap-4 bg-slate-950/90 backdrop-blur-xl">
          <span className="text-xs font-bold text-white">
            {selectedCompareIds.length} Course{selectedCompareIds.length > 1 ? 's' : ''} Selected for Comparison
          </span>

          <button
            onClick={() => setActiveTab('compare')}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all hover:scale-105"
          >
            Open Side-by-Side Matrix →
          </button>
        </div>
      )}

      {/* Course Detail Modal */}
      <CourseDetailModal
        rec={selectedCourseDetail}
        onClose={() => setSelectedCourseDetail(null)}
        onToggleCompare={(id) => handleToggleCompare(id)}
        isCompared={selectedCourseDetail ? selectedCompareIds.includes(selectedCourseDetail.course.id) : false}
      />

      {/* AI Advisor Chatbot Overlay Drawer */}
      <AiAdvisorDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} profile={profile} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => {
          setUser(u);
          if (u.profile) {
            setProfile(u.profile);
            runAnalysis(u.profile);
          }
          if (u.role === 'ADMIN') {
            setActiveTab('admin');
          }
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500 bg-slate-950/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm">PathWise AI</span>
            <span>– Intelligent Course & Career Recommendation Platform</span>
          </div>
          <div>© 2026 PathWise AI Engine. Grounded in strict academic eligibility rule validation.</div>
        </div>
      </footer>
    </div>
  );
}
export default App;
