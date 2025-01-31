import express from 'express';
import usuarioRouter from './controllers/userController.js';
import profesorRouter from './controllers/profesorController.js';

const app = express();

app.use(express.json());

// Rutas para usuarios y profesores
app.use('/api/usuarios', usuarioRouter);
app.use('/api/profesores', profesorRouter);

const PORT = 3001;
app.listen(PORT, _ => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
