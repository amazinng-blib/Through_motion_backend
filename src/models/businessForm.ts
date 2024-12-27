import { DataTypes, Model, Optional } from 'sequelize';
import User from './user';
import { sequelize } from '../config/db/DB';

type BusinessModelType = {
  id?: number;
  userId: number;
  businessName: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  otherInfo: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

interface BusinessAttributes extends Optional<BusinessModelType, 'id'> {}

class BusinessForm
  extends Model<BusinessModelType, BusinessAttributes>
  implements BusinessModelType
{
  public id?: number;
  public userId!: number;
  public businessName!: string;
  public description!: string;
  public address!: string;
  public phone!: string;
  public website!: string;
  public otherInfo!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BusinessForm.init(
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
    businessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    otherInfo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'BusinessForm',
    tableName: 'business_form',
    underscored: false,
    timestamps: false,
  }
);

BusinessForm.belongsTo(User, {
  foreignKey: 'userId',
  as: 'owner', // Alias for easier queries
});

export default BusinessForm;
