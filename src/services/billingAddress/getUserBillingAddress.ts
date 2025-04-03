import { AppError } from '../../middleware/errorHandler';
import BillingAddress from '../../models/billingAddress';
import User from '../../models/user';

export async function getUserBillingAddressService(userId: number) {
  // check whether user exist
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError('User does not exist', 404);
  }

  const userBillingAddress = await BillingAddress.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!userBillingAddress) return;

  return {
    message: 'Billing address fetched',
    billingAddress: userBillingAddress,
  };
}
