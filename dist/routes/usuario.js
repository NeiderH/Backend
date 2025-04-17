"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../Controllers/usuario");
const router = (0, express_1.Router)();
router.post("/api/Usuario/RegUsuarios", usuario_1.RegUsuarios);
router.post("/api/Usuario/LogUsuarios", usuario_1.LogUsuarios);
router.get("/api/Usuario/GetUsuario", usuario_1.GetUsuario);
exports.default = router;
