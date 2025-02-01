import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import User from '../models/user';

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      throw new AppError('Unauthorized access. No user found.', 401);
    }

    // Fetch the user details from the database
    const loggedInUser = await User.findOne({
      where: { id: userID },
    });

    if (!loggedInUser) {
      throw new AppError('User not found.', 404);
    }

    // Check if the user's role is "ADMIN"
    if (loggedInUser.role !== 'ADMIN') {
      throw new AppError('Access denied. Admin privileges are required.', 403);
    }

    // If the user is an admin, proceed to the next middleware/controller
    next();
  } catch (error) {
    next(error);
  }
};
