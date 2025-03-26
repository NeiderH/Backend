import { Router } from "express";
import { LogUsuarios, RegUsuarios } from "../Controllers/usuario";

const router = Router();

router.post("/api/Usuario/RegUsuarios", RegUsuarios);
router.post("/api/Usuario/LogUsuarios", LogUsuarios);

export default router;