import { Request, Response } from "express";
import { Observacion } from "../Models/observacion";
import moment from "moment-timezone";

// registrar la observacion 
export const RegObservacion = async (req: Request, res: Response) => {
    const { observaciont, fecha } = req.body;

    try {
        // Convertir la fecha a la zona horaria de Colombia
        const fechaConZonaHoraria = moment(fecha).tz('America/Bogota').toDate();

        await Observacion.create({
            observaciont: observaciont,
            fecha: fechaConZonaHoraria,
        });

        res.json({
            message: `Observación registrada correctamente`,
        });
    } catch (error) {
        console.error("Error al registrar la observación:", error);
        res.status(400).json({
            message: "Error al registrar la observación",
        });
    }
};
// obtener todas las observaciones
export const GetObservacion = async (req: Request, res: Response) => {
    try {
      const listaobservacion = await Observacion.findAll(
        {
            order: [['fecha', 'DESC']],
        }
      );
      console.log("📌 Observacion encontrada:", listaobservacion);
      
      if (listaobservacion.length === 0) {
        console.warn("⚠️ No hay Observaciones en la base de datos.");
      }
  
      res.json(listaobservacion);
    } catch (error) {
      console.error("❌ Error al obtener Observaciones:", error);
      res.status(500).json({ message: "Error al obtener las Observaciones" });
    }
  };
  


// actualizar la observacion 
export const UpObservacion = async (req: Request, res: Response) => {
    const { id_ob } = req.params;
    const { observaciont, fecha } = req.body;

    try {
        const observacion = await Observacion.findOne({
            where: {
                id_ob: id_ob,
            },
        });

        if (observacion) {

            await observacion.update({
                observaciont: observaciont,
            });
            res.json({
                message: `Plobservacionato actualizada correctamente`,
            });
        } else {
            res.status(404).json({
                message: `observacion no encontrada`,
            });
        }
    } catch (error) {
        console.error("Error al actualizar la observacion:", error);
        res.status(500).json({
            message: "Error al actualizar la observacion",
        });
    }
};
// eliminar la observacion
export const DelObservacion = async (req: Request, res: Response) => {
    const { id_ob } = req.params;

    try {
        const observacion = await Observacion.findOne({
            where: {
                id_ob: id_ob,
            },
        });

        if (observacion) {
            await observacion.destroy();
            res.json({
                message: `observacion eliminada correctamente`,
            });
        } else {
            res.status(404).json({
                message: `observacion no encontrada`,
            });
        }
    } catch (error) {
        console.error("Error al eliminar la observacion:", error);
        res.status(500).json({
            message: "Error al eliminar la observacion",
        });
    }
};