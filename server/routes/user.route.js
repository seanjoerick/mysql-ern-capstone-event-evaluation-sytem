import express from 'express';
import { isAdmin, isVerifyToken } from '../middleware/protectedRoute.js';
import { admin, getAllAdmins, getAllStudents, updateAdmin } from '../controller/user.controller.js';
const router = express.Router();

//Admin
router.post('/create', isVerifyToken, isAdmin, admin);
router.put('/update/:adminId', isVerifyToken, isAdmin, updateAdmin);
router.get('/all', isVerifyToken, isAdmin, getAllAdmins);
router.get('/students/all', getAllStudents);

export default router;
