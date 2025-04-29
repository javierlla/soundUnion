import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

function createToken(userData) {
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' });
    return token; 
}

function verifyToken(token) {
    try {
        const result = jwt.verify(token, JWT_SECRET);
        return result;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}

export {
    createToken,
    verifyToken
};
