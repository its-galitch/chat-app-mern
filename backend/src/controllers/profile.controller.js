import cloudinary from '../lib/cloudinary.js';
import User from '../models/User.js';
import { createCatchLog } from '../lib/utils.js';

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) return res.status(400).json({message: "Profile pic is required"});
        const userId = req.user._id;
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        createCatchLog(res, error, "updateProfile");
    }
}