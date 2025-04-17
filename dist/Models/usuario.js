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
exports.Usuario = void 0;
//import Sequelize from "../data/conexion";
const mongoose_1 = __importStar(require("mongoose"));
const UsuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    estado: { type: String, required: true },
    permiso: { type: String, required: true },
}, {
    collection: 'usuarios', // Nombre de la colección en MongoDB
});
exports.Usuario = mongoose_1.default.model('Usuario', UsuarioSchema);
// export const Usuario = Sequelize.define(
//     "usuarios",
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         nombre: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         correo: {
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         estado: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         permiso: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     },
//     {
//         tableName: "usuarios",
//         timestamps: false,
//     }
// )
