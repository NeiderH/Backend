import { DataTypes } from "sequelize";
//import Sequelize from "../data/conexion";
import mongoose, { Schema, Document } from 'mongoose';

interface IObservacion extends Document {
  observaciont: string;
  fecha: Date;
}

const ObservacionSchema: Schema = new Schema(
  {
    observaciont: { type: String, required: true },
    fecha: { type: Date, required: true },
  },
  {
    collection: 'observacion', // Nombre de la colección en MongoDB
  }
);

export const Observacion = mongoose.model<IObservacion>('Observacion', ObservacionSchema);

// export const Observacion = Sequelize.define(
//     "observacion",
//     {
//       id_ob: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       observaciont: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       fecha: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//     },
//     {
//       tableName: "observacion", // Especifica el nombre exacto de la tabla
//       timestamps: false, // Desactiva las columnas createdAt y updatedAt si no las usas
//     }
//   );
  