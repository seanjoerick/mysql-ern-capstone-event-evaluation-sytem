import prisma from '../prismaClient.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  const { username, email, password, firstName, lastName, yearLevelId, strandId, courseId, tesdaCourseId } = req.body;
  try {
    
  } catch (error) {
    console.error('Error during signup:', error);
        next(error);
  }
};



// import bcryptjs from 'bcryptjs';
// import UserModel from '../models/userModel.js'; 
// import StudentModel from '../models/studentModel.js';
// import generateTokenAndSetCookie from '../utils/generateToken.js';

// // Sign up user
// export const signup = async (req, res, next) => {
//   const { username, email, password, firstName, lastName, yearLevelId, strandId, courseId, tesdaCourseId } = req.body;

//   try {
//     const existingUser = await UserModel.findUserByUsernameOrEmail(username, email);
//     if (existingUser) return res.status(400).json({ error: 'User already exists!' });

//     // Hash the password
//     const salt = bcryptjs.genSaltSync(10);
//     const hashedPassword = bcryptjs.hashSync(password, salt);

//     // Create user in tbl_users
//     const userId = await UserModel.createUser(username, hashedPassword, email, 'student');
    
//     // Create user in tbl_students, set optional fields to null if they are not provided
//     const studentId = await StudentModel.createStudent(
//       userId,
//       firstName,
//       lastName,
//       yearLevelId,
//       strandId || null, // Set to null if undefined
//       courseId || null, // Set to null if undefined
//       tesdaCourseId || null // Set to null if undefined
//     );

//     // Generate JWT token and set cookie
//     await generateTokenAndSetCookie(userId, res);

//     // Send response
//     res.status(201).json({
//       success: true,
//       message: 'User created successfully!',
//       userId,
//       studentId
//     });

//   } catch (error) {
//     console.error('Error during signup:', error);
//     next(error);
//   }
// };










// Log in an existing user
export const login = async (req, res, next) => {
    console.log('User login success');
};

// Log out user
export const logout = (req, res, next) => {
    console.log('User sign out success');
};
