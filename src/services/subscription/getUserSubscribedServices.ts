import Pricing from '../../models/subscriptionModel';
import { Service } from '../../validation/subscription';

export async function getUserSubscribedServices(
  subscriberEmail: string
): Promise<Service[]> {
  return await Pricing.findAll({
    where: {
      subscriberEmail,
    },
  });
}
