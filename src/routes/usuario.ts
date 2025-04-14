import { Router } from "express";
import { LogUsuarios, RegUsuarios, VerUsuario } from "../Controllers/usuario";

const router = Router();

router.post("/api/Usuario/RegUsuarios", RegUsuarios);
router.post("/api/Usuario/LogUsuarios", LogUsuarios);
router.get("/api/Usuario/VerUsuario", VerUsuario);

export default router;