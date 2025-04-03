import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import User from './user';
import Plans from './planModel';

type OptionsType = {
  title: string;
  price: number;
};

type PricingType = {
  id?: number;
  user_id: number;
  plan_id: number;
  title: string;
  options: Array<OptionsType>;
  duration?: string;
  // is_paid: boolean;
  // is_active: boolean;
  // is_verified: boolean;
  created_at?: Date;
  updated_at?: Date;
};

interface PricingAttributes extends Optional<PricingType, 'id' | 'duration'> {}

class Pricing
  extends Model<PricingType, PricingAttributes>
  implements PricingType
{
  public id?: number;
  public user_id!: number;
  public plan_id!: number;
  // public is_paid!: boolean;
  // public is_verified!: boolean;
  // public is_active!: boolean;
  public duration?: string;
  public title!: string;
  public options!: OptionsType[];
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Pricing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Plans,
        key: 'id',
      },
    },
    // is_paid: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    // is_verified: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    // is_active: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '30 days',
    },
    options: {
      type: DataTypes.JSONB,
      allowNull: false,
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
    tableName: 'pricings',
    modelName: 'Pricing',
    timestamps: false,
    underscored: false,
  }
);

export default Pricing;
