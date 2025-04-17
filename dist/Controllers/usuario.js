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
exports.GetUsuario = exports.LogUsuarios = exports.RegUsuarios = void 0;
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
        // Buscar usuario único en MongoDB
        const usuariounico = yield usuario_1.Usuario.findOne({ correo });
        if (usuariounico) {
            res.status(400).json({ message: `El correo ${correo} ya está registrado` });
            return;
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        // Crear un nuevo usuario en MongoDB
        const nuevoUsuario = new usuario_1.Usuario({
            nombre,
            correo,
            password: passwordHash,
            estado: 'Activo',
            permiso,
        });
        yield nuevoUsuario.save(); // Guardar en la base de datos
        res.json({ message: `Usuario ${nuevoUsuario.nombre} registrado correctamente` });
    }
    catch (error) {
        console.error("Error en RegUsuarios:", error);
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
        // Buscar usuario en MongoDB
        const usuario = yield usuario_1.Usuario.findOne({ correo });
        if (!usuario) {
            res.status(400).json({ message: `El correo ${correo} no está registrado` });
            return;
        }
        const validPassword = yield bcrypt_1.default.compare(password, usuario.password);
        if (!validPassword) {
            res.status(400).json({ message: "La contraseña es incorrecta" });
            return;
        }
        // Generar el token con el correo del usuario
        const token = jsonwebtoken_1.default.sign({ correo: usuario.correo }, // Incluir el correo en el token
        process.env["SECRET_KEY"] || "CY242BHtr87DCsacYUGjsJN", { expiresIn: "1d" });
        // Enviar el token y los datos del usuario
        res.json({
            token,
            userData: {
                id: usuario._id, // MongoDB usa `_id` en lugar de `id`
                nombre: usuario.nombre,
            },
        });
    }
    catch (error) {
        console.error("Error en LogUsuarios:", error);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
});
exports.LogUsuarios = LogUsuarios;
const GetUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: "Token no proporcionado" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env["SECRET_KEY"] || "CY242BHtr87DCsacYUGjsJN");
        const correo = decoded.correo;
        // Buscar usuario en MongoDB
        const usuario = yield usuario_1.Usuario.findOne({ correo }, { _id: 1, nombre: 1, correo: 1, permiso: 1, estado: 1 } // Proyección para incluir solo los campos necesarios
        );
        if (!usuario) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.json(usuario); // Devuelve el usuario encontrado
    }
    catch (error) {
        console.error("Error en GetUsuario:", error);
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
});
exports.GetUsuario = GetUsuario;
// export const RegUsuarios = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { nombre, correo, password, permiso } = req.body;
//         if (!nombre || !correo || !password || !permiso) {
//             res.status(400).json({ message: "Todos los campos son obligatorios" });
//             return;
//         }
//         const usuariounico = await Usuario.findOne({ where: { correo } });
//         if (usuariounico) {
//             res.status(400).json({ message: `El correo ${correo} ya está registrado` });
//             return;
//         }
//         const passwordHash = await bcrypt.hash(password, 10);
//         const nuevoUsuario = await Usuario.create({
//             nombre,
//             correo,
//             password: passwordHash,
//             estado: 'Activo',
//             permiso,
//         });
//         const userData = nuevoUsuario.get(); // Convierte el modelo a un objeto plano
//         res.json({ message: `Usuario ${userData.nombre} registrado correctamente` });
//     } catch (error) {
//         res.status(500).json({ message: "Error al registrar el usuario" });
//     }
// };
// export const LogUsuarios = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { correo, password } = req.body;
//         if (!correo || !password) {
//             res.status(400).json({ message: "Correo y contraseña son obligatorios" });
//             return;
//         }
//         const usuario = await Usuario.findOne({ where: { correo } });
//         if (!usuario) {
//             res.status(400).json({ message: `El correo ${correo} no está registrado` });
//             return;
//         }
//         const userData = usuario.get(); // Convierte el modelo a un objeto plano
//         const validPassword = await bcrypt.compare(password, userData.password);
//         if (!validPassword) {
//             res.status(400).json({ message: "La contraseña es incorrecta" });
//             return;
//         }
//         // Generar el token con el ID y el correo del usuario
//         const token = jwt.sign(
//             { correo: userData.correo }, // Incluir el correo en el token
//             process.env["SECRET_KEY"] || "CY242BHtr87DCsacYUGjsJN",
//             { expiresIn: "1d" }
//         );
//         // Enviar el token y los datos del usuario
//         res.json({ 
//             token, 
//             userData: { 
//                 id: userData.id, // Asegúrate de que este campo esté presente
//                 nombre: userData.nombre
//             } 
//         });
//     } catch (error) {
//         console.error("Error en LogUsuarios:", error);
//         res.status(500).json({ message: "Error al iniciar sesión" });
//     }
// };
// export const GetUsuario = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             res.status(401).json({ message: "Token no proporcionado" });
//             return;
//         }
//         const decoded: any = jwt.verify(token, process.env["SECRET_KEY"] || "CY242BHtr87DCsacYUGjsJN");
//         const correo = decoded.correo;
//         const usuario = await Usuario.findOne({
//             where: { correo },
//             attributes: ['id', 'nombre', 'correo', 'permiso', 'estado'] // Incluye el campo estado
//         });
//         if (!usuario) {
//             res.status(404).json({ message: "Usuario no encontrado" });
//             return;
//         }
//         res.json(usuario); // Devuelve el estado como parte del objeto usuario
//     } catch (error) {
//         console.error("Error en GetUsuario:", error);
//         res.status(500).json({ message: "Error al obtener el usuario" });
//     }
// };
