import { app } from "../firebase";

import { Request, Response } from "express";
import { Observacion } from "../Models/observacion";
import mongoose, { Schema, Document } from 'mongoose';

import moment from "moment-timezone";

// Registrar la observación
export const RegObservacion = async (req: Request, res: Response) => {
    const { observaciont, fecha } = req.body;

    try {
        // Convertir la fecha a la zona horaria de Colombia
        const fechaConZonaHoraria = moment(fecha).tz('America/Bogota').toDate();

        // Crear una nueva observación en MongoDB
        const nuevaObservacion = new Observacion({
            observaciont,
            fecha: fechaConZonaHoraria,
        });

        await nuevaObservacion.save(); // Guardar en la base de datos

        res.json({
            message: `Observación registrada correctamente`,
            observacion: nuevaObservacion,
        });
    } catch (error) {
        console.error("Error al registrar la observación:", error);
        res.status(400).json({
            message: "Error al registrar la observación",
        });
    }
};

// Obtener todas las observaciones
export const GetObservacion = async (req: Request, res: Response) => {
    try {
        // Obtener todas las observaciones ordenadas por fecha descendente
        const listaobservacion = await Observacion.find().sort({ fecha: -1 });

        if (listaobservacion.length == 0) {
            console.warn("⚠️ No hay Observaciones en la base de datos.");
        }

        res.json(listaobservacion);
    } catch (error) {
        console.error("❌ Error al obtener Observaciones:", error);
        res.status(500).json({ message: "Error al obtener las Observaciones" });
    }
};

// Actualizar la observación
export const UpObservacion = async (req: Request, res: Response) => {
    const { id } = req.params; // MongoDB usa `_id` como identificador
    const { observaciont, fecha } = req.body;

    try {
        const objectId = new mongoose.Types.ObjectId(id); // <-- Aquí lo conviertes

        // Buscar y actualizar la observación
        const observacion = await Observacion.findByIdAndUpdate(
            id,
            { observaciont},
            { new: true } // Retorna el documento actualizado
        );

        if (observacion) {
            res.json({
                message: `Observación actualizada correctamente`,
                observacion,
            });
        } else {
            res.status(404).json({
                message: `Observación no encontrada`,
            });
        }
    } catch (error) {
        console.error("Error al actualizar la observación:", error);
        res.status(500).json({
            message: "Error al actualizar la observación",
        });
    }
};

// Eliminar la observación
export const DelObservacion = async (req: Request, res: Response) => {
    const { id } = req.params; // MongoDB usa `_id` como identificador

    try {
        const objectId = new mongoose.Types.ObjectId(id); // <-- Aquí también

        // Buscar y eliminar la observación
        const observacion = await Observacion.findByIdAndDelete(id);

        if (observacion) {
            res.json({
                message: `Observación eliminada correctamente`,
            });
        } else {
            res.status(404).json({
                message: `Observación no encontrada`,
            });
        }
    } catch (error) {
        console.error("Error al eliminar la observación:", error);
        res.status(500).json({
            message: "Error al eliminar la observación",
        });
    }
};

// // registrar la observacion 
// export const RegObservacion = async (req: Request, res: Response) => {
//     const { observaciont, fecha } = req.body;

//     try {
//         // Convertir la fecha a la zona horaria de Colombia
//         const fechaConZonaHoraria = moment(fecha).tz('America/Bogota').toDate();

//         await Observacion.create({
//             observaciont: observaciont,
//             fecha: fechaConZonaHoraria,
//         });

//         res.json({
//             message: `Observación registrada correctamente`,
//         });
//     } catch (error) {
//         console.error("Error al registrar la observación:", error);
//         res.status(400).json({
//             message: "Error al registrar la observación",
//         });
//     }
// };
// // obtener todas las observaciones
// export const GetObservacion = async (req: Request, res: Response) => {
//     try {
//         const listaobservacion = await Observacion.findAll(
//             {
//                 order: [['fecha', 'DESC']],
//             }
//         );
//         console.log("📌 Observacion encontrada:", listaobservacion);

//         if (listaobservacion.length === 0) {
//             console.warn("⚠️ No hay Observaciones en la base de datos.");
//         }

//         res.json(listaobservacion);
//     } catch (error) {
//         console.error("❌ Error al obtener Observaciones:", error);
//         res.status(500).json({ message: "Error al obtener las Observaciones" });
//     }
// };
// // actualizar la observacion 
// export const UpObservacion = async (req: Request, res: Response) => {
//     const { id_ob } = req.params;
//     const { observaciont, fecha } = req.body;

//     try {
//         const observacion = await Observacion.findOne({
//             where: {
//                 id_ob: id_ob,
//             },
//         });

//         if (observacion) {

//             await observacion.update({
//                 observaciont: observaciont,
//             });
//             res.json({
//                 message: `Plobservacionato actualizada correctamente`,
//             });
//         } else {
//             res.status(404).json({
//                 message: `observacion no encontrada`,
//             });
//         }
//     } catch (error) {
//         console.error("Error al actualizar la observacion:", error);
//         res.status(500).json({
//             message: "Error al actualizar la observacion",
//         });
//     }
// };
// // eliminar la observacion
// export const DelObservacion = async (req: Request, res: Response) => {
//     const { id_ob } = req.params;

//     try {
//         const observacion = await Observacion.findOne({
//             where: {
//                 id_ob: id_ob,
//             },
//         });

//         if (observacion) {
//             await observacion.destroy();
//             res.json({
//                 message: `observacion eliminada correctamente`,
//             });
//         } else {
//             res.status(404).json({
//                 message: `observacion no encontrada`,
//             });
//         }
//     } catch (error) {
//         console.error("Error al eliminar la observacion:", error);
//         res.status(500).json({
//             message: "Error al eliminar la observacion",
//         });
//     }
// };