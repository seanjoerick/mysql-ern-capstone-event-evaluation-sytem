import express from 'express';
import { isAdmin, isVerifyToken } from '../middleware/protectedRoute.js';
import { admin } from '../controller/user.controller.js';
const router = express.Router();

//Admin
router.post('/create', isVerifyToken, isAdmin, admin);

export default router;
