import { Op } from 'sequelize';
import { isAfter } from 'date-fns';
import { sequelize } from '../../db/DB';
import Subscriptions, { SubscriptionStatus } from '../../models/subscriptions';
import { SubscribedServicesType } from '../../validation/subscriptionSchema';

/**
 *
 * @param userId
 * @param subscribed_services
 * @returns checkSubscriptions that is due and expires it
 */

export async function checkDueSubscriptionsAndUpdate(
  userId: number,
  subscribed_services: SubscribedServicesType
) {
  const transaction = await sequelize.transaction();
  const currentDate = new Date();

  // Fetch user subscriptions
  const userSubscriptions = await Subscriptions.findAll({
    where: {
      userId,
      subscribed_services: {
        [Op.contains]: subscribed_services.map((service) => ({
          service_title: service.service_title,
          options: service.options.filter((option) =>
            isAfter(currentDate, new Date(option.ends_at))
          ),
        })),
      },
    },
    transaction,
  });

  // Loop through subscriptions and update is_expired field
  for (const subscription of userSubscriptions) {
    const updatedServices = subscription.subscribed_services.map((service) => ({
      ...service,
      options: service.options.map((option) => {
        if (isAfter(currentDate, new Date(option.ends_at))) {
          return {
            ...option,
            is_expired: true,
            status: SubscriptionStatus.EXPIRED,
          };
        }
        return option;
      }),
    }));

    // Save updated subscription data back to the DB
    await subscription.update(
      { subscribed_services: updatedServices },
      { transaction }
    );
  }

  await transaction.commit();
  return userSubscriptions;
}
