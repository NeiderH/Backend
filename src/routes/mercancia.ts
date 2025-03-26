import { Router } from "express";
import { EstadoMercancia, GetMercancia, RegMercancia, UpMercancia } from "../Controllers/mercancia";

const router = Router();

router.post("/api/Mercancia/RegMercancia", RegMercancia);
router.get("/api/Mercancia/GetMercancia", GetMercancia);
router.put("/api/Mercancia/UpMercancia/:id_merca", UpMercancia);
router.put("/api/Mercancia/EstadoMercancia/:id_merca", EstadoMercancia);

export default router;