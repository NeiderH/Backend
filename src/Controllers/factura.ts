import { Request, Response } from "express";
import { Factura } from "../Models/factura";
import jwt from "jsonwebtoken";

export const RegFactura = async (req: Request, res: Response) => {
    const { fecha, tipo_proceso, subtotal, descripcion} = req.body;

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
            order: [['id_factura', 'DESC']]

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
export const UpEFacturas = async (req: Request, res: Response) => {
    const { id_factura } = req.body;
    const factura:any = await Factura.findOne({
        where: {
            id_factura: id_factura,
        },
    });
}