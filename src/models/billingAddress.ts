import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import User from './user';

export type BillingAddressType = {
  id?: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  company_name?: string;
  region: string;
  state: string;
  city: string;
  street_address: string;
  apartment?: string;
  phone: string;
  order_note?: string;
  created_at?: Date;
  updated_at?: Date;
};

interface BillingAddressAttributes
  extends Optional<
    BillingAddressType,
    'id' | 'company_name' | 'order_note' | 'apartment'
  > {}

class BillingAddress
  extends Model<BillingAddressType, BillingAddressAttributes>
  implements BillingAddressType
{
  public id?: number;
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public company_name?: string;
  public region!: string;
  public state!: string;
  public city!: string;
  public street_address!: string;
  public apartment?: string;
  public phone!: string;
  public order_note?: string;
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    company_name: {
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
    street_address: {
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
    order_note: {
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

export default BillingAddress;
