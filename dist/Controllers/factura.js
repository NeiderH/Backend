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
exports.UpEFacturas = exports.GetFactura = exports.RegFactura = void 0;
const factura_1 = require("../Models/factura");
const RegFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha, tipo_proceso, subtotal, descripcion } = req.body;
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
            order: [['id_factura', 'DESC']]
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
const UpEFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_factura } = req.body;
    const factura = yield factura_1.Factura.findOne({
        where: {
            id_factura: id_factura,
        },
    });
});
exports.UpEFacturas = UpEFacturas;
