import { Router } from 'express';
import { db } from '../db';

export const adminRouter = Router();

adminRouter.get('/stats', (req, res) => {
  const analytics = db.getAnalytics();
  res.json(analytics);
});

adminRouter.get('/students', (req, res) => {
  const students = db.getStudents();
  res.json({ students });
});

adminRouter.get('/students/:id', (req, res) => {
  const student = db.getUserById(req.params.id);
  if (!student || student.role !== 'STUDENT') {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json({ student });
});

