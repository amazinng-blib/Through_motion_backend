import { Request, Response } from 'express';
import { verifyPaystackSignature } from '../../utils/paystack';
import {
  handleSubscriptionCharge,
  // handleSubscriptionCreate,
  handleSubscriptionDisable,
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
        break;
      // case 'subscription.create':
      //   await handleSubscriptionCreate(data);

      case 'subscription.disable':
        await handleSubscriptionDisable(data);
        break;
      default:
        console.log(`Unhandled webhook event: ${event}`);

        res.status(200).json({ received: true });
    }
  } catch (error) {
    console.error('Paystack webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}
