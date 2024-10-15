// import prisma from '../prismaClient.js';
// import bcryptjs from 'bcryptjs';
// import generateTokenAndSetCookie from '../utils/generateToken.js';

// // Sign up user
// export const signup = async (req, res, next) => {
//   const { username, email, password, firstName, lastName, yearLevelId, strandId, courseId, tesdaCourseId } = req.body;

//   try {
//       // Check if the user already exists
//       const existingUser = await prisma.user.findFirst({
//           where: {
//               OR: [
//                   { username: username },
//                   { email: email }
//               ]
//           }
//       });

//       if (existingUser) {
//           return res.status(400).json({ error: 'User already exists!' });
//       }

//       // Hash the password
//       const salt = bcryptjs.genSaltSync(10);
//       const hashedPassword = bcryptjs.hashSync(password, salt);

//       // Create user in tbl_users
//       const user = await prisma.user.create({
//           data: {
//               username: username,
//               password: hashedPassword,
//               email: email,
//               role: 'student',
//           }
//       });

//       // Create user in tbl_students
//       const student = await prisma.student.create({
//           data: {
//               user_id: user.user_id,
//               first_name: firstName,
//               last_name: lastName,
//               year_level_id: yearLevelId,
//               strand_id: strandId || null,
//               course_id: courseId || null,
//               tesda_course_id: tesdaCourseId || null
//           },
//       });

//       // Generate JWT token and set cookie
//       await generateTokenAndSetCookie(user.user_id, res);

//       // Send response
//       res.status(201).json({
//           success: true,
//           message: 'User created successfully!',
//           userId: user.user_id,
//           studentId: student.student_id
//       });

//   } catch (error) {
//       console.error('Error during signup:', error);
//       next(error);
//   }
// };

// // Log in an existing user
// export const login = async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const validUser = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     // Check if user exists and verify password
//     const validPassword = validUser && bcryptjs.compareSync(password, validUser.password);

//     // Check credentials
//     if (!validUser || !validPassword) {
//       return res.status(400).json({ error: 'Wrong credentials!' });
//     }

//     // Generate JWT token and set cookie
//     await generateTokenAndSetCookie(validUser.user_id, res); // Use user_id to generate the token

//     // Send response
//     res.status(200).json({
//       success: true,
//       message: 'User logged in successfully!',
//       userId: validUser.user_id, // Adjusted from _id to user_id
//       username: validUser.username, // Include any other user details you want
//       email: validUser.email,
//       role: validUser.role,
//     });

//   } catch (error) {
//     console.error('Error in login controller:', error);
//     next(error);
//   }
// };

// // Log out user
// export const logout = (req, res, next) => {
//   try {
//     res.clearCookie('jwt').status(200).json({ message: 'Logged out successfully' });
//   } catch (error) {
//     console.error('Error during logout:', error);
//     next(error);
//   }
// };
import prisma from '../prismaClient.js';
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

// Sign up user
export const signup = async (req, res, next) => {
  const { username, email, password, firstName, lastName, yearLevelId, strandId, courseId, tesdaCourseId } = req.body;

  try {
      // Check if the user already exists
      const existingUser = await prisma.user.findFirst({
          where: {
              OR: [
                  { username: username },
                  { email: email }
              ]
          }
      });

      if (existingUser) {
          return res.status(400).json({ error: 'User already exists!' });
      }

      // Hash the password
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(password, salt);

      // Create user in tbl_users
      const user = await prisma.user.create({
          data: {
              username: username,
              password: hashedPassword,
              email: email,
              role: 'student',
          }
      });

      // Create user in tbl_students
      const student = await prisma.student.create({
          data: {
              user_id: user.user_id,
              first_name: firstName,
              last_name: lastName,
              year_level_id: yearLevelId,
              strand_id: strandId || null,
              course_id: courseId || null,
              tesda_course_id: tesdaCourseId || null
          },
      });

      // Generate JWT token and set cookie
      await generateTokenAndSetCookie(user.user_id, res);

      // Send response
      res.status(201).json({
          success: true,
          message: 'User created successfully!',
          userId: user.user_id,
          studentId: student.student_id
      });

  } catch (error) {
      console.error('Error during signup:', error);
      next(error);
  }
};

// Log in an existing user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const validUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Check if user exists and verify password
    if (!validUser) return res.status(400).json({ error: 'The email or password you entered is incorrect.' });
    
    
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    // Check credentials
    if (!validPassword) return res.status(400).json({ error: 'Wrong password!' });
    

    // Generate JWT token and set cookie
    await generateTokenAndSetCookie(validUser.user_id, res);

    // Send response
    res.status(200).json({
      success: true,
      message: 'User logged in successfully!',
      userId: validUser.user_id,
      username: validUser.username,
      email: validUser.email,
      role: validUser.role,
    });

  } catch (error) {
    console.error('Error in login controller:', error);
    next(error);
  }
};

// Log out user
export const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    next(error);
  }
};