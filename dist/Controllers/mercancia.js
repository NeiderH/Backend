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
exports.GetMercanciaAgrupada = exports.EstadoMercancia = exports.UpMercancia = exports.GetMercancia = exports.RegMercancia = void 0;
const mercancia_1 = require("../Models/mercancia");
const sequelize_1 = require("sequelize");
// registrar el plato 
const RegMercancia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { proveedor, producto, descripcion, precio, fecha } = req.body;
    try {
        yield mercancia_1.Mercancia.create({
            proveedor: proveedor,
            producto: producto,
            descripcion: descripcion,
            precio: precio,
            fecha: fecha,
            estado: 1,
        });
        res.json({
            message: `Mercancia registrada correctamente`,
        });
    }
    catch (error) {
        console.error("Error al registrar la Mercancia:", error);
        res.status(400).json({
            message: "Error al registrar la Mercancia",
        });
    }
});
exports.RegMercancia = RegMercancia;
// obtener todos los platos
const GetMercancia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listamerca = yield mercancia_1.Mercancia.findAll({
            order: [['id_merca', 'DESC']]
        });
        console.log("📌 Mercancia encontrada:", listamerca);
        if (listamerca.length == 0) {
            console.warn("⚠️ No hay Mercancias en la base de datos.");
        }
        res.json(listamerca);
    }
    catch (error) {
        console.error("❌ Error al obtener mercancia:", error);
        res.status(500).json({ message: "Error al obtener las mercancias" });
    }
});
exports.GetMercancia = GetMercancia;
// actualizar el plato 
const UpMercancia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_merca } = req.params;
    const { descripcion, estado } = req.body;
    try {
        const mercancia = yield mercancia_1.Mercancia.findOne({
            where: {
                id_merca: id_merca,
            },
        });
        if (mercancia) {
            yield mercancia.update({
                descripcion: descripcion,
                estado: estado
            });
            res.json({
                message: `Mercancia actualizada correctamente`,
            });
        }
        else {
            res.status(404).json({
                message: `Mercancia no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al actualizar la Mercancia:", error);
        res.status(500).json({
            message: "Error al actualizar la Mercancia",
        });
    }
});
exports.UpMercancia = UpMercancia;
// cambiar el estado de la mercancia
const EstadoMercancia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_merca } = req.params;
    const { estado } = req.body; // Recibir el nuevo estado desde el frontend
    try {
        const mercancia = yield mercancia_1.Mercancia.findOne({
            where: {
                id_merca: id_merca,
            },
        });
        if (mercancia) {
            yield mercancia.update({
                estado: estado, // Actualizar con el estado recibido
            });
            res.json({
                message: `Estado de la mercancía actualizado correctamente`,
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
// obtener las mercancias registradas y agrupar las que tienen la misma fecha(dia), excepto las anuladas (estado = 0)
const GetMercanciaAgrupada = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha } = req.query; // Obtener la fecha desde los parámetros de consulta
    try {
        const whereCondition = { estado: 1 }; // Solo mercancías activas
        if (fecha) {
            whereCondition[sequelize_1.Op.and] = [
                sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('fecha'), '%Y-%m-%d'), fecha)
            ];
        }
        const mercancias = yield mercancia_1.Mercancia.findAll({
            where: whereCondition,
            attributes: [
                [sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('fecha'), '%Y-%m-%d'), 'fecha'], // Formatear la fecha
                'id_merca', 'proveedor', 'producto', 'descripcion', 'precio', 'estado' // Incluir detalles
            ],
            order: [[sequelize_1.Sequelize.fn('DATE_FORMAT', sequelize_1.Sequelize.col('fecha'), '%Y-%m-%d'), 'DESC']] // Ordenar por fecha descendente
        });
        // Agrupar mercancías por fecha y calcular el total
        const agrupadas = mercancias.reduce((acc, mercancia) => {
            const fecha = mercancia.get('fecha');
            if (!acc[fecha]) {
                acc[fecha] = { total: 0, detalles: [] };
            }
            acc[fecha].total += parseFloat(mercancia.get('precio'));
            acc[fecha].detalles.push(mercancia);
            return acc;
        }, {});
        res.json(agrupadas);
    }
    catch (error) {
        console.error("Error al obtener mercancías agrupadas:", error);
        res.status(500).json({ message: "Error al obtener mercancías agrupadas" });
    }
});
exports.GetMercanciaAgrupada = GetMercanciaAgrupada;
