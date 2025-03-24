import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import {
  businessAndContactFormQuestionareController,
  getBusinessAndContactFormQuestionareController,
} from '../controllers/questionare/businessAndContactFormQuestionareController';
import {
  businessAndMarketingDetailsController,
  getBusinessAndMarketingDetailsController,
} from '../controllers/questionare/businessAndMarketingDetailsQuestionareController';
import upload from '../config/multer';

export const router = Router();
router.post(
  '/add-contact-address',
  verifyToken,
  businessAndContactFormQuestionareController
);

router.post(
  '/add-marketing-details',
  verifyToken,
  upload.array('images'),
  businessAndMarketingDetailsController
);

router.get(
  '/contact-address',
  verifyToken,
  getBusinessAndContactFormQuestionareController
);
router.get(
  '/marketing-details',
  verifyToken,
  getBusinessAndMarketingDetailsController
);
