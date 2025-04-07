import { Router } from "express";
import { RegFactura, GetFactura } from "../Controllers/factura";

const router = Router();

router.post("/api/Factura/RegFactura", RegFactura);
router.get("/api/Factura/GetFactura", GetFactura);

export default router;