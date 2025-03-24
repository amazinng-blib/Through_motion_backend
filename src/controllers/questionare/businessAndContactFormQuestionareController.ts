import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { BusinessAndContactFormSchema } from '../../validation/businessAndContactForm';
import {
  addBusinessAndContactFormQuestionareService,
  getBusinessAndContactFormQuestionareService,
} from '../../services/questionaires/business-contact-form-questionare-service';

export async function businessAndContactFormQuestionareController(
  req: Request,
  res: Response
) {
  try {
    const requestData = BusinessAndContactFormSchema.parse(req.body);
    const result = await addBusinessAndContactFormQuestionareService(
      requestData
    );
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getBusinessAndContactFormQuestionareController(
  req: Request,
  res: Response
) {
  try {
    const { userId } = req.body;
    const result = await getBusinessAndContactFormQuestionareService(userId);
    return res.status(200).json(result);
  } catch (error) {
    handleError(error, res);
  }
}
