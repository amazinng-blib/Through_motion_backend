import Subscriptions from '../../models/subscriptions';

import User from '../../models/user';
import Plans from '../../models/planModel';

export async function getUserSubscriptionsService(userId: number) {
  return await Subscriptions.findAll({
    where: { userId },
    include: [
      {
        model: Plans,
        as: 'plan',
        attributes: ['id', 'title', 'duration'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'first_name', 'last_name', 'email'],
      },
    ],
    order: [['created_at', 'DESC']],
  });
}
