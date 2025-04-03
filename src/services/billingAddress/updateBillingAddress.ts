import { AppError } from '../../middleware/errorHandler';
import BillingAddress from '../../models/billingAddress';
import User from '../../models/user';
import { UpdateBillingAddressType } from '../../validation/billingAddress';

export async function updateBillingAddressService(
  input: UpdateBillingAddressType
) {
  // Check whether user exists
  const user = await User.findByPk(input.user_id);
  if (!user) {
    throw new AppError('User does not exist', 404);
  }

  // Check if the user has an existing billing address
  const userBillingAddress = await BillingAddress.findOne({
    where: { user_id: input.user_id },
  });

  if (!userBillingAddress) {
    throw new AppError(
      'Billing address not found. Please create one first.',
      404
    );
  }

  // Update the billing address
  await BillingAddress.update(input, { where: { user_id: input.user_id } });

  // Retrieve the updated billing address
  const updatedBillingAddress = await BillingAddress.findOne({
    where: { user_id: input.user_id },
  });

  return {
    message: 'Billing address updated successfully',
    billingAddress: updatedBillingAddress,
  };
}
