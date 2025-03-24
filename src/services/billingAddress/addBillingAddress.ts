import { AppError } from '../../middleware/errorHandler';
import BillingAddress from '../../models/billingAddress';
import User from '../../models/user';
import { BillingAddressType } from '../../validation/billingAddress';

export async function addBillingAddressService(input: BillingAddressType) {
  // check whether user exist
  const user = await User.findByPk(input.userId);
  if (!user) {
    throw new AppError('User does not exist', 404);
  }

  await BillingAddress.create(input);
  return { message: 'Billing address added successfully' };
}
