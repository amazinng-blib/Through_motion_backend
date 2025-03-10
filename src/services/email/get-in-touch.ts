import { getInTouchEmail } from '../../email-templates/get-in-touch';
import { GetInTouchType } from '../../validation/get-in-touch';

export async function getInTouchService(user: GetInTouchType) {
  await getInTouchEmail(user);
  return { message: 'Email sent' };
}
