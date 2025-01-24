import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import User from './user';

type CompetitorType = {
  name: string;
  website: string;
};

type AdDetailType = {
  adService: string;
  url: string;
};

type DigitalMarketingDetailType = {
  details: string;
  date: Date;
};

type BusinessAndMarketingDetailsModelType = {
  id?: number;
  description: string;
  userId: number;
  mission: string;
  targetAudience: string;
  scope: 'local' | 'national' | 'global';
  competitors: CompetitorType[];
  ads: {
    isRunning: boolean;
    adsDetails: AdDetailType[];
  };
  digitalMarketing: {
    hasRunDigitalMarketingBefore: boolean;
    digitalMarketingDetails: DigitalMarketingDetailType[];
  };
  previousCampaign: {
    achievePreviousObjectives: boolean;
    file: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

interface BusinessAndMarketingDetailsAttributes
  extends Optional<BusinessAndMarketingDetailsModelType, 'id'> {}

class BusinessAndMarketingDetails
  extends Model<
    BusinessAndMarketingDetailsModelType,
    BusinessAndMarketingDetailsAttributes
  >
  implements BusinessAndMarketingDetailsModelType
{
  public id?: number;
  public userId!: number;
  public description!: string;
  public mission!: string;
  public targetAudience!: string;
  public scope!: 'local' | 'national' | 'global';
  public competitors!: CompetitorType[];
  public ads!: { isRunning: boolean; adsDetails: AdDetailType[] };
  public digitalMarketing!: {
    hasRunDigitalMarketingBefore: boolean;
    digitalMarketingDetails: DigitalMarketingDetailType[];
  };
  public previousCampaign!: {
    achievePreviousObjectives: boolean;
    file: string;
  };
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BusinessAndMarketingDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mission: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    targetAudience: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    scope: {
      type: DataTypes.ENUM('local', 'national', 'global'),
      allowNull: false,
    },
    competitors: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    ads: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    digitalMarketing: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    previousCampaign: {
      type: DataTypes.JSONB,
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
    modelName: 'BusinessAndMarketingDetails',
    tableName: 'business_and_marketing_details',
    underscored: false,
    timestamps: false,
  }
);

BusinessAndMarketingDetails.belongsTo(User, {
  foreignKey: 'userId',
  as: 'marketingDetails', // Alias for easier queries
});

export default BusinessAndMarketingDetails;
