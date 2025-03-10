import SubscribeToNewsletter from '../../models/subscribeToNewsletter';
import { AppError } from '../../middleware/errorHandler';
import { SubscribeToNewsletterType } from '../../validation/subscribeToNewsletter';

export async function subscribeToNewsletterService(
  input: SubscribeToNewsletterType
): Promise<{ message: string }> {
  // Check if email already exists to prevent duplicates
  const existingSubscription = await SubscribeToNewsletter.findOne({
    where: { email: input.email },
  });

  if (existingSubscription) {
    throw new AppError('Email is already subscribed', 400);
  }

  await SubscribeToNewsletter.create({ email: input.email });

  return { message: 'Subscription successful' };
}
