import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js'; 

export const isVerifyToken = async (req, res, next) => {
    try {
        // Retrieve JWT token from cookies
        const token = req.cookies.jwt;

        // Check if token exists
        if (!token) return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
        
        // Verify token validity
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by decoded userId
        const user = await prisma.user.findUnique({
            where: {
                user_id: decoded.userId,
            },
            select: {
                user_id: true,
                role: true,
            },
        });

        // Check if user exists
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        // Attach user information to the request object
        req.user = {
            id: user.user_id,
            role: user.role,
        };

        next();
    } catch (error) {
        console.error('Error in protectRoute middleware: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Forbidden - Insufficient permissions' }); 
};
