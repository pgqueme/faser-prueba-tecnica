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
	order:boolean = true;

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
		let ultimoElemento = this.tareas.length + 1
		this.tareas.push(new Tarea(ultimoElemento, nombre, tiempo, false, false));
		this.nombre_tarea = "";
		this.tiempo_tarea = 0;
	}
	async seleccionarTarea(indice = -1){
		if(indice > -1 ){
			if(this.tareas[indice].seleccionada == false){
				this.tareas[indice].seleccionada = true;
			}
			else{
				this.tareas[indice].seleccionada = false;
			}
		}
	}
	async destacarTarea(indice = -1){
		console.log('-',this.tareas);
		if(indice > -1 ){
			if(this.tareas[indice].destacada == false){
				this.tareas[indice].destacada = true;
			}
			else{
				this.tareas[indice].destacada = false;
			}
		}
	}
	async eliminarTareas(){
		this.tareas.forEach((tarea, indice) => {
			if(tarea.seleccionada == true){
				this.tareas.splice(indice,1);
				this.eliminarTareas();
			}
		});
	}
	async ordenarTareasTabla() {
		const shuffledArray = this.tareas.sort((a, b) => 0.5 - Math.random());
		this.tareas = shuffledArray;
	}
	async ordenarTabla(col, order = true, num = false) {
		this.order = !order;
		var table, rows, switching, i, x, y, shouldSwitch;
		table = document.getElementById("tabla");
		switching = true;
		while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[col];
			y = rows[i + 1].getElementsByTagName("TD")[col];
			if(this.order == true){
				if(num == true){
					if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
						shouldSwitch = true;
						break;
					}
				}
				else{
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}
			else{
				if(num == true){
					if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
						shouldSwitch = true;
						break;
					}
				}
				else{
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
		}
  	}
}
