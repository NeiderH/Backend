import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Mercancia } from "../Models/mercancia";

// registrar el plato 
export const RegMercancia = async (req: Request, res: Response) => {
    const { proveedor, producto, descripcion, precio, fecha, estado, cantidad, id_inv } = req.body;

    try {
        await Mercancia.create({
            proveedor: proveedor,
            producto: producto,
            descripcion: descripcion,
            precio: precio,
            fecha: fecha,
            estado: 0,
            cantidad: cantidad,
            // foreign key de la tabla de inventario - puede ser null
            id_inv: id_inv
        });

        res.json({
            message: `Mercancia registrada correctamente`,
        });

    } catch (error) {
        console.error("Error al registrar la Mercancia:", error);
        res.status(400).json({
            message: "Error al registrar la Mercancia",
        });
    }
};
// obtener todos los platos
export const GetMercancia = async (req: Request, res: Response) => {
    try {
        const listamerca = await Mercancia.findAll({
            order: [['fecha', 'DESC']],
        });
        console.log("📌 Mercancia encontrada:", listamerca);

        if (listamerca.length === 0) {
            console.warn("⚠️ No hay Mercancias en la base de datos.");
        }

        res.json(listamerca);
    } catch (error) {
        console.error("❌ Error al obtener mercancia:", error);
        res.status(500).json({ message: "Error al obtener las mercancias" });
    }
};
// actualizar el plato 
export const UpMercancia = async (req: Request, res: Response) => {
    const { id_merca } = req.params;
    const {
        proveedor,
        producto,
        descripcion,
        precio,
        fecha,
        estado,
        cantidad,
        id_inv,
    } = req.body;

    try {
        const mercancia = await Mercancia.findOne({
            where: {
                id_merca: id_merca,
            },
        });

        if (mercancia) {
            await mercancia.update({
                proveedor: proveedor,
                producto: producto,
                descripcion: descripcion,
                precio: precio,
                fecha: fecha,
                estado: estado,
                cantidad: cantidad,
                // foreign key de la tabla de inventario - puede ser null
                id_inv: id_inv
            });
            res.json({
                message: `Mercancia actualizada correctamente`,
            });
        } else {
            res.status(404).json({
                message: `Mercancia no encontrada`,
            });
        }
    } catch (error) {
        console.error("Error al actualizar la Mercancia:", error);
        res.status(500).json({
            message: "Error al actualizar la Mercancia",
        });
    }
};
// cambiar el estado de la mercancia
export const EstadoMercancia = async (req: Request, res: Response) => {
    const { id_merca } = req.params;
    const { estado } = req.body;

    try {
        const mercancia = await Mercancia.findOne({
            where: {
                id_merca: id_merca,
            },
        });

        if (mercancia) {
            await mercancia.update({
                estado: estado,
            });
            res.json({
                message: `Estado de la mercancia actualizado correctamente`,
            });
        } else {
            res.status(404).json({
                message: `Mercancia no encontrada`,
            });
        }
    } catch (error) {
        console.error("Error al cambiar el estado de la mercancia:", error);
        res.status(500).json({
            message: "Error al cambiar el estado de la mercancia",
        });
    }
};
