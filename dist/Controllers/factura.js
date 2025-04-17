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
exports.GetFacturaAgrupada = exports.EstadoFactura = exports.UpFacturas = exports.GetFactura = exports.RegFactura = void 0;
const factura_1 = require("../Models/factura");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
// Registrar una factura
const RegFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha, tipo_proceso, subtotal, descripcion } = req.body;
    try {
        // Convertir la fecha a la zona horaria de Colombia
        const fechaConZonaHoraria = (0, moment_timezone_1.default)(fecha).tz('America/Bogota').toDate();
        // Crear una nueva factura en MongoDB
        const nuevaFactura = new factura_1.Factura({
            fecha: fechaConZonaHoraria,
            tipo_proceso,
            subtotal,
            descripcion,
            estado: 1,
        });
        yield nuevaFactura.save(); // Guardar en la base de datos
        res.json({
            message: `Factura registrada correctamente`,
            factura: nuevaFactura,
        });
    }
    catch (error) {
        console.error("Error al registrar la factura:", error);
        res.status(400).json({
            message: "Error al registrar la factura",
        });
    }
});
exports.RegFactura = RegFactura;
// Obtener todas las facturas
const GetFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todas las facturas ordenadas por fecha descendente
        const listafactura = yield factura_1.Factura.find().sort({ fecha: -1 });
        if (listafactura.length === 0) {
            console.warn("⚠️ No hay Facturas en la base de datos.");
        }
        res.json(listafactura);
    }
    catch (error) {
        console.error("❌ Error al obtener las Facturas:", error);
        res.status(500).json({ message: "Error al obtener las Facturas" });
    }
});
exports.GetFactura = GetFactura;
// Actualizar una factura
const UpFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // MongoDB usa `_id` como identificador
    const { descripcion, estado } = req.body;
    try {
        // Buscar y actualizar la factura
        const factura = yield factura_1.Factura.findByIdAndUpdate(id, { descripcion, estado }, { new: true } // Retorna el documento actualizado
        );
        if (factura) {
            res.json({
                message: `Factura actualizada correctamente`,
                factura,
            });
        }
        else {
            res.status(404).json({
                message: `Factura no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al actualizar la Factura:", error);
        res.status(500).json({
            message: "Error al actualizar la Factura",
        });
    }
});
exports.UpFacturas = UpFacturas;
// Cambiar el estado de una factura
const EstadoFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // MongoDB usa `_id` como identificador
    const { estado } = req.body; // Recibir el nuevo estado desde el frontend
    try {
        // Buscar y actualizar el estado de la factura
        const factura = yield factura_1.Factura.findByIdAndUpdate(id, { estado }, { new: true } // Retorna el documento actualizado
        );
        if (factura) {
            res.json({
                message: `Estado de la Factura actualizado correctamente`,
                factura,
            });
        }
        else {
            res.status(404).json({
                message: `Factura no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al cambiar el estado de la Factura:", error);
        res.status(500).json({
            message: "Error al cambiar el estado de la Factura",
        });
    }
});
exports.EstadoFactura = EstadoFactura;
// Obtener facturas agrupadas por fecha y calcular totales
const GetFacturaAgrupada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha, limit } = req.query; // Obtener la fecha y el límite desde los parámetros de consulta
    try {
        const whereCondition = { estado: 1 }; // Solo facturas activas
        if (fecha) {
            whereCondition.fecha = {
                $gte: (0, moment_timezone_1.default)(fecha).startOf('day').toDate(),
                $lte: (0, moment_timezone_1.default)(fecha).endOf('day').toDate(),
            };
        }
        // Obtener facturas activas
        const facturas = yield factura_1.Factura.find(whereCondition).sort({ fecha: -1 });
        // Agrupar facturas por fecha y calcular el total
        const agrupadas = facturas.reduce((acc, factura) => {
            const fecha = (0, moment_timezone_1.default)(factura.fecha).format('YYYY-MM-DD');
            const subtotal = factura.subtotal;
            const tipoProceso = factura.tipo_proceso;
            if (!acc[fecha]) {
                acc[fecha] = { total: 0, totalfac: 0, totalinv: 0, totalsini: 0, totalventa: 0, totaldom: 0, totaltrans: 0, totalotro: 0, detalles: [] };
            }
            // Sumar subtotales según el tipo de proceso
            acc[fecha].totalsini += subtotal;
            acc[fecha].total += tipoProceso === 'Inversion' ? -subtotal : subtotal;
            acc[fecha].totalfac += tipoProceso === 'Inversion' ? 0 : subtotal;
            if (tipoProceso === 'Inversion')
                acc[fecha].totalinv += subtotal;
            if (tipoProceso === 'Venta')
                acc[fecha].totalventa += subtotal;
            if (tipoProceso === 'Domicilio')
                acc[fecha].totaldom += subtotal;
            if (tipoProceso === 'Transferencia')
                acc[fecha].totaltrans += subtotal;
            if (tipoProceso === 'Otro')
                acc[fecha].totalotro += subtotal;
            acc[fecha].detalles.push(factura);
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
        console.error("Error al obtener facturas agrupadas:", error);
        res.status(500).json({ message: "Error al obtener facturas agrupadas" });
    }
});
exports.GetFacturaAgrupada = GetFacturaAgrupada;
// export const RegFactura = async (req: Request, res: Response) => {
//     let { fecha, tipo_proceso, subtotal, descripcion } = req.body;
//     try {
//         await Factura.create({
//             fecha: fecha,
//             tipo_proceso: tipo_proceso,
//             subtotal: subtotal,
//             descripcion: descripcion,
//             estado: 1,
//         });
//         res.json({
//             message: `Factura registrada correctamente`,
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: "Error al registrar la factura",
//         });
//     }
// };
// export const GetFactura = async (req: Request, res: Response) => {
//     try {
//         const listafactura = await Factura.findAll({
//             order: [['fecha', 'DESC']]
//         });
//         console.log("📌 Factura encontrada:", listafactura);
//         if (listafactura.length == 0) {
//             console.warn("⚠️ No hay Facturas en la base de datos.");
//         }
//         res.json(listafactura);
//     } catch (error) {
//         console.error("❌ Error al obtener la Factura:", error);
//         res.status(500).json({ message: "Error al obtener las Facturas" });
//     }
// };
// // cambiar el estado de la factura
// export const UpFacturas = async (req: Request, res: Response) => {
//     const { id_factura } = req.params;
//     const { descripcion, estado } = req.body;
//     try {
//         const factura: any = await Factura.findOne({
//             where: {
//                 id_factura: id_factura,
//             },
//         });
//         if (factura) {
//             await factura.update({
//                 descripcion: descripcion,
//                 estado: estado,
//             });
//             res.json({
//                 message: `Factura actualizada correctamente`,
//             });
//         } else {
//             res.status(404).json({
//                 message: `Factura no encontrada`,
//             });
//         }
//     } catch (error) {
//         console.error("Error al actualizar la Factura:", error);
//         res.status(500).json({
//             message: "Error al actualizar la Factura",
//         });
//     }
// }
// //cambiar el estado de la factura
// export const EstadoFactura = async (req: Request, res: Response) => {
//     const { id_factura } = req.params;
//     const { estado } = req.body; // Recibir el nuevo estado desde el frontend
//     try {
//         const factura = await Factura.findOne({
//             where: {
//                 id_factura: id_factura,
//             },
//         });
//         if (factura) {
//             await factura.update({
//                 estado: estado, // Actualizar con el estado recibido
//             });
//             res.json({
//                 message: `Estado de la Factura actualizado correctamente`,
//             });
//         } else {
//             res.status(404).json({
//                 message: `Factura no encontrada`,
//             });
//         }
//     } catch (error) {
//         console.error("Error al cambiar el estado de la Factura:", error);
//         res.status(500).json({
//             message: "Error al cambiar el estado de la Factura",
//         });
//     }
// };
// // Obtener facturas agrupadas por fecha y calcular totales
// export const GetFacturaAgrupada = async (req: Request, res: Response) => {
//     const { fecha, limit } = req.query; // Obtener la fecha y el límite desde los parámetros de consulta
//     try {
//         const whereCondition: any = { estado: 1 }; // Solo facturas activas
//         if (fecha) {
//             whereCondition[Op.and] = [
//                 Sequelize.where(Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), fecha)
//             ];
//         }
//         const facturas = await Factura.findAll({
//             where: whereCondition,
//             attributes: [
//                 [Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), 'fecha'], // Formatear la fecha
//                 'id_factura', 'tipo_proceso', 'subtotal', 'descripcion', 'estado' // Incluir detalles
//             ],
//             order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), 'DESC']], // Ordenar por fecha descendente
//         });
//         // Agrupar facturas por fecha y calcular el total
//         const agrupadas = facturas.reduce((acc: any, factura: any) => {
//             const fecha = factura.get('fecha');
//             const subtotal = parseFloat(factura.get('subtotal'));
//             const tipoProceso = factura.get('tipo_proceso');
//             if (!acc[fecha]) {
//                 acc[fecha] = { total: 0, totalfac: 0, totalinv: 0, totalsini: 0, totalventa: 0, totaldom: 0, totaltrans: 0, totalotro: 0, detalles: [] };
//             }
//             // Sumar subtotales según el tipo de proceso
//             acc[fecha].totalsini += subtotal;
//             acc[fecha].total += tipoProceso == 'Inversion' ? -subtotal : subtotal;
//             acc[fecha].totalfac += tipoProceso == 'Inversion' ? 0 : subtotal;
//             if (tipoProceso == 'Inversion') acc[fecha].totalinv += subtotal;
//             if (tipoProceso == 'Venta') acc[fecha].totalventa += subtotal;
//             if (tipoProceso == 'Domicilio') acc[fecha].totaldom += subtotal;
//             if (tipoProceso == 'Transferencia') acc[fecha].totaltrans += subtotal;
//             if (tipoProceso == 'Otro') acc[fecha].totalotro += subtotal;
//             acc[fecha].detalles.push(factura);
//             return acc;
//         }, {});
//         // Limitar las agrupaciones a las 5 fechas más recientes
//         const agrupadasLimitadas = Object.keys(agrupadas)
//             .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Ordenar por fecha descendente
//             .slice(0, limit ? parseInt(limit as string) : 5) // Limitar a las 5 fechas más recientes
//             .reduce((acc: any, key: string) => {
//                 acc[key] = agrupadas[key];
//                 return acc;
//             }, {});
//         res.json(agrupadasLimitadas);
//     } catch (error) {
//         console.error("Error al obtener facturas agrupadas:", error);
//         res.status(500).json({ message: "Error al obtener facturas agrupadas" });
//     }
// };
