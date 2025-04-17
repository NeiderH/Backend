import { DataTypes } from "sequelize";
//import Sequelize from "../data/conexion";

import mongoose, { Schema, Document } from 'mongoose';

interface IMercancia extends Document {
  proveedor: string;
  producto: string;
  descripcion?: string;
  precio: number;
  fecha: Date;
  estado: number;
}

const MercanciaSchema: Schema = new Schema(
  {
    proveedor: { type: String, required: true },
    producto: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    fecha: { type: Date, required: true },
    estado: { type: Number, required: true },
  },
  {
    collection: 'mercancia', // Nombre de la colección en MongoDB
  }
);

export const Mercancia = mongoose.model<IMercancia>('Mercancia', MercanciaSchema);

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
