import { Router } from 'express';
import { db } from '../db';
import { runRecommendationPipeline } from '../eligibilityEngine';
import { StudentProfile } from '../types';

export const recommendationsRouter = Router();

recommendationsRouter.post('/analyze', (req, res) => {
  const profile: StudentProfile = req.body;

  if (!profile || !profile.educationLevel) {
    return res.status(400).json({ error: 'Student profile with education level is required.' });
  }

  const allCourses = db.getAllCourses();
  const result = runRecommendationPipeline(allCourses, profile);

  const topNames = result.topCompatible.slice(0, 3).map((c) => c.course.courseName);
  db.recordRecommendationEvent(profile, topNames);

  res.json(result);
});
