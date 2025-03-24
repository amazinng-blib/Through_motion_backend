import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'uploads', // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    // format: file.mimetype.split('/')[1], // Automatically set format based on file type
    public_id: `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`, // Replace spaces in filename
  }),
});

const upload = multer({ storage });

export default upload;
