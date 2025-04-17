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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Importa CORS
//import sequelize from '../data/conexion';
const conexion_1 = __importDefault(require("../data/conexion"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const factura_1 = __importDefault(require("../routes/factura"));
const observacion_1 = __importDefault(require("../routes/observacion"));
const mercancia_1 = __importDefault(require("../routes/mercancia"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3016';
        this.listen();
        this.middleware();
        this.router();
        this.DBConexion();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server port ${this.port}`);
        });
    }
    middleware() {
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:4200", // Permitir el frontend
            credentials: true, // Permitir envío de cookies/sesión si las usas
            methods: "GET,POST,PUT,DELETE",
            allowedHeaders: "Content-Type,Authorization"
        }));
        this.app.use(express_1.default.json()); // Para recibir JSON en requests
    }
    router() {
        this.app.use(usuario_1.default);
        this.app.use(factura_1.default);
        this.app.use(observacion_1.default);
        this.app.use(mercancia_1.default);
    }
    DBConexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, conexion_1.default)(); // Conectar a MongoDB
                console.log('DB mongo online');
            }
            catch (error) {
                console.error('Error al conectar a la base de datos:', error);
            }
        });
    }
}
exports.default = Server;
