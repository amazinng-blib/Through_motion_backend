import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { BusinessAndContactFormSchema } from '../../validation/businessAndContactForm';
import { addBusinessAndContactFormQuestionareService } from '../../services/questionaires/business-contact-form-questionare-service';

export async function businessAndContactFormQuestionareController(
  req: Request,
  res: Response
) {
  try {
    const requestData = BusinessAndContactFormSchema.parse(req.body);
    const response = await addBusinessAndContactFormQuestionareService(
      requestData
    );
    return res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
