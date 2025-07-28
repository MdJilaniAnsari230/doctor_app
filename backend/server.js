import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

const allowedOrigins = [
  'https://doctor-appfront-tbb8nwl9t-md-jilani-ansaris-projects.vercel.app',
  'https://doctor-appfront.vercel.app',
  'https://doctor-app-psi-bice.vercel.app',
  'http://localhost:5173'
];

// Enhanced CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚫 Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Legacy browser support
};

// Apply CORS globally
app.use(cors(corsOptions)); // Handles all routes including OPTIONS

// JSON body parsing
app.use(express.json());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Health-check
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: err.message });
  }
  console.error('🔥 Server Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});