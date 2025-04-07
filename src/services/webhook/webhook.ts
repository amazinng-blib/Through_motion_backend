import { sequelize } from '../../db/DB';
import { AppError } from '../../middleware/errorHandler';
import { SubscriptionStatus } from '../../models/subscriptions';
import { SubscriptionsType } from '../../validation/subscriptionSchema';
import {
  // removeExpiredSubscription,
  subscriptionService,
} from '../subscriptions/subscribe-to-service';

export async function processPaystackWebhook(event: any) {
  if (!event) {
    throw new AppError('Invalid webhook data', 400);
  }

  const transaction = await sequelize.transaction();

  try {
    const { event: eventType, data } = event;

    if (eventType !== 'charge.success') {
      throw new AppError('Unhandled event type', 400);
    }

    const { metadata } = data;

    if (!metadata || !metadata.userId || !metadata.planId || !metadata.status) {
      throw new AppError('Missing metadata for subscription', 400);
    }

    const userId = metadata.userId;
    const planId = metadata.planId;
    const subscriptionStatus =
      SubscriptionStatus[
        metadata.status.toUpperCase() as keyof typeof SubscriptionStatus
      ];

    const subData: SubscriptionsType = {
      user_key: userId,
      user: metadata.user,
      planId,
      reference_number: metadata.reference_number,
      status: subscriptionStatus,
      subscribed_services: metadata.subscribed_services,
      duration: metadata.duration,
    };

    if (!subscriptionStatus) {
      throw new AppError('Invalid subscription status in metadata', 400);
    }

    // Delete previous expired subscription
    // await removeExpiredSubscription(userId, planId, metadata.subscribed_services, transaction);

    // Call subscription service (create/update)
    await subscriptionService(subData);

    await transaction.commit();
    return { message: 'Subscription processed successfully' };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
