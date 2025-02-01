import { Request, Response } from 'express';
import { verifyPaystackSignature } from '../../utils/paystack';
import { handleSubscriptionCharge } from '../../services/webhooks/paystack.services';

export async function paystackWebhookHandler(req: Request, res: Response) {
  try {
    const isValid = verifyPaystackSignature(req);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const { event, data } = req.body;

    if (event) {
      await handleSubscriptionCharge(data);
      res.status(200).json({ received: true });
    } else {
      console.log(`Unhandled webhook event: ${event}`);
    }
  } catch (error) {
    console.error('Paystack webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}
