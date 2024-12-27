import { Request, Response } from 'express';
import * as subscriptionService from '../../services/subscription/subscription.services';
import {
  createSubscriptionSchema,
  updateSubscriptionSchema,
} from '../../validation/subscription';
import { upgradeSubscription } from '../../services/subscription/subscription-upgrade';

export async function createSubscription(req: Request, res: Response) {
  try {
    const { userID } = req.body;
    const validatedData = createSubscriptionSchema.parse({
      ...req.body,
      userId: userID,
    });

    // verify payment
    const paymentStatus = await subscriptionService.verifyPayment(
      validatedData.reference_number
    );

    if (!paymentStatus) {
      res.status(400).json({ error: 'Payment verification failed' });
    }

    const subscriptions = await subscriptionService.createSubscription(
      validatedData
    );
    res.status(201).json(subscriptions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export async function subscriptionUpgrade(req: Request, res: Response) {
  try {
    const serviceCategoryId = Number(req.params.id);
    const { userID } = req.body;
    const bodyData = updateSubscriptionSchema.parse({
      ...req.body,
      serviceCategoryId,
      userId: userID,
    });

    const subscription = await upgradeSubscription(bodyData);
    res.status(200).json(subscription);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export async function checkSubscriptionStatus(req: Request, res: Response) {
  try {
    const { planCode, userID } = req.body;
    const isValid = await subscriptionService.checkSubscriptionStatus(
      planCode,
      userID
    );
    res.status(200).json({ isValid });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
