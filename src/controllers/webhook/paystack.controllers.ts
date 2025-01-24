import { Request, Response } from 'express';
import { verifyPaystackSignature } from '../../utils/paystack';
import {
  handleSubscriptionCharge,
  // handleSubscriptionCreate,
} from '../../services/webhooks/paystack.services';

export async function paystackWebhookHandler(req: Request, res: Response) {
  try {
    const isValid = verifyPaystackSignature(req);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const { event, data } = req.body;

    switch (event) {
      case 'charge.success':
        await handleSubscriptionCharge(data);
        res.status(200).json({ received: true });
        break;
      default:
        console.log(`Unhandled webhook event: ${event}`);
    }
  } catch (error) {
    console.error('Paystack webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}
