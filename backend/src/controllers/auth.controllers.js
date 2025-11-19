import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";




export const signup = async (req, res) => {
    function errorResponseMessage(message, status = 400) {
        res.status(status).json({ message });
    }

    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return errorResponseMessage('All fields are required!');
        }

        if (password.length < 6) {
            return errorResponseMessage('Password must be at least 6 characters');
        }

        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegEx.test(email)) {
            return errorResponseMessage('Invalid email format');
        }

        const user = await User.findOne({ email });
        if (user) return errorResponseMessage('Email already exists!');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(newUser._id, res);


            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
            // todo: send a welcome email to user
            try {
                console.log("Sending Welcome email...");
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.error(error);
            }
        }

    } catch (error) {
        console.log("Error in signup controller:", error);
        errorResponseMessage("Something went wrong!", 500);
    }
}


export const login = (req, res) => {
    res.send('Login endpoint')
}


export const logout = (req, res) => {
    res.send('Logout endpoint')
}