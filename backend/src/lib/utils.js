import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks: cross site scripting,
        sameSite: "strict", // CSRF attacks
        secure: ENV.NODE_ENV === 'production'
    });

    return token;
}

export const createCatchLog = (
    res,
    error, 
    pathName, 
    responseMessage = "Internal server error",
    responseStatus = 500
) => {
    console.log(`Error in ${pathName}:`, error);
    res.status(responseStatus).json({ message: responseMessage });
}