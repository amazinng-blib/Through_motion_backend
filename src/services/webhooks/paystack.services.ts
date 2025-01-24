import { sequelize } from '../../db/DB';
import UserSubscription from '../../models/UserSubscription';
import ServiceCategory from '../../models/ServiceCategory';
import { getActiveServiceCategory } from '../subscription/utils/getActiveServiceCategory';
import * as subscriptionService from '../subscription/subscription.services';
import { CreateSubscriptionInput } from '../../validation/subscription';
import { upgradeSubscription } from '../subscription/subscription-upgrade';

export async function handleSubscriptionCharge(payload: any) {
  const transaction = await sequelize.transaction();

  try {
    const {
      reference_number,
      status,
      userId,
      planCode,
      name,
      type,
      tier,
      servicePrice,
      currency,
      description,
      duration,
    } = payload;

    if (status !== 'success') {
      throw new Error('Payment was not successful');
    }

    const userActiveServiceCategory = await getActiveServiceCategory(
      { name, type, tier },
      { transaction }
    );

    if (userActiveServiceCategory.length !== 0) {
      await Promise.all(
        userActiveServiceCategory.map(async (item) => {
          const checkUserCategory = await ServiceCategory.findOne({
            where: {
              type: item.type,
              tier: item.tier,
              name: item.name,
              isActive: true,
              ...transaction,
            },
          });
          if (checkUserCategory) {
            return await upgradeSubscription({
              serviceCategoryId: Number(checkUserCategory?.id as number),
              userId,
              extensionDays: duration,
              reference_number,
            });
          }
        })
      );
    }

    const data: CreateSubscriptionInput = {
      userId,
      reference_number,
      subscriptionData: [
        {
          name,
          planCode,
          type,
          tier,
          servicePrice,
          currency,
          description,
          duration,
        },
      ],
    };

    const subscription = await subscriptionService.createSubscription(data, {
      transaction,
    });

    await transaction.commit();
    return subscription;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function handleSubscriptionCreate(payload: any) {
  const transaction = await sequelize.transaction();

  try {
    const {
      plan: { plan_code },
      status,
      userId,
    } = payload;

    if (status !== 'active') {
      throw new Error('Subscription is not active');
    }

    const serviceCategory = await ServiceCategory.findOne({
      where: { userId },
      transaction,
    });

    if (!serviceCategory) {
      throw new Error('Service category not found');
    }

    await UserSubscription.upsert(
      {
        userId: serviceCategory.userId,
        planCode: plan_code,
        serviceCategoryPlanCode: serviceCategory.planCode,
        isActive: true,
        totalPrice: serviceCategory.servicePrice,
        discountApplied: false,
      },
      { transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function handleSubscriptionDisable(payload: any) {
  const transaction = await sequelize.transaction();

  try {
    const {
      plan: { plan_code },
    } = payload;

    await UserSubscription.update(
      { isActive: false },
      {
        where: { planCode: plan_code },
        transaction,
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
