import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import User from './user';
import Subscriptions from './subscriptions';

type OptionsType = {
  title: string;
  price: number;
};

export type PlanType = {
  id?: number;
  // user_id?: number;
  // subscription_id?: number;
  payment_id?: number;
  plan_title: string;
  name: string;
  business_email: string;
  company_reps: string;
  web_address?: string;
  marketing_goals: string;
  is_replied: boolean;
  quote_url: string;
  options: Array<OptionsType>;
  created_at?: Date;
  updated_at?: Date;
};

interface PlanAttributes
  extends Optional<PlanType, 'id' | 'web_address' | 'payment_id'> {}

class Plan extends Model<PlanType, PlanAttributes> implements PlanType {
  public id?: number;
  // public user_id?: number;
  // public subscriptionId?: number;
  public name!: string;
  public company_reps!: string;
  public business_email!: string;
  public web_address?: string;
  public marketing_goals!: string;
  public is_replied!: boolean;
  public quote_url!: string;
  public plan_title!: string;
  public options!: OptionsType[];
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: User,
    //     key: 'id',
    //   },
    // },
    // subscription_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Subscriptions,
    //     key: 'id',
    //   },
    // },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_reps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    web_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    marketing_goals: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_replied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    quote_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan_title: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'Plans',
    tableName: 'plans',
    timestamps: false,
    underscored: false,
  }
);

export default Plan;
