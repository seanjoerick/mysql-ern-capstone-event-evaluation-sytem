import express from 'express';
import { createYearLevel, updateyearLevel } from '../controller/year.controller.js';

const router = express.Router();

router.post('/create', createYearLevel);
router.put('/update/:yearlevelId', updateyearLevel);

export default router;
