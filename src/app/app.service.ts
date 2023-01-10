// importacion de librerias de Angular
import { Injectable } from '@angular/core';
// importacion de clase Tarea
import { Tarea } from './tarea';

@Injectable({
    providedIn: 'root'
})
export class AppService { 
    // LocalStorage
    CALVE_LOCAL_STORAGE = "tareas_angular"
    
    constructor() { }
    
    // Funcion para obtener las tareas
    getTareas():Tarea[]{
        
        try {
            // Variable para guardar los datos
            var tareas: Tarea[] = [];
            // datos por defecto
            tareas.push(new Tarea(1, 'Sacar a pasear al perro', 15));
            tareas.push(new Tarea(2, 'Sacar la basura', 5));
            tareas.push(new Tarea(3, 'Cocinar la cena', 30));
            tareas.push(new Tarea(4, 'Lavar la ropa', 50));
            tareas.push(new Tarea(5, 'Regar las plantas', 20));
            tareas.reverse();
            return tareas;
        } catch (error) {
            return null;
        }
        // Retorna un JSON para guardalas en el localStorage
        return JSON.parse(localStorage.getItem(this.CALVE_LOCAL_STORAGE) || "[]")
    }
    
    // Funcion para Guardar las tareas
    saveTareas(tareas: Tarea[]){
        localStorage.setItem(this.CALVE_LOCAL_STORAGE, JSON.stringify(tareas))
    }
}