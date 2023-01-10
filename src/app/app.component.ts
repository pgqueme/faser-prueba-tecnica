import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
	

	constructor(
        public service: AppService
	) { }
	
	// Variables para el ingreso de los datos
	nombreTarea="";
	horaTime: Number;
	id: Number;
	// una varible publica el cual sera un arreglo vacion de la clase Tarea
	public tareas: Tarea[] = []

	// Funcion para guardar las tareas ingresadas por el usuario
	saveTareas(){
		// Nueva variba para guardar los datos de las nuevas tareas
		const nuevaTarea = new Tarea(this.id,this.nombreTarea, this.horaTime);
		// VALIDACION PARA QUE AL INGRESAR EL USUARIO VALIDE LA HORA en Number
		// y no reciba strings
		if ( this.horaTime[3] !== this.horaTime[2]  ){
			alert("Debes ingresar un dato correcto")
		}else{
			// Insertamos los datos en la variable
			this.tareas.push(nuevaTarea);
			this.service.getTareas();
			console.log(this.tareas);
			// validadion para limpiar el input
			this.nombreTarea="";
			this.horaTime= null;

		}
	}

	// Funcion para eliminar la tarea seleccionada
	deleteTarea(indice: number){
		const confirmar = confirm("ALERTA, VAS A ELIMINAR UNA TAREA, ¿DESEAS SEGUIR?")
		if(!confirmar){
			return;
		}
		// eliminamos los arreglos
		this.tareas.splice(indice,1);
		this.service.saveTareas(this.tareas);
	}

	// Funciones para ordenas las tareas de acuerdo al tiempo
	// Funcion para ordenar la lista ascendente
	ordenarListA(){	
		this.tareas.sort((a, b)=> (
			// validacion pra comparan las horas ingresadas y poder ordenarlas en orde ascendente
			a.hora > b.hora ? 1 : -1));
			// Verificacion de los datos ordenados
			console.log(this.tareas);
			
		}
		// Funcion para ordenar la lista Descendente
		ordenarListD(){		
			this.tareas.sort((a, b)=> (
				// validacion para comparar las horas ingresadas y poder ordenarlas en orde descendente
				a.hora < b.hora ? 1 : -1));
				// Verificacion de los datos ordenados
				console.log(this.tareas);
			
	}

	// Funcion para poder usar el checklist y eliminar la tarea seleccionada
	changeStadeTask(){
		this.service.saveTareas(this.tareas);
	}
	
	ngOnInit() {
		this.obtenerTareas();
	}
	
	
	// Asyc para poder obtener las tareas
	async obtenerTareas() {
		this.tareas =  await this.service.getTareas();
		
	}

	
}
