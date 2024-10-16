import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, role, res) => {
    try {
        const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
            expiresIn: '15d',
        });

        // Set cookie with the generated token
        res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
            httpOnly: true, // Prevent XSS attacks
            sameSite: 'strict', // Prevent CSRF attacks
            secure: process.env.NODE_ENV === 'production',
        });
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Could not generate token'); 
    }
};

export default generateTokenAndSetCookie; 
