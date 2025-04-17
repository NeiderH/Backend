import { DataTypes } from "sequelize";
//import Sequelize from "../data/conexion";

import mongoose, { Schema, Document } from 'mongoose';

interface IFactura extends Document {
  fecha: Date;
  tipo_proceso: string;
  subtotal: number;
  descripcion?: string;
  estado: number;
  cantidad?: number;
  id_inv?: string; // Referencia a inventario
}

const FacturaSchema: Schema = new Schema(
  {
    fecha: { type: Date, required: true },
    tipo_proceso: { type: String, required: true },
    subtotal: { type: Number, required: true },
    descripcion: { type: String },
    estado: { type: Number, required: true },
    cantidad: { type: Number },
    id_inv: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario' },
  },
  {
    collection: 'facturas', // Nombre de la colección en MongoDB
  }
);

export const Factura = mongoose.model<IFactura>('Factura', FacturaSchema);

// export const Factura = Sequelize.define(
//     "facturas",
//     {
//         id_factura: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         },
//         fecha: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         },
//         tipo_proceso: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         },
//         subtotal: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         },
//         descripcion: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         },
//         estado: {
//         type: DataTypes.TINYINT,
//         allowNull: false,
//         },
//         cantidad:{
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         },
//         //foreign key de la tabla inventario
//         id_inv:{
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         }
//     },
//     {
//         tableName: "facturas",
//         timestamps: false,
//     }
// )