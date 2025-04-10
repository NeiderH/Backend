import { DataTypes } from "sequelize";
import Sequelize from "../data/conexion";

export const Factura = Sequelize.define(
    "facturas",
    {
        id_factura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        },
        tipo_proceso: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
        },
        estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        },
        cantidad:{
        type: DataTypes.INTEGER,
        allowNull: true,
        },
        //foreign key de la tabla inventario
        id_inv:{
        type: DataTypes.INTEGER,
        allowNull: true,
        }
    },
    {
        tableName: "facturas",
        timestamps: false,
    }
)