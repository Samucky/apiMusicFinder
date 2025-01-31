import express from 'express';
import { check, validationResult } from 'express-validator';
import usuarioService from '../services/userServices.js';
import  { Usuario } from '../models/userModels.js';  // Importación nombrada

const router = express.Router();

router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await usuarioService.getAllUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/usuarios',
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido'),
        check('correo').isEmail().withMessage('Correo inválido'),
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const { nombre, correo, contrasena, tipoUsuario, fechaRegistro, fotoPerfil } = req.body;
            const newUsuario = new Usuario(null, nombre, correo, contrasena, tipoUsuario, fechaRegistro, fotoPerfil);
            const addedUsuario = await usuarioService.addUsuario(newUsuario);

            res.status(201).json(addedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.put('/usuarios/:id', async (req, res) => {
    try {
        const updatedUsuario = await usuarioService.updateUsuario(req.params.id, req.body);
        res.json(updatedUsuario);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/usuarios/:id', async (req, res) => {
    try {
        const result = await usuarioService.deleteUsuario(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
