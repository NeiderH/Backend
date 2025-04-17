import { Router } from "express";
import { DelObservacion, GetObservacion, RegObservacion, UpObservacion } from "../Controllers/observacion";

const router = Router();

router.post("/api/Observacion/RegObservacion", RegObservacion);
router.get("/api/Observacion/GetObservacion", GetObservacion);
router.put("/api/Observacion/UpObservacion/:id", UpObservacion);
router.delete("/api/Observacion/DelObservacion/:id", DelObservacion);

export default router;