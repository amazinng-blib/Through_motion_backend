import Pricing from '../../models/subscriptionModel';
import { Service } from '../../validation/subscription';

export async function subscribeToService(
  serviceData: Omit<Service, 'id'>
): Promise<Service> {
  return await Pricing.create(serviceData);
}
