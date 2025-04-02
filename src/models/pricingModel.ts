import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import User from './user';
import Plans from './planModel';

type OptionsType = {
  title: string;
  price: number;
};

export type PricingType = {
  id?: number;
  userId: number;
  planId: number;
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
  public userId!: number;
  public planId!: number;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    planId: {
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

// User.hasMany(Pricing, {
//   foreignKey: 'userId',
//   as: 'pricing',
// });

// Plans.hasOne(Pricing, {
//   foreignKey: 'planId',
//   as: 'plans',
// });

// Pricing.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'user', // Alias for easier queries
// });
// Pricing.belongsTo(Plans, {
//   foreignKey: 'planId',
//   as: 'pricing', // Alias for easier queries
// });

export default Pricing;
