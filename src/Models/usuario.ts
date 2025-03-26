import { DataTypes } from "sequelize";
import Sequelize from "../data/conexion";

export const Usuario = Sequelize.define(
    "usuarios",
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        },
        permiso: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        tableName: "usuarios",
        timestamps: false,
    }
)