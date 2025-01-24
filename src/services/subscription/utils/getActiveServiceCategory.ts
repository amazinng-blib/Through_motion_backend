import { Transaction } from 'sequelize';
import { ServiceCategory } from '../../../models';

export async function getActiveServiceCategory(
  payload: any,
  options: { transaction?: Transaction }
) {
  const { name, type, tier } = payload;
  const userActiveServiceCategory = await ServiceCategory.findAll({
    where: {
      name,
      type,
      tier,
      isActive: true,
      ...options,
    },
  });

  return userActiveServiceCategory;
}
