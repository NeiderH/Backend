"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mercancia = void 0;
//import Sequelize from "../data/conexion";
const mongoose_1 = __importStar(require("mongoose"));
const MercanciaSchema = new mongoose_1.Schema({
    proveedor: { type: String, required: true },
    producto: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    fecha: { type: Date, required: true },
    estado: { type: Number, required: true },
}, {
    collection: 'mercancia', // Nombre de la colección en MongoDB
});
exports.Mercancia = mongoose_1.default.model('Mercancia', MercanciaSchema);
// export const Mercancia = Sequelize.define(
//     "mercancia",
//     {
//         id_merca: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         proveedor: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         producto: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         descripcion: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         precio: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         fecha: {
//             type: DataTypes.DATE,
//             allowNull: false,
//         },
//         estado: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         }
//     },
//     {
//         tableName: "mercancia",
//         timestamps: false,
//     }
// );
