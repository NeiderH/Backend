import { Router } from "express";
import { RegFacturas, GetFacturas } from "../Controllers/factura";
import validartoken from "./validartoken";

const router = Router();

router.post("/api/Factura/RegFacturas", RegFacturas);
router.get("/api/Factura/GetFacturas", validartoken, GetFacturas);

export default router;