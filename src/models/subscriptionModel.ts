import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import User from './user';
import {
  ServiceName,
  ServiceStatus,
  ServiceTier,
  ServiceType,
} from '../enum/subscription.enums';

type SubscriptionType = {
  id?: number;
  subscriberEmail: string;
  serviceName: ServiceName;
  serviceType: ServiceType;
  serviceStatus: ServiceStatus;
  price: number;
  tier: ServiceTier;
  duration: number;
  currency: string;
  planCode: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface SubscriptionAttributes
  extends Optional<SubscriptionType, 'id' | 'createdAt' | 'updatedAt'> {}

class Pricing
  extends Model<SubscriptionType, SubscriptionAttributes>
  implements SubscriptionType
{
  public id?: number;
  public subscriberEmail!: string;
  public serviceName!: ServiceName;
  public serviceType!: ServiceType;
  public serviceStatus!: ServiceStatus;
  public tier!: ServiceTier;
  public duration!: number;
  public price!: number;
  public planCode!: string;
  public currency!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Pricing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    subscriberEmail: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    serviceName: {
      type: DataTypes.ENUM(...Object.values(ServiceName)),
      allowNull: false,
      defaultValue: null,
    },
    serviceType: {
      type: DataTypes.ENUM(...Object.values(ServiceType)),
      allowNull: false,
      defaultValue: null,
    },
    serviceStatus: {
      type: DataTypes.ENUM(...Object.values(ServiceStatus)),
      allowNull: false,
      defaultValue: ServiceStatus.PENDING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    planCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tier: {
      type: DataTypes.ENUM(...Object.values(ServiceTier)),
      allowNull: false,
      defaultValue: null,
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
    tableName: 'pricing',
    modelName: 'Pricing',
  }
);

export default Pricing;
