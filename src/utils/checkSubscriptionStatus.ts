import Pricing from '../models/subscriptionModel';

export async function checkSubscriptionStatus(
  planCode: string
): Promise<boolean> {
  const userSubscriptions = await Pricing.findAll({
    where: { planCode },
  });

  const currentDate = new Date();

  // Check if any active subscription exists
  return userSubscriptions.some((sub) => {
    const subscriptionStart = new Date(sub.createdAt as Date);
    const subscriptionEnd = new Date(subscriptionStart);
    subscriptionEnd.setDate(subscriptionEnd.getDate() + sub.duration);

    return subscriptionEnd > currentDate;
  });
}
