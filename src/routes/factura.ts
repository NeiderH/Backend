import { Router } from "express";
import { RegFactura, GetFactura, EstadoFactura, UpFacturas, GetFacturaAgrupada } from "../Controllers/factura";

const router = Router();

router.post("/api/Factura/RegFactura", RegFactura);
router.get("/api/Factura/GetFactura", GetFactura);
router.put("/api/Factura/UpFactura/:id", UpFacturas);
router.put("/api/Factura/EstadoFactura/:id", EstadoFactura);
router.get("/api/Factura/GetFacturaAgrupada", GetFacturaAgrupada);

export default router;