import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/DB';
import { Role } from '../enum/user.enums';
// import BusinessForm from './businessForm';

export type UserModelType = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  display_name: string;
  is_verified?: boolean;
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
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public display_name!: string;
  public role!: Role;
  public is_verified!: boolean;
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(...Object.values(Role)),
      allowNull: false,
      defaultValue: Role.USER,
    },

    is_verified: {
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
