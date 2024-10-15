import express from 'express';
import { createTesda, getAllTesda, updateTesda } from '../controller/course.controller.js';

const router = express.Router();

router.post('/tesda/create', createTesda);
router.put('/tesda/update/:courseId', updateTesda);
router.get('/tesda/get', getAllTesda);


export default router;
