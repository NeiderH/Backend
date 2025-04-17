import { Router } from "express";
import { GetUsuario, LogUsuarios, RegUsuarios } from "../Controllers/usuario";

const router = Router();

router.post("/api/Usuario/RegUsuarios", RegUsuarios);
router.post("/api/Usuario/LogUsuarios", LogUsuarios);
router.get("/api/Usuario/GetUsuario", GetUsuario);

export default router;