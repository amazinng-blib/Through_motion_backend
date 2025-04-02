import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import User from './user';

export type BillingAddressType = {
  id?: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  region: string;
  state: string;
  city: string;
  streetAddress: string;
  apartment?: string;
  phone: string;
  orderNote?: string;
  created_at?: Date;
  updated_at?: Date;
};

interface BillingAddressAttributes
  extends Optional<
    BillingAddressType,
    'id' | 'companyName' | 'orderNote' | 'apartment'
  > {}

class BillingAddress
  extends Model<BillingAddressType, BillingAddressAttributes>
  implements BillingAddressType
{
  public id?: number;
  public userId!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public companyName?: string;
  public region!: string;
  public state!: string;
  public city!: string;
  public streetAddress!: string;
  public apartment?: string;
  public phone!: string;
  public orderNote?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BillingAddress.init(
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
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    companyName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    apartment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderNote: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'BillingAddress',
    tableName: 'billing_address',
    underscored: false,
    timestamps: false,
  }
);

// Establishing one-to-one relationship
// User.hasOne(BillingAddress, { foreignKey: 'userId', as: 'billingAddress' });
// BillingAddress.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default BillingAddress;
