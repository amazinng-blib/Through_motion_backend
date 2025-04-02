import { Op } from 'sequelize';
import { sequelize } from '../../db/DB';
import { AppError } from '../../middleware/errorHandler';
import Subscriptions, { SubscriptionStatus } from '../../models/subscriptions';
import { verifyPayment } from '../../utils/verifyPayment';
import {
  SubscribedServicesType,
  SubscriptionsType,
} from '../../validation/subscriptionSchema';
import Plan from '../../models/planModel';

/**
 * Get a valid SubscriptionStatus from the input string
 */

function getValidSubscriptionStatus(status: string): SubscriptionStatus {
  const statusKey = Object.keys(SubscriptionStatus).find(
    (key) =>
      SubscriptionStatus[key as keyof typeof SubscriptionStatus] === status
  ) as keyof typeof SubscriptionStatus;

  if (!statusKey) {
    throw new AppError(`Invalid subscription status: ${status}`, 400);
  }

  return SubscriptionStatus[statusKey];
}

/**
 * Check if the user has an expired subscription and remove it along with its plan
 */
export async function removeExpiredSubscription(
  userId: number,
  transaction: any,
  planId: number,
  subscribed_services: SubscribedServicesType
) {
  const expiredSubscription = await Subscriptions.findAll({
    where: {
      userId,
      planId,
      subscribed_services: {
        [Op.contains]: subscribed_services.map((service) => ({
          service_title: service.service_title,
          options: service.options.filter((option) => option.is_expired),
        })),
      },
    },
    transaction,
  });

  for (const expired of expiredSubscription) {
    await Plan.destroy({
      where: { id: expired.planId },
      transaction,
    });
    await Subscriptions.destroy({
      where: { id: expired.id },
      transaction,
    });
  }
}

/**
 * Create or update a subscription for the user
 */
async function createOrUpdateSubscription(
  input: SubscriptionsType,
  status: SubscriptionStatus,
  transaction: any
) {
  const existingSubscription = await Subscriptions.findOne({
    where: {
      userId: input.userId,
      planId: input.planId,
      subscribed_services: {
        [Op.contains]: input.subscribed_services.map((service) => ({
          service_title: service.service_title,
          options: service.options.filter((option) => !option.is_expired),
        })),
      },
    },
    transaction,
  });

  if (existingSubscription) {
    // Update existing subscription
    await existingSubscription.update(
      { ...input, is_verified: true, status },
      { transaction }
    );
    return existingSubscription;
  } else {
    // Create new subscription

    const sub = await Subscriptions.create(
      { ...input, is_verified: true, status, is_paid: true },
      { transaction }
    );
    if (!sub.id) {
      throw new AppError('Failed to create subscription', 500);
    }
    await Plan.update(
      { subscriptionId: sub.id },
      { where: { id: input.planId }, transaction }
    );
    return sub;
  }
}

/**
 * Update the subscription ID in the Plans table
//  */
// async function updatePlanSubscription(
//   planId: number,
//   subscriptionId: number,
//   transaction: any
// ) {
//   await Plans.update(
//     { subscriptionId },
//     { where: { id: planId }, transaction }
//   );
// }

/**
 * Main function to handle subscriptions
 */
export async function subscriptionService(input: SubscriptionsType) {
  const transaction = await sequelize.transaction();

  try {
    // await removeExpiredSubscription(input.userId, transaction);
    await verifyPayment(input.reference_number);

    const status = getValidSubscriptionStatus(input.status);
    const subscription = await createOrUpdateSubscription(
      input,
      status,
      transaction
    );

    await transaction.commit();
    return {
      message: subscription
        ? 'Subscription updated successfully'
        : 'Subscription created successfully',
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
