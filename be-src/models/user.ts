import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";
export class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
    full_name: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "user",
  },
);
