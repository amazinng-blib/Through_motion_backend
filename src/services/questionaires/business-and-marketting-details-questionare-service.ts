import { AppError } from '../../middleware/errorHandler';
import BusinessAndMarketingDetails from '../../models/businessAndMarketingDetails';
import User from '../../models/user';
import { BusinessAndMarketingDetailsType } from '../../validation/businessAndMarkettingDetails';

export async function addBusinessAndMarketingDetailsQuestionareService(
  input: BusinessAndMarketingDetailsType
) {
  // Check whether user exists
  const user = await User.findByPk(input.userId);
  if (!user) {
    throw new AppError('User does not exist', 404);
  }

  //   check if user has added questionaire
  const hasAddedQuestionare = await BusinessAndMarketingDetails.findOne({
    where: {
      userId: input.userId,
    },
  });

  if (hasAddedQuestionare) return;

  await BusinessAndMarketingDetails.create(input);

  return { message: 'Questionare added successfully' };
}
