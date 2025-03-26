"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observacion = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../data/conexion"));
exports.Observacion = conexion_1.default.define("observacion", {
    id_ob: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    observaciont: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "observacion", // Especifica el nombre exacto de la tabla
    timestamps: false, // Desactiva las columnas createdAt y updatedAt si no las usas
});
