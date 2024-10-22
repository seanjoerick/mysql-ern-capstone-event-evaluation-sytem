import express from 'express';
import { isVerifyToken, isAdmin } from '../middleware/protectedRoute.js';
import { createEvent, createEventCriteria, deleteCriteria, deleteEvent, getAllCriteria, getAllEvent, getEventCriteria, updateCriteria, updateEvent } from '../controller/event.controller.js';

const router = express.Router();

//Event
router.post('/create', isVerifyToken, isAdmin, createEvent);
router.put('/update/:eventId', isVerifyToken, isAdmin, updateEvent);
router.get('/get', getAllEvent);
router.delete('/delete/:eventId', isVerifyToken, isAdmin, deleteEvent);
//Criteria
router.post('/criteria/:eventId', isVerifyToken, isAdmin, createEventCriteria);
router.get('/criteria/getall', getAllCriteria);
router.get('/criteria/get/:eventId', getEventCriteria, isVerifyToken, isAdmin,  getEventCriteria);

router.put('/criteria/update/:criteriaId', isVerifyToken, isAdmin, updateCriteria);

router.delete('/criteria/delete/:criteriaId', isVerifyToken, isAdmin, deleteCriteria)


export default router;
