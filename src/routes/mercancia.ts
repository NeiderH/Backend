import { Router } from "express";
import { EstadoMercancia, GetMercancia,GetMercanciaAgrupada, RegMercancia, UpMercancia } from "../Controllers/mercancia";

const router = Router();

router.post("/api/Mercancia/RegMercancia", RegMercancia);
router.get("/api/Mercancia/GetMercancia", GetMercancia);
router.put("/api/Mercancia/UpMercancia/:id", UpMercancia);
router.put("/api/Mercancia/EstadoMercancia/:id", EstadoMercancia);
router.get("/api/Mercancia/GetMercanciaAgrupada", GetMercanciaAgrupada);
export default router;