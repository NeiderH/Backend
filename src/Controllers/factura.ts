import { Request, Response } from "express";
import { Factura } from "../Models/factura";
import jwt from "jsonwebtoken";
import { Sequelize, Op } from "sequelize";


export const RegFactura = async (req: Request, res: Response) => {
    let { fecha, tipo_proceso, subtotal, descripcion } = req.body;

    try {

        await Factura.create({
            fecha: fecha,
            tipo_proceso: tipo_proceso,
            subtotal: subtotal,
            descripcion: descripcion,
            estado: 1,
        });

        res.json({
            message: `Factura registrada correctamente`,
        });

    } catch (error) {
        res.status(400).json({
            message: "Error al registrar la factura",
        });
    }
};
export const GetFactura = async (req: Request, res: Response) => {
    try {
        const listafactura = await Factura.findAll({
            order: [['fecha', 'DESC']]

        });
        console.log("📌 Factura encontrada:", listafactura);

        if (listafactura.length == 0) {
            console.warn("⚠️ No hay Facturas en la base de datos.");
        }

        res.json(listafactura);
    } catch (error) {
        console.error("❌ Error al obtener la Factura:", error);
        res.status(500).json({ message: "Error al obtener las Facturas" });
    }
};
// cambiar el estado de la factura
export const UpFacturas = async (req: Request, res: Response) => {
    const { id_factura } = req.params;
    const { descripcion, estado } = req.body;

    try {
        const factura: any = await Factura.findOne({
            where: {
                id_factura: id_factura,
            },
        });
        if (factura) {
            await factura.update({
                descripcion: descripcion,
                estado: estado,
            });
            res.json({
                message: `Factura actualizada correctamente`,
            });
        } else {
            res.status(404).json({
                message: `Factura no encontrada`,
            });
        }
    } catch (error) {
        console.error("Error al actualizar la Factura:", error);
        res.status(500).json({
            message: "Error al actualizar la Factura",
        });
    }
}
//cambiar el estado de la factura
export const EstadoFactura = async (req: Request, res: Response) => {
    const { id_factura } = req.params;
    const { estado } = req.body; // Recibir el nuevo estado desde el frontend

    try {
        const factura = await Factura.findOne({
            where: {
                id_factura: id_factura,
            },
        });

        if (factura) {
            await factura.update({
                estado: estado, // Actualizar con el estado recibido
            });
            res.json({
                message: `Estado de la Factura actualizado correctamente`,
            });
        } else {
            res.status(404).json({
                message: `Factura no encontrada`,
            });
        }
    } catch (error) {
        console.error("Error al cambiar el estado de la Factura:", error);
        res.status(500).json({
            message: "Error al cambiar el estado de la Factura",
        });
    }
};
// Obtener facturas agrupadas por fecha y calcular totales
export const GetFacturaAgrupada = async (req: Request, res: Response) => {
    const { fecha, limit } = req.query; // Obtener la fecha y el límite desde los parámetros de consulta

    try {
        const whereCondition: any = { estado: 1 }; // Solo facturas activas
        if (fecha) {
            whereCondition[Op.and] = [
                Sequelize.where(Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), fecha)
            ];
        }

        const facturas = await Factura.findAll({
            where: whereCondition,
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), 'fecha'], // Formatear la fecha
                'id_factura', 'tipo_proceso', 'subtotal', 'descripcion', 'estado' // Incluir detalles
            ],
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('fecha'), '%Y-%m-%d'), 'DESC']], // Ordenar por fecha descendente
            limit: limit ? parseInt(limit as string) : undefined, // Aplicar el límite si se proporciona
        });

        // Agrupar facturas por fecha y calcular el total
        const agrupadas = facturas.reduce((acc: any, factura: any) => {
            const fecha = factura.get('fecha');
            const subtotal = parseFloat(factura.get('subtotal'));
            const tipoProceso = factura.get('tipo_proceso');

            if (!acc[fecha]) {
                acc[fecha] = { total: 0, totalfac: 0, totalinv: 0, totalsini: 0, totalventa: 0, totaldom: 0, totaltrans: 0, totalotro: 0, detalles: [] };
            }

            // Sumar subtotales según el tipo de proceso
            acc[fecha].totalsini += subtotal;
            acc[fecha].total += tipoProceso == 'Inversion' ? -subtotal : subtotal;
            acc[fecha].totalfac += tipoProceso == 'Inversion' ? 0 : subtotal;
            if (tipoProceso == 'Inversion') acc[fecha].totalinv += subtotal;
            if (tipoProceso == 'Venta') acc[fecha].totalventa += subtotal;
            if (tipoProceso == 'Domicilio') acc[fecha].totaldom += subtotal;
            if (tipoProceso == 'Transferencia') acc[fecha].totaltrans += subtotal;
            if (tipoProceso == 'Otro') acc[fecha].totalotro += subtotal;

            acc[fecha].detalles.push(factura);
            return acc;
        }, {});

        res.json(agrupadas);
    } catch (error) {
        console.error("Error al obtener facturas agrupadas:", error);
        res.status(500).json({ message: "Error al obtener facturas agrupadas" });
    }
};
