import { DataTypes } from "sequelize";
import Sequelize from "../data/conexion";

export const Observacion = Sequelize.define(
    "observacion",
    {
      id_ob: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      observaciont: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "observacion", // Especifica el nombre exacto de la tabla
      timestamps: false, // Desactiva las columnas createdAt y updatedAt si no las usas
    }
  );
  