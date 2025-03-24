import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import { Role } from '../enum/user.enums';
// import BusinessForm from './businessForm';

export type UserModelType = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  displayName: string;
  isVerified?: boolean;
  role: Role;
  created_at?: Date;
  updated_at?: Date;
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
  public role!: Role;
  public isVerified!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
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

    role: {
      type: DataTypes.ENUM(...Object.values(Role)),
      allowNull: false,
      defaultValue: Role.USER,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'Users',
    tableName: 'users',
    underscored: false,
    timestamps: false,
  }
);

export default User;
