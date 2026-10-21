import { StudentProfile, Course, RecommendationResponse, User } from '../types';

const API_BASE = '/api';

export async function loginUser(email: string, password: string, role: 'STUDENT' | 'ADMIN') {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Login failed');
  }
  return res.json();
}

export async function signupStudent(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Signup failed');
  }
  return res.json();
}

export async function fetchCourses(filters?: { level?: string; search?: string }) {
  const params = new URLSearchParams();
  if (filters?.level) params.append('level', filters.level);
  if (filters?.search) params.append('search', filters.search);

  const res = await fetch(`${API_BASE}/courses?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
}

export async function analyzeRecommendations(profile: StudentProfile): Promise<RecommendationResponse> {
  const res = await fetch(`${API_BASE}/recommendations/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Recommendation calculation failed');
  }
  return res.json();
}

export async function sendAdvisorMessage(
  message: string,
  profile?: StudentProfile,
  history?: Array<{ sender: 'user' | 'ai'; text: string }>
) {
  const res = await fetch(`${API_BASE}/ai-advisor/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, profile, history })
  });
  if (!res.ok) throw new Error('AI Advisor failed to respond');
  return res.json();
}


export async function fetchAdminStats() {
  const res = await fetch(`${API_BASE}/admin/stats`);
  if (!res.ok) throw new Error('Failed to fetch admin stats');
  return res.json();
}

export async function fetchAdminStudents(): Promise<{ students: User[] }> {
  const res = await fetch(`${API_BASE}/admin/students`);
  if (!res.ok) throw new Error('Failed to fetch admin students');
  return res.json();
}

export async function fetchAdminStudentById(id: string): Promise<{ student: User }> {
  const res = await fetch(`${API_BASE}/admin/students/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Failed to fetch student profile');
  return res.json();
}


export async function createCourse(course: Partial<Course>) {
  const res = await fetch(`${API_BASE}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });
  if (!res.ok) throw new Error('Failed to create course');
  return res.json();
}

export async function updateCourse(id: string, course: Partial<Course>) {
  const res = await fetch(`${API_BASE}/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });
  if (!res.ok) throw new Error('Failed to update course');
  return res.json();
}

export async function deleteCourse(id: string) {
  const res = await fetch(`${API_BASE}/courses/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete course');
  return res.json();
}
