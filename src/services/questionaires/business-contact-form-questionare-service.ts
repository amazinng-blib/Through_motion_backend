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

  // Use upsert to create or update
  const [businessContactForm, created] = await BusinessAndContactForm.upsert(
    input
  );

  return {
    message: created
      ? 'Business and contact form questionnaire added successfully'
      : 'Business and contact form questionnaire updated successfully',
    data: businessContactForm,
  };
}

export async function getBusinessAndContactFormQuestionareService(
  userId: number
) {
  const businessDetails = await BusinessAndContactForm.findOne({
    where: {
      userId,
    },
  });

  if (!businessDetails) {
    throw new AppError('Business and contact details not found', 404);
  }

  return businessDetails;
}
