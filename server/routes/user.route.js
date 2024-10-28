import express from 'express';
import { isAdmin, isVerifyToken } from '../middleware/protectedRoute.js';
import { admin, getAllAdmins, getAllStudents, updateAdmin } from '../controller/user.controller.js';
const router = express.Router();

//Admin
router.post('/create', isVerifyToken, admin);
router.put('/update/:adminId', isVerifyToken, updateAdmin);
router.get('/all', isVerifyToken, getAllAdmins);
router.get('/students/all', getAllStudents);

export default router;
