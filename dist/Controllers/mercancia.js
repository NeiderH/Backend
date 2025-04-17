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
exports.GetMercanciaAgrupada = exports.EstadoMercancia = exports.UpMercancia = exports.GetMercancia = exports.RegMercancia = void 0;
const mercancia_1 = require("../Models/mercancia");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
// Registrar mercancía
// Registrar mercancía
const RegMercancia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { proveedor, producto, descripcion, precio, fecha } = req.body;
    const fechaConZonaHoraria = (0, moment_timezone_1.default)(fecha).tz('America/Bogota').toDate();
    try {
        const nuevaMercancia = new mercancia_1.Mercancia({
            proveedor,
            producto,
            descripcion,
            precio,
            fecha: fechaConZonaHoraria,
            estado: 1,
        });
        yield nuevaMercancia.save();
        res.json({
            message: `Mercancía registrada correctamente`,
            mercancia: nuevaMercancia,
        });
    }
    catch (error) {
        console.error("Error al registrar la mercancía:", error);
        res.status(400).json({
            message: "Error al registrar la mercancía",
        });
    }
});
exports.RegMercancia = RegMercancia;
// Obtener todas las mercancías
const GetMercancia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listamerca = yield mercancia_1.Mercancia.find().sort({ fecha: -1 });
        res.json(listamerca);
    }
    catch (error) {
        console.error("Error al obtener mercancías:", error);
        res.status(500).json({ message: "Error al obtener las mercancías" });
    }
});
exports.GetMercancia = GetMercancia;
// Actualizar mercancía
const UpMercancia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // MongoDB usa `_id` como identificador
    const { descripcion, estado } = req.body;
    try {
        const mercancia = yield mercancia_1.Mercancia.findByIdAndUpdate(id, { descripcion, estado }, { new: true });
        if (mercancia) {
            res.json({
                message: `Mercancía actualizada correctamente`,
                mercancia,
            });
        }
        else {
            res.status(404).json({
                message: `Mercancía no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al actualizar la mercancía:", error);
        res.status(500).json({
            message: "Error al actualizar la mercancía",
        });
    }
});
exports.UpMercancia = UpMercancia;
// Cambiar el estado de la mercancía
const EstadoMercancia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        const mercancia = yield mercancia_1.Mercancia.findByIdAndUpdate(id, { estado }, { new: true });
        if (mercancia) {
            res.json({
                message: `Estado de la mercancía actualizado correctamente`,
                mercancia,
            });
        }
        else {
            res.status(404).json({
                message: `Mercancía no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al cambiar el estado de la mercancía:", error);
        res.status(500).json({
            message: "Error al cambiar el estado de la mercancía",
        });
    }
});
exports.EstadoMercancia = EstadoMercancia;
// Obtener mercancías agrupadas por fecha y calcular totales
const GetMercanciaAgrupada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha, limit } = req.query; // Obtener la fecha y el límite desde los parámetros de consulta
    try {
        const whereCondition = { estado: 1 }; // Solo mercancías activas
        if (fecha) {
            whereCondition.fecha = {
                $gte: (0, moment_timezone_1.default)(fecha).startOf('day').toDate(),
                $lte: (0, moment_timezone_1.default)(fecha).endOf('day').toDate(),
            };
        }
        // Obtener mercancías activas
        const mercancias = yield mercancia_1.Mercancia.find(whereCondition).sort({ fecha: -1 });
        // Agrupar mercancías por fecha y calcular el total
        const agrupadas = mercancias.reduce((acc, mercancia) => {
            const fecha = (0, moment_timezone_1.default)(mercancia.fecha).format('YYYY-MM-DD');
            const precio = mercancia.precio;
            if (!acc[fecha]) {
                acc[fecha] = { total: 0, detalles: [] };
            }
            acc[fecha].total += precio;
            acc[fecha].detalles.push(mercancia);
            return acc;
        }, {});
        // Limitar las agrupaciones a las fechas más recientes
        const agrupadasLimitadas = Object.keys(agrupadas)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Ordenar por fecha descendente
            .slice(0, limit ? parseInt(limit) : 5) // Limitar a las fechas más recientes
            .reduce((acc, key) => {
            acc[key] = agrupadas[key];
            return acc;
        }, {});
        res.json(agrupadasLimitadas);
    }
    catch (error) {
        console.error("Error al obtener mercancías agrupadas:", error);
        res.status(500).json({ message: "Error al obtener mercancías agrupadas" });
    }
});
exports.GetMercanciaAgrupada = GetMercanciaAgrupada;
// registrar el plato 
// export const RegMercancia = async (req: Request, res: Response) => {
//     const { proveedor, producto, descripcion, precio, fecha} = req.body;
//     try {
//         await Mercancia.create({
//             proveedor: proveedor,
//             producto: producto,
//             descripcion: descripcion,
//             precio: precio,
//             fecha: fecha,
//             estado: 1,
//         });
//         res.json({
//             message: `Mercancia registrada correctamente`,
//         });
//     } catch (error) {
//         console.error("Error al registrar la Mercancia:", error);
//         res.status(400).json({
//             message: "Error al registrar la Mercancia",
//         });
//     }
// };
// // obtener todos los platos
// export const GetMercancia = async (req: Request, res: Response) => {
//     try {
//         const listamerca = await Mercancia.findAll({
//             order: [['id_merca', 'DESC']]
//         });
//         console.log("📌 Mercancia encontrada:", listamerca);
//         if (listamerca.length == 0) {
//             console.warn("⚠️ No hay Mercancias en la base de datos.");
//         }
//         res.json(listamerca);
//     } catch (error) {
//         console.error("❌ Error al obtener mercancia:", error);
//         res.status(500).json({ message: "Error al obtener las mercancias" });
//     }
// };
// // actualizar el plato 
// export const UpMercancia = async (req: Request, res: Response) => {
//     const { id_merca } = req.params;
//     const {descripcion,estado} = req.body;
//     try {
//         const mercancia = await Mercancia.findOne({
//             where: {
//                 id_merca: id_merca,
//             },
//         });
//         if (mercancia) {
//             await mercancia.update({
//                 descripcion: descripcion,
//                 estado: estado
//             });
//             res.json({
//                 message: `Mercancia actualizada correctamente`,
//             });
//         } else {
//             res.status(404).json({
//                 message: `Mercancia no encontrada`,
//             });
//         }
//     } catch (error) {
//         console.error("Error al actualizar la Mercancia:", error);
//         res.status(500).json({
//             message: "Error al actualizar la Mercancia",
//         });
//     }
// };
// // cambiar el estado de la mercancia
// export const EstadoMercancia = async (req: Request, res: Response) => {
//     const { id_merca } = req.params;
//     const { estado } = req.body; // Recibir el nuevo estado desde el frontend
//     try {
//         const mercancia = await Mercancia.findOne({
//             where: {
//                 id_merca: id_merca,
//             },
//         });
//         if (mercancia) {
//             await mercancia.update({
//                 estado: estado, // Actualizar con el estado recibido
//             });
//             res.json({
//                 message: `Estado de la mercancía actualizado correctamente`,
//             });
//         } else {
//             res.status(404).json({
//                 message: `Mercancía no encontrada`,
//             });
//         }
//     } catch (error) {
//         console.error("Error al cambiar el estado de la mercancía:", error);
//         res.status(500).json({
//             message: "Error al cambiar el estado de la mercancía",
//         });
//     }
// };
// // obtener las mercancias registradas y agrupar las que tienen la misma fecha(dia), excepto las anuladas (estado = 0)
// export const GetMercanciaAgrupada = async (req: Request, res: Response) => {
//     const { fecha } = req.query; // Obtener la fecha desde los parámetros de consulta
//     try {
//         const whereCondition: any = { estado: 1 }; // Solo mercancías activas
//         if (fecha) {
//             whereCondition[Op.and] = [
//                 Sequelize.where(Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), fecha)
//             ];
//         }
//         const mercancias = await Mercancia.findAll({
//             where: whereCondition,
//             attributes: [
//                 [Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), 'fecha'], // Formatear la fecha
//                 'id_merca', 'proveedor', 'producto', 'descripcion', 'precio', 'estado' // Incluir detalles
//             ],
//             order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), 'DESC']] // Ordenar por fecha descendente
//         });
//         // Agrupar mercancías por fecha y calcular el total
//         const agrupadas = mercancias.reduce((acc: any, mercancia: any) => {
//             const fecha = mercancia.get('fecha');
//             if (!acc[fecha]) {
//                 acc[fecha] = { total: 0, detalles: [] };
//             }
//             acc[fecha].total += parseFloat(mercancia.get('precio'));
//             acc[fecha].detalles.push(mercancia);
//             return acc;
//         }, {});
//         res.json(agrupadas);
//     } catch (error) {
//         console.error("Error al obtener mercancías agrupadas:", error);
//         res.status(500).json({ message: "Error al obtener mercancías agrupadas" });
//     }
// };
