import { Router } from 'express';
import { db } from '../db';
import { User, StudentProfile } from '../types';

export const authRouter = Router();

authRouter.post('/login', (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = db.getUserByEmail(email);
  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  if (role && user.role !== role) {
    return res.status(403).json({ error: `User account is registered as ${user.role}, not ${role}.` });
  }

  const token = Buffer.from(JSON.stringify({ userId: user.id, email: user.email, role: user.role })).toString('base64');

  return res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: user.profile
    }
  });
});

authRouter.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const existing = db.getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const newUser: User = {
    id: `u-student-${Date.now()}`,
    name,
    email,
    role: 'STUDENT',
    passwordHash: password,
    createdAt: new Date().toISOString()
  };

  db.createUser(newUser);

  const token = Buffer.from(JSON.stringify({ userId: newUser.id, email: newUser.email, role: newUser.role })).toString('base64');

  return res.status(201).json({
    message: 'Account created successfully',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  });
});

import { sanitizeAndRecalculate12thProfile } from '../eligibilityEngine';

authRouter.post('/profile', (req, res) => {
  let { userId, profile }: { userId: string; profile: StudentProfile } = req.body;

  if (!profile || !profile.educationLevel) {
    return res.status(400).json({ error: 'Valid student profile and education level are required.' });
  }

  profile = sanitizeAndRecalculate12thProfile(profile);

  if (userId) {
    const updated = db.updateUserProfile(userId, profile);
    if (updated) {
      return res.json({ message: 'Profile updated successfully', profile: updated.profile });
    }
  }

  return res.json({ message: 'Guest profile active', profile });
});
