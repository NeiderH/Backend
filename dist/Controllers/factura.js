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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFacturaAgrupada = exports.EstadoFactura = exports.UpFacturas = exports.GetFactura = exports.RegFactura = void 0;
const factura_1 = require("../Models/factura");
const sequelize_1 = require("sequelize");
const RegFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { fecha, tipo_proceso, subtotal, descripcion } = req.body;
    try {
        yield factura_1.Factura.create({
            fecha: fecha,
            tipo_proceso: tipo_proceso,
            subtotal: subtotal,
            descripcion: descripcion,
            estado: 1,
        });
        res.json({
            message: `Factura registrada correctamente`,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error al registrar la factura",
        });
    }
});
exports.RegFactura = RegFactura;
const GetFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listafactura = yield factura_1.Factura.findAll({
            order: [['fecha', 'DESC']]
        });
        console.log("📌 Factura encontrada:", listafactura);
        if (listafactura.length == 0) {
            console.warn("⚠️ No hay Facturas en la base de datos.");
        }
        res.json(listafactura);
    }
    catch (error) {
        console.error("❌ Error al obtener la Factura:", error);
        res.status(500).json({ message: "Error al obtener las Facturas" });
    }
});
exports.GetFactura = GetFactura;
// cambiar el estado de la factura
const UpFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_factura } = req.params;
    const { descripcion, estado } = req.body;
    try {
        const factura = yield factura_1.Factura.findOne({
            where: {
                id_factura: id_factura,
            },
        });
        if (factura) {
            yield factura.update({
                descripcion: descripcion,
                estado: estado,
            });
            res.json({
                message: `Factura actualizada correctamente`,
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
//cambiar el estado de la factura
const EstadoFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_factura } = req.params;
    const { estado } = req.body; // Recibir el nuevo estado desde el frontend
    try {
        const factura = yield factura_1.Factura.findOne({
            where: {
                id_factura: id_factura,
            },
        });
        if (factura) {
            yield factura.update({
                estado: estado, // Actualizar con el estado recibido
            });
            res.json({
                message: `Estado de la Factura actualizado correctamente`,
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
            whereCondition[sequelize_1.Op.and] = [
                sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('fecha'), '%Y-%m-%d'), fecha)
            ];
        }
        const facturas = yield factura_1.Factura.findAll({
            where: whereCondition,
            attributes: [
                [sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('fecha'), '%Y-%m-%d'), 'fecha'], // Formatear la fecha
                'id_factura', 'tipo_proceso', 'subtotal', 'descripcion', 'estado' // Incluir detalles
            ],
            order: [[sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('fecha'), '%Y-%m-%d'), 'DESC']], // Ordenar por fecha descendente
            limit: limit ? parseInt(limit) : undefined, // Aplicar el límite si se proporciona
        });
        // Agrupar facturas por fecha y calcular el total
        const agrupadas = facturas.reduce((acc, factura) => {
            const fecha = factura.get('fecha');
            const subtotal = parseFloat(factura.get('subtotal'));
            const tipoProceso = factura.get('tipo_proceso');
            if (!acc[fecha]) {
                acc[fecha] = { total: 0, totalfac: 0, totalinv: 0, totalsini: 0, totalventa: 0, totaldom: 0, totaltrans: 0, totalotro: 0, detalles: [] };
            }
            // Sumar subtotales según el tipo de proceso
            acc[fecha].totalsini += subtotal;
            acc[fecha].total += tipoProceso == 'Inversion' ? -subtotal : subtotal;
            acc[fecha].totalfac += tipoProceso == 'Inversion' ? 0 : subtotal;
            if (tipoProceso == 'Inversion')
                acc[fecha].totalinv += subtotal;
            if (tipoProceso == 'Venta')
                acc[fecha].totalventa += subtotal;
            if (tipoProceso == 'Domicilio')
                acc[fecha].totaldom += subtotal;
            if (tipoProceso == 'Transferencia')
                acc[fecha].totaltrans += subtotal;
            if (tipoProceso == 'Otro')
                acc[fecha].totalotro += subtotal;
            acc[fecha].detalles.push(factura);
            return acc;
        }, {});
        res.json(agrupadas);
    }
    catch (error) {
        console.error("Error al obtener facturas agrupadas:", error);
        res.status(500).json({ message: "Error al obtener facturas agrupadas" });
    }
});
exports.GetFacturaAgrupada = GetFacturaAgrupada;
