import { ServiceCategory } from '../../models';
import { type UpdateSubscriptionInput } from '../../validation/subscription';
import { verifyPayment } from './subscription.services';

export async function upgradeSubscription(input: UpdateSubscriptionInput) {
  const subscription = await ServiceCategory.findOne({
    where: {
      id: input.serviceCategoryId,
      userId: input.userId,
      isActive: true,
    },
  });

  if (!subscription) {
    throw new Error('Subscription not found');
  }

  const PaymentStatus = await verifyPayment(input.reference_number);

  if (!PaymentStatus) {
    throw new Error('payment verification failed');
  }

  //update subscription serviceCategory

  const previousEndDate = subscription.endDate;
  const additionalDays = input.extensionDays;
  const currentEndDate = new Date(
    previousEndDate.getTime() + additionalDays * 24 * 60 * 60 * 1000
  );

  await subscription.update({ isActive: true, endDate: currentEndDate });

  return subscription;
}
