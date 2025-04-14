import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Usuario } from "../Models/usuario";
import jwt from "jsonwebtoken";
import { app } from "../firebase";

export const RegUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, correo, password, permiso } = req.body;

        if (!nombre || !correo || !password || !permiso) {
            res.status(400).json({ message: "Todos los campos son obligatorios" });
            return;
        }

        const usuariounico = await Usuario.findOne({ where: { correo } });

        if (usuariounico) {
            res.status(400).json({ message: `El correo ${correo} ya está registrado` });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            password: passwordHash,
            estado: true,
            permiso,
        });

        const userData = nuevoUsuario.get(); // Convierte el modelo a un objeto plano

        res.json({ message: `Usuario ${userData.nombre} registrado correctamente` });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};

export const LogUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            res.status(400).json({ message: "Correo y contraseña son obligatorios" });
            return;
        }

        const usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            res.status(400).json({ message: `El correo ${correo} no está registrado` });
            return;
        }

        const userData = usuario.get(); // Convierte el modelo a un objeto plano

        const validPassword = await bcrypt.compare(password, userData.password);
        
        if (!validPassword) {
            res.status(400).json({ message: "La contraseña es incorrecta" });
            return;
        }

        const token = jwt.sign(
            { id: userData.id, correo: userData.correo, permiso: userData.permiso },
            process.env["SECRET_KEY"] || "CY242BHtr87DCsacYUGjsJN",
            { expiresIn: "1d" }
        );

        res.json({ token, userData: { nombre: userData.nombre, permiso: userData.permiso} });

    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
};
