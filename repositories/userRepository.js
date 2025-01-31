import fs from 'fs-extra';
import { Usuario } from '../models/userModels.js';  // Importación nombrada

const usersFilePath = './data/usuarios.json';

// Función para obtener usuarios
async function getUsuarios() {
    try {
        const data = await fs.readJson(usersFilePath);
        return data.map(user => new Usuario(
            user.id, user.nombre, user.correo, user.contrasena, 
            user.tipoUsuario, user.fechaRegistro, user.fotoPerfil  // Ahora las propiedades coinciden con el JSON
        ));
    } catch (error) {
        console.error('Error al leer usuarios:', error);
    }
}

// Función para guardar usuarios
async function saveUsuarios(usuarios) {
    try {
        await fs.writeJson(usersFilePath, usuarios);
    } catch (error) {
        console.error('Error al guardar usuarios:', error);
    }
}

export default {
    getUsuarios,
    saveUsuarios
};
