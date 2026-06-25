import { Model, DataTypes } from "sequelize";
import { sequelize } from "./conn";
export class Pets extends Model {}
Pets.init(
  {
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    location: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "pet",
  },
);
