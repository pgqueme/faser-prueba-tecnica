import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from './app.service';
import {Tarea} from './tarea';

interface ColumnHeader {
  name: string;
  sorting: boolean;
  direction: 'up' | 'down';
  sortFunction: (col: ColumnHeader, prop: string) => void;
  prop: keyof Tarea;
}

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
  titles: ColumnHeader[] = [
    {name: 'titulo', prop: 'titulo', sorting: false, direction: 'up', sortFunction: this.sortByText.bind(this)},
    {name: 'minutos', prop: 'minutos', sorting: false, direction: 'up', sortFunction: this.sortByNumber.bind(this)},
  ];

  constructor(
    public service: AppService,
  ) {
  }

  ngOnInit() {
    this.obtenerTareas();
  }

  async obtenerTareas() {
    this.tareas = await this.service.obtenerTareas();
  }

  sortCol(col: ColumnHeader, prop: string, fn: (row: Tarea[], direction: string) => void) {
    this.titles.forEach((title) => title.sorting = false);
    col.sorting = true;
    col.direction = col.direction === 'up' ? 'down' : 'up';
    fn(this.tareas, col.direction);
  }

  sortByText(col: ColumnHeader, prop: string) {
    console.log('sortByTime');
    this.sortCol(col, prop, (rows, direction) => {
      rows.sort((a, b) => {
        if (direction !== 'up') {
          return a[prop].localeCompare(b[prop]);
        }
        return b[prop].localeCompare(a[prop]);
      });
    });
  }

  sortByNumber(col: ColumnHeader, prop: string) {
    console.log('sortByTime');
    this.sortCol(col, prop, (rows, direction) => {
      rows.sort((a, b) => {
        if (direction !== 'up') {
          return Number(a[prop]) - Number(b[prop]);
        }
        return Number(b[prop]) - Number(a[prop]);
      });
    });
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

  sortAleatory() {
    this.tareas.sort(() => Math.random() - 0.5);
    this.titles.forEach((title) => {
      title.sorting = false;
      title.direction = 'up';
    });
  }

  selectAll() {
    const isAllSelected = this.tareas.every((tarea) => tarea.selected);
    this.tareas.forEach((tarea) => tarea.selected = !isAllSelected);
  }
}
