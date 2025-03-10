import { Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import { BusinessAndMarketingDetailsSchema } from '../../validation/businessAndMarkettingDetails';
import { addBusinessAndMarketingDetailsQuestionareService } from '../../services/questionaires/business-and-marketting-details-questionare-service';
import { handleFileUplaods } from '../../utils/handle-file-uploads';

export async function businessAndMarketingDetailsController(
  req: Request,
  res: Response
) {
  try {
    const requestData = BusinessAndMarketingDetailsSchema.parse(req.body);
    const files = await handleFileUplaods(req);
    const data = {
      ...requestData,
      previousCampaign: {
        ...requestData.previousCampaign,
        file: files,
      },
    };

    const response = await addBusinessAndMarketingDetailsQuestionareService(
      data
    );
    return res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
}
