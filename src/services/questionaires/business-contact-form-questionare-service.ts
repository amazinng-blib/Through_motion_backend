import { AppError } from '../../middleware/errorHandler';
import BusinessAndContactForm from '../../models/businessAndContactForm';
import User from '../../models/user';
import { BusinessAndContactFormType } from '../../validation/businessAndContactForm';

export async function addBusinessAndContactFormQuestionareService(
  input: BusinessAndContactFormType
) {
  // Check whether user exists
  const user = await User.findByPk(input.userId);
  if (!user) {
    throw new AppError('User does not exist', 404);
  }

  //   check if user has added questionaire

  const hasAddedQuestionare = await BusinessAndContactForm.findOne({
    where: {
      userId: input.userId,
    },
  });

  if (hasAddedQuestionare) return;

  await BusinessAndContactForm.create(input);
  return {
    message: 'Business and contact form questionare added successfully',
  };
}
