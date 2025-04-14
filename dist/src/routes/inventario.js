"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventario_1 = require("../Controllers/inventario");
const router = (0, express_1.Router)();
router.get("/api/Inventario/GetInventario", inventario_1.GetInventario);
exports.default = router;
