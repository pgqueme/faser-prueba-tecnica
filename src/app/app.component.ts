import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	nombre_tarea:string = "";
	tiempo_tarea:number = 0;

	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	async agregarTarea(nombre = "", tiempo = 0){
		console.log('nombre', nombre);
		console.log('tiempo', tiempo);
		console.log('nombre', this.nombre_tarea);
		console.log('tiempo', this.tiempo_tarea);
		console.log('tareas',this.tareas);

		let ultimoElemento = this.tareas.length + 1
		this.tareas.push(new Tarea(ultimoElemento, nombre, tiempo));
		this.nombre_tarea = "";
		this.tiempo_tarea = 0;
	}
}
