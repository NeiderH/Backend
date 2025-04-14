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
exports.DelPlato = exports.UpPlato = exports.GetPlato = exports.RegPlato = void 0;
const plato_1 = require("../Models/plato");
// registrar el plato 
const RegPlato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom_plato, valor, categoria } = req.body;
    try {
        yield plato_1.Plato.create({
            nom_plato: nom_plato,
            valor: valor,
            categoria: categoria,
        });
        res.json({
            message: `Plato registrado correctamente`,
        });
    }
    catch (error) {
        console.error("Error al registrar el plato:", error);
        res.status(400).json({
            message: "Error al registrar el plato",
        });
    }
});
exports.RegPlato = RegPlato;
// obtener todos los platos
const GetPlato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaplatos = yield plato_1.Plato.findAll();
        console.log("📌 Platos encontrados:", listaplatos);
        if (listaplatos.length === 0) {
            console.warn("⚠️ No hay platos en la base de datos.");
        }
        res.json(listaplatos);
    }
    catch (error) {
        console.error("❌ Error al obtener platos:", error);
        res.status(500).json({ message: "Error al obtener los platos" });
    }
});
exports.GetPlato = GetPlato;
// actualizar el plato 
const UpPlato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pl } = req.params;
    const { nom_plato, valor, categoria } = req.body;
    try {
        const plato = yield plato_1.Plato.findOne({
            where: {
                id_pl: id_pl,
            },
        });
        if (plato) {
            yield plato.update({
                nom_plato: nom_plato,
                valor: valor,
                categoria: categoria,
            });
            res.json({
                message: `Plato actualizado correctamente`,
            });
        }
        else {
            res.status(404).json({
                message: `Plato no encontrado`,
            });
        }
    }
    catch (error) {
        console.error("Error al actualizar el plato:", error);
        res.status(500).json({
            message: "Error al actualizar el plato",
        });
    }
});
exports.UpPlato = UpPlato;
// eliminar el plato
const DelPlato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pl } = req.params;
    try {
        const plato = yield plato_1.Plato.findOne({
            where: {
                id_pl: id_pl,
            },
        });
        if (plato) {
            yield plato.destroy();
            res.json({
                message: `Plato eliminado correctamente`,
            });
        }
        else {
            res.status(404).json({
                message: `Plato no encontrado`,
            });
        }
    }
    catch (error) {
        console.error("Error al eliminar el plato:", error);
        res.status(500).json({
            message: "Error al eliminar el plato",
        });
    }
});
exports.DelPlato = DelPlato;
