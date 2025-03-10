import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { UpdateBillingAddressSchema } from '../../validation/billingAddress';
import { updateBillingAddressService } from '../../services/billingAddress/updateBillingAddress';

export async function updateBillingAddressController(
  req: Request,
  res: Response
) {
  try {
    const requestData = UpdateBillingAddressSchema.parse(req.body);
    const response = await updateBillingAddressService(requestData);

    return res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
