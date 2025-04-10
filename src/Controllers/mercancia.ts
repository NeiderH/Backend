import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Mercancia } from "../Models/mercancia";
import { Sequelize, Op } from "sequelize";

// registrar el plato 
export const RegMercancia = async (req: Request, res: Response) => {
    const { proveedor, producto, descripcion, precio, fecha} = req.body;

    try {

        await Mercancia.create({
            proveedor: proveedor,
            producto: producto,
            descripcion: descripcion,
            precio: precio,
            fecha: fecha,
            estado: 1,
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
            order: [['id_merca', 'DESC']]

        });
        console.log("📌 Mercancia encontrada:", listamerca);

        if (listamerca.length == 0) {
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
    const {descripcion,estado} = req.body;

    try {
        const mercancia = await Mercancia.findOne({
            where: {
                id_merca: id_merca,
            },
        });

        if (mercancia) {

            await mercancia.update({
                descripcion: descripcion,
                estado: estado
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
    const { estado } = req.body; // Recibir el nuevo estado desde el frontend

    try {
        const mercancia = await Mercancia.findOne({
            where: {
                id_merca: id_merca,
            },
        });

        if (mercancia) {
            await mercancia.update({
                estado: estado, // Actualizar con el estado recibido
            });
            res.json({
                message: `Estado de la mercancía actualizado correctamente`,
            });
        } else {
            res.status(404).json({
                message: `Mercancía no encontrada`,
            });
        }
    } catch (error) {
        console.error("Error al cambiar el estado de la mercancía:", error);
        res.status(500).json({
            message: "Error al cambiar el estado de la mercancía",
        });
    }
};
// obtener las mercancias registradas y agrupar las que tienen la misma fecha(dia), excepto las anuladas (estado = 0)
export const GetMercanciaAgrupada = async (req: Request, res: Response) => {
    const { fecha } = req.query; // Obtener la fecha desde los parámetros de consulta

    try {
        const whereCondition: any = { estado: 1 }; // Solo mercancías activas
        if (fecha) {
            whereCondition[Op.and] = [
                Sequelize.where(Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), fecha)
            ];
        }

        const mercancias = await Mercancia.findAll({
            where: whereCondition,
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), 'fecha'], // Formatear la fecha
                'id_merca', 'proveedor', 'producto', 'descripcion', 'precio', 'estado' // Incluir detalles
            ],
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), 'DESC']] // Ordenar por fecha descendente
        });

        // Agrupar mercancías por fecha y calcular el total
        const agrupadas = mercancias.reduce((acc: any, mercancia: any) => {
            const fecha = mercancia.get('fecha');
            if (!acc[fecha]) {
                acc[fecha] = { total: 0, detalles: [] };
            }
            acc[fecha].total += parseFloat(mercancia.get('precio'));
            acc[fecha].detalles.push(mercancia);
            return acc;
        }, {});

        res.json(agrupadas);
    } catch (error) {
        console.error("Error al obtener mercancías agrupadas:", error);
        res.status(500).json({ message: "Error al obtener mercancías agrupadas" });
    }
};