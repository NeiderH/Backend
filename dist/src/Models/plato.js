"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plato = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../data/conexion"));
exports.Plato = conexion_1.default.define("plato", {
    id_pl: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_plato: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    valor: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    categoria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "plato", // Especifica el nombre exacto de la tabla
    timestamps: false, // Desactiva las columnas createdAt y updatedAt si no las usas
});
