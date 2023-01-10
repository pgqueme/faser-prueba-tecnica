export class Tarea {
    // Variables publicas para el ingreso de los datos de las tareas
    public nombre: string;
    public hora: Number;
    public terminada: boolean;
    public id: Number;
    constructor(
        id: Number,
        nombreT: string,
        horaT: Number,
        terminada?:boolean
    ){
        // validacion para las tareas terminadas y poder eliminarlar
        this.terminada = terminada ? terminada : false;
        // ingreso de los datos de las tareas para poder manipularlos
        this.id= id;
        this.nombre = nombreT;
        this.hora = horaT; 
    }
}