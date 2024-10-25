import prisma from '../prismaClient.js';
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res, next) => {
  const {
      username,
      email,
      password,
      firstName,
      lastName,
      yearLevelType,
      strandId,
      courseId,
      tesdaCourseId,
  } = req.body;

  try {
      // Check if the user already exists
      const existingUser = await prisma.user.findFirst({
          where: {
              OR: [
                  { username: username },
                  { email: email },
              ],
          },
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
          },
      });

      // Prepare data for student creation with type conversion
      const studentData = {
          first_name: firstName,
          last_name: lastName,
          year_level_type: yearLevelType,
          strand_id: strandId ? parseInt(strandId, 10) : null,
          course_id: courseId ? parseInt(courseId, 10) : null,
          tesda_course_id: tesdaCourseId ? parseInt(tesdaCourseId, 10) : null,
      };

      // Create student using the user_id from the created user
      const student = await prisma.student.create({
          data: {
              user_id: user.user_id,
              ...studentData,
          },
      });

      // Generate JWT token and set cookie
      await generateTokenAndSetCookie(user.user_id, user.role, res);

      const fullName = `${firstName} ${lastName}`;

       // Send response with additional user information
       res.status(201).json({
        success: true,
        message: 'User created successfully!',
        username: user.username,
        fullName: fullName,
        email: user.email,
        role: user.role,
    });
  } catch (error) {
      console.error('Error during signup:', error);
      // Prevent sending multiple responses
      if (!res.headersSent) {
          return res.status(500).json({ error: 'Internal Server Error' });
      }
  }
};


// Log in an existing user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const validUser = await prisma.user.findFirst({
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
    await generateTokenAndSetCookie(validUser.user_id, validUser.role, res);

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