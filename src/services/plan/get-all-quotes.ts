import Plans from '../../models/planModel';

export async function getAllQuotesService() {
  const plans = await Plans.findAll();

  if (!plans.length) {
    return {
      message: 'No quotes found',
      data: [],
    };
  }

  return plans;
}
