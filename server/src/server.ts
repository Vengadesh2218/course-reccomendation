import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { coursesRouter } from './routes/courses';
import { recommendationsRouter } from './routes/recommendations';
import { aiAdvisorRouter } from './routes/aiAdvisor';
import { adminRouter } from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/ai-advisor', aiAdvisorRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'PathWise AI Engine', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 PathWise AI Server running on http://localhost:${PORT}`);
});
