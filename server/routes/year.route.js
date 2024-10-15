import express from 'express';
import { createYearLevel, getAllYearLevels, updateyearLevel } from '../controller/year.controller.js';

const router = express.Router();

router.post('/create', createYearLevel);
router.put('/update/:yearlevelId', updateyearLevel);
router.get('/get', getAllYearLevels);

export default router;
