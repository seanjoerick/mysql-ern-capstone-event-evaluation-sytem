import express from 'express';
import { createCourse, createStrand, createTesda, getAllCourse, getAllStrand, getAllTesda, updateCourse, updateStrand, updateTesda } from '../controller/course.controller.js';

const router = express.Router();

//tesda
router.post('/tesda/create', createTesda);
router.put('/tesda/update/:courseId', updateTesda);
router.get('/tesda/get', getAllTesda);

//course
router.post('/create', createCourse);
router.put('/update/:courseId', updateCourse);
router.get('/get', getAllCourse);

//strand
router.post('/strand/create', createStrand);
router.put('/strand/update/:strandId', updateStrand);
router.get('/strand/get', getAllStrand);



export default router;
