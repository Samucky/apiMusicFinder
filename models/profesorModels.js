class Profesor {
    constructor(id, usuarioId, correo, contrasena, biografia, especialidades, tarifas, horariosDisponibles, multimedia, calificacionPromedio) {
        this.id = id;  // 'id' como se espera en el JSON
        this.usuarioId = usuarioId;  // 'usuarioId' como se espera en el JSON
        this.correo = correo;  // 'correo' como se espera en el JSON
        this.contrasena = contrasena;  // 'contrasena' como se espera en el JSON
        this.biografia = biografia;  // 'biografia' como se espera en el JSON
        this.especialidades = especialidades;  // 'especialidades' como se espera en el JSON
        this.tarifas = tarifas;  // 'tarifas' como se espera en el JSON
        this.horariosDisponibles = horariosDisponibles;  // 'horariosDisponibles' como se espera en el JSON
        this.multimedia = multimedia;  // 'multimedia' como se espera en el JSON
        this.calificacionPromedio = calificacionPromedio;  // 'calificacionPromedio' como se espera en el JSON
    }
}

export { Profesor };
