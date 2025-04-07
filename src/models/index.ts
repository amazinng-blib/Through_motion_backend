import BillingAddress from './billingAddress';
import BusinessAndContactForm from './businessAndContactForm';
import BusinessAndMarketingDetails from './businessAndMarketingDetails';
import Payment from './payment';
import Plan from './planModel';
import Subscriptions from './subscriptions';
import User from './user';

// Define Relationships Here
User.hasOne(Subscriptions, { foreignKey: 'userId', as: 'subscription' });
User.hasMany(Payment, {
  foreignKey: 'userId',
  as: 'pricing',
});
User.hasOne(BusinessAndMarketingDetails, {
  foreignKey: 'userId',
  as: 'businessAndMarketingDetails',
});
User.hasOne(BusinessAndContactForm, {
  foreignKey: 'userId',
  as: 'businessAndContactForm',
});
User.hasOne(BillingAddress, { foreignKey: 'userId', as: 'billingAddress' });

Subscriptions.belongsTo(User, { foreignKey: 'userId', as: 'user_sub' });
Subscriptions.belongsTo(Plan, { foreignKey: 'planId', as: 'plan' });

Payment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user_payment',
});

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
