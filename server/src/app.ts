import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

const app: Application = express();

// సెక్యూరిటీ & మిడిల్‌వేర్స్ (Middlewares)
app.use(helmet());
app.use(cors({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'https://dammapetaphotographers.onrender.com'],
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// టెస్ట్ రూట్ (సర్వర్ పనిచేస్తుందో లేదో చెక్ చేయడానికి)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Dammapeta Portal API!' });
});

// భవిష్యత్తులో మన API రూట్స్ ఇక్కడ వస్తాయి (ఉదా: app.use('/api/v1/members', memberRoutes);)

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

export default app;
