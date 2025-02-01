import Pricing from '../../models/subscriptionModel';
import { Service } from '../../validation/subscription';

export async function getServiceById(id: number): Promise<Service | null> {
  return await Pricing.findByPk(id);
}
