import { Router } from 'express';
import { db } from '../db';
import { Course } from '../types';

export const coursesRouter = Router();

coursesRouter.get('/', (req, res) => {
  const { level, domain, search } = req.query;
  let courses = db.getAllCourses();

  if (level) {
    courses = courses.filter((c) => c.level === (level as string));
  }

  if (domain) {
    courses = courses.filter((c) => c.domain.toLowerCase().includes((domain as string).toLowerCase()));
  }

  if (search) {
    const s = (search as string).toLowerCase();
    courses = courses.filter(
      (c) =>
        c.courseName.toLowerCase().includes(s) ||
        c.degree.toLowerCase().includes(s) ||
        c.domain.toLowerCase().includes(s) ||
        c.description.toLowerCase().includes(s)
    );
  }

  res.json({ count: courses.length, courses });
});

coursesRouter.get('/:id', (req, res) => {
  const course = db.getCourseById(req.params.id);
  if (!course) {
    return res.status(404).json({ error: 'Course not found.' });
  }
  res.json({ course });
});

coursesRouter.post('/', (req, res) => {
  const courseData: Course = req.body;

  if (!courseData.courseName || !courseData.degree || !courseData.level) {
    return res.status(400).json({ error: 'Course name, degree, and education level are required.' });
  }

  const newCourse: Course = {
    ...courseData,
    id: courseData.id || `c-custom-${Date.now()}`,
    acceptedStreams: courseData.acceptedStreams || [],
    requiredSubjects: courseData.requiredSubjects || [],
    subjectRequirements: courseData.subjectRequirements || [],
    skills: courseData.skills || [],
    interests: courseData.interests || [],
    careerAreas: courseData.careerAreas || [],
    eligiblePreviousQualifications: courseData.eligiblePreviousQualifications || [],
    pgPathways: courseData.pgPathways || []
  };

  const created = db.addCourse(newCourse);
  res.status(201).json({ message: 'Course created successfully', course: created });
});

coursesRouter.put('/:id', (req, res) => {
  const updated = db.updateCourse(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Course not found.' });
  }
  res.json({ message: 'Course updated successfully', course: updated });
});

coursesRouter.delete('/:id', (req, res) => {
  const success = db.deleteCourse(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Course not found.' });
  }
  res.json({ message: 'Course deleted successfully' });
});
