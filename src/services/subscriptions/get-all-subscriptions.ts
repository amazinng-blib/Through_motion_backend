import { Op } from 'sequelize';
import Subscriptions from '../../models/subscriptions';
import User from '../../models/user';
import Plans from '../../models/planModel';

interface SubscriptionQueryParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  is_expired?: boolean;
  duration?: string;
}

export async function getAllSubscriptionsService(
  queryParams: SubscriptionQueryParams
) {
  const {
    page = 1,
    limit = 10,
    startDate,
    endDate,
    is_expired,
    duration,
  } = queryParams;
  const offset = (page - 1) * limit;
  const whereClause: any = {};

  // Filter by date range
  if (startDate && endDate) {
    whereClause.created_at = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    whereClause.created_at = { [Op.gte]: new Date(startDate) };
  } else if (endDate) {
    whereClause.created_at = { [Op.lte]: new Date(endDate) };
  }

  // Filter by is_expired (inside JSONB)
  if (is_expired !== undefined) {
    whereClause.subscribed_services = {
      [Op.contains]: [{ options: [{ is_expired }] }],
    };
  }

  // Filter by duration
  if (duration) {
    whereClause.duration = duration;
  }

  // Fetch subscriptions with pagination and relations
  const { rows: subscriptions, count } = await Subscriptions.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'first_name', 'last_name', 'email'],
      },
      {
        model: Plans,
        as: 'plan',
        attributes: ['id', 'title', 'price', 'planId'],
      },
    ],
    limit,
    offset,
    order: [['created_at', 'DESC']],
  });

  return {
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
    subscriptions,
  };
}
