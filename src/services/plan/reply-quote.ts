import { AppError } from '../../middleware/errorHandler';
import { sequelize } from '../../db/DB'; // Ensure you import sequelize
import Plans from '../../models/planModel';
import { PricingType } from '../../validation/pricingSchema';
import Pricing from '../../models/pricingModel';

export async function replyQuoteService(input: PricingType) {
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    // Find the associated Plan
    const plan = await Plans.findOne({
      where: { id: input.plan_id },
      transaction,
    });

    if (!plan) {
      throw new AppError('Plan not found', 400);
    }

    // Create Pricing record inside the transaction
    const replyQuote = await Pricing.create(input, { transaction });

    // Update is_replied in the Plan
    const updatedPlan = await Plans.update(
      { is_replied: true },
      { where: { id: input.plan_id }, transaction }
    );

    // Commit the transaction
    await transaction.commit();

    // send email to the user --- Coming soon

    return {
      message: 'Quote replied successfully',
      quote: replyQuote,
      updatedPlan,
    };
  } catch (error) {
    // Rollback in case of failure
    await transaction.rollback();
    throw error;
  }
}
