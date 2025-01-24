import { sequelize } from '../../db/DB';
import { UserSubscription } from '../../models';

export async function handleSubscriptionDisable(payload: any) {
  const transaction = await sequelize.transaction();

  try {
    const { userId } = payload;

    await UserSubscription.update(
      { isActive: false, isCancel: true },
      {
        where: { userId },
        transaction,
      }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
