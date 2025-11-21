import cloudinary from '../lib/cloudinary.js';
import User from '../models/User.js';
import { createCatchLog } from '../lib/utils.js';

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;

        if (!profilePic) return res.status(400).json({message: "Profile pic is required"});
        
        // Validate base64/data URL format
        if (!profilePic.startsWith('data:image/')) {
            return res.status(400).json({message: "Invalid image format"});
        }


        const userId = req.user._id;
        // const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: 'profile_pictures',
            resource_type: 'image',
            transformation: [
                { width: 400, height: 400, crop: 'fill' }
            ],
            allowed_formats: ['jpg', 'png', 'webp'],
            max_bytes: 2 * 1024 * 1024 // 2MB limit
        });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        createCatchLog(res, error, "updateProfile");
    }
}