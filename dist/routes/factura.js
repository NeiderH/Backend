"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factura_1 = require("../Controllers/factura");
const router = (0, express_1.Router)();
router.post("/api/Factura/RegFactura", factura_1.RegFactura);
router.get("/api/Factura/GetFactura", factura_1.GetFactura);
exports.default = router;
