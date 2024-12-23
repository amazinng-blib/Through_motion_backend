// // src/middlewares/validateSubscription.ts
// import { Request, Response, NextFunction } from 'express';
// import Subscription from '../models/Subscription';

// export const validateSubscription = async (req: Request, res: Response, next: NextFunction) => {
//   const userId = req.user.id;

//   const subscription = await Subscription.findOne({
//     where: { userId, isActive: true },
//   });

//   if (!subscription) {
//     return res.status(403).json({ error: 'Subscription expired or not found.' });
//   }

//   next();
// };
