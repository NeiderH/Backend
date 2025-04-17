//import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || ''; // Leer la URI desde las variables de entorno
    if (!mongoURI) {
      throw new Error('La variable de entorno MONGO_URI no está configurada');
    }

    await mongoose.connect(mongoURI, {
      dbName: process.env.MONGO_DB_NAME || 'gst', // Nombre de la base de datos
    });

    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir si no se puede conectar
  }
};

export default connectDB;

// const sequelize = new Sequelize('gst', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql' 
// });

//export default sequelize;