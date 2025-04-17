"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelObservacion = exports.UpObservacion = exports.GetObservacion = exports.RegObservacion = void 0;
const observacion_1 = require("../Models/observacion");
const mongoose_1 = __importDefault(require("mongoose"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
// Registrar la observación
const RegObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { observaciont, fecha } = req.body;
    try {
        // Convertir la fecha a la zona horaria de Colombia
        const fechaConZonaHoraria = (0, moment_timezone_1.default)(fecha).tz('America/Bogota').toDate();
        // Crear una nueva observación en MongoDB
        const nuevaObservacion = new observacion_1.Observacion({
            observaciont,
            fecha: fechaConZonaHoraria,
        });
        yield nuevaObservacion.save(); // Guardar en la base de datos
        res.json({
            message: `Observación registrada correctamente`,
            observacion: nuevaObservacion,
        });
    }
    catch (error) {
        console.error("Error al registrar la observación:", error);
        res.status(400).json({
            message: "Error al registrar la observación",
        });
    }
});
exports.RegObservacion = RegObservacion;
// Obtener todas las observaciones
const GetObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todas las observaciones ordenadas por fecha descendente
        const listaobservacion = yield observacion_1.Observacion.find().sort({ fecha: -1 });
        if (listaobservacion.length == 0) {
            console.warn("⚠️ No hay Observaciones en la base de datos.");
        }
        res.json(listaobservacion);
    }
    catch (error) {
        console.error("❌ Error al obtener Observaciones:", error);
        res.status(500).json({ message: "Error al obtener las Observaciones" });
    }
});
exports.GetObservacion = GetObservacion;
// Actualizar la observación
const UpObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // MongoDB usa `_id` como identificador
    const { observaciont, fecha } = req.body;
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(id); // <-- Aquí lo conviertes
        // Buscar y actualizar la observación
        const observacion = yield observacion_1.Observacion.findByIdAndUpdate(id, { observaciont }, { new: true } // Retorna el documento actualizado
        );
        if (observacion) {
            res.json({
                message: `Observación actualizada correctamente`,
                observacion,
            });
        }
        else {
            res.status(404).json({
                message: `Observación no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al actualizar la observación:", error);
        res.status(500).json({
            message: "Error al actualizar la observación",
        });
    }
});
exports.UpObservacion = UpObservacion;
// Eliminar la observación
const DelObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // MongoDB usa `_id` como identificador
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(id); // <-- Aquí también
        // Buscar y eliminar la observación
        const observacion = yield observacion_1.Observacion.findByIdAndDelete(id);
        if (observacion) {
            res.json({
                message: `Observación eliminada correctamente`,
            });
        }
        else {
            res.status(404).json({
                message: `Observación no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al eliminar la observación:", error);
        res.status(500).json({
            message: "Error al eliminar la observación",
        });
    }
});
exports.DelObservacion = DelObservacion;
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
