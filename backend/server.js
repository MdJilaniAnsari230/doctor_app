import express from 'express' 
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'


//app config
const app= express()
const port= process.env.PORT || 4000
connectDB();
connectCloudinary()

//middlewares
app.use(cors({
    origin: 'https://doctor-appfront-tbb8nwl9t-md-jilani-ansaris-projects.vercel.app', // frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// If you need to allow multiple origins, use a function:
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://doctor-appfront-tbb8nwl9t-md-jilani-ansaris-projects.vercel.app',
            'http://localhost:5173'
        ];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

//API endpoints
app.use('/api/admin' , adminRouter)
app.use('/api/doctor' , doctorRouter)
app.use('/api/user' , userRouter)
//localhost:4000/api/admin/add-doctor

app.get('/' , (req , res)=>{
    res.send('API WORKING')
})

app.listen(port , ()=> console.log("Server Started" , port))