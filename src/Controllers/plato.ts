import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Plato } from "../Models/plato";

// registrar el plato 
export const RegPlato = async (req: Request, res: Response) => {
    const { nom_plato, valor, categoria } = req.body;

    try {
        await Plato.create({
            nom_plato: nom_plato,
            valor: valor,
            categoria: categoria,
        });
        
        res.json({
            message: `Plato registrado correctamente`,
        });
        
    } catch (error) {
        console.error("Error al registrar el plato:", error);
        res.status(400).json({
            message: "Error al registrar el plato",
        });
    }
};
// obtener todos los platos
export const GetPlato = async (req: Request, res: Response) => {
    try {
      const listaplatos = await Plato.findAll();
      console.log("📌 Platos encontrados:", listaplatos);
      
      if (listaplatos.length === 0) {
        console.warn("⚠️ No hay platos en la base de datos.");
      }
  
      res.json(listaplatos);
    } catch (error) {
      console.error("❌ Error al obtener platos:", error);
      res.status(500).json({ message: "Error al obtener los platos" });
    }
  };
  


// actualizar el plato 
export const UpPlato = async (req: Request, res: Response) => {
    const { id_pl } = req.params;
    const { nom_plato, valor, categoria } = req.body;

    try {
        const plato = await Plato.findOne({
            where: {
                id_pl: id_pl,
            },
        });

        if (plato) {
            await plato.update({
                nom_plato: nom_plato,
                valor: valor,
                categoria: categoria,
            });
            res.json({
                message: `Plato actualizado correctamente`,
            });
        } else {
            res.status(404).json({
                message: `Plato no encontrado`,
            });
        }
    } catch (error) {
        console.error("Error al actualizar el plato:", error);
        res.status(500).json({
            message: "Error al actualizar el plato",
        });
    }
};
// eliminar el plato
export const DelPlato = async (req: Request, res: Response) => {
    const { id_pl } = req.params;

    try {
        const plato = await Plato.findOne({
            where: {
                id_pl: id_pl,
            },
        });

        if (plato) {
            await plato.destroy();
            res.json({
                message: `Plato eliminado correctamente`,
            });
        } else {
            res.status(404).json({
                message: `Plato no encontrado`,
            });
        }
    } catch (error) {
        console.error("Error al eliminar el plato:", error);
        res.status(500).json({
            message: "Error al eliminar el plato",
        });
    }
};