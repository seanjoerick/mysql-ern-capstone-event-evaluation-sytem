import express from 'express';
import { isVerifyToken, isAdmin } from '../middleware/protectedRoute.js';
import { createEvent, createEventCriteria, deleteCriteria, deleteEvent, getAllCriteria, getAllEvent, getEvaluationResults, getEventCriteria, getEventFeedback, getEventOnlyWith10Criteria, getEventsSummary, getSubmittedEvaluations, getTopEvents, submitEvaluation, updateCriteria, updateEvent } from '../controller/event.controller.js';

const router = express.Router();

//Event
router.post('/create', isVerifyToken, isAdmin, createEvent);
router.put('/update/:eventId', isVerifyToken, isAdmin, updateEvent);
router.get('/get', isVerifyToken, getAllEvent);
router.get('/get10', isVerifyToken, getEventOnlyWith10Criteria);
router.get('/geteventsummary', isVerifyToken, getEventsSummary);
router.delete('/delete/:eventId', isVerifyToken, isAdmin, deleteEvent);

//Criteria
router.post('/criteria/:eventId', isVerifyToken, isAdmin, createEventCriteria);
router.get('/criteria/getall', getAllCriteria);

router.get('/criteria/get/:eventId', isVerifyToken,  getEventCriteria);
router.get('/criteria/feedback/:eventId', isVerifyToken,  getEventFeedback);

router.put('/criteria/update/:criteriaId', isVerifyToken, isAdmin, updateCriteria);
router.delete('/criteria/delete/:criteriaId', isVerifyToken, isAdmin, deleteCriteria)

//Evaluation
router.post('/evaluations', isVerifyToken, submitEvaluation);
router.get('/evaluations/submitted/get', isVerifyToken, getSubmittedEvaluations);

router.get('/evaluations/results/get/:eventId', isVerifyToken, getEvaluationResults);
router.get('/evaluations/results/top-events/:year', isVerifyToken, getTopEvents);



export default router;
