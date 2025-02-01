import Pricing from '../../models/subscriptionModel';
import { Service } from '../../validation/subscription';

export async function getAllServices(): Promise<Service[]> {
  return await Pricing.findAll();
}
