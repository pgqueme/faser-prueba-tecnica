import { Injectable } from '@angular/core';
import { Tarea } from './tarea';

@Injectable()
export class AppService { 
    constructor(
        
    ) { }

    public async obtenerTareas() {
        try {
            var tareas: Tarea[] = [];
            tareas.push(new Tarea(1, 'Sacar a pasear al perro', 15, false, false));
            tareas.push(new Tarea(2, 'Sacar la basura', 5, false, false));
            tareas.push(new Tarea(3, 'Cocinar la cena', 30, false, false));
            tareas.push(new Tarea(4, 'Lavar la ropa', 50, false, false));
            tareas.push(new Tarea(5, 'Regar las plantas', 20, false, false));
            return tareas;
        } catch (error) {
            return null;
        }
    }
}