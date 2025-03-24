import { Request, Response } from 'express';

import { handleError } from '../../utils/handleError';
import { UpdateProfileService } from '../../services/authService/updateProfileService';
import { UpdateProfileSchema, UpdateProfileType } from '../../validation/user';

export async function UpdateProfile(req: Request, res: Response) {
  try {
    const { userID } = req.body;
    const requestData: UpdateProfileType = UpdateProfileSchema.parse(req?.body);

    const user = await UpdateProfileService({ ...requestData, id: userID });

    return res.status(200).json({ message: 'Password updated', user });
  } catch (error) {
    handleError(error, res);
  }
}
