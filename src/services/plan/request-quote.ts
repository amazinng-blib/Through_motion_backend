import { AppError } from '../../middleware/errorHandler';
import Plans from '../../models/planModel';
// import User from '../../models/user';
import { PlanType } from '../../validation/planSchema';
import dotenv from 'dotenv';
dotenv.config();

export async function requestQuoteService(input: PlanType) {
  const hasRequestedQuote = await Plans.findOne({
    where: {
      user_id: input.user_id,
      is_replied: false,
      plan_title: input.plan_title,
      business_email: input.business_email,
    },
  });

  if (hasRequestedQuote) {
    throw new AppError('You have already requested a quote', 400);
  }

  const link = process.env.APP_LINK;

  const plan = await Plans.create({
    ...input,
    quote_url: `${link}${input.business_email}`,
  });

  return {
    message: 'Quote requested successfully',
    qutoe: plan,
  };
}
