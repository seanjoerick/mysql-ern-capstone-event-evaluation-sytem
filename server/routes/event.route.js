import express from 'express';
import { isVerifyToken, isAdmin } from '../middleware/protectedRoute.js';
import { createEvent, createEventCriteria, deleteEvent, getAllEvent, updateEvent } from '../controller/event.controller.js';

const router = express.Router();

//Event
router.post('/create', isVerifyToken, isAdmin, createEvent);
router.put('/update/:eventId', isVerifyToken, isAdmin, updateEvent);

router.delete('/delete/:eventId', isVerifyToken, isAdmin, deleteEvent);

router.post('/criteria/:eventId', isVerifyToken, isAdmin, createEventCriteria);
router.post('/create/:')

router.get('/get', getAllEvent);

router.post('/login');
router.post('/logout');



export default router;
