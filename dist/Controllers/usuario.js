"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogUsuarios = exports.RegUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../Models/usuario");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RegUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, correo, password, permiso } = req.body;
        if (!nombre || !correo || !password || !permiso) {
            res.status(400).json({ message: "Todos los campos son obligatorios" });
            return;
        }
        const usuariounico = yield usuario_1.Usuario.findOne({ where: { correo } });
        if (usuariounico) {
            res.status(400).json({ message: `El correo ${correo} ya está registrado` });
            return;
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const nuevoUsuario = yield usuario_1.Usuario.create({
            nombre,
            correo,
            password: passwordHash,
            estado: true,
            permiso,
        });
        const userData = nuevoUsuario.get(); // Convierte el modelo a un objeto plano
        res.json({ message: `Usuario ${userData.nombre} registrado correctamente` });
    }
    catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
});
exports.RegUsuarios = RegUsuarios;
const LogUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, password } = req.body;
        if (!correo || !password) {
            res.status(400).json({ message: "Correo y contraseña son obligatorios" });
            return;
        }
        const usuario = yield usuario_1.Usuario.findOne({ where: { correo } });
        if (!usuario) {
            res.status(400).json({ message: `El correo ${correo} no está registrado` });
            return;
        }
        const userData = usuario.get(); // Convierte el modelo a un objeto plano
        const validPassword = yield bcrypt_1.default.compare(password, userData.password);
        if (!validPassword) {
            res.status(400).json({ message: "La contraseña es incorrecta" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: userData.id, correo: userData.correo, permiso: userData.permiso }, process.env["SECRET_KEY"] || "CY242BHtr87DCsacYUGjsJN", { expiresIn: "1d" });
        res.json({ token, userData: { nombre: userData.nombre, permiso: userData.permiso } });
    }
    catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
});
exports.LogUsuarios = LogUsuarios;
