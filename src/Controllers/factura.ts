import { Request, Response } from "express";
import { Factura } from "../Models/factura";
import jwt from "jsonwebtoken";

export const RegFacturas = async (req: Request, res: Response) => {
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
export const GetFacturas = async (req: Request, res: Response) => {
    const listfacturas = await Factura.findAll();
    res.json(listfacturas);
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