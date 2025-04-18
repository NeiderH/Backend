import express, { Application } from 'express';
import cors from 'cors'; // Importa CORS
//import sequelize from '../data/conexion';
import connectDB from '../data/conexion';
import routerU from '../routes/usuario';
import routerF from '../routes/factura';
import routerO from '../routes/observacion';
import routerM from '../routes/mercancia';
import { Usuario } from './usuario';
import { Factura } from './factura';
import { Observacion } from './observacion';
import { Mercancia } from './mercancia';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
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
        this.app.use(cors({
            origin: "http://localhost:4200", // Permitir el frontend
            credentials: true, // Permitir envío de cookies/sesión si las usas
            methods: "GET,POST,PUT,DELETE",
            allowedHeaders: "Content-Type,Authorization"
        }));

        this.app.use(express.json()); // Para recibir JSON en requests
    }

    router() {
        this.app.use(routerU);
        this.app.use(routerF);
        this.app.use(routerO);
        this.app.use(routerM);
    }    

    async DBConexion() {
        try {
          await connectDB(); // Conectar a MongoDB
          console.log('DB mongo online');
        } catch (error) {
          console.error('Error al conectar a la base de datos:', error);
        }
      }
}

export default Server;
