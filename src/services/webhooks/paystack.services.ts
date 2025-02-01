import { ServiceStatus } from '../../enum/subscription.enums';
import { checkSubscriptionStatus } from '../../utils/checkSubscriptionStatus';
import { generateUniqueId } from '../../utils/planCodeGenerator';
import { subscribeToService } from '../subscription/subscribeToService';
import { updateService } from '../subscription/updateService';

export async function handleSubscriptionCharge(payload: any) {
  const { event, data } = payload;

  if (event.event === 'charge.success') {
    const {
      userID,
      serviceName,
      serviceType,
      price,
      tier,
      currency,
      duration,
      subscriberEmail,
      planCode,
      id,
    } = data.metadata;

    const hasActiveSubs = await checkSubscriptionStatus(planCode);

    if (hasActiveSubs) {
      return await updateService({
        serviceName,
        serviceType,
        price,
        tier,
        currency,
        duration,
        subscriberEmail,
        serviceStatus: ServiceStatus.ACTIVE,
        planCode,
        id,
      });
    } else {
      const code = generateUniqueId();
      return await subscribeToService({
        serviceName,
        serviceType,
        price,
        tier,
        currency,
        duration,
        subscriberEmail,
        planCode: code,
        serviceStatus: ServiceStatus.ACTIVE,
      });
    }
  }
}
