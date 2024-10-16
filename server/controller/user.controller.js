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

        if (existingUser) return res.status(400).json({ error: 'User already exists!' });
        
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
