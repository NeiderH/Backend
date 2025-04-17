import { DataTypes } from "sequelize";
//import Sequelize from "../data/conexion";

// export const Inventario = Sequelize.define(
//     "inventario",
//     {
//         id_inv: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true, // Solo este campo debe tener autoIncrement
//         },
//         stock: {
//             type: DataTypes.INTEGER,
//             allowNull: true,
//         },
//         estado: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         // Aquí se agrega la llave foránea de la tabla mercancia y plato
//         id_pl: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//         id_merca: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//     },
//     {
//         tableName: "inventario", // Especifica el nombre exacto de la tabla
//         timestamps: false, // Desactiva las columnas createdAt y updatedAt si no las usas
//     }
// );