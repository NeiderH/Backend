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
const usuario_1 = __importDefault(require("../routes/usuario"));
const factura_1 = __importDefault(require("../routes/factura"));
const plato_1 = __importDefault(require("../routes/plato"));
const observacion_1 = __importDefault(require("../routes/observacion"));
const inventario_1 = __importDefault(require("../routes/inventario"));
const mercancia_1 = __importDefault(require("../routes/mercancia"));
const usuario_2 = require("./usuario");
const factura_2 = require("./factura");
const plato_2 = require("./plato");
const observacion_2 = require("./observacion");
const inventario_2 = require("./inventario");
const mercancia_2 = require("./mercancia");
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
            console.log(`Server running on port ${this.port}`);
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
        this.app.use(plato_1.default);
        this.app.use(observacion_1.default);
        this.app.use(inventario_1.default);
        this.app.use(mercancia_1.default);
    }
    DBConexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // recordarme eliminar sync en producción
                yield usuario_2.Usuario.sync();
                yield factura_2.Factura.sync();
                yield plato_2.Plato.sync();
                yield observacion_2.Observacion.sync();
                yield inventario_2.Inventario.sync();
                yield mercancia_2.Mercancia.sync();
                console.log('DB online');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Server;
