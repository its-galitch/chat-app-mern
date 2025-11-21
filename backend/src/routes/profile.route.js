import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { updateProfile } from '../controllers/profile.controller.js';

const router = express.Router();

router.post('/picture',  protectRoute, updateProfile);

export default router; 