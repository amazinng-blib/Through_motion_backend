import Plan from '../../models/planModel';

export async function getSingleQuoteService(id: number) {
  return await Plan.findByPk(id);
}
