import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from './app.service';
import {Tarea} from './tarea';
import {ColumnHeader, TableSortingService} from './table-sorting.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('table', {static: false}) table: ElementRef<HTMLTableElement>;
  @ViewChild('inputTime', {static: false}) inputTime: ElementRef<HTMLInputElement>;
  @ViewChild('inputTarea', {static: false}) inputTarea: ElementRef<HTMLInputElement>;
  tareas: Tarea[];

  titles: ColumnHeader<Tarea>[] = [
    {
      name: 'titulo',
      prop: 'titulo',
      sorting: false,
      direction: 'up',
      sortFunction: (col) => this.tableService.sortByText(col, (tarea) => tarea[col.prop])
    },
    {
      name: 'minutos',
      prop: 'minutos',
      sorting: false,
      direction: 'up',
      sortFunction: (col) => this.tableService.sortByNumber(col, (tarea) => tarea[col.prop])
    },
  ];


  constructor(
    public service: AppService,
    public tableService: TableSortingService<Tarea>,
  ) {
  }

  ngOnInit() {
    this.obtenerTareas().then(() => {
      this.tableService.setEntitiesArray(this.tareas);
      this.tableService.setTitles(this.titles);
    });
  }

  async obtenerTareas() {
    this.tareas = await this.service.obtenerTareas();
  }


  addTask() {
    const titulo = this.inputTarea.nativeElement.value;
    const minutos = Number(this.inputTime.nativeElement.value);
    this.tareas.push({
      id: this.tareas.length + 1,
      titulo,
      minutos,
    });
  }

  deleteSelectedTasks() {
    this.tareas = this.tareas.filter((tarea) => !tarea.selected);
  }

  markSelectedTasks(b?: boolean) {
    this.tareas.filter((tarea) => tarea.selected).forEach((tarea) => {
      if (b === undefined) {
        tarea.mark = !tarea.mark;
        return;
      }
      tarea.mark = b;
    });
  }

  deleteTask(tarea: Tarea) {
    this.tareas.splice(this.tareas.indexOf(tarea), 1);
  }

  markTask(tarea: Tarea) {
    tarea.mark = !tarea.mark;
  }

  selectAll() {
    const isAllSelected = this.tareas.every((tarea) => tarea.selected);
    this.tareas.forEach((tarea) => tarea.selected = !isAllSelected);
  }
}
