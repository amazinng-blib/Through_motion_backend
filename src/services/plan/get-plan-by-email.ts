import { Plan } from '../../models';

export async function getPlanByEmail(email: string) {
  return await Plan.findOne({
    where: {
      business_email: email,
    },
  });
}
