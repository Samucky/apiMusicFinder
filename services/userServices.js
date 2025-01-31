import usuarioRepository from '../repositories/userRepository.js'

async function getAllUsuarios() {
    return await usuarioRepository.getUsuarios()
}

async function addUsuario(usuario) {
    if (!usuario.nombre || !usuario.correo) {
        throw new Error("El usuario debe tener un nombre y un correo.");
    }

    const usuarios = await usuarioRepository.getUsuarios();

    const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    const newUsuario = { ...usuario, id: newId };

    usuarios.push(newUsuario);
    await usuarioRepository.saveUsuarios(usuarios);

    return newUsuario;
}

async function updateUsuario(id, updatedUsuario) {
    // Obtener los usuarios
    const usuarios = await usuarioRepository.getUsuarios();
    
    // Convertir el id a número (si no lo es ya)
    const usuarioId = parseInt(id, 10);

    console.log(`Buscando usuario con ID: ${usuarioId}`);
    console.log("Usuarios disponibles: ", usuarios);

    // Buscar el índice del usuario por id
    const index = usuarios.findIndex(usuario => usuario.id === usuarioId);

    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }

    // Eliminar el id del objeto actualizado antes de hacer la mezcla
    delete updatedUsuario.id;
    
    // Actualizar el usuario
    usuarios[index] = { ...usuarios[index], ...updatedUsuario };

    // Guardar los usuarios actualizados
    await usuarioRepository.saveUsuarios(usuarios);

    // Devolver el usuario actualizado
    return usuarios[index];
}

async function deleteUsuario(id) {
    // Obtener los usuarios
    const usuarios = await usuarioRepository.getUsuarios();
    
    // Convertir el id a número (si no lo es ya)
    const usuarioId = parseInt(id, 10);

    console.log(`Eliminando usuario con ID: ${usuarioId}`);
    console.log("Usuarios disponibles: ", usuarios);

    // Buscar el índice del usuario por id
    const index = usuarios.findIndex(usuario => usuario.id === usuarioId);

    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }

    // Filtrar y eliminar el usuario
    const filteredUsuarios = usuarios.filter(usuario => usuario.id !== usuarioId);

    // Guardar los usuarios actualizados
    await usuarioRepository.saveUsuarios(filteredUsuarios);

    // Devolver el mensaje de éxito
    return { message: 'Usuario eliminado' };
}

export default {
    getAllUsuarios,
    addUsuario,
    updateUsuario,
    deleteUsuario
}
