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
exports.EstadoMercancia = exports.UpMercancia = exports.GetMercancia = exports.RegMercancia = void 0;
const mercancia_1 = require("../Models/mercancia");
// registrar el plato 
const RegMercancia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { proveedor, producto, descripcion, precio, fecha, estado, cantidad, id_inv } = req.body;
    try {
        yield mercancia_1.Mercancia.create({
            proveedor: proveedor,
            producto: producto,
            descripcion: descripcion,
            precio: precio,
            fecha: fecha,
            estado: 0,
            cantidad: cantidad,
            // foreign key de la tabla de inventario - puede ser null
            id_inv: id_inv
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
            order: [['fecha', 'DESC']],
        });
        console.log("📌 Mercancia encontrada:", listamerca);
        if (listamerca.length === 0) {
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
    const { proveedor, producto, descripcion, precio, fecha, estado, cantidad, id_inv, } = req.body;
    try {
        const mercancia = yield mercancia_1.Mercancia.findOne({
            where: {
                id_merca: id_merca,
            },
        });
        if (mercancia) {
            yield mercancia.update({
                proveedor: proveedor,
                producto: producto,
                descripcion: descripcion,
                precio: precio,
                fecha: fecha,
                estado: estado,
                cantidad: cantidad,
                // foreign key de la tabla de inventario - puede ser null
                id_inv: id_inv
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
    const { estado } = req.body;
    try {
        const mercancia = yield mercancia_1.Mercancia.findOne({
            where: {
                id_merca: id_merca,
            },
        });
        if (mercancia) {
            yield mercancia.update({
                estado: estado,
            });
            res.json({
                message: `Estado de la mercancia actualizado correctamente`,
            });
        }
        else {
            res.status(404).json({
                message: `Mercancia no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al cambiar el estado de la mercancia:", error);
        res.status(500).json({
            message: "Error al cambiar el estado de la mercancia",
        });
    }
});
exports.EstadoMercancia = EstadoMercancia;
