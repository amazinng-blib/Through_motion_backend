import Plans from '../../models/planModel';

export async function getSingleQuoteService(id: number) {
  return await Plans.findByPk(id);
}
