import { DataTypes, Model, Optional } from 'sequelize';
import User from './user';
import { sequelize } from '../db/DB';

type BusinessAndContactModelType = {
  id?: number;
  userId: number;
  companyName: string;
  email: string;
  companyRepresentative: string;
  phone: string;
  companyAddress: string;
  industry: string;
  businessType: string;
  companySize: number;
  establishedYear: Date;
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
  public userId!: number;
  public companyName!: string;
  public email!: string;
  public companyRepresentative!: string;
  public phone!: string;
  public companyAddress!: string;
  public industry!: string;
  public businessType!: string;
  public companySize!: number;
  public establishedYear!: Date;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    companyName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyRepresentative: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companySize: {
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
    companyAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    businessType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unknown',
    },
    establishedYear: {
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

// User.hasOne(BusinessAndContactForm, {
//   foreignKey: 'userId',
//   as: 'businessAndContactForm',
// });
// BusinessAndContactForm.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'owner', // Alias for easier queries
// });

export default BusinessAndContactForm;
