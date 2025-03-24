import { Request } from 'express';
import { AppError } from '../middleware/errorHandler';

export async function handleFileUplaods(req: Request) {
  if (!req.files) {
    throw new AppError('No files uploaded', 400);
  }

  const files = req.files as Express.Multer.File[];

  const uploadedFiles = files.map((file) => ({
    url: (file as string | any).path, // Cloudinary URL
    fileName: file.originalname,
  }));

  return uploadedFiles;
}

//|| (req.files as Express.Multer.File[]).length === 0
