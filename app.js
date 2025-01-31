import express from 'express';
import cors from 'cors';  // Importa el paquete cors
import usuarioRouter from './controllers/userController.js';
import profesorRouter from './controllers/profesorController.js';

const app = express();

// Habilita CORS para todos los orígenes (es decir, cualquier frontend puede acceder a la API)
app.use(cors());  // Permite todas las solicitudes desde cualquier origen

// O si solo quieres permitir ciertos orígenes (por ejemplo, desde 'http://127.0.0.1:5500' para desarrollo local)
// app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(express.json());

// Rutas para usuarios y profesores
app.use('/api/usuarios', usuarioRouter);
app.use('/api/profesores', profesorRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
