import { v2 as cloudinary } from 'cloudinary';
import { ENV } from './env.js';

const { CLOUD_NAME, API_KEY, API_SECRET } = ENV.CLOUDINARY;

if(!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error("CLOUD_NAME, API_KEY, API_SECRET are required!");
}


cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

export default cloudinary;