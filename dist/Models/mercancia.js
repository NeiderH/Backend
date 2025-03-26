"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mercancia = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../data/conexion"));
exports.Mercancia = conexion_1.default.define("mercancia", {
    id_merca: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    proveedor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    producto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    // Aquí se agrega la llave foránea de la tabla inventario
    id_inv: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: "mercancia",
    timestamps: false,
});
