import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect DB and Cloudinary
connectDB();
connectCloudinary();

// Allowed front‑end origins
const allowedOrigins = [
  'https://doctor-appfront-tbb8nwl9t-md-jilani-ansaris-projects.vercel.app',
  'https://doctor-appfront.vercel.app',
  'https://doctor-app-a6wb.onrender.com',
  'https://doctor-app-psi-bice.vercel.app/',
    'http://localhost:5173' // Local development
];

// CORS config
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // otherwise block
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
};

// Enable CORS + preflight across your entire API
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  

// JSON body parsing
app.use(express.json());

// API routes
app.use('/api/admin',   adminRouter);
app.use('/api/doctor',  doctorRouter);
app.use('/api/user',    userRouter);

// Health‑check
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Global error handler (to catch CORS errors, etc.)
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
