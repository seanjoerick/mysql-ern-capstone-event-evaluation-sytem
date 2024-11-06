import express from 'express';
import { getAllCourse, getAllStrand, getAllTesda } from '../controller/course.controller.js';

const router = express.Router();

//tesda
router.get('/tesda/get', getAllTesda);

//course
router.get('/get', getAllCourse);

//strand
router.get('/strand/get', getAllStrand);



export default router;
