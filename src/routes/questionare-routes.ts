import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { businessAndContactFormQuestionareController } from '../controllers/questionare/businessAndContactFormQuestionareController';
import { businessAndMarketingDetailsController } from '../controllers/questionare/businessAndMarketingDetailsQuestionareController';

export const router = Router();
router.post(
  '/add-contact-address',
  verifyToken,
  businessAndContactFormQuestionareController
);

router.post(
  '/add-marketing-details',
  verifyToken,
  businessAndMarketingDetailsController
);
