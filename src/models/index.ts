import BillingAddress from './billingAddress';
import BusinessAndContactForm from './businessAndContactForm';
import BusinessAndMarketingDetails from './businessAndMarketingDetails';
import Payment from './payment';
import Plan from './planModel';
import Pricing from './pricingModel';
import Subscriptions from './subscriptions';
import User from './user';

// // Define Relationships Here
// User.hasMany(Subscriptions, {
//   foreignKey: 'subscription_id',
//   as: 'subscription',
// });

User.hasOne(BusinessAndMarketingDetails, {
  foreignKey: 'user_id',
  as: 'businessDetails',
});
User.hasOne(BusinessAndContactForm, {
  foreignKey: 'user_id',
  as: 'businessContact',
});
User.hasOne(BillingAddress, {
  foreignKey: 'user_id',
  as: 'billingAddress',
});

User.hasMany(Pricing, { foreignKey: 'user_id', as: 'pricing' });

//belongsTo means "this model has a foreign key that references another model."

Subscriptions.belongsTo(Plan, { foreignKey: 'planId', as: 'plan' });
Plan.hasMany(Subscriptions, { foreignKey: 'planId', as: 'subscriptions' });
Plan.hasMany(Payment, { foreignKey: 'plan_id', as: 'payment' });
Plan.hasMany(Pricing, { foreignKey: 'plan_id', as: 'pricing' });

Payment.belongsTo(Plan, {
  foreignKey: 'plan_id',
  as: 'plan',
});

BusinessAndMarketingDetails.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user', // Alias for easier queries
});

BusinessAndContactForm.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'owner', // Alias for easier queries
});

BillingAddress.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Pricing.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Pricing.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan' });

export { User, Subscriptions, Plan, Pricing };
