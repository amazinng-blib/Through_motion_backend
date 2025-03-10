import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { addBillingAddressService } from '../../services/billingAddress/addBillingAddress';
import { BillingAddressSchema } from '../../validation/billingAddress';

export async function addBillingAddressController(req: Request, res: Response) {
  try {
    const requestData = BillingAddressSchema.parse(req.body);
    const response = await addBillingAddressService(requestData);
    return res.status(201).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
