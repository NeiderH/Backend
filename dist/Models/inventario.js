"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../data/conexion"));
exports.Inventario = conexion_1.default.define("inventario", {
    id_inv: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Solo este campo debe tener autoIncrement
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    // Aquí se agrega la llave foránea de la tabla mercancia y plato
    id_pl: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // Elimina autoIncrement
    },
    id_merca: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // Elimina autoIncrement
    },
}, {
    tableName: "inventario", // Especifica el nombre exacto de la tabla
    timestamps: false, // Desactiva las columnas createdAt y updatedAt si no las usas
});
