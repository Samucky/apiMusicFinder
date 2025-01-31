class Usuario {
    constructor(id, nombre, correo, contrasena, tipoUsuario, fechaRegistro, fotoPerfil = null) {
        this.id = id;  // 'id' viene del JSON
        this.nombre = nombre;  // 'nombre' viene del JSON
        this.correo = correo;  // 'correo' viene del JSON
        this.contrasena = contrasena;  // 'contrasena' viene del JSON
        this.tipoUsuario = tipoUsuario;  // 'tipoUsuario' viene del JSON
        this.fechaRegistro = fechaRegistro;  // 'fechaRegistro' viene del JSON
        this.fotoPerfil = fotoPerfil;  // 'fotoPerfil' viene del JSON
    }
}

export { Usuario };
