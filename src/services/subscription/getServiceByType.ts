import Pricing from '../../models/subscriptionModel';
import { Service } from '../../validation/subscription';

export async function getServicesByType(
  type: string,
  subscriberEmail: string
): Promise<Service[]> {
  return await Pricing.findAll({
    where: { serviceType: type, subscriberEmail },
  });
}
