import { AppError } from '../middleware/errorHandler';
import Subscriptions from '../models/subscriptions';

export async function paymentChecker(
  subscriptionId: number,
  first_name: string,
  last_name: string,
  email: string
) {
  try {
    const hasPaid = await Subscriptions.findByPk(subscriptionId);

    if (!hasPaid || !hasPaid.is_paid) {
      throw new AppError('Subscribe to a plan to continue', 400);
    }

    // Compare user details
    // convert to lowercase and trim to ensure consistency
    const isMatch =
      hasPaid.user.first_name.toLowerCase().trim() ===
        first_name.toLowerCase().trim() &&
      hasPaid.user.last_name.toLowerCase().trim() ===
        last_name.toLowerCase().trim() &&
      hasPaid.user.email.toLowerCase().trim() === email.toLowerCase().trim();

    if (!isMatch) {
      throw new AppError('User details do not match', 400);
    }

    return { success: true };
  } catch (error) {
    console.error('Error checking payment:', error);
    return { success: false, message: 'Internal server error' };
  }
}
