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
const moment_timezone_1 = __importDefault(require("moment-timezone"));
// registrar la observacion 
const RegObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { observaciont, fecha } = req.body;
    try {
        // Convertir la fecha a la zona horaria de Colombia
        const fechaColombia = moment_timezone_1.default.tz(fecha, "America/Bogota").utc().format();
        yield observacion_1.Observacion.create({
            observaciont: observaciont,
            fecha: fechaColombia,
        });
        res.json({
            message: `Observación registrada correctamente`,
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
// obtener todas las observaciones
const GetObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaobservacion = yield observacion_1.Observacion.findAll({
            order: [['fecha', 'DESC']],
        });
        console.log("📌 Observacion encontrada:", listaobservacion);
        if (listaobservacion.length === 0) {
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
// actualizar la observacion 
const UpObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ob } = req.params;
    const { observaciont, fecha } = req.body;
    try {
        const observacion = yield observacion_1.Observacion.findOne({
            where: {
                id_ob: id_ob,
            },
        });
        if (observacion) {
            yield observacion.update({
                observaciont: observaciont,
                fecha: fecha,
            });
            res.json({
                message: `Plobservacionato actualizada correctamente`,
            });
        }
        else {
            res.status(404).json({
                message: `observacion no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al actualizar la observacion:", error);
        res.status(500).json({
            message: "Error al actualizar la observacion",
        });
    }
});
exports.UpObservacion = UpObservacion;
// eliminar la observacion
const DelObservacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_ob } = req.params;
    try {
        const observacion = yield observacion_1.Observacion.findOne({
            where: {
                id_ob: id_ob,
            },
        });
        if (observacion) {
            yield observacion.destroy();
            res.json({
                message: `observacion eliminada correctamente`,
            });
        }
        else {
            res.status(404).json({
                message: `observacion no encontrada`,
            });
        }
    }
    catch (error) {
        console.error("Error al eliminar la observacion:", error);
        res.status(500).json({
            message: "Error al eliminar la observacion",
        });
    }
});
exports.DelObservacion = DelObservacion;
