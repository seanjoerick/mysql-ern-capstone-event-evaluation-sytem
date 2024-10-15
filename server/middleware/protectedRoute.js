import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js'; 

const protectRoute = async (req, res, next) => {
    try {
        // Retrieve JWT token from cookies
        const token = req.cookies.jwt;

        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
        }

        // Verify token validity
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token verification failed
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
        }

        // Find user by decoded userId and exclude password field
        const user = await prisma.user.findUnique({
            where: {
                user_id: decoded.userId,
            },
            select: {
                password: false,
            },
        });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log('Error in protectRoute middleware: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default protectRoute;
