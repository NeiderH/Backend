"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../data/conexion"));
exports.Factura = conexion_1.default.define("facturas", {
    id_factura: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    tipo_proceso: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subtotal: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    //foreign key de la tabla inventario
    id_inv: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: "facturas",
    timestamps: false,
});
