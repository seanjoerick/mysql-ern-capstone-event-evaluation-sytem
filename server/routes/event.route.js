import express from 'express';
import { isVerifyToken, isAdmin } from '../middleware/protectedRoute.js';
import { createEvent, createEventCriteria, deleteEvent, getAllCriteria, getAllEvent, getEventCriteria, updateEvent } from '../controller/event.controller.js';

const router = express.Router();

//Event
router.post('/create', isVerifyToken, isAdmin, createEvent);
router.put('/update/:eventId', isVerifyToken, isAdmin, updateEvent);
router.get('/get', getAllEvent);
router.delete('/delete/:eventId', isVerifyToken, isAdmin, deleteEvent);

router.post('/criteria/:eventId', isVerifyToken, isAdmin, createEventCriteria);
router.get('/criteria/getall', getAllCriteria);
router.get('/criteria/get/:eventId', getEventCriteria);

router.post('/login');
router.post('/logout');



export default router;
