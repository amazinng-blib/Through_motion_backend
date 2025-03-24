import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';

export type SubscribeToNewsletterTypes = {
  id?: number;
  email: string;
  created_at?: Date;
  updated_at?: Date;
};

interface SubscribeToNewsletterAttributes
  extends Optional<SubscribeToNewsletterTypes, 'id'> {}

class SubscribeToNewsletter
  extends Model<SubscribeToNewsletterTypes, SubscribeToNewsletterAttributes>
  implements SubscribeToNewsletterTypes
{
  public id?: number;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubscribeToNewsletter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
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
    modelName: 'SubscribeToNewsletter',
    tableName: 'subscribeToNewsletter',
    timestamps: false,
    underscored: false,
  }
);

export default SubscribeToNewsletter;
