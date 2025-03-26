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
exports.GetInventario = void 0;
const inventario_1 = require("../Models/inventario");
// obtener todos los platos
const GetInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listainv = yield inventario_1.Inventario.findAll({
            order: [['id_inv', 'DESC']],
        });
        console.log("📌 Inventario encontrado:", listainv);
        if (listainv.length === 0) {
            console.warn("⚠️ No hay Inventarios en la base de datos.");
        }
        res.json(listainv);
    }
    catch (error) {
        console.error("❌ Error al obtener Inventario:", error);
        res.status(500).json({ message: "Error al obtener los Inventarios" });
    }
});
exports.GetInventario = GetInventario;
