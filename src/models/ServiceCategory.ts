import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db/DB';
import User from './user';

export enum ServiceType {
  LOCAL_SEO = 'local_seo',
  LOCATION_MARKETING = 'location_marketing',
  CREATIVE_DESIGN = 'creative_design',
  VIDEO_ADS = 'video_ads',
}

export enum PlanTier {
  STANDARD = 'standard',
  PREMIUM = 'premium',
  BUSINESS = 'business',
  ENTERPRISE = 'enterprise',
  SINGLE = 'single',
  ADDITIONAL = 'additional',
  SHORT = 'short',
  LONG = 'long',
}

export type ServiceCategoryAttributes = {
  id?: number;
  userId: number;
  name: string;
  type: ServiceType;
  description?: string;
  tier: PlanTier;
  planCode: string;
  servicePrice: number;
  currency: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

interface ServiceCategoryCreationAttributes
  extends Optional<ServiceCategoryAttributes, 'id' | 'isActive'> {}

class ServiceCategory
  extends Model<ServiceCategoryAttributes, ServiceCategoryCreationAttributes>
  implements ServiceCategoryAttributes
{
  public id?: number;
  public userId!: number;
  public name!: string;
  public type!: ServiceType;
  public description?: string;
  public tier!: PlanTier;
  public planCode!: string;
  public servicePrice!: number;
  public currency!: string;
  public isActive!: boolean;
  public startDate!: Date;
  public endDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ServiceCategory.init(
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
        model: User,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ServiceType)),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    tier: {
      type: DataTypes.ENUM(...Object.values(PlanTier)),
      allowNull: false,
    },
    planCode: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    servicePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: 'GBP',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
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
    modelName: 'ServiceCategory',
    tableName: 'ServiceCategories',
    timestamps: false,
    underscored: false,
  }
);

export default ServiceCategory;
