import express from 'express';
import { createCourse, createTesda, getAllCourse, getAllTesda, updateCourse, updateTesda } from '../controller/course.controller.js';

const router = express.Router();

//tesda
router.post('/tesda/create', createTesda);
router.put('/tesda/update/:courseId', updateTesda);
router.get('/tesda/get', getAllTesda);

//course
router.post('/create', createCourse);
router.put('/update/:courseId', updateCourse);
router.get('/get', getAllCourse);



export default router;
