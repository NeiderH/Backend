import { DataTypes } from "sequelize";
//import Sequelize from "../data/conexion";
import mongoose, { Schema, Document } from 'mongoose';

interface IUsuario extends Document {
  nombre: string;
  correo: string;
  password: string;
  estado: string;
  permiso: string;
}

const UsuarioSchema: Schema = new Schema(
  {
    nombre: { type: String, required: true },
    correo: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    estado: { type: String, required: true },
    permiso: { type: String, required: true },
  },
  {
    collection: 'usuarios', // Nombre de la colección en MongoDB
  }
);

export const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema);


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