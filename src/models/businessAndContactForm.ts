import { DataTypes, Model, Optional } from 'sequelize';
import User from './user';
import { sequelize } from '../db/DB';

type BusinessAndContactModelType = {
  id?: number;
  user_id: number;
  company_name: string;
  email: string;
  company_representative: string;
  phone: string;
  company_address: string;
  industry: string;
  business_type: string;
  company_size: number;
  established_year: Date;
  created_at?: Date;
  updated_at?: Date;
};

interface BusinessAndContactAttributes
  extends Optional<BusinessAndContactModelType, 'id'> {}

class BusinessAndContactForm
  extends Model<BusinessAndContactModelType, BusinessAndContactAttributes>
  implements BusinessAndContactModelType
{
  public id?: number;
  public user_id!: number;
  public company_name!: string;
  public email!: string;
  public company_representative!: string;
  public phone!: string;
  public company_address!: string;
  public industry!: string;
  public business_type!: string;
  public company_size!: number;
  public established_year!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BusinessAndContactForm.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    company_representative: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    company_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    business_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unknown',
    },
    established_year: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    modelName: 'BusinessForm',
    tableName: 'business_form',
    underscored: false,
    timestamps: false,
  }
);

export default BusinessAndContactForm;
