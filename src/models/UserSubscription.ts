import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import ServiceCategory from './ServiceCategory';

export type UserSubscriptionAttributes = {
  id?: number;
  userId: number;
  planCode: string;
  serviceCategoryPlanCode: string;
  // startDate: Date;
  // endDate: Date;
  isActive: boolean;
  totalPrice: number;
  isCancel?: boolean;
  discountApplied: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

interface UserSubscriptionCreationAttributes
  extends Optional<
    UserSubscriptionAttributes,
    'id' | 'isActive' | 'discountApplied' | 'isCancel'
  > {}

class UserSubscription
  extends Model<UserSubscriptionAttributes, UserSubscriptionCreationAttributes>
  implements UserSubscriptionAttributes
{
  public id?: number;
  public userId!: number;
  public planCode!: string;
  public serviceCategoryPlanCode!: string;
  // public startDate!: Date;
  // public endDate!: Date;
  public isActive!: boolean;
  public totalPrice!: number;
  public discountApplied!: boolean;
  public isCancel?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserSubscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    serviceCategoryPlanCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: ServiceCategory,
        key: 'planCode',
      },
    },
    planCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // startDate: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
    // endDate: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discountApplied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isCancel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'UserSubscription',
    tableName: 'UserSubscriptions',
    timestamps: false,
    underscored: false,
  }
);

export default UserSubscription;
