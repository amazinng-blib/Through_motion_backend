import { AppError } from '../../middleware/errorHandler';
import Pricing from '../../models/subscriptionModel';
import { UpdateServiceType } from '../../validation/subscription';

export async function updateService(payload: UpdateServiceType) {
  const { id, duration, ...rest } = payload;

  const productToUpdate = await Pricing.findByPk(id);

  if (!productToUpdate) {
    throw new AppError('Service not found', 404);
  }

  // Ensure duration doesn't become negative
  const newDuration = productToUpdate.duration + (duration ?? 0);
  if (newDuration < 0) {
    throw new AppError('Invalid update: duration cannot be negative', 400);
  }

  const result = await productToUpdate.update({
    ...rest, // Update only provided fields
    duration: newDuration,
  });

  return {
    message: 'Service updated successfully',
    data: result,
  };
}
