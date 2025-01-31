import express from 'express';
import { check, validationResult } from 'express-validator';
import profesorService from '../services/profesorServices.js';
import {Profesor} from '../models/profesorModels.js';

const router = express.Router();

router.get('/profesores', async (req, res) => {
    try {
        const profesores = await profesorService.getAllProfesores();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/profesores',
    [
        check('usuarioId').not().isEmpty().withMessage('El usuarioId es requerido'), // Validación para usuarioId
        check('correo').isEmail().withMessage('Correo inválido'), // Validación para correo
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            // Desestructuración de los campos requeridos
            const { usuarioId, correo, contrasena, biografia, especialidades, tarifas, horariosDisponibles, multimedia, calificacionPromedio } = req.body;
            
            // Crear el nuevo objeto Profesor
            const newProfesor = new Profesor(
                null, // id: se genera automáticamente en el servicio
                usuarioId, // usuarioId
                correo, // correo
                contrasena, // contrasena
                biografia, // biografia
                especialidades, // especialidades
                tarifas, // tarifas
                horariosDisponibles, // horariosDisponibles
                multimedia, // multimedia
                calificacionPromedio // calificacionPromedio
            );

            // Llamar al servicio para agregar el profesor
            const addedProfesor = await profesorService.addProfesor(newProfesor);

            // Responder con el profesor agregado
            res.status(201).json(addedProfesor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);


router.put('/profesores/:id', async (req, res) => {
    try {
        const updatedProfesor = await profesorService.updateProfesor(req.params.id, req.body);
        res.json(updatedProfesor);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/profesores/:id', async (req, res) => {
    try {
        const result = await profesorService.deleteProfesor(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
