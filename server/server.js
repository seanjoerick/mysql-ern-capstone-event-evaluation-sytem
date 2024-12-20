import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler.js';
import prisma from './prismaClient.js';
import authRoutes from './routes/auth.route.js';
import courseRoutes from './routes/course.route.js';
import userRoutes from './routes/user.route.js';
import eventRoutes from './routes/event.route.js';
import './cron/updateEventStatus.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);

// Base route
app.get('/', (req, res) => res.send('Hello sean!'));

// Centralized error handling middleware - should be defined after routes
app.use(errorHandler);

// Check database connection on startup (optional)
app.listen(PORT, async () => {
    try {
        await prisma.$connect();  // Connect to the database
        console.log('Connected to the database successfully.');
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
});
