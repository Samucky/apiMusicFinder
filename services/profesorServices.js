import profesorRepository from '../repositories/profesorRepository.js'

async function getAllProfesores() {
    return await profesorRepository.getProfesores()
}

async function addProfesor(profesor) {
    // Validación de campos existentes: 'usuarioId' y 'correo'
    if (!profesor.usuarioId || !profesor.correo) {
        throw new Error("El profesor debe tener un usuarioId y un correo.");
    }

    const profesores = await profesorRepository.getProfesores();

    // Generar un nuevo ID para el nuevo profesor
    const newId = profesores.length > 0 ? Math.max(...profesores.map(p => p.id)) + 1 : 1;
    const newProfesor = { ...profesor, id: newId };

    profesores.push(newProfesor);
    await profesorRepository.saveProfesores(profesores);

    return newProfesor;
}


async function updateProfesor(id, updatedProfesor) {
    const profesores = await profesorRepository.getProfesores();
    const index = profesores.findIndex(profesor => profesor.id === parseInt(id));

    if (index === -1) {
        throw new Error('Profesor no encontrado');
    }

    delete updatedProfesor.id;
    profesores[index] = { ...profesores[index], ...updatedProfesor };

    await profesorRepository.saveProfesores(profesores);
    return profesores[index];
}

async function deleteProfesor(id) {
    const profesores = await profesorRepository.getProfesores();
    const index = profesores.findIndex(profesor => profesor.id === parseInt(id));

    if (index === -1) {
        throw new Error('Profesor no encontrado');
    }

    const filteredProfesores = profesores.filter(profesor => profesor.id !== parseInt(id));
    await profesorRepository.saveProfesores(filteredProfesores);
    return { message: 'Profesor eliminado' };
}

export default {
    getAllProfesores,
    addProfesor,
    updateProfesor,
    deleteProfesor
}
