import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import User from './user';
import Plan from './planModel';
export type PaymentType = {
  id?: number;
  user_id: number;
  plan_id: number;
  amount?: number;
  method: string;
  is_verified: boolean;
  created_at?: Date;
  updated_at?: Date;
};

interface PaymentAttributes extends Optional<PaymentType, 'id'> {}

class Payment
  extends Model<PaymentType, PaymentAttributes>
  implements PaymentType
{
  public id?: number;
  public user_id!: number;
  public plan_id!: number;
  public is_verified!: boolean;
  public method!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Payment.init(
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
      references: {
        model: Plan,
        key: 'id',
      },
    },

    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    method: {
      type: DataTypes.STRING,
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
    tableName: 'payments',
    modelName: 'Payment',
    timestamps: false,
    underscored: false,
  }
);

export default Payment;
