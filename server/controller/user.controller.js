import prisma from "../prismaClient.js";
import bcryptjs from 'bcryptjs';

// Create Admin
export const admin = async (req, res, next) => {
    const { username, password, email } = req.body;

    try {

        if (!username || !password || !email) return res.status(400).json({ error: 'Username, password, and email are required!' });
        
        // Check if the user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existingUser) return res.status(400).json({ error: `User already exist!` });
        
        // Hash the password
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);

        // Create user in tbl_users
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                email: email,
                role: 'admin',
            }
        });

        // Send response
        res.status(201).json({
            success: true,
            message: 'Admin created successfully!',
            userId: user.user_id
        });

    } catch (error) {
        console.error('Error during admin creation:', error);
        res.status(500).json({ error: 'An error occurred while creating the admin.' });
        next(error);
    }
};

// Update Admin
export const updateAdmin = async (req, res, next) => {
    const { adminId } = req.params;
    const { username, password, email } = req.body;

    try {
        // Check if the admin exists
        const existingAdmin = await prisma.user.findUnique({
            where: {
                user_id: Number(adminId),
            },
        });

        if (!existingAdmin) {
            return res.status(404).json({ error: 'Admin not found!' });
        }

        // Check if the username or email already exists (excluding the current admin)
        const existingUser = await prisma.user.findFirst({
            where: {
                AND: [
                    {
                        OR: [
                            { username: username },
                            { email: email }
                        ]
                    },
                    {
                        user_id: {
                            not: existingAdmin.user_id, 
                        },
                    }
                ]
            }
        });

        if (existingUser) return res.status(400).json({ error: `Username or email already in use!` });

        // Check if the new values are the same as the existing ones
        const isSameUsername = username ? username === existingAdmin.username : true;
        const isSameEmail = email ? email === existingAdmin.email : true;
        const isSamePassword = password ? bcryptjs.compareSync(password, existingAdmin.password) : true;

        if (isSameUsername && isSameEmail && isSamePassword) {
            return res.status(200).json({ error: 'No changes made to the admin.' });
        }

        // Prepare the updated data
        let updatedData = {
            username: username || existingAdmin.username,
            email: email || existingAdmin.email,
        };

        if (password) {
            const salt = bcryptjs.genSaltSync(10);
            updatedData.password = bcryptjs.hashSync(password, salt); 
        }

        // Update user in tbl_users
        const updatedUser = await prisma.user.update({
            where: {
                user_id: existingAdmin.user_id,
            },
            data: updatedData,
        });

        // Send response
        res.status(200).json({
            success: true,
            message: `Admin ${updatedUser.username} updated successfully`,
            userId: updatedUser.user_id,
        });
    } catch (error) {
        console.error('Error during admin update:', error);
        next(error);
    }
};

// Get All Admins and Count
export const getAllAdmins = async (req, res, next) => {
  try {
      const admins = await prisma.user.findMany({
          where: {
              role: 'admin',
              user_id: {
                  not: req.user.id,
              },
          },
          select: {
              user_id: true,
              username: true,
              email: true,
              role: true,
              created_at: true,
          },
      });

      // Count the total number of admins
      const adminCount = admins.length;

      // Send response
      res.status(200).json({
          success: true,
          message: 'Admins retrieved successfully!',
          count: adminCount,
          admins: admins,
      });
  } catch (error) {
      console.error('Error retrieving admins:', error);
      next(error);
  }
};

export const getAllStudents = async (req, res, next) => {
    try {
      const students = await prisma.student.findMany({
        include: {
          User: {
            select: {
              username: true,
              email: true,
              role: true,
              created_at: true,
            },
          },
          YearLevelType: {
            select: {
              year_level_type: true,
            },
          },
          Strand: {
            select: {
              strand_name: true,
            },
          },
          Course: {
            select: {
              course_name: true,
            },
          },
          TesdaCourse: {
            select: {
              course_name: true,
            },
          },
        },
      });
      
      const  studentCount = students.length;

       res.status(200).json({
        success: true,
        message: 'Students retrieved successfully!',
        count: studentCount,
        students: students,
    });
    } catch (error) {
        console.error('Error fetching students:', error);
        next(error);
    }
  };
  