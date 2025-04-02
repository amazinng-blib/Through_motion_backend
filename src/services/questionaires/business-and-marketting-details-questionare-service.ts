import { AppError } from '../../middleware/errorHandler';
import BusinessAndMarketingDetails from '../../models/businessAndMarketingDetails';
import User from '../../models/user';
import { BusinessAndMarketingDetailsType } from '../../validation/businessAndMarkettingDetails';

export async function addBusinessAndMarketingDetailsQuestionareService(
  input: BusinessAndMarketingDetailsType
) {
  // Check whether user exists
  const user = await User.findByPk(input.user_id);
  if (!user) {
    throw new AppError('User does not exist', 404);
  }

  // Use upsert to create or update
  const [businessDetails, created] = await BusinessAndMarketingDetails.upsert(
    input
  );

  return {
    message: created
      ? 'Questionnaire added successfully'
      : 'Questionnaire updated successfully',
    data: businessDetails,
  };
}

export async function getBusinessAndMarketingDetailsQuestionareService(
  user_id: number
) {
  const businessDetails = await BusinessAndMarketingDetails.findOne({
    where: {
      user_id,
    },
  });

  if (!businessDetails) {
    throw new AppError('Business and marketing details not found', 404);
  }

  return businessDetails;
}
