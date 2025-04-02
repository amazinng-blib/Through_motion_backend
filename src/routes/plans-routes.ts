import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { requestQuoteController } from '../controllers/plans/requestQuote';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { replyQuoteController } from '../controllers/plans/replyQuote';
import { getSingleQuoteController } from '../controllers/plans/getSingleQuote';
import { getAllQuotesController } from '../controllers/plans/getAllQuotes';
export const router = Router();

router.post('/request-quote', verifyToken, requestQuoteController);
router.post('/reply-quote', verifyToken, adminMiddleware, replyQuoteController);
router.get('/:quoteId', verifyToken, adminMiddleware, getSingleQuoteController);
router.get('/', verifyToken, adminMiddleware, getAllQuotesController);
