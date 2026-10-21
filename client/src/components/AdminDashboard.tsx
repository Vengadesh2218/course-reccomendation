import React, { useState, useEffect } from 'react';
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  BarChart2,
  BookOpen,
  Users,
  Sparkles,
  Check,
  X,
  RefreshCw,
  Eye,
  Calendar,
  GraduationCap,
  Target,
  ChevronRight,
  Zap,
  BookCheck,
  Award
} from 'lucide-react';
import { Course, EducationLevel, User } from '../types';
import {
  fetchCourses,
  fetchAdminStats,
  fetchAdminStudents,
  fetchAdminStudentById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../services/api';

export const AdminDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  // Stat Detail Modal State
  const [activeStatModal, setActiveStatModal] = useState<
    'COURSES' | 'STUDENTS' | 'RECOMMENDATIONS' | 'QUERIES' | null
  >(null);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<User | null>(null);
  const [selectedCourseViewDetail, setSelectedCourseViewDetail] = useState<Course | null>(null);

  // Edit/Add Course Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [cRes, sRes, stRes] = await Promise.all([
        fetchCourses(),
        fetchAdminStats(),
        fetchAdminStudents()
      ]);
      setCourses(cRes.courses || []);
      setStats(sRes);
      setStudents(stRes.students || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudentProfile = async (st: User) => {
    try {
      const res = await fetchAdminStudentById(st.id);
      setSelectedStudentDetail(res.student || st);
    } catch (err) {
      setSelectedStudentDetail(st);
    }
  };


  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course from the database?')) return;
    try {
      await deleteCourse(id);
      setCourses(courses.filter((c) => c.id !== id));
    } catch (err) {
      alert('Delete failed.');
    }
  };

  const handleOpenAddModal = () => {
    setEditingCourse({
      courseName: '',
      degree: 'B.Tech',
      level: 'COMPLETED_12TH',
      domain: 'Computer Science & IT',
      duration: '4 Years',
      minimumMarks: 60,
      requiredSubjects: ['Mathematics'],
      acceptedStreams: ['Computer Science + Mathematics'],
      pgPathways: ['MCA', 'M.Tech'],
      skills: ['Programming', 'Problem Solving'],
      interests: ['Technology'],
      careerAreas: ['Software Engineer'],
      eligiblePreviousQualifications: ['Completed 12th'],
      additionalRequirements: 'Entrance Exam required',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (c: Course) => {
    setEditingCourse({ ...c });
    setIsModalOpen(true);
  };

  const handleSaveCourse = async () => {
    if (!editingCourse?.courseName || !editingCourse.degree) {
      alert('Course name and degree are required.');
      return;
    }

    try {
      if (editingCourse.id) {
        const res = await updateCourse(editingCourse.id, editingCourse);
        setCourses(courses.map((c) => (c.id === editingCourse.id ? res.course : c)));
      } else {
        const res = await createCourse(editingCourse);
        setCourses([res.course, ...courses]);
      }
      setIsModalOpen(false);
      setEditingCourse(null);
    } catch (err) {
      alert('Save failed.');
    }
  };

  const filteredCourses = filterLevel === 'ALL' ? courses : courses.filter((c) => c.level === filterLevel);

  // 12th Students subset for queries card
  const students12th = students.filter(
    (s) => s.profile?.educationLevel === 'COMPLETED_12TH' || s.profile?.stream12th
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Control & Rules Portal</h1>
            <p className="text-xs text-slate-400 mt-1">
              Configure course metadata, eligibility prerequisite rules, min marks thresholds, and analytics. Click any statistic card below to view detailed records.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAdminData}
            className="p-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course Rule</span>
          </button>
        </div>
      </div>

      {/* Analytics Counter Cards (All 4 Interactive & Clickable) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {/* 1. Total Courses Card */}
        <div
          onClick={() => setActiveStatModal('COURSES')}
          className="p-5 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group hover:scale-[1.02] shadow-lg"
        >
          <div className="text-xs font-bold text-slate-400 flex items-center justify-center gap-1.5 group-hover:text-purple-300 transition-colors">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Total Courses</span>
          </div>
          <div className="text-3xl font-black text-white mt-1.5">
            {stats?.totalCourses || courses.length}
          </div>
          <span className="text-[10px] text-purple-400 font-semibold inline-flex items-center gap-0.5 mt-2 group-hover:underline">
            Click to view courses <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {/* 2. Total Students Card */}
        <div
          onClick={() => setActiveStatModal('STUDENTS')}
          className="p-5 rounded-2xl glass-panel border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group hover:scale-[1.02] shadow-lg"
        >
          <div className="text-xs font-bold text-slate-400 flex items-center justify-center gap-1.5 group-hover:text-indigo-300 transition-colors">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Total Students</span>
          </div>
          <div className="text-3xl font-black text-indigo-400 mt-1.5">
            {stats?.totalStudents || students.length}
          </div>
          <span className="text-[10px] text-indigo-400 font-semibold inline-flex items-center gap-0.5 mt-2 group-hover:underline">
            Click to view students <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {/* 3. Recommendations Served Card */}
        <div
          onClick={() => setActiveStatModal('RECOMMENDATIONS')}
          className="p-5 rounded-2xl glass-panel border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group hover:scale-[1.02] shadow-lg"
        >
          <div className="text-xs font-bold text-slate-400 flex items-center justify-center gap-1.5 group-hover:text-emerald-300 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recommendations Served</span>
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-1.5">
            {stats?.totalRecommendations || 0}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold inline-flex items-center gap-0.5 mt-2 group-hover:underline">
            Click for insights <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        {/* 4. 12th Module Queries Card */}
        <div
          onClick={() => setActiveStatModal('QUERIES')}
          className="p-5 rounded-2xl glass-panel border border-sky-500/20 hover:border-sky-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group hover:scale-[1.02] shadow-lg"
        >
          <div className="text-xs font-bold text-slate-400 flex items-center justify-center gap-1.5 group-hover:text-sky-300 transition-colors">
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span>12th Module Queries</span>
          </div>
          <div className="text-3xl font-black text-sky-400 mt-1.5">
            {stats?.levelCounts?.COMPLETED_12TH || 0}
          </div>
          <span className="text-[10px] text-sky-400 font-semibold inline-flex items-center gap-0.5 mt-2 group-hover:underline">
            Click for 12th logs <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Main Course Database Table (Existing Unchanged Functionality) */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            Configured Course Database & Rules ({filteredCourses.length})
          </h2>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
          >
            <option value="ALL">All Levels</option>
            <option value="COMPLETED_10TH">10th Streams</option>
            <option value="COMPLETED_12TH">12th UG Courses</option>
            <option value="UG_STUDENT">UG to PG Programs</option>
            <option value="PG_STUDENT">PG Specializations</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold">
                <th className="p-3.5">Course Name & Degree</th>
                <th className="p-3.5">Level & Domain</th>
                <th className="p-3.5">Required Subjects</th>
                <th className="p-3.5">Min Marks</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-white">
                    <div>{c.courseName}</div>
                    <div className="text-[10px] text-indigo-400 font-semibold">
                      {c.degree} • {c.duration}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                      {c.level}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{c.domain}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {c.requiredSubjects.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-emerald-400">{c.minimumMarks}%</td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(c)}
                      className="p-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30"
                      title="Edit Rules"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30"
                      title="Delete Course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL 1: TOTAL STUDENTS DETAILS ================= */}
      {activeStatModal === 'STUDENTS' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-6 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Registered Student Details</h3>
                  <p className="text-xs text-slate-400">
                    Real student records currently stored in the database ({students.length} Total Registered Students)
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedStudentDetail(null);
                  setActiveStatModal(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
                title="Close View"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Students List Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold">
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Education Level</th>
                    <th className="p-3.5">Qualification / Stream</th>
                    <th className="p-3.5">Career Direction</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 font-bold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                          {st.name ? st.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div>
                          <span>{st.name}</span>
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-300 font-medium">{st.email}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {st.profile?.educationLevel ? st.profile.educationLevel.replace('_', ' ') : 'Registered'}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {st.profile?.stream12th || st.profile?.ugDegree || st.profile?.pgDegree || (st.profile ? '10th Standard' : <span className="text-slate-500 italic">Not submitted</span>)}
                      </td>
                      <td className="p-3.5">
                        {st.profile?.careerGoals && st.profile.careerGoals.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {st.profile.careerGoals.slice(0, 2).map((cg) => (
                              <span key={cg} className="px-2 py-0.5 rounded text-[10px] bg-rose-500/15 text-rose-300 border border-rose-500/20">
                                {cg}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-500 italic text-[10px]">Not specified</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleViewStudentProfile(st)}
                          className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center gap-1 ml-auto shadow-md transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Individual Student Full Profile Inspector Panel */}
            {selectedStudentDetail && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 space-y-4 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-lg">
                      {selectedStudentDetail.name ? selectedStudentDetail.name.charAt(0).toUpperCase() : 'S'}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{selectedStudentDetail.name}</h4>
                      <p className="text-xs text-slate-400">
                        {selectedStudentDetail.email} • ID: <code className="text-indigo-300 font-mono">{selectedStudentDetail.id}</code> • Registered {selectedStudentDetail.createdAt ? new Date(selectedStudentDetail.createdAt).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedStudentDetail(null)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <span>← Back to Students</span>
                    </button>
                    <button
                      onClick={() => setSelectedStudentDetail(null)}
                      className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
                      title="Close Profile"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {selectedStudentDetail.profile ? (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Academic Performance */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Academic Details</span>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Education Level:</span>
                            <span className="font-bold text-white">{selectedStudentDetail.profile.educationLevel ? selectedStudentDetail.profile.educationLevel.replace('_', ' ') : 'N/A'}</span>
                          </div>

                          {selectedStudentDetail.profile.overall10thPercentage !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Overall 10th Marks:</span>
                              <span className="font-bold text-emerald-400">{selectedStudentDetail.profile.overall10thPercentage}%</span>
                            </div>
                          )}

                          {selectedStudentDetail.profile.stream12th && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">12th Stream / Group:</span>
                              <span className="font-bold text-indigo-300">{selectedStudentDetail.profile.stream12th}</span>
                            </div>
                          )}

                          {selectedStudentDetail.profile.overall12thPercentage !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Overall 12th Percentage:</span>
                              <span className="font-bold text-emerald-400">{selectedStudentDetail.profile.overall12thPercentage}%</span>
                            </div>
                          )}

                          {selectedStudentDetail.profile.ugDegree && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">UG Degree:</span>
                              <span className="font-bold text-purple-300">{selectedStudentDetail.profile.ugDegree}</span>
                            </div>
                          )}
                        </div>

                        {selectedStudentDetail.profile.subjectMarks12th && Object.keys(selectedStudentDetail.profile.subjectMarks12th).length > 0 && (
                          <div className="pt-2 border-t border-slate-800/80 space-y-1">
                            <span className="text-[10px] text-slate-400 font-semibold block">12th Subject Breakdown:</span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {Object.entries(selectedStudentDetail.profile.subjectMarks12th).map(([sub, mark]) => (
                                <div key={sub} className="p-1.5 rounded bg-slate-900 flex justify-between">
                                  <span className="text-slate-300 truncate">{sub}:</span>
                                  <span className="font-bold text-indigo-300 ml-1">{mark} / 100</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Interests & Career Directions */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Interests & Career Goals</span>
                        
                        <div>
                          <span className="text-[10px] text-slate-400 block mb-1">Target Career Directions:</span>
                          {selectedStudentDetail.profile.careerGoals && selectedStudentDetail.profile.careerGoals.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {selectedStudentDetail.profile.careerGoals.map((cg) => (
                                <span key={cg} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                                  {cg}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">Not specified</span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 block mb-1">Academic Interests:</span>
                          {selectedStudentDetail.profile.interests && selectedStudentDetail.profile.interests.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {selectedStudentDetail.profile.interests.map((interest) => (
                                <span key={interest} className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-semibold">
                                  {interest}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">Not specified</span>
                          )}
                        </div>

                        {selectedStudentDetail.profile.preferredDomains && selectedStudentDetail.profile.preferredDomains.length > 0 && (
                          <div>
                            <span className="text-[10px] text-slate-400 block mb-1">Preferred Domains:</span>
                            <div className="flex flex-wrap gap-1">
                              {selectedStudentDetail.profile.preferredDomains.map((dom) => (
                                <span key={dom} className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-semibold">
                                  {dom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() => setSelectedStudentDetail(null)}
                        className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1 transition-all"
                      >
                        <span>← Back to Registered Students</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-950 rounded-xl space-y-2">
                    <p className="text-xs text-slate-400">No detailed onboarding assessment profile submitted for this student yet.</p>
                    <button
                      onClick={() => setSelectedStudentDetail(null)}
                      className="px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs font-bold"
                    >
                      ← Back to Students
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setSelectedStudentDetail(null);
                  setActiveStatModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all shadow-md"
              >
                <X className="w-4 h-4 text-slate-400" />
                <span>Close View</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: TOTAL COURSES DETAILS ================= */}
      {activeStatModal === 'COURSES' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-6 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Stored Course Database & Rules</h3>
                  <p className="text-xs text-slate-400">
                    Viewing all {courses.length} active course records & eligibility prerequisites in database
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedCourseViewDetail(null);
                  setActiveStatModal(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
                title="Close View"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold">
                    <th className="p-3.5">Course Program</th>
                    <th className="p-3.5">Level & Domain</th>
                    <th className="p-3.5">Cutoff Marks</th>
                    <th className="p-3.5">Prerequisite Subjects</th>
                    <th className="p-3.5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 font-bold text-white">
                        <div>{c.courseName}</div>
                        <div className="text-[10px] text-purple-300 font-semibold">{c.degree} • {c.duration}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                          {c.level}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{c.domain}</div>
                      </td>
                      <td className="p-3.5 font-bold text-emerald-400">{c.minimumMarks}%</td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {c.requiredSubjects.map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 text-[10px]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedCourseViewDetail(c)}
                          className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Course Rules Inspector */}
            {selectedCourseViewDetail && (
              <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-3 animate-fadeIn text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="font-bold text-white text-sm">{selectedCourseViewDetail.courseName} Rule Metadata</h4>
                  <button onClick={() => setSelectedCourseViewDetail(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <p className="text-slate-300 leading-relaxed">{selectedCourseViewDetail.description}</p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-bold block">Career Areas:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCourseViewDetail.careerAreas.map((ca) => (
                        <span key={ca} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">{ca}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">PG Pathways:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCourseViewDetail.pgPathways.map((pg) => (
                        <span key={pg} className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">{pg}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setSelectedCourseViewDetail(null);
                  setActiveStatModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all shadow-md"
              >
                <X className="w-4 h-4 text-slate-400" />
                <span>Close View</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: RECOMMENDATIONS SERVED INSIGHTS ================= */}
      {activeStatModal === 'RECOMMENDATIONS' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-6 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Recommendations Activity & Program Demand</h3>
                  <p className="text-xs text-slate-400">
                    Live analytics records from Database ({stats?.totalRecommendations || 0} Total Recommendations Served)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveStatModal(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
                title="Close View"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-1">
                <div className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Real Database Recommendation Activity Counter</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Total recommendation calculations performed for student profiles across all sessions: <strong>{stats?.totalRecommendations || 0} Events</strong>.
                </p>
              </div>

              {/* Top Recommended Programs Demand */}
              {stats?.topRecommendedCourses && Object.keys(stats.topRecommendedCourses).length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="font-extrabold text-white text-xs block">Top Recommended Degree Programs & Demand Count:</span>
                  <div className="space-y-2">
                    {Object.entries(stats.topRecommendedCourses).map(([cName, count]) => (
                      <div key={cName} className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="font-semibold text-slate-200">{cName}</span>
                        <span className="font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                          {String(count)} Matches
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Level Counts */}
              {stats?.levelCounts && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="font-extrabold text-white text-xs block">Recommendation Activity by Education Stage:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    {Object.entries(stats.levelCounts).map(([lvl, cnt]) => (
                      <div key={lvl} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">{lvl.replace('_', ' ')}</span>
                        <span className="text-lg font-black text-white mt-1 block">{String(cnt)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveStatModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all shadow-md"
              >
                <X className="w-4 h-4 text-slate-400" />
                <span>Close View</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 4: 12TH MODULE QUERIES INSIGHTS ================= */}
      {activeStatModal === 'QUERIES' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 space-y-6 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">12th Module Query Activity Logs</h3>
                  <p className="text-xs text-slate-400">
                    Viewing 12th standard prerequisite evaluations ({stats?.levelCounts?.COMPLETED_12TH || 0} Total 12th Module Queries)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveStatModal(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
                title="Close View"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-200 space-y-1">
                <div className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400" />
                  <span>Real Database 12th Standard Query Activity</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Total 12th standard module eligibility assessments & rule calculations logged in database: <strong>{stats?.levelCounts?.COMPLETED_12TH || 0} Queries</strong>.
                </p>
              </div>

              {/* Registered 12th Students List */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="font-extrabold text-white text-xs block">
                  Registered 12th Students ({students12th.length} Students):
                </span>

                {students12th.length > 0 ? (
                  <div className="space-y-2">
                    {students12th.map((st) => (
                      <div key={st.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">{st.name}</div>
                          <div className="text-[11px] text-slate-400">{st.email} • {st.profile?.stream12th || '12th Stream'}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-bold text-[10px] border border-sky-500/30">
                          {st.profile?.overall12thPercentage ? `${st.profile.overall12thPercentage}% Marks` : '12th Active'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs">All registered student records can be viewed in the Total Students tab.</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveStatModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all shadow-md"
              >
                <X className="w-4 h-4 text-slate-400" />
                <span>Close View</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Course Rules Modal (Existing Unchanged Functionality) */}
      {isModalOpen && editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingCourse.id ? 'Edit Eligibility & Course Rules' : 'Configure New Course Rule'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Name</label>
                <input
                  type="text"
                  value={editingCourse.courseName || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, courseName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Degree Type</label>
                <input
                  type="text"
                  value={editingCourse.degree || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, degree: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Education Level</label>
                <select
                  value={editingCourse.level || 'COMPLETED_12TH'}
                  onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value as EducationLevel })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="COMPLETED_10TH">COMPLETED_10TH</option>
                  <option value="COMPLETED_12TH">COMPLETED_12TH</option>
                  <option value="UG_STUDENT">UG_STUDENT</option>
                  <option value="PG_STUDENT">PG_STUDENT</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Minimum Overall Marks (%)</label>
                <input
                  type="number"
                  value={editingCourse.minimumMarks || 50}
                  onChange={(e) => setEditingCourse({ ...editingCourse, minimumMarks: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Required Subjects (comma-separated)</label>
                <input
                  type="text"
                  value={editingCourse.requiredSubjects?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      requiredSubjects: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="e.g. Mathematics, Physics, Chemistry"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  value={editingCourse.description || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  rows={3}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl glass-panel text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveCourse}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30"
              >
                Save Course Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
