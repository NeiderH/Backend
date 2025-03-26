import { DataTypes } from "sequelize";
import Sequelize from "../data/conexion";

export const Mercancia = Sequelize.define(
    "mercancia",
    {
        id_merca: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        proveedor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        producto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Aquí se agrega la llave foránea de la tabla inventario
        id_inv: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "mercancia",
        timestamps: false,
    }
);
