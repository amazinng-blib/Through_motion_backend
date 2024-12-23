import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
// import BusinessForm from './businessForm';

export type UserModelType = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  displayName: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

interface UserModelAttributes extends Optional<UserModelType, 'id'> {}

class User
  extends Model<UserModelType, UserModelAttributes>
  implements UserModelType
{
  public id?: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public displayName!: string;
  public isVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Users',
    tableName: 'Users_table',
    underscored: false,
    timestamps: false,
  }
);

// User.hasMany(BusinessForm, {
//   foreignKey: 'userId',
//   as: 'businesses', // Alias for easier queries
// });
export default User;
