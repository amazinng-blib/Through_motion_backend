import BillingAddress from './billingAddress';
import BusinessAndContactForm from './businessAndContactForm';
import BusinessAndMarketingDetails from './businessAndMarketingDetails';
import Payment from './payment';
import Plan from './planModel';
import Subscriptions from './subscriptions';
import User from './user';

// Define Relationships Here
User.hasMany(Subscriptions, {
  foreignKey: 'subscription_id',
  as: 'subscription',
});

Subscriptions.belongsTo(Plan, { foreignKey: 'planId', as: 'plan' });

Payment.belongsTo(Plan, {
  foreignKey: 'planId',
  as: 'payment',
});

BusinessAndMarketingDetails.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user', // Alias for easier queries
});

BusinessAndContactForm.belongsTo(User, {
  foreignKey: 'userId',
  as: 'owner', // Alias for easier queries
});

BillingAddress.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, Subscriptions, Plan };
