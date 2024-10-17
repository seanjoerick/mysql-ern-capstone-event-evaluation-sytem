import express from 'express';
import { isVerifyToken, isAdmin } from '../middleware/protectedRoute.js';
import { createEvent } from '../controller/event.controller.js';

const router = express.Router();

router.post('/create', isVerifyToken, isAdmin, createEvent);


router.post('/login');
router.post('/logout');



export default router;
