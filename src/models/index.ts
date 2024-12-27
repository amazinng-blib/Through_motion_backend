import ServiceCategory from './ServiceCategory';
import User from './user';
import UserSubscription from './UserSubscription';

// Initialize associations
ServiceCategory.belongsTo(User, {
  foreignKey: 'userId',
  as: 'UserPlans',
});

User.hasMany(ServiceCategory, {
  foreignKey: 'userId',
  as: 'UserPlans',
});

// define associations between UsrSubscription and user, UserSubscriptions and serviceCategory
UserSubscription.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

UserSubscription.belongsTo(ServiceCategory, {
  foreignKey: 'serviceCategoryPlanCode',
  as: 'services',
});

export { ServiceCategory, UserSubscription, User };
