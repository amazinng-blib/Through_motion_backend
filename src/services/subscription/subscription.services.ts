import axios from 'axios';
import { ServiceCategory, UserSubscription } from '../../models';
import { ServiceType } from '../../models/ServiceCategory';
import { generateUniqueId } from '../../utils/planCodeGenerator';
import { type CreateSubscriptionInput } from '../../validation/subscription';

async function checkSpecialOfferEligibility(
  types: ServiceType[]
): Promise<boolean> {
  // Check for required service types for special offers
  return (
    types.includes(ServiceType.LOCAL_SEO) &&
    types.includes(ServiceType.LOCATION_MARKETING)
  );
}

function calculateDiscount(total: number): number {
  return total * 0.9; // Apply a 10% discount
}

export async function createSubscription(input: CreateSubscriptionInput) {
  const { subscriptionData, userId } = input;

  // Check active plans associated with the user
  const plans = await UserSubscription.findAll({
    where: { userId, isActive: true },
  });

  if (plans.length > 0) {
    const findAllActivePlans = plans.map((plan) => plan.isActive);
    return {
      success: false,
      message: 'You still have active subscription, upgrade',
      data: { findAllActivePlans },
    };
  }

  // create subscription services

  const planCode = generateUniqueId();

  await ServiceCategory.bulkCreate(
    subscriptionData.map(
      (plan) => {
        return {
          userId,
          name: plan.name,
          planCode,
          type: plan.type,
          tier: plan.tier,
          servicePrice: plan.servicePrice,
          currency: plan.currency,
          isActive: true,
          description: plan.description,
          startDate: new Date(),
          endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
        };
      },
      { returning: true }
    )
  );
  // Validate and calculate the total price from input
  const totalPrice = subscriptionData.reduce(
    (sum, plan) => sum + plan.servicePrice,
    0
  );

  // Determine if the user is eligible for a discount
  const serviceTypes = subscriptionData.map((plan) => plan.type);
  const isEligibleForDiscount = await checkSpecialOfferEligibility(
    serviceTypes
  );

  let finalPrice = totalPrice;
  if (isEligibleForDiscount) {
    finalPrice = calculateDiscount(totalPrice);
  }

  // Create subscription
  const subscriptions = UserSubscription.create({
    userId,
    serviceCategoryPlanCode: planCode,
    planCode,
    totalPrice: finalPrice,
    discountApplied: isEligibleForDiscount,
  });

  return subscriptions;
}

export async function checkSubscriptionStatus(
  planCode: string,
  userId: number
): Promise<boolean> {
  const userServices = await ServiceCategory.findAll({
    where: { planCode, userId },
  });
  const now = new Date();

  // check individual subscription status end date
  await Promise.all(
    userServices.map(async (service) => {
      if (service.isActive && now > service.endDate) {
        await service.update({ isActive: false });
      }
    })
  );

  // Refresh the services data after updates
  const services = await ServiceCategory.findAll({
    where: { planCode },
  });

  // Check if any service is still active
  const hasActiveServices = services.some(
    (service) => service.isActive && now <= service.endDate
  );

  // If no active services remain, update UserSubscription
  if (!hasActiveServices) {
    await UserSubscription.update({ isActive: false }, { where: { planCode } });
  }

  return hasActiveServices;
}

export async function verifyPayment(
  reference_number: string
): Promise<boolean> {
  const data = await axios.get(
    `${process.env.PAYSTACK_VERIFY_LINK}${reference_number}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      },
    }
  );

  return data?.data?.data.status === 'success';
}
