import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import User from './user';
import Plan from './planModel';

type OptionsType = {
  title: string;
  price: number;
  is_expired?: boolean;
  started_on: Date;
  ends_at: Date;
};

type SubscribedServices = {
  service_title: string;
  options: Array<OptionsType>;
};

export enum SubscriptionStatus {
  CREATED = 'created',
  UPDATED = 'updated',
  EXPIRED = 'expired',
}

type UserType = {
  first_name: string;
  last_name: string;
  email: string;
};

export type PricingType = {
  id?: number;
  user_key?: number;
  user: UserType;
  planId: number;
  subscribed_services: Array<SubscribedServices>;
  duration?: string;
  is_paid?: boolean;
  is_verified?: boolean;
  status: SubscriptionStatus;
  reference_number: string;
  created_at?: Date;
  updated_at?: Date;
};

interface SubscriptionsAttributes
  extends Optional<
    PricingType,
    | 'id'
    | 'duration'
    | 'is_paid'
    | 'is_verified'
    | 'created_at'
    | 'updated_at'
    | 'user_key'
  > {}

class Subscriptions
  extends Model<PricingType, SubscriptionsAttributes>
  implements PricingType
{
  public id?: number;
  public user_key?: number;
  public user!: UserType;
  public planId!: number;
  public is_paid?: boolean;
  public is_verified?: boolean;
  public reference_number!: string;
  public duration?: string;
  public subscribed_services!: Array<SubscribedServices>;
  public status!: SubscriptionStatus;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Subscriptions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_key: {
      type: DataTypes.INTEGER,
    },
    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Plan,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    reference_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user: {
      type: DataTypes.JSONB, // Store user as JSONB instead of userId
      allowNull: false,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    subscribed_services: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '30 days',
    },
    status: {
      type: DataTypes.ENUM(...Object.values(SubscriptionStatus)),
      allowNull: false,
      defaultValue: SubscriptionStatus.CREATED,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'subscriptions',
    modelName: 'Subscription',
    timestamps: true,
    underscored: true,
  }
);

export default Subscriptions;
