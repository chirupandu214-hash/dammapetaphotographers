import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { protectRoute, authorizeRoles } from './middlewares/auth.middleware';
import { registerMember, getMembers } from './controllers/member.controller';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security layer configurations
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests originating from this deployment footprint.'
});
app.use('/api/', apiLimiter);

// Routing orchestration framework
app.post('/api/v1/members', protectRoute, authorizeRoles('Admin'), registerMember);
app.get('/api/v1/members', protectRoute, authorizeRoles('Admin', 'Member'), getMembers);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Green', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[DEPLOYMENT SUCCESS] Server executing actively on network port: ${PORT}`);
});
