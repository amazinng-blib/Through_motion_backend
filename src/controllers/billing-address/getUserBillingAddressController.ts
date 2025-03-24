import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { getUserBillingAddressService } from '../../services/billingAddress/getUserBillingAddress';

export async function getUserBillingAddressController(
  req: Request,
  res: Response
) {
  try {
    const { userID: userId } = req.body;
    const response = await getUserBillingAddressService(userId);
    return res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
