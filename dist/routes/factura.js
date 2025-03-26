"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factura_1 = require("../Controllers/factura");
const validartoken_1 = __importDefault(require("./validartoken"));
const router = (0, express_1.Router)();
router.post("/api/Factura/RegFacturas", factura_1.RegFacturas);
router.get("/api/Factura/GetFacturas", validartoken_1.default, factura_1.GetFacturas);
exports.default = router;
