import fs from 'fs-extra';
import { Profesor } from '../models/profesorModels.js';  // Importación nombrada

const teachersFilePath = './data/profesores.json';

// Función para obtener profesores
async function getProfesores() {
    try {
        const data = await fs.readJson(teachersFilePath);
        return data.map(prof => new Profesor(
            prof.id,  // id del profesor
            prof.usuarioId,  // usuarioId del profesor
            prof.correo,  // correo del profesor
            prof.contrasena,  // contrasena del profesor
            prof.biografia,  // biografia del profesor
            prof.especialidades,  // especialidades del profesor
            prof.tarifas,  // tarifas del profesor
            prof.horariosDisponibles,  // horariosDisponibles del profesor
            prof.multimedia,  // multimedia del profesor
            prof.calificacionPromedio  // calificacionPromedio del profesor
        ));
    } catch (error) {
        console.error('Error al leer profesores:', error);
    }
}

// Función para guardar profesores
async function saveProfesores(profesores) {
    try {
        await fs.writeJson(teachersFilePath, profesores);
    } catch (error) {
        console.error('Error al guardar profesores:', error);
    }
}

export default {
    getProfesores,
    saveProfesores
};
