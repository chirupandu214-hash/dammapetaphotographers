import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import financialRouter from './routes/financial.routes';

const app = express();

// Set foundational enterprise defensive headers
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());

// Bind isolated business logic sub-routing pipelines
app.use('/api/v1', financialRouter);

export default app;
