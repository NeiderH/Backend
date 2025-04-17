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
//import { Sequelize } from 'sequelize';
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar las variables de entorno desde el archivo .env
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURI = process.env.MONGO_URI || ''; // Leer la URI desde las variables de entorno
        if (!mongoURI) {
            throw new Error('La variable de entorno MONGO_URI no está configurada');
        }
        yield mongoose_1.default.connect(mongoURI, {
            dbName: process.env.MONGO_DB_NAME || 'gst', // Nombre de la base de datos
        });
        console.log('MongoDB conectado');
    }
    catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Salir si no se puede conectar
    }
});
exports.default = connectDB;
// const sequelize = new Sequelize('gst', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql' 
// });
//export default sequelize;
